import Image from "next/image";
import { ArrowRight, ArrowUpRight, Briefcase, Home, LayoutDashboard, Mail, MonitorSmartphone, Play, Tag, Workflow } from "lucide-react";
import { T } from "@/components/t";
import { CodeWindow } from "@/components/code-window";
import { ProjectPicker } from "@/components/project-picker";
import { PricingLink } from "@/components/pricing-link";
import { FeaturedProject } from "@/components/featured-project";
import { atitlanMuelle } from "@/lib/images";

const rail = [
  { href: "#inicio", icon: Home, es: "Inicio", en: "Home" },
  { href: "#servicios", icon: LayoutDashboard, es: "Servicios", en: "Services" },
  { href: "#trabajos", icon: Briefcase, es: "Trabajos", en: "Work" },
  { href: "#precios", icon: Tag, es: "Precios", en: "Pricing" },
  { href: "#contacto", icon: Mail, es: "Contacto", en: "Contact" },
];

/** Portada como la referencia: foto del Lago de Atitlán, barra lateral, titular fino y tres tarjetas abajo. */
export function HeroCalido() {
  return (
    <section id="inicio" className="hero hr" aria-labelledby="hero-title">
      <div className="hr-frame">
        <picture>
          <source media="(max-width: 767px)" srcSet={atitlanMuelle.mobile} />
          <img src={atitlanMuelle.src} width={atitlanMuelle.width} height={atitlanMuelle.height} alt="" fetchPriority="high" className="hr-photo" />
        </picture>
        <div aria-hidden="true" className="hr-veil" />

        {/* Barra lateral: accesos, foto redonda y «ver trabajos» */}
        <nav className="hr-rail hero-fade" aria-label="Accesos" style={{ ["--d" as string]: "500ms" }}>
          <div className="hr-rail-icons">
            {rail.map(({ href, icon: Icon, es, en }) => (
              <a key={href} href={href} className="hr-rail-btn">
                <Icon className="size-[1.05rem]" aria-hidden="true" />
                <span className="sr-only"><T es={es} en={en} /></span>
              </a>
            ))}
          </div>
          <span className="hr-rail-thumb" aria-hidden="true">
            <Image src={atitlanMuelle.thumb} width={160} height={160} alt="" sizes="3.25rem" />
          </span>
          <a href="#trabajos" className="hr-rail-reel">
            <span className="hr-round hr-round-ghost"><Play className="size-3.5 translate-x-[1px]" aria-hidden="true" /></span>
            <span><T es="Ver trabajos" en="See work" /></span>
          </a>
        </nav>

        <ul className="hr-tags hero-fade" aria-label="Así trabajamos / How we work" style={{ ["--d" as string]: "420ms" }}>
          <li><T es="A tu medida" en="Made to fit" /></li>
          <li><T es="Con tu marca" en="Your brand" /></li>
          <li><T es="Rápida" en="Fast" /></li>
          <li><T es="En el celular" en="Mobile-first" /></li>
        </ul>

        <div className="hr-copy">
          <p className="hr-kicker hero-fade" style={{ ["--d" as string]: "0ms" }}>
            <T es={<>Páginas web <i /> Paneles <i /> ERP</>} en={<>Websites <i /> Panels <i /> ERP</>} />
          </p>
          <h1 id="hero-title" className="hr-title">
            <span className="hero-line"><span><T es="Tu negocio no" en="Your business" /></span></span>
            <span className="hero-line"><span><T es="cabe en una " en="won't fit in a " /><em className="hr-accent"><T es="plantilla" en="template" /></em></span></span>
          </h1>
          <p className="hr-lead hero-fade" style={{ ["--d" as string]: "280ms" }}>
            <T
              es="Diseñamos y programamos páginas web, paneles, Excel automatizado y ERP con tu color, tu logo y tu forma de trabajar."
              en="We design and build websites, panels, automated Excel and ERP in your colors, with your logo, around the way you work."
            />
          </p>
          <div className="hero-fade mt-7 flex flex-wrap items-center gap-x-5 gap-y-4" style={{ ["--d" as string]: "360ms" }}>
            <PricingLink tab="propuesta" className="hr-cta">
              <T es="Cotizar mi proyecto" en="Quote my project" />
              <ArrowRight className="size-4" aria-hidden="true" />
            </PricingLink>
            <a href="#servicios" className="hr-play">
              <span className="hr-round hr-round-ghost"><Play className="size-4 translate-x-[1px]" aria-hidden="true" /></span>
              <T es="Ver lo que hacemos" en="See what we do" />
            </a>
          </div>
        </div>

        <div className="hr-code code-enter" style={{ ["--d" as string]: "420ms" }}>
          <CodeWindow />
        </div>

        {/* Tarjetas de abajo, como la referencia */}
        <div className="hr-cards hero-fade" style={{ ["--d" as string]: "520ms" }}>
          <FeaturedProject />
          <ul className="hr-card hr-what" aria-label="Lo que hacemos / What we do">
            <li><MonitorSmartphone className="size-6" aria-hidden="true" /><b><T es="Páginas web" en="Websites" /></b><span><T es="Que venden" en="That sell" /></span></li>
            <li><LayoutDashboard className="size-6" aria-hidden="true" /><b><T es="Paneles" en="Panels" /></b><span><T es="Todo en un lugar" en="All in one place" /></span></li>
            <li><Workflow className="size-6" aria-hidden="true" /><b>ERP</b><span><T es="Tu empresa conectada" en="Your company, connected" /></span></li>
          </ul>
          <PricingLink tab="propuesta" className="hr-card hr-dark">
            <span className="hr-dark-top">
              <span className="hr-dark-thumb" aria-hidden="true">
                <Image src={atitlanMuelle.thumb} width={160} height={160} alt="" sizes="3rem" />
              </span>
              <span className="hr-round hr-round-light"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
            </span>
            <b><T es="Hagamos realidad tu idea" en="Let's bring your idea to life" /></b>
            <span className="hr-dark-text"><T es="Cuéntanos qué necesitas y te preparamos una propuesta." en="Tell us what you need and we'll prepare a proposal." /></span>
          </PricingLink>
        </div>
      </div>
      <div className="shell relative z-10 mt-6 flex justify-center">
        <div className="hero-fade w-full max-w-[56rem]" style={{ ["--d" as string]: "380ms" }}>
          <ProjectPicker />
        </div>
      </div>
    </section>
  );
}
