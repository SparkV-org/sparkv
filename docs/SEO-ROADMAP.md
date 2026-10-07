# SEO / GEO roadmap

Principle: grow only with content that adds knowledge SparkV genuinely holds. No invented clients, numbers, or reviews.

## Canonical host is https://www.sparkv.si (apex redirects to it, intended; see SEO-AUDIT.md section 1).

## 30 days
1. After deploying this branch, re-curl canonical, robots.txt and sitemap on www and confirm all URLs use www.
2. Verify in Google Search Console (Domain property via DNS TXT, which covers apex and www). Submit `/sitemap.xml`. Use URL Inspection on the 6 URLs and "Request indexing" for the homepage and /services.
3. Verify in Bing Webmaster Tools (import from Search Console or DNS). Submit the sitemap. Bing's AI Performance report (public preview since February 2026; Intents/Topics/Citation Share/Compare added June 2026, per blogs.bing.com/webmaster) shows citations in Copilot and Bing AI summaries; enable and check weekly once data appears.
4. Google has no separate AI report: AI Overviews / AI Mode traffic is counted in the Search Console Performance report under Web (developers.google.com/search/docs/appearance/ai-features).
5. Apply the homepage definitional sentence (docs/SEO-HOMEPAGE-PROPOSAL.md).
6. Create official profiles that really exist (LinkedIn, GitHub), then add sameAs.
7. Add analytics events (below).

## 90 days
1. Publish 2-4 articles from the cluster plan only where SparkV has first-hand knowledge (design notes, architecture write-ups from the agent flows and platform work already described on the site).
2. Review Search Console queries and Bing grounding queries; adjust page wording to the questions people really ask.
3. Earn links: legitimate sources only (below).
4. Re-run the discoverability audit with real tools; compare to the baseline in SEO-AUDIT.md.

## Content cluster plan (each passes the "unique knowledge" test or is not written)

| Pillar | Existing page | Candidate article | Unique knowledge it must add |
|---|---|---|---|
| AI agents | /services/ai-agents | Designing agent guardrails and human escalation | SparkV's actual input/reasoning/action/outcome flow design |
| AI automation | /services/ai-automation | Workflow vs agent: where each belongs | Decision criteria SparkV uses (deterministic rules vs probabilistic reasoning) |
| Web development | /services/web-development | Modernizing a system incrementally | Real approach: isolate the bottleneck, avoid full rebuilds |
| Custom software | /services/custom-software | Multi-tenant isolation and role models | Data-model and permission design decisions |
| Business automation | /services/ai-automation | Approval steps in automated flows | Where human checkpoints go |
| SaaS | /services/web-development | What a SaaS needs beyond features (onboarding, billing, admin) | Platform scope as on the custom-software page |
| AI systems | hub | Product, intelligence, automation as one system | The architecture view already on the homepage |

Test for each: could a generic competitor write this from a search? If yes, skip it. Include only claims SparkV can back; link primary sources (official docs, standards, papers) for external facts.

## Authority building (legit only)
- Real profiles (LinkedIn company page, GitHub org) linked from the site.
- Open-source or technical write-ups SparkV can truthfully publish.
- Directory listings that accept the business honestly; no paid link schemes, no fake reviews.
- Client case studies only with written client permission and real results.

## Analytics event plan
| Event | Trigger | Parameters |
|---|---|---|
| contact_submit | Project form submitted successfully | source page path |
| cta_click | "Start a project" buttons | page path, button location |
| email_click | mailto link click | page path |
| service_view | Service page view (page_view is enough) | slug |

Referrals from ChatGPT appear automatically in analytics with `utm_source=chatgpt.com`; do not create or fake these values. Filter the Source report for it. Do not log form contents in analytics.
