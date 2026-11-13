"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePrefs, useT } from "@/components/prefs";
import { projects } from "@/lib/site";
import { laptopEntrega } from "@/lib/images";

// Solo los proyectos que tienen demo para abrir (los reales de site.ts).
const featured = projects.filter((p) => p.demo);

/** Tarjeta «Proyecto destacado» de la portada: pasa de un proyecto a otro con las flechas. */
export function FeaturedProject() {
  const [i, setI] = useState(0);
  const { lang } = usePrefs();
  const t = useT();
  if (!featured.length) return null;
  const p = featured[i];
  const n = featured.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <article className="hr-card hr-feat" aria-roledescription="carrusel" aria-label={t("Proyecto destacado", "Featured project")}>
      <div className="hr-feat-img">
        <Image src={laptopEntrega.src} width={laptopEntrega.width} height={laptopEntrega.height} alt="" sizes="10rem" />
        <span className="hr-feat-tag">{t("Proyecto destacado", "Featured project")}</span>
      </div>
      <div className="hr-feat-body">
        <div className="flex items-start justify-between gap-3">
          <h2 className="hr-feat-title" aria-live="polite">{lang === "en" ? p.name.en : p.name.es}</h2>
          <span className="hr-feat-count">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        </div>
        <p className="hr-feat-text">{lang === "en" ? p.body.en : p.body.es}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <a href={p.demo ?? "#trabajos"} target="_blank" rel="noreferrer" className="hr-feat-link">
            {t("Ver demo", "View demo")} <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
          <div className="flex gap-2">
            <button type="button" className="hr-round hr-round-light" onClick={() => go(-1)} aria-label={t("Proyecto anterior", "Previous project")}>
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button type="button" className="hr-round hr-round-dark" onClick={() => go(1)} aria-label={t("Siguiente proyecto", "Next project")}>
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
