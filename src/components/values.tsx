import Image from "next/image";
import { T } from "@/components/t";
import { laptopEntrega } from "@/lib/images";

const values = [
  {
    title: { es: "Seguimos aprendiendo", en: "We keep learning" },
    body: {
      es: "La tecnología cambia cada mes. Estudiamos todo el tiempo para que tu sistema no nazca viejo.",
      en: "Technology changes every month. We study constantly so your system isn't outdated on day one.",
    },
  },
  {
    title: { es: "Transparencia", en: "Transparency" },
    body: {
      es: "Precios por escrito, avances a la vista y respuestas directas, aunque no sean las que esperabas.",
      en: "Prices in writing, progress you can see and straight answers, even when they're not the ones you hoped for.",
    },
  },
  {
    title: { es: "Adaptabilidad", en: "Adaptability" },
    body: {
      es: "Tu negocio cambia y el sistema cambia con él. Nada queda amarrado.",
      en: "Your business changes and the system changes with it. Nothing gets locked in.",
    },
  },
  {
    title: { es: "Autenticidad", en: "Authenticity" },
    body: {
      es: "Cero plantillas compradas. Cada proyecto se diseña desde tu marca.",
      en: "Zero bought templates. Every project is designed from your brand up.",
    },
  },
  {
    title: { es: "A tu medida", en: "Made to fit" },
    body: {
      es: "Empezamos por cómo trabajas tú, no por lo que el software ya trae.",
      en: "We start from how you work, not from what the software happens to include.",
    },
  },
];

export function Values() {
  return (
    <section id="estudio" className="section on-paper" aria-labelledby="estudio-title">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <div data-reveal>
            <p className="kicker"><T es="El estudio" en="The studio" /></p>
            <h2 id="estudio-title" className="display mt-5 text-[length:var(--step-4)]">
              <T es="Lo que no cambia de un proyecto a otro." en="What stays the same on every project." />
            </h2>
          </div>
          <div className="photo mt-10 aspect-[4/5] max-w-[26rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <Image
              src={laptopEntrega.src}
              width={laptopEntrega.width}
              height={laptopEntrega.height}
              alt="Laptop abierta sobre una mesa de madera mostrando una página web, junto a una planta"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
        <dl className="self-center">
          {values.map((v, i) => (
            <div
              key={v.title.es}
              className="grid gap-2 border-t border-[var(--paper-line)] py-7 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8"
              data-reveal
              style={{ ["--d" as string]: `${i * 50}ms` }}
            >
              <dt className="display text-[length:var(--step-2)] !leading-tight">
                <T es={v.title.es} en={v.title.en} />
              </dt>
              <dd className="text-[var(--paper-muted)]">
                <T es={v.body.es} en={v.body.en} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
