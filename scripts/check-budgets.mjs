#!/usr/bin/env node
// Fast, no-browser static budget check against the production build in .next.
// Usage: npm run build && node scripts/check-budgets.mjs
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const budgets = JSON.parse(fs.readFileSync(path.join(root, "docs/performance-budgets.json"), "utf8")).static;

const htmlPath = path.join(nextDir, "server/app/index.html");
if (!fs.existsSync(htmlPath)) {
  console.error(`Missing ${htmlPath}. Run a production build first (VERCEL_ENV=production npm run build).`);
  process.exit(2);
}
const html = fs.readFileSync(htmlPath, "utf8");

const gz = (file) => zlib.gzipSync(fs.readFileSync(file), { level: 9 }).length;
const staticFile = (u) => path.join(nextDir, "static", u.replace(/^\/_next\/static\//, ""));
const refs = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\s)\\]+?\.(js|css|woff2?|ttf|otf)/g)].map((m) => m[0]))];

const jsFiles = refs.filter((r) => r.endsWith(".js"));
const cssFiles = refs.filter((r) => r.endsWith(".css"));
const fontRefs = refs.filter((r) => /\.(woff2?|ttf|otf)$/.test(r));

const sum = (files) => files.reduce((a, f) => (fs.existsSync(staticFile(f)) ? a + gz(staticFile(f)) : a), 0);

// Fonts: any font file anywhere in the build output or public/.
const walk = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)])) : []);
const fontOnDisk = [...walk(path.join(nextDir, "static")), ...walk(path.join(root, "public"))].filter((f) => /\.(woff2?|ttf|otf|eot)$/i.test(f));
const fontCount = new Set([...fontRefs, ...fontOnDisk]).size;

// Total CSS = all css emitted under .next/static/css (not just homepage).
const allCss = walk(path.join(nextDir, "static/css")).filter((f) => f.endsWith(".css"));
const totalCss = allCss.reduce((a, f) => a + gz(f), 0);

// Image bytes: raster/vector files shipped from public/ (raw bytes, as served).
const imgs = walk(path.join(root, "public")).filter((f) => /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(f));
const imgBytes = imgs.reduce((a, f) => a + fs.statSync(f).size, 0);

const rows = [
  ["Homepage first-load JS (gzip B)", sum(jsFiles), budgets.homepageFirstLoadJsGzipBytes],
  ["Total CSS (gzip B)", totalCss, budgets.totalCssGzipBytes],
  ["Font files (count)", fontCount, budgets.fontFiles],
  ["public/ image bytes (B)", imgBytes, budgets.publicImageBytes],
];

const pad = (s, n) => String(s).padEnd(n);
console.log(`Homepage references ${jsFiles.length} JS, ${cssFiles.length} CSS, ${fontRefs.length} font files\n`);
console.log(pad("Metric", 34), pad("Actual", 10), pad("Budget", 10), pad("Delta", 10), "Status");
let failed = false;
for (const [name, actual, budget] of rows) {
  const over = actual > budget;
  if (over) failed = true;
  const delta = actual - budget;
  console.log(pad(name, 34), pad(actual, 10), pad(budget, 10), pad((delta > 0 ? "+" : "") + delta, 10), over ? "FAIL" : "ok");
}
if (failed) {
  console.error("\nBudget exceeded. Raise a budget only in the same PR, with measured justification (see docs/PERFORMANCE.md).");
  process.exit(1);
}
console.log("\nAll static budgets met.");
