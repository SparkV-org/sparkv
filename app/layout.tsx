import type { Metadata, Viewport } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparkv.vercel.app";
const DESCRIPTION = "SparkV designs and builds production-ready software, AI agents, voice systems, and intelligent automation for modern businesses.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#08080a" }, { media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "SparkV", url: SITE_URL, logo: `${SITE_URL}/sparkv-logo.png`, description: DESCRIPTION },
    { "@type": "WebSite", name: "SparkV", url: SITE_URL },
  ],
};
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  title: "SparkV — Software, AI & Automation",
  description: "SparkV designs and builds production-ready software, AI agents, voice systems, and intelligent automation for modern businesses.",
  keywords: ["software development", "AI agents", "business automation", "voice AI", "web application development"],
  openGraph: {
    title: "SparkV — Software, AI & Automation",
    description: "Production-ready software, AI agents, voice systems, and intelligent automation.",
    type: "website",
    url: SITE_URL,
    siteName: "SparkV",
    images: [{ url: "/sparkv-logo.png", alt: "SparkV" }],
  },
  twitter: {
    card: "summary",
    title: "SparkV — Software, AI & Automation",
    description: "Production-ready software, AI agents, voice systems, and intelligent automation.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("sparkv-theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light";document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#top" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
