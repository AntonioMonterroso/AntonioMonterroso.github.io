import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { HeroCalido } from "@/components/hero-calido";

// Vista para comparar la portada cálida antes de elegir. No aparece en Google.
export const metadata: Metadata = { title: "Portada cálida — Monterroso Dev Studio", robots: { index: false, follow: false } };

export default function Page() {
  return <Landing hero={<HeroCalido />} />;
}
