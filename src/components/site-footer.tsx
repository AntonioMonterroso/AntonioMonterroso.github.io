import { T } from "@/components/t";
import { Logo } from "@/components/site-header";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)]">
      <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[length:var(--step--1)] text-[var(--mist)]">
            <T
              es="Páginas web y sistemas a la medida, hechos en Guatemala."
              en="Custom websites and systems, made in Guatemala."
            />
          </p>
        </div>
        <nav aria-label="Pie de página / Footer">
          <ul className="grid gap-2 text-[length:var(--step--1)]">
            {[
              ["#servicios", "Servicios", "Services"],
              ["#proceso", "Proceso", "Process"],
              ["#planes", "Planes", "Plans"],
              ["#trabajos", "Trabajos", "Work"],
              ["#contacto", "Contacto", "Contact"],
            ].map(([href, es, en]) => (
              <li key={href}>
                <a href={href} className="nav-link"><T es={es} en={en} /></a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid content-start gap-2 text-[length:var(--step--1)] text-[var(--mist)]">
          <p>
            <T es="Redes sociales" en="Social media" />{" "}
            {site.social.length ? null : <span className="paren"><T es="(pendiente)" en="(coming soon)" /></span>}
          </p>
          {site.social.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="nav-link">{s.label}</a>
          ))}
          <p>
            GitHub{" "}
            {site.github ? (
              <a href={site.github} target="_blank" rel="noreferrer" className="nav-link">↗</a>
            ) : (
              <span className="paren"><T es="(próximamente)" en="(coming soon)" /></span>
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="shell flex flex-col gap-3 py-6 text-[length:var(--step--1)] text-[var(--mist)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
