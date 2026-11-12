import { ArrowRight, ArrowUpRight, Briefcase, Home, LayoutDashboard, Mail, MonitorSmartphone, Tag, Workflow } from "lucide-react";
import { T } from "@/components/t";
import { CodeWindow } from "@/components/code-window";
import { ProjectPicker } from "@/components/project-picker";
import { PricingLink } from "@/components/pricing-link";
import { volcanAgua } from "@/lib/images";

const rail = [
  { href: "#inicio", icon: Home, es: "Inicio", en: "Home" },
  { href: "#servicios", icon: LayoutDashboard, es: "Servicios", en: "Services" },
  { href: "#trabajos", icon: Briefcase, es: "Trabajos", en: "Work" },
  { href: "#precios", icon: Tag, es: "Precios", en: "Pricing" },
  { href: "#contacto", icon: Mail, es: "Contacto", en: "Contact" },
];

/** Portada «cálida»: foto del Volcán de Agua, letra fina y tarjetas claras abajo. */
export function HeroCalido() {
  return (
    <section id="inicio" className="hero hc" aria-labelledby="hero-title">
      <div className="hc-frame">
        <picture>
          <source media="(max-width: 767px)" srcSet={volcanAgua.mobile} />
          <img src={volcanAgua.src} width={volcanAgua.width} height={volcanAgua.height} alt="" fetchPriority="high" className="hc-photo" />
        </picture>
        <div aria-hidden="true" className="hc-veil" />

        {/* Barra lateral de accesos (solo en pantallas grandes) */}
        <nav className="hc-rail hero-fade" aria-label="Accesos" style={{ ["--d" as string]: "500ms" }}>
          {rail.map(({ href, icon: Icon, es, en }) => (
            <a key={href} href={href} className="hc-rail-btn">
              <Icon className="size-[1.05rem]" aria-hidden="true" />
              <span className="sr-only"><T es={es} en={en} /></span>
            </a>
          ))}
        </nav>

        <ul className="hc-tags hero-fade" aria-label="Así trabajamos / How we work" style={{ ["--d" as string]: "420ms" }}>
          <li><T es="Con tu marca" en="Your brand" /></li>
          <li><T es="Rápida" en="Fast" /></li>
          <li><T es="En el celular" en="Mobile-first" /></li>
          <li><T es="A tu medida" en="Made to fit" /></li>
        </ul>

        <div className="hc-copy">
          <p className="hc-kicker hero-fade" style={{ ["--d" as string]: "0ms" }}>
            <T es={<>Páginas web <i /> Paneles <i /> ERP</>} en={<>Websites <i /> Panels <i /> ERP</>} />
          </p>
          <h1 id="hero-title" className="hc-title">
            <span className="hero-line"><span><T es="Tu negocio" en="Your business" /></span></span>
            <span className="hero-line"><span><T es="no cabe en una" en="won't fit in a" /></span></span>
            <span className="hero-line"><span className="hc-accent"><T es="plantilla." en="template." /></span></span>
          </h1>
          <p className="hc-lead hero-fade" style={{ ["--d" as string]: "280ms" }}>
            <T
              es="Diseñamos y programamos páginas web, paneles, Excel automatizado y ERP con tu color, tu logo y tu forma de trabajar. Que se vean bien y que trabajen."
              en="We design and build websites, panels, automated Excel and ERP in your colors, with your logo, around the way you work. Good-looking, and working."
            />
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ["--d" as string]: "360ms" }}>
            <PricingLink tab="propuesta" className="hc-cta">
              <T es="Cotizar mi proyecto" en="Quote my project" />
              <span className="hc-cta-dot"><ArrowRight className="size-4" aria-hidden="true" /></span>
            </PricingLink>
            <a href="#trabajos" className="hc-play">
              <span className="hc-play-dot"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
              <T es="Ver trabajos" en="See our work" />
            </a>
          </div>
        </div>

        {/* Tarjetas de abajo */}
        <div className="hc-cards">
          <div className="hc-card hc-card-code code-enter" style={{ ["--d" as string]: "420ms" }}>
            <CodeWindow />
          </div>
          <ul className="hc-card hc-card-what hero-fade" aria-label="Lo que hacemos / What we do" style={{ ["--d" as string]: "520ms" }}>
            <li><MonitorSmartphone className="size-5" aria-hidden="true" /><b><T es="Páginas web" en="Websites" /></b><span><T es="Que venden" en="That sell" /></span></li>
            <li><LayoutDashboard className="size-5" aria-hidden="true" /><b><T es="Paneles" en="Panels" /></b><span><T es="Todo en un lugar" en="All in one place" /></span></li>
            <li><Workflow className="size-5" aria-hidden="true" /><b>ERP</b><span><T es="Tu empresa conectada" en="Your company, connected" /></span></li>
          </ul>
          <PricingLink tab="propuesta" className="hc-card hc-card-dark hero-fade" style={{ ["--d" as string]: "600ms" }}>
            <span className="hc-card-arrow"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
            <b><T es="Tu sistema, a tu medida" en="Your system, made to fit" /></b>
            <span><T es="Cuéntanos tu idea y te preparamos una propuesta." en="Tell us your idea and we'll prepare a proposal." /></span>
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
