"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useT } from "@/components/prefs";

/**
 * Botón flotante de WhatsApp. Aparece al dejar atrás el hero (ahí ya hay botones de contacto)
 * y se retira en la sección de contacto, donde WhatsApp ya está a la vista.
 */
export function WhatsAppFab() {
  const t = useT();
  const [inHero, setInHero] = useState(true);
  const [inContact, setInContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setInHero(e.isIntersecting);
        if (e.target === contact) setInContact(e.isIntersecting);
      }
    }, { threshold: 0.15 });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  if (!site.whatsapp) return null;
  const hidden = inHero || inContact;
  return (
    <a
      href={whatsappLink(t("Hola, me interesa cotizar un proyecto.", "Hi, I'd like a quote for a project."))}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      data-hidden={hidden}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      aria-label={t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
