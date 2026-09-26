"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { PaletteId, ProjectType } from "@/lib/site";

type Lang = "es" | "en";

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  palette: PaletteId;
  setPalette: (p: PaletteId) => void;
  projectType: ProjectType;
  setProjectType: (t: ProjectType) => void;
};

const PrefsContext = createContext<Prefs | null>(null);

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* modo privado o almacenamiento bloqueado: la preferencia vive solo en esta visita */
  }
}

function subscribeRoot(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "data-palette"] });
  return () => mo.disconnect();
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  // El idioma y la paleta viven en <html lang> y <html data-palette>: el script de <head>
  // aplica lo guardado antes de pintar y aquí solo nos suscribimos a esos atributos.
  const lang = useSyncExternalStore(subscribeRoot, () => (document.documentElement.lang === "en" ? "en" : "es"), () => "es" as Lang);
  const palette = useSyncExternalStore(
    subscribeRoot,
    () => (document.documentElement.dataset.palette as PaletteId | undefined) ?? "marino",
    () => "marino" as PaletteId,
  );
  const [projectType, setProjectType] = useState<ProjectType>("web");

  const setLang = useCallback((l: Lang) => {
    document.documentElement.lang = l;
    store("mds-lang", l);
  }, []);

  const setPalette = useCallback((p: PaletteId) => {
    document.documentElement.dataset.palette = p;
    store("mds-palette", p);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, palette, setPalette, projectType, setProjectType }),
    [lang, setLang, palette, setPalette, projectType],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs debe usarse dentro de <PrefsProvider>");
  return ctx;
}

/** Elige el texto del idioma activo (para atributos como placeholder o aria-label). */
export function useT() {
  const { lang } = usePrefs();
  return useCallback((es: string, en: string) => (lang === "en" ? en : es), [lang]);
}
