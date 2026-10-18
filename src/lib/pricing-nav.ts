export type PricingTab = "propuesta" | "ejemplos" | "precios";

/** Abre la sección de precios en la pestaña pedida y lleva ahí a la persona (accesos directos del encabezado, el inicio y el menú). */
export function openPricing(tab: PricingTab = "propuesta") {
  window.dispatchEvent(new CustomEvent("mds-pricing", { detail: tab }));
  const el = document.getElementById("precios");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", "#precios");
}
