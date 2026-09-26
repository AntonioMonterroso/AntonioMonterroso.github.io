"use client";

import { ArrowRight } from "lucide-react";
import { projectTypes } from "@/lib/site";
import { usePrefs, useT } from "@/components/prefs";

export function ProjectPicker() {
  const { projectType, setProjectType } = usePrefs();
  const t = useT();
  return (
    <div className="picker" role="group" aria-label={t("¿Qué necesitas?", "What do you need?")}>
      <span className="px-3 text-[length:var(--step--1)] font-medium">{t("¿Qué necesitas?", "What do you need?")}</span>
      {projectTypes.map((p) => (
        <button
          key={p.id}
          type="button"
          className="picker-opt"
          aria-pressed={projectType === p.id}
          onClick={() => setProjectType(p.id)}
        >
          {t(p.es, p.en)}
        </button>
      ))}
      <a href="#contacto" className="btn btn-brass ml-auto !min-h-11 max-sm:w-full">
        {t("Cotizar", "Get a quote")}
        <ArrowRight className="nudge size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
