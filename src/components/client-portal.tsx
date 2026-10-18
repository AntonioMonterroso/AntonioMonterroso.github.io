"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Download, MessageCircle } from "lucide-react";
import { T } from "@/components/t";
import { Logo } from "@/components/site-header";
import { useT } from "@/components/prefs";
import { whatsappLink, world } from "@/lib/site";
import { PERIOD_LABEL, fetchQuote, money, nextMilestone, paymentPlan, progressPct, totals, type SharedQuote } from "@/lib/pricing";

const STATUS: Record<SharedQuote["status"], { es: string; en: string }> = {
  draft: { es: "Propuesta lista para tu revisión", en: "Proposal ready for your review" },
  sent: { es: "Propuesta lista para tu revisión", en: "Proposal ready for your review" },
  accepted: { es: "Propuesta aceptada", en: "Proposal accepted" },
  rejected: { es: "Propuesta cerrada", en: "Proposal closed" },
};
const fmtDate = (iso?: string | null) => (iso ? new Date(iso.slice(0, 10) + "T12:00:00").toLocaleDateString("es-GT", { day: "numeric", month: "long", year: "numeric" }) : "");
const TINT = ["var(--pastel-a)", "var(--pastel-b)", "var(--pastel-c)", "var(--pastel-d)"];

/** Página privada del cliente: su propuesta y el avance de su sistema, en un solo lugar. Se abre con un enlace secreto. */
export function ClientPortal() {
  const t = useT();
  const [q, setQ] = useState<SharedQuote | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "fail">("loading");
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<"seguimiento" | "propuesta">("propuesta");

  useEffect(() => {
    const tk = new URLSearchParams(location.search).get("t") ?? "";
    setToken(tk);
    if (!/^[A-Za-z0-9_-]{16,64}$/.test(tk)) { setState("fail"); return; }
    void fetchQuote(tk).then((d) => {
      if (!d) return setState("fail");
      setQ(d);
      setState("ok");
      setTab(d.status === "accepted" || (d.progress?.milestones?.length ?? 0) > 0 ? "seguimiento" : "propuesta");
    });
  }, []);

  if (state === "loading") return <main className="grid min-h-dvh place-items-center"><p className="text-[var(--mist)]"><T es="Cargando…" en="Loading…" /></p></main>;
  if (state === "fail" || !q) {
    return (
      <main className="grid min-h-dvh place-items-center px-6 text-center">
        <div><Logo /><h1 className="display mt-8 text-[length:var(--step-3)]"><T es="Este enlace no está disponible" en="This link isn't available" /></h1>
          <p className="lead mt-3 max-w-[30rem]"><T es="Puede que haya vencido o que ya no se comparta. Pide uno nuevo a quien te lo envió." en="It may have expired or is no longer shared. Ask for a new one." /></p>
          <a href="/" className="btn btn-ghost mt-6"><T es="Ir al inicio" en="Go home" /></a></div>
      </main>
    );
  }

  const ms = q.progress?.milestones ?? [];
  const ups = q.progress?.updates ?? [];
  const pct = progressPct(ms);
  const next = nextMilestone(ms);
  const taxes = q.iva === "added";
  const mul = taxes ? 1.12 : 1;
  const lines = q.lines.filter((l) => !l.optional || l.on);
  const opt = q.lines.filter((l) => l.optional && !l.on);
  const sum = totals(q.lines, taxes);
  const plan = paymentPlan(sum.once, q.upfront_pct);
  const b = q.body;
  const wa = (text: string) => whatsappLink(text);
  const canAccept = q.status === "draft" || q.status === "sent";

  return (
    <main className="cp">
      <header className="cp-top">
        <div className="shell flex items-center justify-between gap-4 py-4">
          <a href="/" aria-label="Monterroso Dev Studio"><Logo /></a>
          <span className="cp-pill"><T es="Tu proyecto" en="Your project" /></span>
        </div>
      </header>

      <section className="shell cp-hero">
        <p className="kicker">{q.client_name ? <T es={`Hola, ${q.client_name}`} en={`Hello, ${q.client_name}`} /> : <T es="Hola" en="Hello" />}</p>
        <h1 className="display mt-4 max-w-[20ch] text-[length:var(--step-4)]">{q.title}</h1>
        <p className="cp-status"><span className={`dot s-${q.status}`} aria-hidden="true" /><T es={STATUS[q.status].es} en={STATUS[q.status].en} /></p>

        <div className="px-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "seguimiento"} className={`px-tab ${tab === "seguimiento" ? "on" : ""}`} onClick={() => setTab("seguimiento")}><T es="Seguimiento" en="Progress" /></button>
          <button type="button" role="tab" aria-selected={tab === "propuesta"} className={`px-tab ${tab === "propuesta" ? "on" : ""}`} onClick={() => setTab("propuesta")}><T es="Propuesta" en="Proposal" /></button>
        </div>
      </section>

      {tab === "seguimiento" && (
        <section className="shell cp-body" role="tabpanel">
          {ms.length === 0 ? (
            <div className="cp-card" style={{ background: "var(--pastel-a)" }}>
              <h2 className="display text-[length:var(--step-2)]"><T es="Aquí verás el avance de tu proyecto" en="You'll see your project's progress here" /></h2>
              <p className="lead mt-3"><T es="Cuando empecemos a trabajar, esta página muestra en qué paso vamos, lo que sigue y los avisos que te deje." en="Once we start working, this page shows which step we're on, what's next and any updates I leave you." /></p>
            </div>
          ) : (
            <div className="cp-grid">
              <div>
                <div className="cp-card cp-prog">
                  <div className="cp-pct"><b>{pct}</b><span>%</span></div>
                  <div className="flex-1">
                    <p className="display text-[length:var(--step-1)]">{q.progress?.headline || t("Estamos construyendo tu sistema", "We're building your system")}</p>
                    <div className="cp-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div>
                    <p className="mt-3 text-[var(--mist)]">
                      {next ? <><T es="Lo que sigue:" en="Up next:" /> <b className="text-[var(--snow)]">{next.title}</b></> : <T es="¡Todo listo!" en="All done!" />}
                      {q.progress?.eta && <> · <T es="Entrega estimada:" en="Estimated delivery:" /> <b className="text-[var(--snow)]">{fmtDate(q.progress.eta)}</b></>}
                    </p>
                  </div>
                </div>
                <ol className="cp-steps">
                  {ms.map((m) => (
                    <li key={m.id} className={`st-${m.status}`}>
                      <span className="mk" aria-hidden="true">{m.status === "done" ? <Check className="size-4" /> : null}</span>
                      <div><b>{m.title}</b><small><T es={m.status === "done" ? "Listo" : m.status === "doing" ? "En curso" : "Por hacer"} en={m.status === "done" ? "Done" : m.status === "doing" ? "In progress" : "To do"} /></small>{m.note && <p>{m.note}</p>}</div>
                    </li>
                  ))}
                </ol>
              </div>
              <aside>
                <h2 className="px-h3"><T es="Avisos" en="Updates" /></h2>
                {ups.length === 0 ? <p className="mt-3 text-[var(--mist)]"><T es="Todavía no hay avisos." en="No updates yet." /></p> : (
                  <ul className="cp-ups">{[...ups].reverse().map((u, i) => <li key={u.id} style={{ background: TINT[i % 4] }}><small>{fmtDate(u.date)}</small><p>{u.text}</p></li>)}</ul>
                )}
                <a className="btn btn-brass mt-6" href={wa(`Hola, te escribo sobre mi proyecto «${q.title}»`)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" aria-hidden="true" /> <T es="Escribirme sobre mi proyecto" en="Message me about my project" /></a>
              </aside>
            </div>
          )}
        </section>
      )}

      {tab === "propuesta" && (
        <section className="shell cp-body" role="tabpanel">
          <div className="cp-doc">
            {b.intro && <p className="lead max-w-[46rem]">{b.intro}</p>}
            <div className="cp-sections">
              {b.sections.filter((s) => s.title || s.items.length).map((s, i) => (
                <div key={i} className="cp-card" style={{ background: TINT[i % 4] }}>
                  <h3 className="display text-[length:var(--step-1)]">{s.title}</h3>
                  <ul className="px-ticks">{s.items.map((it, j) => <li key={j}><Check className="size-4" aria-hidden="true" />{it}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="cp-card cp-invest">
              <h3 className="display text-[length:var(--step-2)]"><T es="Inversión" en="Investment" /></h3>
              <dl>
                {lines.map((l) => <div key={l.id}><dt>{l.label}<small>{PERIOD_LABEL[l.period].es}{l.qty > 1 ? ` · ×${l.qty}` : ""}</small></dt><dd>{money(l.qty * l.unit * mul)}</dd></div>)}
              </dl>
              <div className="cp-sum">
                {sum.once > 0 && <p><span><T es="Para empezar" en="To start" /></span><b>{money(sum.once)}</b></p>}
                {sum.month > 0 && <p><span><T es="Cada mes" en="Each month" /></span><b>{money(sum.month)}</b></p>}
                {sum.year > 0 && <p><span><T es="Cada año" en="Each year" /></span><b>{money(sum.year)}</b></p>}
              </div>
              {plan.length > 1 && <p className="px-fine mt-3"><T es="Pago de lo inicial:" en="Initial payment:" /> {plan.map((p) => `${p.pct}% (${money(p.amount)}) ${p.label.toLowerCase()}`).join(" · ")}.</p>}
              <p className="px-fine mt-2">{q.iva === "none" ? <T es="Si necesitas factura, se agregan los impuestos correspondientes." en="If you need an invoice, taxes are added." /> : <T es="Precios con impuestos incluidos." en="Prices include taxes." />}</p>
              {opt.length > 0 && <p className="px-fine mt-2"><b><T es="Opcionales (no incluidos):" en="Optional (not included):" /></b> {opt.map((l) => `${l.label} · ${money(l.qty * l.unit * mul)} ${PERIOD_LABEL[l.period].es}`).join(" · ")}</p>}
            </div>

            {(b.exclusions.length > 0 || b.support || b.conditions.length > 0) && (
              <div className="cp-sections">
                {b.exclusions.length > 0 && <div className="cp-card" style={{ background: "var(--navy)" }}><h3 className="display text-[length:var(--step-1)]"><T es="Qué no incluye" en="Not included" /></h3><ul className="cp-plain">{b.exclusions.map((x, i) => <li key={i}>{x}</li>)}</ul></div>}
                {b.support && <div className="cp-card" style={{ background: "var(--navy)" }}><h3 className="display text-[length:var(--step-1)]"><T es="Soporte y garantía" en="Support & warranty" /></h3><p className="mt-2">{b.support}</p></div>}
                {b.conditions.length > 0 && <div className="cp-card" style={{ background: "var(--navy)" }}><h3 className="display text-[length:var(--step-1)]"><T es="Condiciones" en="Terms" /></h3><ul className="cp-plain">{b.conditions.map((x, i) => <li key={i}>{x}</li>)}{q.valid_until && <li><T es={`Esta propuesta es válida hasta el ${fmtDate(q.valid_until)}.`} en={`This proposal is valid until ${fmtDate(q.valid_until)}.`} /></li>}</ul></div>}
              </div>
            )}

            <div className="cp-cta">
              {canAccept && <a className="btn btn-brass" href={wa(`Hola, acepto la propuesta «${q.title}»${q.client_name ? ` (${q.client_name})` : ""}.`)} target="_blank" rel="noreferrer"><T es="Aceptar esta propuesta" en="Accept this proposal" /> <ArrowRight className="size-4" aria-hidden="true" /></a>}
              {q.status === "accepted" && <p className="cp-accepted"><Check className="size-4" aria-hidden="true" /> <T es="Propuesta aceptada. ¡Gracias por tu confianza!" en="Proposal accepted. Thank you for your trust!" /></p>}
              <a className="btn btn-ghost" href={`${world.home}cotizacion/${token}`} target="_blank" rel="noreferrer"><Download className="size-4" aria-hidden="true" /> <T es="Ver el documento formal" en="See the formal document" /></a>
              {canAccept && <a className="px-link" href={wa(`Hola, tengo una duda sobre la propuesta «${q.title}»`)} target="_blank" rel="noreferrer"><T es="Tengo una pregunta" en="I have a question" /></a>}
            </div>
          </div>
        </section>
      )}

      <footer className="shell cp-foot"><p>© {new Date().getFullYear()} Monterroso Dev Studio · <a href="/">{t("Volver a la página", "Back to the site")}</a></p></footer>
    </main>
  );
}
