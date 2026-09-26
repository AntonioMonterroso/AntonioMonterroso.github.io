"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { projectTypes, site, whatsappLink } from "@/lib/site";
import { usePrefs, useT } from "@/components/prefs";

// TODO: cambiar a Formspree o Supabase (tabla contact_leads) cuando quieras guardar los mensajes.
// Por ahora el formulario arma el mensaje y lo abre en el correo o en WhatsApp del visitante.
export function ContactForm() {
  const { projectType, setProjectType } = usePrefs();
  const t = useT();
  const [error, setError] = useState<string | null>(null);

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const type = projectTypes.find((p) => p.id === projectType);
    if (!name || !message) {
      setError(t("Escribe tu nombre y cuéntanos un poco del proyecto.", "Add your name and a few words about the project."));
      return null;
    }
    setError(null);
    const lines = [
      `${t("Nombre", "Name")}: ${name}`,
      email && `${t("Correo", "Email")}: ${email}`,
      phone && `${t("Teléfono", "Phone")}: ${phone}`,
      `${t("Proyecto", "Project")}: ${type ? t(type.es, type.en) : ""}`,
      "",
      message,
    ].filter((l): l is string => typeof l === "string");
    return { name, body: lines.join("\n") };
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const msg = compose(e.currentTarget);
    if (!msg) return;
    const subject = t(`Cotización — ${msg.name}`, `Quote request — ${msg.name}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg.body)}`;
  }

  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;
    const msg = compose(form);
    if (!msg) return;
    window.open(whatsappLink(msg.body), "_blank", "noopener");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="name">{t("Nombre", "Name")}</label>
        <input id="name" name="name" autoComplete="name" required className="field-input" />
      </div>
      <div className="field">
        <label htmlFor="email">{t("Correo", "Email")}</label>
        <input id="email" name="email" type="email" autoComplete="email" className="field-input" placeholder="nombre@empresa.com" />
      </div>
      <div className="field">
        <label htmlFor="phone">
          {t("Teléfono", "Phone")} <span className="text-[var(--mist)]">{t("(opcional)", "(optional)")}</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className="field-input" />
      </div>
      <div className="field">
        <label htmlFor="type">{t("¿Qué necesitas?", "What do you need?")}</label>
        <select
          id="type"
          name="type"
          className="field-input"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as typeof projectType)}
        >
          {projectTypes.map((p) => (
            <option key={p.id} value={p.id}>
              {t(p.es, p.en)}
            </option>
          ))}
        </select>
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="message">{t("Cuéntanos del proyecto", "Tell us about the project")}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field-input resize-y"
          placeholder={t(
            "Tengo una tienda y llevo el inventario en Excel. Quiero…",
            "I run a shop and track inventory in Excel. I'd like…",
          )}
          onChange={() => error && setError(null)}
        />
      </div>
      {error && (
        <p role="alert" className="text-[length:var(--step--1)] text-[var(--brass)] sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" className="btn btn-solid">
          <Mail className="size-4" aria-hidden="true" />
          {t("Enviar por correo", "Send by email")}
        </button>
        <button type="button" onClick={onWhatsApp} className="btn btn-ghost">
          <MessageCircle className="size-4" aria-hidden="true" />
          {t("Enviar por WhatsApp", "Send via WhatsApp")}
        </button>
      </div>
    </form>
  );
}
