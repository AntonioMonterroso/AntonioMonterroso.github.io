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
    <section id="trabajos" className="section" aria-labelledby="trabajos-title">
      <div className="shell">
        <div className="max-w-[52rem]">
          <p className="kicker" data-reveal>{t("Trabajos", "Work")}</p>
          <h2 id="trabajos-title" className="display mt-5 text-[length:var(--step-4)]" data-reveal="lines">
            <Split text={t("Parte del trabajo que ya entregamos.", "Some of the work we have already delivered.")} mark={t("entregamos", "delivered")} />
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

        <ul className="work-list mt-6">
          {projects.map((p) => {
            const dim = cat !== "todos" && p.cat !== cat;
            return (
              <li key={p.name.es} className="work-row" data-dim={dim} aria-hidden={dim || undefined}>
                <h3 className="display text-[length:var(--step-2)] !leading-tight">{lang === "en" ? p.name.en : p.name.es}</h3>
                <p className="text-[color-mix(in_oklab,var(--snow)_78%,var(--mist))]">{lang === "en" ? p.body.en : p.body.es}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-16" data-reveal>
          <p className="kicker">{t("Rubros que vienen", "Industries up next")}</p>
          <ul className="mt-6 flex max-w-[64rem] flex-wrap gap-2.5">
            {future[lang].map((f, i) => (
              <li key={f} className={`rubro-pill ${i === future[lang].length - 1 ? "rubro-pill-you" : ""}`}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
