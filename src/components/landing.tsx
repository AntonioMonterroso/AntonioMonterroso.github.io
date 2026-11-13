import { PrefsProvider } from "@/components/prefs";
import { SiteHeader } from "@/components/site-header";
import type { ReactNode } from "react";
import { Services } from "@/components/services";
import { PaletteDemo } from "@/components/palette-demo";
import { Process } from "@/components/process";
import { PricingSection } from "@/components/pricing-section";
import { Work } from "@/components/work";
import { Values } from "@/components/values";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { RevealObserver } from "@/components/reveal-observer";
import { Spotlight } from "@/components/spotlight";
import { Marquee } from "@/components/marquee";

/** La página completa; la portada (hero) se puede cambiar para comparar diseños. */
export function Landing({ hero, dark = false }: { hero: ReactNode; dark?: boolean }) {
  return (
    <PrefsProvider>
      {dark ? <div data-hero-dark hidden /> : null}
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-[var(--snow)] px-4 py-2 text-[var(--ink)] focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main">
        {hero}
        <Services />
        <Marquee />
        <PaletteDemo />
        <Process />
        <PricingSection />
        <Work />
        <Marquee reverse />
        <Values />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <RevealObserver />
      <Spotlight />
    </PrefsProvider>
  );
}
