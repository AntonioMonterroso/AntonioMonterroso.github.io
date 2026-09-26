"use client";

import type { ReactNode } from "react";
import type { ProjectType } from "@/lib/site";
import { usePrefs } from "@/components/prefs";

/** Enlace a "Cotizar": sin JS es un ancla normal; con JS elige el tipo de proyecto y enfoca el formulario. */
export function QuoteLink({ type, className, children }: { type?: ProjectType; className?: string; children: ReactNode }) {
  const { requestQuote } = usePrefs();
  return (
    <a
      href="#contacto"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        requestQuote(type);
      }}
    >
      {children}
    </a>
  );
}
