import { ArrowRight } from "lucide-react";
import { T } from "@/components/t";
import { Volcanoes } from "@/components/volcanoes";
import { CodeWindow } from "@/components/code-window";
import { ProjectPicker } from "@/components/project-picker";
import { QuoteLink } from "@/components/quote-link";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-frame">
        <Volcanoes />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-[1] bg-[linear-gradient(100deg,color-mix(in_oklab,var(--ink)_62%,transparent)_0%,transparent_62%)]"
        />
        <div className="shell grid min-h-[inherit] items-center gap-12 pt-32 pb-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-36">
          <div>
            <p className="kicker hero-fade" style={{ ["--d" as string]: "0ms" }}>
              <T es="Estudio de desarrollo web · Guatemala" en="Web development studio · Guatemala" />
            </p>
            <h1 id="hero-title" className="display mt-6 text-[length:var(--step-5)]">
              <span className="hero-line">
                <span>
                  <T es="Tu negocio" en="Your business" />
                </span>
              </span>
              <span className="hero-line">
                <span className="text-[color-mix(in_oklab,var(--mist)_80%,var(--navy-2))]">
                  <T es="no cabe en" en="won't fit in" />
                </span>
              </span>
              <span className="hero-line">
                <span>
                  <T
                    es={<>una <span className="text-[var(--brass)]">plantilla.</span></>}
                    en={<>a <span className="text-[var(--brass)]">template.</span></>}
                  />
                </span>
              </span>
            </h1>
            <p className="lead hero-fade mt-7 max-w-[34rem] !text-[color-mix(in_oklab,var(--snow)_78%,var(--mist))]" style={{ ["--d" as string]: "280ms" }}>
              <T
                es="Diseñamos y programamos páginas web, paneles administrativos, Excel automatizado y ERP completos. Con tu color, tu logo y tu forma de trabajar. Nada sale de un molde."
                en="We design and build websites, admin panels, automated Excel and full ERP systems. In your colors, with your logo, around the way you already work. Nothing comes out of a mold."
              />
            </p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "360ms" }}>
              <QuoteLink className="btn btn-solid">
                <T es="Cotizar mi proyecto" en="Quote my project" />
                <ArrowRight className="nudge size-4" aria-hidden="true" />
              </QuoteLink>
              <a href="#servicios" className="btn btn-ghost">
                <T es="Ver lo que hacemos" en="See what we do" />
              </a>
            </div>
          </div>

          <div className="hero-fade flex flex-col gap-5 lg:items-end lg:self-end" style={{ ["--d" as string]: "480ms" }}>
            <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Incluye / Includes">
              <li className="chip"><T es="Tu color" en="Your colors" /></li>
              <li className="chip"><T es="Tu logo" en="Your logo" /></li>
              <li className="chip"><T es="Tu forma de trabajar" en="Your workflow" /></li>
            </ul>
            <div className="w-full max-w-[29rem]">
              <CodeWindow />
            </div>
          </div>
        </div>
      </div>
      <div className="shell relative z-10 -mt-9 flex justify-center">
        <div className="hero-fade w-full max-w-[56rem]" style={{ ["--d" as string]: "600ms" }}>
          <ProjectPicker />
        </div>
      </div>
    </section>
  );
}
