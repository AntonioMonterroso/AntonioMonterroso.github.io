"use client";

import { ArrowRight } from "lucide-react";
import { projectTypes } from "@/lib/site";
import { usePrefs, useT } from "@/components/prefs";
import { Segmented } from "@/components/segmented";

export function ProjectPicker() {
  const { projectType, setProjectType, requestQuote } = usePrefs();
  const t = useT();
  return (
    <div className="picker">
      <span className="picker-label">{t("¿Qué necesitas?", "What do you need?")}</span>
      <Segmented
        label={t("¿Qué necesitas?", "What do you need?")}
        options={projectTypes.map((p) => ({ id: p.id, label: t(p.es, p.en) }))}
        value={projectType}
        onChange={setProjectType}
        className="picker-options"
        itemClassName="picker-opt"
        activeClassName="picker-opt-on"
      />
      <a
        href="#contacto"
        className="btn btn-brass !min-h-11 sm:ml-auto max-sm:w-full"
        onClick={(e) => {
          e.preventDefault();
          requestQuote();
        }}
      >
        {t("Cotizar", "Get a quote")}
        <ArrowRight className="nudge size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
