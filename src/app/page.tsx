import { PrefsProvider } from "@/components/prefs";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { PaletteDemo } from "@/components/palette-demo";
import { Process } from "@/components/process";
import { Plans } from "@/components/plans";
import { Work } from "@/components/work";
import { Values } from "@/components/values";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <PrefsProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-[var(--snow)] px-4 py-2 text-[var(--ink)] focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <PaletteDemo />
        <Process />
        <Plans />
        <Work />
        <Values />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <RevealObserver />
    </PrefsProvider>
  );
}
