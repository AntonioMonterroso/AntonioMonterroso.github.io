"use client";

import type { ReactNode } from "react";
import { openPricing, type PricingTab } from "@/lib/pricing-nav";

/** Enlace que abre la sección de precios en una pestaña. Sin JavaScript funciona como ancla normal. */
export function PricingLink({ tab = "propuesta", className, children }: { tab?: PricingTab; className?: string; children: ReactNode }) {
  return (
    <a
      href="#precios"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openPricing(tab);
      }}
    >
      {children}
    </a>
  );
}
