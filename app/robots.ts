import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Non-production deployments (Vercel previews, local builds) must never be crawled.
  if (!IS_INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    // Allow-by-default for every crawler. No AI-crawler-specific rules on purpose: opting out of
    // model training (GPTBot, ClaudeBot, Google-Extended) is a business decision, see docs/SEO-AUDIT.md.
    // Public marketing pages and rendering assets stay crawlable; only the API is excluded.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
