#!/usr/bin/env node
// IndexNow submitter (no dependencies, Node 22). Default is --dry-run; pass --submit to POST.
// Usage: node scripts/indexnow.mjs [--urls a,b,c] [--dry-run|--submit]
import { readdirSync, readFileSync } from "node:fs";

const HOST = "www.sparkv.si";
const SITE = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const args = process.argv.slice(2);
const submit = args.includes("--submit");
const ui = args.indexOf("--urls");

const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[a-zA-Z0-9-]{8,128}\.txt$/.test(f) && f !== "llms.txt");
if (!keyFile) throw new Error("No IndexNow key file found in public/");
const key = keyFile.replace(/\.txt$/, "");
if (readFileSync(new URL(`../public/${keyFile}`, import.meta.url), "utf8").trim() !== key) throw new Error("Key file content does not match its name");

let urls;
if (ui >= 0) urls = (args[ui + 1] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}
urls = [...new Set(urls)];
if (!urls.length) throw new Error("No URLs to submit");
if (urls.length > 10000) throw new Error("IndexNow allows at most 10,000 URLs per request");
for (const u of urls) {
  const p = new URL(u);
  if (p.protocol !== "https:" || p.host !== HOST) throw new Error(`URL not on ${HOST}: ${u}`);
}

const body = { host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls };
console.log(`${submit ? "SUBMIT" : "DRY RUN"}: ${urls.length} URLs -> ${ENDPOINT}`);
console.log(JSON.stringify(body, null, 2));
if (!submit) {
  console.log("Dry run only. Re-run with --submit to send.");
  process.exit(0);
}
const res = await fetch(ENDPOINT, { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
console.log(`Response: ${res.status} ${res.statusText}`);
process.exit(res.ok ? 0 : 1);
