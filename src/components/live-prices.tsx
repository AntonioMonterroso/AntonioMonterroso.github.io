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

  return (
    <div className="mt-16" data-reveal>
      {pkgs && (
        <>
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
        </>
      )}

      <div className={`price-cta ${pkgs ? "mt-10" : ""}`}>
        <div>
          <h3 className="display text-[length:var(--step-2)]"><T es="¿Ya sabes lo que necesitas?" en="Already know what you need?" /></h3>
          <p className="mt-2 max-w-[34rem] text-[var(--mist)]">
            <T
              es="Mira los precios con calma, arma tu propuesta en un minuto o cuéntame tu idea. Sin compromiso."
              en="Browse the prices at your own pace, build your proposal in a minute, or tell me your idea. No strings attached."
            />
          </p>
        </div>
        <a className="btn btn-brass shrink-0" href={world.prices} target="_blank" rel="noreferrer">
          <T es="Ver precios y armar mi propuesta" en="See prices and build my proposal" />
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
