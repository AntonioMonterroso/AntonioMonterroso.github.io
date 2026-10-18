"use client";

import { useEffect, useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { T } from "@/components/t";
import { whatsappLink, world } from "@/lib/site";

type Pkg = { id: string; name: string; tagline: string | null; kind: "closed" | "custom"; setup_fee: number; monthly_fee: number; price_note: string | null; recommended: boolean; features: { text: string; included: boolean }[] };
type Pricing = { packages: Pkg[] };

const q = (n: number) => `Q${Number(n).toLocaleString("es-GT", { maximumFractionDigits: 2 })}`;

/** Paquetes con precio cerrado, leídos en vivo de Monterroso World. Si no cargan, no se muestra nada y el resto de la página sigue igual. */
export function LivePrices() {
  const [pkgs, setPkgs] = useState<Pkg[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${world.supabaseUrl}/rest/v1/rpc/public_pricing`, {
      method: "POST",
      headers: { apikey: world.anonKey, Authorization: `Bearer ${world.anonKey}`, "Content-Type": "application/json" },
      body: "{}",
    })
      .then((r) => (r.ok ? (r.json() as Promise<Pricing>) : null))
      .then((d) => { if (alive && d?.packages?.length) setPkgs(d.packages); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!pkgs) {
    return (
      <p className="mt-10 text-center text-[length:var(--step--1)]" data-reveal>
        <a className="nav-link" href={world.prices} target="_blank" rel="noreferrer"><T es="Ver precios y paquetes" en="See prices and packages" /> ↗</a>
      </p>
    );
  }

  return (
    <div className="mt-16" data-reveal>
      <p className="kicker"><T es="Paquetes con precio" en="Packages with a price" /></p>
      <h3 className="display mt-3 text-[length:var(--step-2)]"><T es="Si ya sabes lo que necesitas" en="If you already know what you need" /></h3>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pkgs.map((p) => (
          <article key={p.id} className={`plan ${p.recommended ? "plan-featured" : ""}`}>
            <div>
              <h4 className="display text-[length:var(--step-1)]">{p.name}</h4>
              {p.tagline && <p className="mt-2 text-[var(--mist)] text-[length:var(--step--1)]">{p.tagline}</p>}
            </div>
            <p className="display text-[length:var(--step-3)] text-[var(--brass)]">
              {p.kind === "custom" ? (p.price_note ?? "—") : <>{q(p.monthly_fee)} <small className="text-[length:var(--step--1)] text-[var(--mist)]"><T es="al mes" en="per month" /></small></>}
            </p>
            {p.kind === "closed" && p.setup_fee > 0 && (
              <p className="-mt-2 text-[length:var(--step--1)] text-[var(--mist)]"><T es={`Activación única: ${q(p.setup_fee)}`} en={`One-time setup: ${q(p.setup_fee)}`} /></p>
            )}
            <ul className="check-list">
              {p.features.filter((f) => f.included).slice(0, 4).map((f) => (
                <li key={f.text}><Check className="mt-1 size-4 text-[var(--brass)]" aria-hidden="true" /><span>{f.text}</span></li>
              ))}
            </ul>
            <a className={`btn ${p.recommended ? "btn-brass" : "btn-ghost"} mt-auto !min-h-11 !px-4 text-[length:var(--step--1)]`} href={whatsappLink(`Hola, me interesa «${p.name}»`)} target="_blank" rel="noreferrer">
              <T es="Escribir por WhatsApp" en="Message on WhatsApp" />
            </a>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center">
        <a className="btn btn-ghost" href={world.prices} target="_blank" rel="noreferrer">
          <T es="Ver todos los precios y armar mi total" en="See all prices and build my total" /> <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
