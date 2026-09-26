"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { projectTypes, site, whatsappLink } from "@/lib/site";
import { usePrefs, useT } from "@/components/prefs";

type Status = { kind: "error"; text: string } | { kind: "sent"; text: string } | null;

// TODO: cambiar a Formspree o Supabase (tabla contact_leads) cuando quieras guardar los mensajes.
// Por ahora el formulario arma el mensaje y lo abre en el correo o en WhatsApp del visitante.
export function ContactForm() {
  const { projectType, setProjectType, quoteSignal } = usePrefs();
  const t = useT();
  const [status, setStatus] = useState<Status>(null);
  const [invalid, setInvalid] = useState<{ name?: boolean; message?: boolean }>({});
  const ringRef = useRef<HTMLSpanElement>(null);

  // Al llegar desde un botón "Cotizar", el campo de tipo de proyecto se ilumina un momento:
  // así se nota que ya viene elegido.
  useEffect(() => {
    if (!quoteSignal || !ringRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ringRef.current.animate([{ opacity: 1 }, { opacity: 1, offset: 0.35 }, { opacity: 0 }], {
      duration: reduce ? 900 : 1600,
      delay: reduce ? 0 : 450, // espera a que termine el desplazamiento
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    });
  }, [quoteSignal]);

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const type = projectTypes.find((p) => p.id === projectType);
    const missing = { name: !name, message: !message };
    if (missing.name || missing.message) {
      setInvalid(missing);
      setStatus({
        kind: "error",
        text: missing.name && missing.message
          ? t("Escribe tu nombre y cuéntanos un poco del proyecto.", "Add your name and a few words about the project.")
          : missing.name
            ? t("Falta tu nombre.", "Your name is missing.")
            : t("Cuéntanos un poco del proyecto.", "Tell us a bit about the project."),
      });
      form.querySelector<HTMLElement>(missing.name ? "#name" : "#message")?.focus();
      return null;
    }
    setInvalid({});
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
    setStatus({
      kind: "sent",
      text: t(
        `Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a ${site.email}.`,
        `We opened your email app with the message ready. If it didn't open, write to ${site.email}.`,
      ),
    });
  }

  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;
    const msg = compose(form);
    if (!msg) return;
    window.open(whatsappLink(msg.body), "_blank", "noopener");
    setStatus({
      kind: "sent",
      text: t("Abrimos WhatsApp en otra pestaña con tu mensaje listo.", "We opened WhatsApp in a new tab with your message ready."),
    });
  }

  const clear = (field: "name" | "message") => () => {
    if (invalid[field]) setInvalid((v) => ({ ...v, [field]: false }));
    if (status?.kind === "error") setStatus(null);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="name">{t("Nombre", "Name")}</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="field-input"
          aria-invalid={invalid.name || undefined}
          aria-describedby={invalid.name ? "form-status" : undefined}
          onChange={clear("name")}
        />
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
        <div className="relative">
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
          <span ref={ringRef} aria-hidden="true" className="field-ring" />
        </div>
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="message">{t("Cuéntanos del proyecto", "Tell us about the project")}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field-input resize-y"
          aria-invalid={invalid.message || undefined}
          aria-describedby={invalid.message ? "form-status" : undefined}
          placeholder={t(
            "Tengo una tienda y llevo el inventario en Excel. Quiero…",
            "I run a shop and track inventory in Excel. I'd like…",
          )}
          onChange={clear("message")}
        />
      </div>
      <div id="form-status" role={status?.kind === "error" ? "alert" : "status"} className="sm:col-span-2 empty:-mt-5">
        {status && (
          <p key={status.text} className={`form-msg ${status.kind === "sent" ? "form-msg-sent" : ""}`}>
            {status.kind === "sent" && <Check className="size-4 shrink-0" aria-hidden="true" />}
            {status.text}
          </p>
        )}
      </div>
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
