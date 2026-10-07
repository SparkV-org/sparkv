# SparkV social profiles and search-entity setup

Goal: a small set of public profiles that all use the same name, link back to https://www.sparkv.si, and are then listed on the site so search engines can tie them to one organization.

## 1. Handle strategy

Use ONE identical handle everywhere. Try in this order and take the first that is free on all platforms you create:

1. `sparkv`
2. `sparkvhq`
3. `getsparkv`
4. `sparkv_si` (not valid on GitHub, which disallows underscores; use `sparkv-si` there)

Avoid handles that look like other "Spark" companies (Apache Spark, Spark Hire, Sparkle, SparkPost, and so on). Do not add generic words like "ai" or "tech" unless forced.

Availability checked by script on 2026-10-07 (unauthenticated GitHub and npm APIs only):

| Handle | GitHub user | GitHub org | npm package |
| --- | --- | --- | --- |
| `sparkv` | TAKEN (a user exists) | not found | not found |
| `sparkvhq` | not found | not found | not found |
| `getsparkv` | not found | not found | not found |
| `sparkv_si` | not found (underscore invalid on GitHub anyway) | not found | not found |

"Not found" means the API returned 404 at that moment; a name can still be reserved or banned, so confirm in the signup form. Because `sparkv` is taken on GitHub, `sparkvhq` is the likely common handle. Every other platform (LinkedIn, X, Instagram, YouTube) is **unverified, check in the signup form**.

The existing GitHub org `SparkV-org` is not publicly visible (the API returns 404). Either make it public (Settings, then set profile and public visibility; note orgs with no public members or repos can still 404 for strangers) or create a public org with the chosen handle.

## 2. Platforms in priority order

| # | Platform | Why | Matters for |
| --- | --- | --- | --- |
| 1 | LinkedIn company page | Standard business-identity source; B2B buyers check it | Entity/SEO and credibility |
| 2 | GitHub organization (public) | Credibility for a software studio; can host public repos and a profile README | Entity/SEO and credibility |
| 3 | X | Quick, widely crawled profile; useful for announcements | Entity (light) and community |
| 4 | Instagram | Site mentions Instagram-based agents; visual portfolio | Community |
| 5 | YouTube | Demos and walkthroughs; indexed by Google | Community, later entity |

Create 1 and 2 first. Do not create profiles you will not keep updated; an empty profile does little.

## 3. Copy-paste fields (use the same on every platform)

- Display name: `SparkV`
- Handle: from section 1
- Short bio / tagline (matches the site):
  `Custom software, AI agents & business automation`
- Longer description (matches `SITE_DESCRIPTION` in `lib/site.ts`):
  `SparkV designs and builds websites, web apps, AI agents, and business automation—production-ready software for founders, operators, and engineering teams.`
- Website: `https://www.sparkv.si`
- Contact email: `sparkv.info@gmail.com`
- Location: `Telangana, India`
- Do not add founding year, team size, client names, awards or follower claims unless they are true and you can show them.

Images:
- Profile photo: `public/sparkv-logo.png` or `public/favicon.svg` (export a square PNG, at least 400x400, logo centered with padding because platforms crop to a circle).
- Banner: dark background (#08080a, the site theme color) with the SparkV logo and the tagline above. Sizes: LinkedIn 1128x191, X 1500x500, YouTube 2560x1440 (keep content in the center 1546x423), GitHub org needs none.

Link back: put `https://www.sparkv.si` in the website field of every profile, so the site and the profiles reference each other.

Verification: LinkedIn (admin of the page, and verify page if offered), GitHub (verify the org's domain under Settings, Verified domains, by adding the DNS TXT record), X and Instagram (confirm email; paid verification is not needed).

## 4. Hand-off: how to give the URLs to the engineer

Send the final, public profile URLs in this form (only profiles that are live and show the SparkV name):

```
LinkedIn: https://www.linkedin.com/company/<slug>
GitHub: https://github.com/<org>
X: https://x.com/<handle>
Instagram: https://www.instagram.com/<handle>/
YouTube: https://www.youtube.com/@<handle>
```

They go into ONE place: the `SOCIAL_PROFILES` array in `lib/site.ts`, for example:

```ts
export const SOCIAL_PROFILES = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/<slug>" },
];
```

That single edit automatically adds `sameAs` to the Organization JSON-LD (`app/layout.tsx`) and a "Follow" list to both footers (`components/home/sections.tsx` and `components/site-chrome.tsx`). While the array is empty, none of these appear.

Search-console tokens go in `lib/site.ts` too:
- `GOOGLE_SITE_VERIFICATION`: the `content` value of the Google Search Console "HTML tag" option.
- `BING_SITE_VERIFICATION`: the `content` value of the Bing Webmaster Tools `msvalidate.01` meta tag.

Paste only the token value, not the whole tag. Empty means no tag is emitted.

## 5. How search engines use this (no guarantees)

`sameAs` in Organization structured data is a statement that those profile URLs describe the same entity as the site. Google and Bing may use it, together with other signals such as consistent names, links between the profiles and the site, and third-party mentions, to understand which organization the site represents. Google's documented structured-data guidance lists `sameAs` as a recommended Organization property. It is not a ranking factor you can switch on, and neither engine promises a knowledge panel or any ranking change from it. Only list profiles that exist and that link back to the site.

## 6. Brand-name consistency audit

Done on `app/`, `components/`, `lib/`. No `Sparkv`, `Spark V` or mixed-case variants were found. Remaining all-caps `SPARKV` occurrences are deliberate typographic labels, not inconsistencies, but listed in case you want to normalize them (files owned by others, not changed):

- `components/home/hero.tsx`: eyebrow "SPARKV / SOFTWARE x AI x AUTOMATION"
- `components/home/sections.tsx`: orbit label "SPARKV AGENT LAYER"; heading "WHY SPARKV"
- `components/sparkv-agent.tsx`: panel header "SPARKV AGENT"
- `lib/email-templates.ts`: email header "SPARKV"

Screen readers and crawlers read these as text, so "SparkV" in sentence case is preferable if you edit them. Titles, schema, alt text and aria-labels already use "SparkV".

## 7. Layout note

The footer grid in `app/globals.css` is defined for four columns. When the "Follow" column appears (five children), it wraps to a second row on wide screens. Adjust the `.footer-main` grid-template-columns when the first profile is added.
