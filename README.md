# SparkV Website

Production Next.js website for SparkV, including a responsive marketing experience,
an on-page knowledge assistant, and a server-validated project intake form.

## Local development

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm start
```

## Vercel deployment

The repository is configured as a native Next.js application. Vercel should use:

- Framework Preset: `Next.js`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: leave blank (Next.js default)
- Node.js: `22.x`

Add these environment variables to Production, Preview, and Development as needed:

- `RESEND_API_KEY`: server-side Resend API key
- `CONTACT_TO_EMAIL`: inbox that receives project briefs
- `CONTACT_FROM_EMAIL`: optional verified Resend sender

The form deliberately returns an error instead of displaying a false success when
delivery is not configured or Resend rejects the message. For production delivery,
verify the sender domain in Resend and set `CONTACT_FROM_EMAIL` to that domain.

## Agent behavior

The floating SparkV site guide is an on-page knowledge assistant. Its answers are
deterministic and limited to the website's SparkV service information, so it works
without an external AI key and does not send visitor messages to a third party.

## SEO and indexing

- The canonical origin is the `SITE_URL` constant in `lib/site.ts` (`https://www.sparkv.si`). It is not read
  from an environment variable, so a stale hosting setting cannot change canonicals, Open Graph URLs,
  structured data, or the sitemap.
- Only `VERCEL_ENV=production` deployments are indexable. Previews and local builds emit `noindex` and
  a `Disallow: /` robots.txt.
- Service content lives in `lib/services.ts`; `/services` and `/services/[slug]` are statically generated
  and listed in `app/sitemap.ts`. Structured data is emitted only for content that is visible on the page.
- `www.sparkv.si` is the primary domain in the hosting dashboard; the apex `sparkv.si` redirects to it, so the
  redirect target matches the canonical.
