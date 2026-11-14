import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { T } from "@/components/t";
import { Split } from "@/components/split";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappLink } from "@/lib/site";

export function Contact() {
  return (
    <section id="contacto" className="section" aria-labelledby="contacto-title">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <p className="kicker" data-reveal><T es="Contacto" en="Contact" /></p>
          <h2 id="contacto-title" className="display mt-5 text-[length:var(--step-4)]" data-reveal="lines">
            <T es={<Split text="Cuéntanos qué necesitas." mark="necesitas" />} en={<Split text="Tell us what you need." mark="need" />} />
          </h2>
          <p className="lead mt-6" data-reveal style={{ ["--d" as string]: "150ms" }}>
            <T
              es="Te respondemos con preguntas concretas y, cuando toca, con una cotización por escrito."
              en="We'll reply with specific questions and, when it's time, a written quote."
            />
          </p>
          <ul className="ct-list mt-10">
            <li>
              <a className="ct-row" href={`mailto:${site.email}`}>
                <span className="ct-ico"><Mail className="size-5" aria-hidden="true" /></span>
                <span className="ct-txt">
                  <small><T es="Correo" en="Email" /></small>
                  <b className="break-all">{site.email}</b>
                </span>
                <ArrowUpRight className="ct-arrow size-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="ct-row" href={whatsappLink()} target="_blank" rel="noreferrer">
                <span className="ct-ico"><MessageCircle className="size-5" aria-hidden="true" /></span>
                <span className="ct-txt">
                  <small>WhatsApp</small>
                  <b><T es="Escríbenos por WhatsApp" en="Message us on WhatsApp" /></b>
                </span>
                <ArrowUpRight className="ct-arrow size-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <div className="ct-row">
                <span className="ct-ico"><MapPin className="size-5" aria-hidden="true" /></span>
                <span className="ct-txt">
                  <small><T es="Dónde" en="Where" /></small>
                  <b><T es={site.location.es} en={site.location.en} /></b>
                </span>
              </div>
            </li>
            {/* El horario solo se muestra cuando está definido en site.ts */}
            {site.hours ? (
              <li>
                <div className="ct-row">
                  <span className="ct-ico"><Clock className="size-5" aria-hidden="true" /></span>
                  <span className="ct-txt">
                    <small><T es="Horario" en="Hours" /></small>
                    <b><T es={site.hours.es} en={site.hours.en} /></b>
                  </span>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="ct-card glass-card rounded-[1.75rem] border border-[var(--line)] bg-[var(--deep)] p-[clamp(1.25rem,0.8rem+2vw,2.5rem)]" data-reveal style={{ ["--d" as string]: "80ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
