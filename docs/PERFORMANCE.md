# Performance policy

Budgets live in `docs/performance-budgets.json`. They are enforced by `scripts/check-budgets.mjs` (static, no browser), `lighthouserc.json` (Lighthouse CI, lab) and `.github/workflows/perf.yml`.

## What is tracked

| Metric | Where | Notes |
| --- | --- | --- |
| LCP, FCP, TBT, CLS, TTFB (`server-response-time`), main-thread total | LHCI (lab) | Median of 5 runs, mobile, simulated 4x CPU / slow 4G, cold cache |
| INP | Vercel Speed Insights (field/RUM only) | Not measurable in lab Lighthouse. Target p75 <= 200 ms |
| JS size, CSS size, font count, image bytes | `check-budgets.mjs` (gzip, from `.next`) and LHCI resource-summary | |
| Request count, third-party requests and bytes | LHCI resource-summary | Currently 0 third-party, 0 web fonts |
| Category scores (perf, a11y, SEO, best-practices) | LHCI | >= 0.95 |

URLs: `/`, `/services`, `/services/ai-agents`.

## How budgets were derived

Source data: Lighthouse 13.5 / Chrome 154 on an Apple M1 Pro against production builds (`next start`), mobile simulated throttling. Runs: 3-7 per commit (commits 9030df7, 9ed239b, de04365) plus 3 runs each of `/`, `/services`, `/services/ai-agents` on 421a98d. Budget = observed worst median/max plus headroom, because GitHub runners are slower and noisier than the measuring machine.

| Metric | Measured (homepage) | Budget | Derivation |
| --- | --- | --- | --- |
| LCP | median 2.28-2.33 s, max 2.35 s (services pages ~2.0 s) | 2800 ms | max + ~20% |
| FCP | 1.05-1.06 s (services ~0.90 s) | 1400 ms | +30% |
| TBT | median 14-19 ms, max 39 ms | 150 ms | well above spread; under Google's 200 ms "good" |
| CLS | 0 | 0.02 | any real shift should fail |
| server-response-time | 3-12 ms (localhost) | 200 ms | CI runner noise; catches accidental SSR/dynamic regressions |
| Main thread total | 1.65-2.08 s home, 0.35-0.40 s services | 3000 ms | max + ~45% (CI CPU variance) |
| Script transfer | 155-162 KB | 190000 B | +17% |
| Stylesheet transfer | 31-33 KB | 40000 B | +21% |
| Font transfer / files | 0 | 0 / 0 | no web fonts today; adding one needs a budget change |
| Image transfer | 1461 KB on the homepage run | 1650000 B | +13% |
| Requests | 12-13 home, 18-22 services (prefetch) | 30 | +35% |
| Third-party requests / bytes | 0 | 0 / 0 | |
| Static homepage JS (gzip) | see `check-budgets.mjs` output | 175000 B | set from first passing build + ~10% |
| Category scores | 98-99 perf, 97-100 a11y, 100 SEO/BP | >= 0.95 | -3 points |

The homepage image number (1461 KB) mostly reflects the large `production-control-center.png`; shrinking it is a free future win.

## Lab vs field

Lab (Lighthouse) and field (Vercel Speed Insights, real users) are different datasets. Budgets here are lab-only regression tripwires. If they disagree, trust field p75 for decisions and use lab only to find causes.

## Running locally

```bash
VERCEL_ENV=production npm run build
node scripts/check-budgets.mjs          # fast static check
npx --yes @lhci/cli@0.14.x autorun --config=lighthouserc.json   # needs Chrome (set CHROME_PATH if needed)
```

Lighthouse results are written to `.lighthouseci/` and uploaded as a GitHub Actions artifact for history. Benchmark on an otherwise idle machine; do not run builds concurrently with a timing run.

## Rules

1. A PR that raises a tracked metric beyond budget needs measured justification and a budget change in the same PR (`docs/performance-budgets.json` and `lighthouserc.json` together).
2. Never loosen a budget to make CI pass without explaining why in the PR description.
3. Trust field p75 over lab.

## "No false wins" checklist

- Did LCP improve while INP, CLS, TBT, accessibility, SEO or best-practices got worse? Then it is not a win.
- Did you compare at least 5 runs per side (median plus spread), not a single run?
- Did you compare FCP, main-thread time and bytes alongside LCP?
- Did the LCP element change (see below)? If so the LCP number is not comparable.
- Did you hide content (opacity, lazy reveal, deferred render) instead of making it faster?

## Lesson already learned in this repo

The LCP *element* changes between builds (logo, then text, then headline), so LCP numbers from different commits can measure different things. Always compare FCP, main-thread time and bytes next to LCP. Never start headline text at `opacity: 0`: it delays LCP and is a fake optimization or a regression, depending on which element wins.
