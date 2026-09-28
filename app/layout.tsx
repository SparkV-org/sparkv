import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkV — Software, AI & Automation",
  description: "SparkV designs and builds production-ready software, AI agents, voice systems, and intelligent automation for modern businesses.",
  keywords: ["software development", "AI agents", "business automation", "voice AI", "web application development"],
  openGraph: {
    title: "SparkV — Software, AI & Automation",
    description: "Production-ready software, AI agents, voice systems, and intelligent automation.",
    type: "website",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
