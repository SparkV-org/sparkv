import { SparkVAgent } from "@/components/sparkv-agent";
import { MotionEnhancements } from "@/components/motion-enhancements";
import { IntroSplash } from "@/components/intro-splash";
import { FxLayer } from "@/components/fx-layer";
import { SiteHeader } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Sections, Footer } from "@/components/home/sections";
import { RevealObserver, HeroObserver } from "@/components/home/effects";

export default function Home() {
  return (
    <div>
      <IntroSplash />
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Sections />
      </main>
      <MotionEnhancements />
      <FxLayer />
      <SparkVAgent />
      <Footer />
      <HeroObserver />
      <RevealObserver />
    </div>
  );
}
