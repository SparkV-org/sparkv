import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Breadcrumbs, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { JsonLd } from "@/components/json-ld";
import { SERVICES } from "@/lib/services";
import { CONTENT_UPDATED, OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const TITLE = "Software, AI Agent & Automation Services";
const DESCRIPTION =
  "Explore SparkV's services: web and mobile development, custom software and platforms, AI agents, and AI business automation, built as connected systems.";
const url = absoluteUrl("/services");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: url },
  openGraph: { type: "website", url, siteName: SITE_NAME, title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${TITLE} | ${SITE_NAME}`,
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: CONTENT_UPDATED,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: url },
        ],
      },
    ],
  };

  return (
    <div className="sub-page">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main id="main" className="sub-main">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Services" }]} />
        <header className="sub-hero">
          <p className="section-label"><span />SERVICES</p>
          <h1>Software, AI agents, and automation, built as connected systems</h1>
          <p className="sub-answer">
            SparkV designs the interface, engineers the foundation, and connects the intelligence, so every layer works as one. Choose a service below, or describe the problem and SparkV will recommend the strongest approach.
          </p>
        </header>
        <ul className="sub-related sub-hub" aria-label="Services">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>
                <strong>{s.name}</strong>
                <span>{s.description}</span>
                <em>Read more <ArrowRight size={14} /></em>
              </Link>
            </li>
          ))}
        </ul>
        <section className="sub-final" aria-labelledby="next">
          <h2 id="next">Not sure which service fits?</h2>
          <p>Describe what you are trying to build, automate, or improve. SparkV will turn it into a technical path forward.</p>
          <Link href="/#contact" className="button button-primary">Start a project <ArrowUpRight size={18} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
