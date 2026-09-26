import Image from "next/image";
import { Check } from "lucide-react";
import { T } from "@/components/t";
import { escritorioResponsive } from "@/lib/images";
import { planPrices, type ProjectType } from "@/lib/site";
import { QuoteLink } from "@/components/quote-link";

// Los precios se editan en src/lib/site.ts (planPrices).
const plans = [
  {
    id: "presencia" as const,
    quote: "web" as ProjectType,
    name: { es: "Presencia", en: "Presence" },
    goal: { es: "Para que te encuentren y te escriban.", en: "So people find you and get in touch." },
    items: [
      { es: "Página web o landing con tu marca", en: "Website or landing page in your brand" },
      { es: "Formulario, WhatsApp y mapa", en: "Contact form, WhatsApp and map" },
      { es: "Lista para celular", en: "Ready for mobile" },
      { es: "Publicación y dominio", en: "Launch and domain setup" },
    ],
  },
  {
    id: "operacion" as const,
    quote: "panel" as ProjectType,
    name: { es: "Operación", en: "Operations" },
    goal: { es: "Para ordenar el día a día.", en: "To get the day-to-day in order." },
    items: [
      { es: "Panel con usuarios y roles", en: "Panel with users and roles" },
      { es: "Inventario, clientes, ventas o citas", en: "Inventory, clients, sales or bookings" },
      { es: "Reportes que se descargan", en: "Downloadable reports" },
      { es: "Excel automatizado si lo necesitas", en: "Automated Excel if you need it" },
    ],
    featured: true,
  },
  {
    id: "empresa" as const,
    quote: "erp" as ProjectType,
    name: { es: "Empresa", en: "Company" },
    goal: { es: "Para tener todo conectado.", en: "To have everything connected." },
    items: [
      { es: "ERP por módulos", en: "Modular ERP" },
      { es: "Tu propia base de datos", en: "Your own database" },
      { es: "Funciones hechas a tu medida", en: "Features built for you" },
      { es: "Capacitación para tu equipo", en: "Training for your team" },
    ],
  },
];

export function Plans() {
  return (
    <section id="planes" className="section" aria-labelledby="planes-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div data-reveal>
            <p className="kicker"><T es="Planes" en="Plans" /></p>
            <h2 id="planes-title" className="display mt-5 text-[length:var(--step-4)]">
              <T es="Tres puntos de partida. Ninguno cerrado." en="Three starting points. None of them fixed." />
            </h2>
            <p className="lead mt-6 max-w-[36rem]">
              <T
                es="Casi todo lo que hoy resuelves con papeles, llamadas y hojas sueltas ya se puede hacer desde el navegador. Elige por dónde empezar y lo ajustamos a tu caso para que te ahorre tiempo de verdad."
                en="Almost everything you handle today with paper, calls and loose spreadsheets can now live in the browser. Pick where to start and we'll shape it to your case so it actually saves you time."
              />
            </p>
          </div>
          <div className="photo photo-tint aspect-[4/3]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <Image
              src={escritorioResponsive.src}
              width={escritorioResponsive.width}
              height={escritorioResponsive.height}
              alt="Escritorio con un monitor que muestra código y una página web, junto a una tablet y un celular con la misma página"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <article
              key={p.name.es}
              className={`plan ${p.featured ? "plan-featured" : ""}`}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
            >
              <div>
                <h3 className="display text-[length:var(--step-3)]">
                  <T es={p.name.es} en={p.name.en} />
                </h3>
                <p className="mt-2 text-[var(--mist)]"><T es={p.goal.es} en={p.goal.en} /></p>
              </div>
              <ul className="check-list">
                {p.items.map((it) => (
                  <li key={it.es}>
                    <Check className="mt-1 size-4 text-[var(--brass)]" aria-hidden="true" />
                    <span><T es={it.es} en={it.en} /></span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                <p className="text-[length:var(--step--1)] text-[var(--mist)]">
                  {planPrices[p.id] ? (
                    <span className="text-[var(--snow)]"><T es={planPrices[p.id]!.es} en={planPrices[p.id]!.en} /></span>
                  ) : (
                    <>
                      <T es="Precio" en="Price" />{" "}
                      <span className="paren"><T es="(por cotizar)" en="(quoted per project)" /></span>
                    </>
                  )}
                </p>
                <QuoteLink type={p.quote} className={`btn ${p.featured ? "btn-brass" : "btn-ghost"} !min-h-11 !px-4 text-[length:var(--step--1)]`}>
                  <T es="Cotizar" en="Get a quote" />
                </QuoteLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
