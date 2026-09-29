"use client";

import { useState } from "react";
import { usePrefs, useT } from "@/components/prefs";
import { Split } from "@/components/split";
import { projects } from "@/lib/site";
import { Segmented } from "@/components/segmented";

type Cat = "todos" | "web" | "panel" | "erp" | "esp";

const filters: { id: Cat; es: string; en: string }[] = [
  { id: "todos", es: "Todos", en: "All" },
  { id: "web", es: "Webs", en: "Websites" },
  { id: "panel", es: "Paneles", en: "Panels" },
  { id: "erp", es: "ERP", en: "ERP" },
  { id: "esp", es: "Especializados", en: "Specialized" },
];

const future = {
  es: ["clínicas y consultorios", "colegios y academias", "constructoras", "tiendas en línea", "transporte y logística", "bienes raíces", "el tuyo"],
  en: ["clinics", "schools and academies", "construction", "online stores", "transport and logistics", "real estate", "yours"],
};

export function Work() {
  const [cat, setCat] = useState<Cat>("todos");
  const { lang } = usePrefs();
  const t = useT();

  return (
    <section id="trabajos" className="section bg-[var(--deep)]" aria-labelledby="trabajos-title">
      <div className="shell">
        <div className="max-w-[52rem]">
          <p className="kicker" data-reveal>{t("Trabajos", "Work")}</p>
          <h2 id="trabajos-title" className="display mt-5 text-[length:var(--step-4)]" data-reveal="lines">
            <Split text={t("Una demostración del trabajo que ya entregamos.", "A look at work we've already delivered.")} />
          </h2>
          <p className="mt-4 text-[length:var(--step--1)] text-[var(--mist)]" data-reveal style={{ ["--d" as string]: "150ms" }}>
            {t("Con permiso de nuestros clientes", "Shared with our clients' permission")}
          </p>
        </div>

        <div className="mt-12" data-reveal>
          <Segmented
            label={t("Filtrar por tipo", "Filter by type")}
            options={filters.map((f) => ({ id: f.id, label: lang === "en" ? f.en : f.es }))}
            value={cat}
            onChange={setCat}
            className="flex flex-wrap gap-2"
            itemClassName="filter-btn"
            activeClassName="filter-btn-on"
          />
        </div>

        <ul className="mt-8">
          {projects.map((p) => {
            const dim = cat !== "todos" && p.cat !== cat;
            return (
              <li key={p.name.es} className="work-row" data-dim={dim} aria-hidden={dim || undefined}>
                <h3 className="display text-[length:var(--step-2)] !leading-tight">{lang === "en" ? p.name.en : p.name.es}</h3>
                <p className="text-[color-mix(in_oklab,var(--snow)_78%,var(--mist))]">{lang === "en" ? p.body.en : p.body.es}</p>
                {p.demo ? (
                  <a href={p.demo} className="paren-soon underline underline-offset-4" target="_blank" rel="noreferrer">
                    {t("Ver demo", "View demo")}
                  </a>
                ) : (
                  <span className="paren-soon">{t("(demo en GitHub, próximamente)", "(GitHub demo, coming soon)")}</span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-20 border-t border-[var(--line)] pt-10" data-reveal>
          <p className="kicker">{t("Rubros que vienen", "Industries up next")}</p>
          <p className="display mt-6 max-w-[64rem] text-[length:var(--step-3)] !leading-[1.25] text-[var(--mist)]">
            {future[lang].map((f, i) => (
              <span key={f}>
                <span className={i === future[lang].length - 1 ? "text-[var(--brass)]" : undefined}>({f})</span>
                {i < future[lang].length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
