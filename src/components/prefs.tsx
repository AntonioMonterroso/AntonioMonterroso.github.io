"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { PaletteId, ProjectType } from "@/lib/site";

type Lang = "es" | "en";

type Point = { x: number; y: number };

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  palette: PaletteId;
  /** origin: punto de pantalla desde donde se expande la nueva paleta (el botón que se tocó). */
  setPalette: (p: PaletteId, origin?: Point) => void;
  projectType: ProjectType;
  setProjectType: (t: ProjectType) => void;
  /** Lleva al formulario de contacto con el tipo de proyecto ya elegido. */
  requestQuote: (t?: ProjectType) => void;
  /** Sube cada vez que se pide una cotización; el formulario lo usa para señalar el campo que cambió. */
  quoteSignal: number;
};

const PrefsContext = createContext<Prefs | null>(null);

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* modo privado o almacenamiento bloqueado: la preferencia vive solo en esta visita */
  }
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { ready: Promise<void>; finished: Promise<void> };
};

/**
 * Cambia idioma o paleta dentro de una View Transition para que no "salte".
 * - Paleta: la nueva se revela en círculo desde el botón tocado (superficie de marketing, 650 ms).
 * - Idioma, o paleta con movimiento reducido: fundido corto.
 * Sin soporte del navegador, el cambio es inmediato.
 */
function transition(kind: "palette" | "lang", update: () => void, origin?: Point) {
  const doc = document as ViewTransitionDoc;
  if (!doc.startViewTransition) {
    update();
    return;
  }
  const root = document.documentElement;
  const reveal = kind === "palette" && origin && !reducedMotion();
  if (reveal) root.dataset.vt = "reveal";
  else if (kind === "lang" && !reducedMotion()) root.dataset.vt = "lang";
  const t = doc.startViewTransition(async () => {
    update();
    // Deja que React pinte los textos/estados que dependen del cambio antes de la captura final
    await new Promise((r) => setTimeout(r, 0));
  });
  t.finished.finally(() => delete root.dataset.vt);
  if (reveal) {
    t.ready.then(() => {
      const { x, y } = origin;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.animate(
        { clipPath: [`circle(12px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
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
  const [quoteSignal, setQuoteSignal] = useState(0);

  const setLang = useCallback((l: Lang) => {
    if (document.documentElement.lang === l) return;
    transition("lang", () => {
      document.documentElement.lang = l;
      store("mds-lang", l);
    });
  }, []);

  const setPalette = useCallback((p: PaletteId, origin?: Point) => {
    if (document.documentElement.dataset.palette === p) return;
    transition(
      "palette",
      () => {
        document.documentElement.dataset.palette = p;
        store("mds-palette", p);
      },
      origin,
    );
  }, []);

  const requestQuote = useCallback((t?: ProjectType) => {
    if (t) setProjectType(t);
    setQuoteSignal((n) => n + 1);
    const section = document.getElementById("contacto");
    if (!section) return;
    section.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#contacto");
    // En computadora dejamos el cursor listo en "Nombre"; en celular no, para no abrir el teclado de golpe
    if (window.matchMedia("(pointer: fine)").matches) {
      document.getElementById("name")?.focus({ preventScroll: true });
    }
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, palette, setPalette, projectType, setProjectType, requestQuote, quoteSignal }),
    [lang, setLang, palette, setPalette, projectType, requestQuote, quoteSignal],
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
