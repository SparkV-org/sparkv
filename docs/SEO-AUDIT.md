# SEO / GEO audit (verified 2026-10-07)

## 1. Canonical host and redirect chain

Decision (owner): the canonical host is `https://www.sparkv.si`. `SITE_URL` in lib/site.ts, sitemap, robots `Host:`, canonicals, schema and llms.txt all use it. The apex-to-www redirect in Vercel is correct and intended.

Redirect chain measured with curl on 2026-10-07:

| Request | Result |
|---|---|
| `http://sparkv.si/` | 308 -> `https://sparkv.si/` |
| `https://sparkv.si/` | 308 -> `https://www.sparkv.si/` |
| `http://www.sparkv.si/` | 308 -> `https://www.sparkv.si/` (one hop) |
| `https://www.sparkv.si/` | 200 |

So `http://sparkv.si` takes two hops (http-to-https first, then apex-to-www). Both are permanent (308), so this is acceptable and Google follows multiple hops; it is a minor efficiency point only. Whether Vercel can collapse it to a single hop is NOT verified; Vercel's HTTPS upgrade is applied first at the platform level, and I have not confirmed a setting that changes this. Do not add code redirects.

Note: the live robots.txt served before this change still showed `Host: https://sparkv.si` and apex sitemap URLs (the previous deploy). They update when this branch is deployed; re-curl `https://www.sparkv.si/robots.txt` and `/sitemap.xml` and confirm every URL begins with `https://www.sparkv.si`. Existing Search Console property should be a Domain property (covers apex and www) or a URL-prefix property for `https://www.sparkv.si/`.

## 2. Crawler policy (docs read today)

robots.txt is allow-by-default for `*`, `/api/` disallowed. No crawler-specific rules were added, so no training-data decision is made implicitly.

| Token | Purpose per official docs | robots.txt controls it | Source |
|---|---|---|---|
| Googlebot | Google Search | yes | developers.google.com/search/docs/crawling-indexing/overview-google-crawlers |
| Google-Extended | Whether crawled content may be used for training future Gemini models and grounding; "does not impact a site's inclusion in Google Search" nor ranking | yes (robots.txt token) | developers.google.com/search/docs/crawling-indexing/google-common-crawlers |
| OAI-SearchBot | Surfaces sites in ChatGPT search; must be allowed to appear in ChatGPT search answers | yes | developers.openai.com/api/docs/bots |
| GPTBot | OpenAI model training; disallow = opt out of training | yes | same |
| ChatGPT-User | User-initiated visits from ChatGPT; not used for automatic crawling; robots.txt rules may not apply | no | same |
| PerplexityBot | Indexes sites for Perplexity search results; not for training | yes | docs.perplexity.ai/guides/bots |
| Perplexity-User | User-initiated fetches; generally ignores robots.txt | no | same |
| ClaudeBot | Anthropic training data collection | yes | support.claude.com/en/articles/8896518 |
| Claude-SearchBot | Indexing for search result quality | yes | same |
| Claude-User | Fetches when a user directs Claude to a page | yes (per the article) | same |
| bingbot | Bing crawler (Bing's own page gave no detail via fetch; general knowledge, unverified here) | yes | not verified |

Decision needed from the owner (not made by this change): whether to block the training tokens (GPTBot, ClaudeBot, Google-Extended). Blocking them does not affect Google Search; blocking OAI-SearchBot/PerplexityBot/Claude-SearchBot would reduce AI-search visibility. Example opt-out of training only:

```
User-agent: GPTBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /
```

Rendering: only `/api/` is disallowed. `/_next/static` assets, CSS, JS and images are crawlable. Nothing needed for rendering is blocked.

## 3. Structured data

- Graph: Organization `#organization`, WebSite `#website` (layout); per page WebPage/CollectionPage `#webpage`, Service `#service`, BreadcrumbList `#breadcrumb`, all linked by `@id`. Schema content matches visible content (name, description, breadcrumb).
- No FAQPage schema, deliberately. Google's FAQ page states FAQ rich results are no longer shown (from 7 May 2026, per developers.google.com/search/docs/appearance/structured-data/faqpage). Do not add it.
- Google's AI features guidance (developers.google.com/search/docs/appearance/ai-features): no special schema, AI text files, or markup required; standard indexability and helpful content matter. So llms.txt is harmless supplemental documentation, not a ranking mechanism; we make no claim it helps.
- Google's search gallery lists Organization and Breadcrumb; Service is not a rich-result feature. Schema is used for entity clarity, not as a rich-result strategy.
- sameAs omitted: no official profile URLs are verifiable from the repo. QUESTION for owner: LinkedIn, GitHub, X, Crunchbase, or similar official profiles?
- WebSite alternateName omitted: no genuine alternate name known.
- Organization lacks contactPoint/email: none stated publicly on site. QUESTION: public contact email to publish?

## 4. Metadata

Each route has a unique title, description, canonical (apex), OG, and Twitter card (see lib/services.ts and the page files). Not-found page is noindex via branded 404 (live: /nope returns 404). Lengths are checked in the build step recorded in the commit/report.

## 5. IndexNow: skipped

Protocol verified at indexnow.org/documentation (key 8-128 chars, key file at site root, POST up to 10,000 URLs). Participating engines include Bing and Yandex; Google was not shown as a participant in the Bing page. For a 6-URL site, a sitemap plus Bing Webmaster Tools URL submission achieves the same with no extra moving parts, and the repo has no deploy hook to call it. Revisit if the site grows (blog/case studies): generate a key, host `/<key>.txt`, POST changed URLs after deploy.

## 6. Discoverability (WebSearch tool, "standard" mode, run 2026-10-07)

WebSearch is neither Google, Bing, nor ChatGPT; results are indicative only.

| Query | sparkv.si appeared? | Notes |
|---|---|---|
| site:sparkv.si | No | Returned unrelated .si "spark" companies; operator not reliably supported by this tool |
| site:www.sparkv.si | No | Same unrelated Slovenian "Spark" companies (Sparkasse, bizi.si listings) |
| SparkV sparkv.si | No | Results about SparkVR, Apache Spark, Chevrolet Spark, other Slovenian "Spark" businesses |
| What does SparkV do? | No | Results about Apache Spark etc.; ambiguous brand name |
| Who builds AI agents for businesses? | No | Large vendors and agency listicles |
| Who offers AI automation development? | No | Agency listicles |
| Who builds custom AI systems? | No | Agency pages |
| Who develops custom business software? | No | Generic guides |
| Who builds modern business websites? | No | Agency lists |
| Who offers AI agent development? | No | IBM, Salesforce, Wiz explainers |

Interpretation: no evidence either way about technical defects. Absence is expected for a brand-new site with an ambiguous name ("Spark") and no external links; pages deployed hours ago may not be crawled yet. Confirmed technical facts from curl: robots.txt, sitemap, llms.txt, service pages return 200 on www; 404 is a real 404; no confirmed technical defect remains in the repo; the apex redirect is intentional (section 1). Do not claim indexing success or failure until Search Console and Bing Webmaster Tools report it.

## 7. Open questions for the owner

1. Allow or block AI training crawlers (GPTBot, ClaudeBot, Google-Extended)?
2. Official social/company profile URLs for sameAs?
3. Public contact email/phone for Organization schema?
4. Legal/operating name and location, if you want them stated (not invented here).
