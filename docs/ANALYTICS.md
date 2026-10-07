# Analytics and real-user monitoring

Implemented by `components/telemetry.tsx` (mount once in `app/layout.tsx`) and `lib/analytics.ts`.
Packages: `@vercel/analytics` and `@vercel/speed-insights` (versions pinned in `package-lock.json`).

## How it loads

- Client component, runs only after hydration, only when `window.location.hostname` is `www.sparkv.si` or `sparkv.si`.
  Previews, localhost and `*.vercel.app` never report. This is a runtime check, so it needs no env vars and exposes no secrets.
- The two Vercel components are code-split via dynamic `import()` and mounted on `requestIdleCallback` (2-4 s fallback), so they are off the critical path.
- Everything is wrapped in try/catch; if blocked by an ad blocker it silently does nothing.

## What is tracked

| Event | Trigger | Properties |
|---|---|---|
| page views | automatic (Web Analytics) | none extra |
| Core Web Vitals | automatic (Speed Insights) | none extra |
| `cta_click` | click on link with href `#contact` or `/#contact` | `section` = id of closest ancestor with an id |
| `email_click` | click on `mailto:` link | none (address is never sent) |
| `outbound_click` | click on external http(s) link | `host` only |
| `lead_submitted` | window event `sparkv:lead` | none |
| `service_view` | visit to `/services/*` | `path` |

No names, emails, briefs or any form content are ever sent.

## Referral visibility (AI and search)

Referrers (chatgpt.com, perplexity.ai, bing.com, google.com) and UTM parameters such as `utm_source=chatgpt.com` appear automatically in the Web Analytics Referrers / UTM panels. Nothing in this code rewrites or fabricates referrers. Vercel states the filtered query params and referrer are stored per data point.

## Owner steps (Vercel dashboard)

1. Project > Analytics > Enable Web Analytics.
2. Project > Speed Insights > Enable Speed Insights.
3. Deploy to production. Data appears after real visits; Speed Insights needs a few days of traffic for useful percentiles.
4. Custom events (`cta_click` etc.) require a Pro or Enterprise plan; on Hobby, page views and referrers still work, events are not available.

## Reading results

Analytics tab: Referrers, UTM, Pages, then the Events panel (click an event name to break down by property). Speed Insights: use the p75 field values as source of truth versus the lab budgets in `docs/PERFORMANCE.md`.

## Privacy (verified against Vercel docs)

Web Analytics uses no third-party cookies; visitors are identified by a hash of the incoming request that is discarded after 24 hours. Data is aggregated and not tied to an IP address. Custom events must not contain personal data, which is why only the fields above are sent. Because no cookies or persistent identifiers are set, a consent banner is generally not needed for this, but confirm with your own legal advice.

## Budget impact (measured, production build)

- Homepage first-load JS gzip: 191152 B before, 192238 B after (+1086 B, budget 200000).
- Lazy chunks (loaded after idle, production host only): about 4.6 KB gzip across three small chunks.
- Extra requests on the production host after idle: Vercel's first-party scripts and beacons under `/_vercel/insights/*` and `/_vercel/speed-insights/*` (same origin, so third-party requests stay 0). On localhost/previews: 0 extra requests.
- Not measured: the exact byte size of Vercel's injected script files (served by Vercel at runtime, not in the build output).

Sources: vercel.com/docs/analytics/package, /analytics/custom-events, /analytics/privacy-policy, /speed-insights/package, /speed-insights/quickstart.
