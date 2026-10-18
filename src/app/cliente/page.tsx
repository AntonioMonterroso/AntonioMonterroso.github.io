import type { Metadata } from "next";
import { PrefsProvider } from "@/components/prefs";
import { ClientPortal } from "@/components/client-portal";
import { RevealObserver } from "@/components/reveal-observer";
import { Spotlight } from "@/components/spotlight";

// Es una página privada de cada cliente: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Tu proyecto · Monterroso Dev Studio",
  robots: { index: false, follow: false },
};

export default function ClientePage() {
  return (
    <PrefsProvider>
      <ClientPortal />
      <RevealObserver />
      <Spotlight />
    </PrefsProvider>
  );
}
