"use client";

import { cn } from "@/lib/utils";
import { palettes } from "@/lib/site";
import { usePrefs, useT } from "@/components/prefs";

export function PaletteSwitcher({ size = "sm", className }: { size?: "sm" | "lg"; className?: string }) {
  const { palette, setPalette } = usePrefs();
  const t = useT();
  return (
    <div role="group" aria-label={t("Colores de la página", "Page colors")} className={cn("flex items-center", className)}>
      {palettes.map((p) =>
        size === "sm" ? (
          <button
            key={p.id}
            type="button"
            className="swatch-hit"
            aria-pressed={palette === p.id}
            aria-label={t(`Paleta ${p.es}`, `${p.en} palette`)}
            onClick={() => setPalette(p.id)}
          >
            <span
              className="swatch"
              aria-hidden="true"
              style={{ background: `linear-gradient(135deg, ${p.accent} 50%, ${p.ink} 50%)` }}
            />
          </button>
        ) : (
          <button
            key={p.id}
            type="button"
            aria-pressed={palette === p.id}
            onClick={() => setPalette(p.id)}
            className="group flex min-h-11 items-center gap-3 rounded-full border border-[var(--line)] py-2 pr-5 pl-2 text-[length:var(--step--1)] transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] aria-pressed:border-[var(--brass)]"
          >
            <span
              className="swatch !size-8"
              aria-hidden="true"
              style={{ background: `linear-gradient(135deg, ${p.accent} 50%, ${p.ink} 50%)` }}
            />
            {t(p.es, p.en)}
          </button>
        ),
      )}
    </div>
  );
}

export function LangToggle() {
  const { lang, setLang } = usePrefs();
  return (
    <div role="group" aria-label="Idioma / Language" className="flex items-center">
      <button type="button" className="lang-btn" aria-pressed={lang === "es"} onClick={() => setLang("es")}>
        ES
      </button>
      <span aria-hidden="true" className="text-[var(--line-strong)]">/</span>
      <button type="button" className="lang-btn" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}
