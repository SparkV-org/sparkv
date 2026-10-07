# Homepage a11y patches (components/homepage.tsx)

Line numbers refer to homepage.tsx at the time of audit (pre-refactor); locate by the quoted snippet.

## 1. Intake form (line 74)
- `<label>What are you looking to build?</label>` is a bare label with no control. Replace the label + `.project-types` wrapper with
  `<fieldset className="project-fieldset"><legend>What are you looking to build?</legend> ...radios... </fieldset>` (CSS for `.project-fieldset` is already appended in globals.css).
- Add `required` to the first radio; radios already share `name="type"`.
- Error paragraphs: give them ids (`id="form-error"`); on the fieldset/inputs set `aria-invalid={!!formError}` and `aria-describedby="form-error"`. `role="alert"` is fine; also move focus to the first invalid control after a failed submit/continue via a ref.
- On step change (Continue/Back), move focus to the new step's first control (first radio / Name input) and announce "Step 2 of 2" (put the `STEP n / 2` text in a `role="status"`).
- Honeypot: `<input className="form-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true"/>` is still a focusable input exposed to some AT. Wrap it: `<div aria-hidden="true" inert><input ... /></div>` (React 19 supports `inert`), keep `tabIndex={-1}`.
- Success state `role="status"` is good; move focus to the h3 (`tabIndex={-1}`) so keyboard users land on it.

## 2. Header / mobile menu (line 53)
- `<nav className="desktop-nav">` needs `aria-label="Primary"`.
- Menu button: `aria-label="Toggle menu"` -> `aria-label={menu?"Close menu":"Open menu"}`, add `aria-controls="mobile-menu"` and `id="mobile-menu"` on `.mobile-menu`. Wrap the mobile links in `<nav aria-label="Mobile">`.
- Verify closed-menu links are not tabbable (if CSS hides via opacity/transform only, add `inert` when `!menu`).
- Esc: `useEffect` adding a keydown listener while `menu` is true that calls `setMenu(false)` and focuses the menu button ref.
- Close on resize past the mobile breakpoint.

## 3. Agent console tabs (line 63)
`role="tablist"`/`role="tab"` without roving tabindex, arrow keys, or tabpanel is an incomplete ARIA pattern. Either:
- (simplest) drop the roles and `aria-selected`; use `aria-pressed={agent===i}` and `role="group" aria-label="Agent examples"` on the list; or
- implement the full pattern: ids + `aria-controls`, `tabIndex={agent===i?0:-1}`, Arrow/Home/End handling, `role="tabpanel" aria-labelledby` on `.agent-flow`.
Mark decorative `<i/>` and `.thinking-orbs` `aria-hidden="true"`.

## 4. Footer (line 78)
`<span>PRIVACY · TERMS</span>` is dead text styled as navigation. Remove it until real Privacy and Terms pages exist (content must come from the business/legal; do not invent). If kept, it must be real links. Wrap footer link groups in `<nav aria-label="Footer">`.

## 5. Misc
- Headings: 1 h1, 3 h2, 13 h3, 1 h4. Confirm h3s sit under an h2 after the refactor.
- Check `.hero` layers and cursor-magnet elements have `pointer-events:none` (static scan found no blocking pseudo-elements; verify with `document.elementFromPoint` at runtime).
