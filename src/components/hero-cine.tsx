import { ArrowRight, Play } from "lucide-react";
import { T } from "@/components/t";
import { CodeWindow } from "@/components/code-window";
import { ProjectPicker } from "@/components/project-picker";
import { PricingLink } from "@/components/pricing-link";
import { volcanFuego } from "@/lib/images";

const fronts = [
  { n: "01", es: "Páginas web", en: "Websites" },
  { n: "02", es: "Paneles", en: "Panels" },
  { n: "03", es: "Excel y VBA", en: "Excel & VBA" },
  { n: "04", es: "ERP", en: "ERP" },
];

/** Portada «de cine»: Volcán de Fuego de noche, titular en mayúsculas y datos abajo. */
export function HeroCine() {
  return (
    <section id="inicio" className="hero hk" aria-labelledby="hero-title">
      <div className="hk-frame">
        <picture>
          <source media="(max-width: 767px)" srcSet={volcanFuego.mobile} />
          <img src={volcanFuego.src} width={volcanFuego.width} height={volcanFuego.height} alt="" fetchPriority="high" className="hk-photo" />
        </picture>
        <div aria-hidden="true" className="hk-veil" />

        <div className="hk-copy">
          <p className="hk-kicker hero-fade" style={{ ["--d" as string]: "0ms" }}>
            <T es="Estudio de desarrollo · Guatemala" en="Development studio · Guatemala" />
          </p>
          <h1 id="hero-title" className="hk-title">
            <span className="hero-line"><span><T es="Tu negocio" en="Your business" /></span></span>
            <span className="hero-line"><span><T es="no cabe en una" en="won&apos;t fit in a" /></span></span>
            <span className="hero-line"><span className="hk-accent"><T es="plantilla." en="template." /></span></span>
          </h1>
          <p className="hk-lead hero-fade" style={{ ["--d" as string]: "280ms" }}>
            <T
              es="Páginas web, paneles, Excel automatizado y ERP con tu color, tu logo y tu forma de trabajar. Que se vean bien y que trabajen."
              en="Websites, panels, automated Excel and ERP in your colors, with your logo, around the way you work. Good-looking, and working."
            />
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ ["--d" as string]: "360ms" }}>
            <a href="#trabajos" className="hk-play">
              <span className="hk-play-dot"><Play className="size-4 translate-x-[1px]" aria-hidden="true" /></span>
              <T es="Ver trabajos" en="See our work" />
            </a>
            <PricingLink tab="propuesta" className="hk-cta">
              <T es="Cotizar mi proyecto" en="Quote my project" />
              <ArrowRight className="size-4" aria-hidden="true" />
            </PricingLink>
          </div>
        </div>

        {/* Contador lateral: los cuatro frentes */}
        <nav className="hk-count hero-fade" aria-label="Lo que hacemos / What we do" style={{ ["--d" as string]: "520ms" }}>
          <span>01</span>
          <i aria-hidden="true" />
          <span>04</span>
        </nav>

        <div className="hk-code code-enter" style={{ ["--d" as string]: "420ms" }}>
          <CodeWindow />
        </div>

        <ul className="hk-stats hero-fade" style={{ ["--d" as string]: "600ms" }}>
          {fronts.map((f) => (
            <li key={f.n}>
              <b>{f.n}</b>
              <span><T es={f.es} en={f.en} /></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="shell relative z-10 mt-6 flex justify-center">
        <div className="hero-fade w-full max-w-[56rem]" style={{ ["--d" as string]: "380ms" }}>
          <ProjectPicker />
        </div>
      </div>
    </section>
  );
}
