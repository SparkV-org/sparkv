# Homepage patch proposal (components/homepage.tsx is owned by another agent)

Goal: a direct, quotable definition of what SparkV is, near the top of `/`, using only wording the site already supports.

1. Directly after the existing `<p className="hero-lede">...</p>` (or as visually-subtle text above `hero-audience`), add one sentence:

   `SparkV is a software company that designs and builds websites, web and mobile applications, custom software platforms, AI agents, and business automation.`

   Every noun phrase maps to existing copy and lib/services.ts. Do not add locations, years, team size, or client claims.

2. Add one visible text link to `/services` (e.g. "See all services") in the services section so the hub is reachable from the homepage body, not only the header/footer.

3. Do not change the H1 or its `aria-label`.

4. Homepage JSON-LD currently comes only from `app/layout.tsx` (Organization + WebSite). No page-level graph node exists for `/`; optional later: a `WebPage` node with `@id` `https://sparkv.si/#webpage`. Not required.
