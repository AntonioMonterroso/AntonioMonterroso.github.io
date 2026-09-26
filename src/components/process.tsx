import Image from "next/image";
import { T } from "@/components/t";
import { Split } from "@/components/split";
import { bocetoAcuarela } from "@/lib/images";

const steps = [
  {
    title: { es: "Escuchamos", en: "We listen" },
    body: {
      es: "Una llamada o una reunión para entender tu negocio: qué haces hoy, qué te quita tiempo y adónde quieres llegar.",
      en: "A call or a meeting to understand your business: what you do today, what eats your time and where you want to go.",
    },
  },
  {
    title: { es: "Diseñamos", en: "We design" },
    body: {
      es: "Bocetos, colores, tipografía y el recorrido de cada pantalla. Tú lo apruebas antes de que escribamos una línea de código.",
      en: "Sketches, colors, type and the flow of every screen. You sign off before we write a single line of code.",
    },
  },
  {
    title: { es: "Cotizamos y elegimos tu plan", en: "We quote and pick your plan" },
    body: {
      es: "Precio claro y por escrito: qué incluye, qué no y cuánto tarda. Te recomendamos el plan que resuelve tu problema, no el más caro.",
      en: "A clear price, in writing: what's included, what isn't and how long it takes. We recommend the plan that solves your problem, not the priciest one.",
    },
    highlight: true,
  },
  {
    title: { es: "Construimos", en: "We build" },
    body: {
      es: "Programamos por etapas y te enseñamos avances. Lo pruebas en tu celular, tu tablet y tu computadora.",
      en: "We build in stages and show you progress. You try it on your phone, your tablet and your computer.",
    },
  },
  {
    title: { es: "Entregamos y seguimos", en: "We launch and stick around" },
    body: {
      es: "Publicamos, te enseñamos a usarlo y seguimos a la mano para ajustes y mejoras. El sistema crece con tu negocio.",
      en: "We launch, show you how to use it and stay close for tweaks and improvements. The system grows with your business.",
    },
  },
];

export function Process() {
  return (
    <section id="proceso" className="section on-paper" aria-labelledby="proceso-title">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="kicker" data-reveal><T es="Cómo trabajamos" en="How we work" /></p>
            <h2 id="proceso-title" className="display mt-5 text-[length:var(--step-4)]" data-reveal="lines">
              <T es={<Split text="Todo empieza con un boceto a mano." />} en={<Split text="Everything starts with a hand sketch." />} />
            </h2>
            <p className="lead mt-6 max-w-[34rem]" data-reveal style={{ ["--d" as string]: "150ms" }}>
              <T
                es="Antes de programar, dibujamos. Corregir un papel sale mucho más barato que corregir un sistema, y así ves tu proyecto desde el primer día."
                en="Before we code, we draw. Fixing paper is far cheaper than fixing software, and you get to see your project from day one."
              />
            </p>
          </div>
          <figure className="mt-10">
            <div className="photo aspect-[3/2] shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--paper-ink)_45%,transparent)]">
              <Image
                src={bocetoAcuarela.src}
                width={bocetoAcuarela.width}
                height={bocetoAcuarela.height}
                alt="Bocetos a mano de tres pantallas de una página web, pintados con acuarela azul, morada y verde"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-[length:var(--step--1)] text-[var(--paper-muted)]">
              <T es="Así se ve un proyecto el primer día." en="This is what a project looks like on day one." />
            </figcaption>
          </figure>
        </div>

        <ol className="lg:pt-4">
          {steps.map((s, i) => (
            <li key={s.title.es} className={`step ${s.highlight ? "step-highlight" : ""}`} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
              <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="pt-2.5">
                <h3 className="display text-[length:var(--step-2)] !leading-tight">
                  <T es={s.title.es} en={s.title.en} />
                </h3>
                <p className="mt-2 text-[var(--paper-muted)]">
                  <T es={s.body.es} en={s.body.en} />
                </p>
              </div>
            </li>
          ))}
          <li className="mt-4 list-none" data-reveal>
            <a href="#planes" className="btn btn-solid">
              <T es="Ver los planes" en="See the plans" />
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
