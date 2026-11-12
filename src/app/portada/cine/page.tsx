import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { HeroCine } from "@/components/hero-cine";

// Vista para comparar la portada de cine antes de elegir. No aparece en Google.
export const metadata: Metadata = { title: "Portada de cine — Monterroso Dev Studio", robots: { index: false, follow: false } };

export default function Page() {
  return <Landing hero={<HeroCine />} dark />;
}
