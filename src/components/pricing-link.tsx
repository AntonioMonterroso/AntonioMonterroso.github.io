"use client";

import type { CSSProperties, ReactNode } from "react";
import { openPricing, type PricingTab } from "@/lib/pricing-nav";

/** Enlace que abre la sección de precios en una pestaña. Sin JavaScript funciona como ancla normal. */
export function PricingLink({ tab = "propuesta", className, style, children }: { tab?: PricingTab; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <a
      href="#precios"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        openPricing(tab);
      }}
    >
      {children}
    </a>
  );
}
