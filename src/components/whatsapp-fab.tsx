"use client";

import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useT } from "@/components/prefs";

export function WhatsAppFab() {
  const t = useT();
  if (!site.whatsapp) return null;
  return (
    <a
      href={whatsappLink(t("Hola, me interesa cotizar un proyecto.", "Hi, I'd like a quote for a project."))}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      aria-label={t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
