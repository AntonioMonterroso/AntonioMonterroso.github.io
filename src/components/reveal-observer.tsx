"use client";

import { useEffect } from "react";

/** Numera las palabras visibles por renglón (--l) para escalonar el revelado línea por línea. */
function numberLines(el: HTMLElement) {
  let line = -1;
  let lastTop = Number.NEGATIVE_INFINITY;
  el.querySelectorAll<HTMLElement>(".w").forEach((w) => {
    if (!w.offsetParent) return; // palabra del idioma oculto
    if (w.offsetTop > lastTop + 2) {
      line += 1;
      lastTop = w.offsetTop;
    }
    w.style.setProperty("--l", String(line));
  });
}

/** Marca con data-visible cada [data-reveal] la primera vez que entra en pantalla. */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.dataset.reveal === "lines") numberLines(el);
          el.setAttribute("data-visible", "");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    // Pasos del proceso: se encienden al pasar por el centro de la pantalla
    const steps = document.querySelectorAll<HTMLElement>(".step");
    const so = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-on", "");
          so.unobserve(e.target);
        }
      },
      { rootMargin: "-40% 0px -45% 0px" },
    );
    steps.forEach((el) => so.observe(el));
    return () => {
      io.disconnect();
      so.disconnect();
    };
  }, []);
  return null;
}
