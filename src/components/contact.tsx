import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { T } from "@/components/t";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappLink } from "@/lib/site";

export function Contact() {
  return (
    <section id="contacto" className="section" aria-labelledby="contacto-title">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div data-reveal>
          <p className="kicker"><T es="Contacto" en="Contact" /></p>
          <h2 id="contacto-title" className="display mt-5 text-[length:var(--step-4)]">
            <T es="Cuéntanos qué necesitas." en="Tell us what you need." />
          </h2>
          <p className="lead mt-6">
            <T
              es="Te respondemos con preguntas concretas y, cuando toca, con una cotización por escrito."
              en="We'll reply with specific questions and, when it's time, a written quote."
            />
          </p>
          <ul className="mt-10 grid gap-5">
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-[var(--brass)]" aria-hidden="true" />
              <div>
                <p className="text-[length:var(--step--1)] text-[var(--mist)]"><T es="Correo" en="Email" /></p>
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">{site.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-[var(--brass)]" aria-hidden="true" />
              <div>
                <p className="text-[length:var(--step--1)] text-[var(--mist)]"><T es="Teléfono y WhatsApp" en="Phone and WhatsApp" /></p>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {site.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-[var(--brass)]" aria-hidden="true" />
              <div>
                <p className="text-[length:var(--step--1)] text-[var(--mist)]"><T es="Dónde" en="Where" /></p>
                <p><T es={site.location.es} en={site.location.en} /></p>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-[var(--brass)]" aria-hidden="true" />
              <div>
                <p className="text-[length:var(--step--1)] text-[var(--mist)]"><T es="Horario" en="Hours" /></p>
                {site.hours ? (
                  <p><T es={site.hours.es} en={site.hours.en} /></p>
                ) : (
                  <p className="paren"><T es="(pendiente)" en="(to be announced)" /></p>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--deep)] p-[clamp(1.25rem,0.8rem+2vw,2.5rem)]" data-reveal style={{ ["--d" as string]: "80ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
