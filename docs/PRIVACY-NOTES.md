# Privacy notice: evidence and open items

Not legal advice. Page: `app/privacy/page.tsx`. Last-updated constant: `LAST_UPDATED` in that file.

## Claim -> proof
| Claim on page | Proof |
|---|---|
| Form collects name, email, project type, brief | `app/api/contact/route.ts` (`name`, `email`, `projectType`, `brief`); `components/home/contact-form.tsx` |
| Hidden anti-spam field | `companyWebsite` honeypot in route.ts and contact-form.tsx |
| Emailed to owner + thank-you copy to visitor, via Resend | route.ts: POST `https://api.resend.com/emails/batch` with two messages; `lib/email-templates.ts` |
| No database of its own | No DB client or storage in the repo (route.ts only emails) |
| Per-IP counter in memory, not persisted | `hits` Map, `rateLimited()` in route.ts (key = first `x-forwarded-for`) |
| Logs errors, not submission contents | Only `console.error` calls in route.ts: missing config, "Resend request failed or timed out", Resend status code (comment: body may echo PII). Host-level request logs are separate (Vercel). |
| Assistant runs in browser; nothing sent to third parties | `components/sparkv-agent.tsx`: answers via local `answerFor()`; no `fetch`/network call in the file |
| No cookies | grep for `document.cookie`/`cookies(` finds only `components/ui/sidebar.tsx`, which is not imported anywhere (dead code). Re-check if that component is ever used. |
| Local storage `sparkv-theme` only | `app/layout.tsx` inline script, `components/home/header.tsx` |
| No external fonts / third-party scripts | No `next/font/google` or external script tags; only inline theme script and JSON-LD |
| Vercel hosts | Deployment target per project setup; host handles request metadata (general platform behaviour, not verified in code) |

## Analytics paragraph (include only once analytics is enabled)
The page currently says only: "If we enable privacy-friendly aggregate analytics or performance measurement, it would be provided through our host, and we would update this notice." When Vercel Web Analytics / Speed Insights are actually enabled, replace with a concrete statement. Current Vercel docs could not be fetched in this session; from general knowledge Web Analytics is described as cookie-free with no cross-site tracking, and Speed Insights collects performance metrics. CONFIRM against current Vercel docs before stating that, and list what is collected.

## Needs legal review / owner decisions
- Legal entity name and registered details (page uses display name "SparkV" only).
- Retention period for emails/briefs (page states none).
- Lawful basis / consent wording: India DPDP Act 2023 notice and consent requirements; GDPR if EU visitors are targeted (.si domain).
- Grievance / contact officer requirements.
- International transfers to Vercel and Resend (processor terms, locations).
- Children / minors.
- Whether to name the owner's own mailbox provider (recipient inbox) as a processor.
- A Terms page was deliberately NOT created: terms need commitments only the owner can make.

## Intake form gap
The form has no consent checkbox and no link to this notice. Minimal low-risk improvement (not done; another agent owns the form): add under the submit button a line such as "By sending this, you agree we may use these details to reply to you. See the Privacy Notice." linking to `/privacy`. A required checkbox is a legal decision; confirm wording first.
