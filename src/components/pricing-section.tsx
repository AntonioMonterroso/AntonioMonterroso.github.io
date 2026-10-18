"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { T } from "@/components/t";
import { useT } from "@/components/prefs";
import { whatsappLink } from "@/lib/site";
import {
  DEFAULT_PAGE, FALLBACK_EXTRAS, FALLBACK_PACKAGES, GOALS, PERIOD_LABEL, fetchPricing, linesFromPick, money, payOptions, recommendPkg, totals,
  type Extra, type Goal, type Page, type PayMode, type Pkg, type Pricing,
} from "@/lib/pricing";
import type { PricingTab } from "@/lib/pricing-nav";

const BUSINESS = ["Barbería o salón", "Restaurante o cafetería", "Tienda o comercio", "Servicios profesionales", "Iglesia u organización", "Otro"];
const TINT = ["var(--pastel-a)", "var(--pastel-b)", "var(--pastel-c)", "var(--pastel-d)"];
const TAX = 1.12;

/** Precios y propuestas: tres pestañas (mi propuesta, ejemplos, precios) para no saturar la página. Lee los datos de Monterroso World. */
export function PricingSection() {
  const t = useT();
  const [tab, setTab] = useState<PricingTab>("propuesta");
  const [data, setData] = useState<Pricing | null | "fail">(null);
  // propuesta guiada
  const [step, setStep] = useState(1);
  const [biz, setBiz] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [name, setName] = useState("");
  const [forced, setForced] = useState("");
  const [taxes, setTaxes] = useState(false);
  const [mode, setMode] = useState<PayMode | undefined>(undefined);
  // ejemplos y precios
  const [exIdx, setExIdx] = useState(0);
  const [catF, setCatF] = useState<string | null>(null); // rubro elegido (null = aún no)
  const [modes, setModes] = useState<Record<string, PayMode>>({});

  useEffect(() => {
    let alive = true;
    void fetchPricing().then((d) => alive && setData(d ?? "fail"));
    const onTab = (e: Event) => setTab((e as CustomEvent<PricingTab>).detail);
    window.addEventListener("mds-pricing", onTab);
    if (location.hash === "#precios") setTab("precios");
    return () => { alive = false; window.removeEventListener("mds-pricing", onTab); };
  }, []);

  const failed = data === "fail";
  const live = data && data !== "fail" ? data : null;
  const page: Page = { ...DEFAULT_PAGE, ...(live?.page ?? {}) };
  const pkgs = (failed ? FALLBACK_PACKAGES : live?.packages ?? []).filter((p) => p.published !== false).sort((a, b) => a.position - b.position);
  const extras: Extra[] = (failed ? FALLBACK_EXTRAS : live?.extras ?? []).filter((e) => e.published !== false);
  const closed = pkgs.filter((p) => p.kind === "closed");
  const GENERAL = "General";
  const catOf = (p: Pkg) => p.category?.trim() || GENERAL;
  const cats = [...new Set(closed.map(catOf))];
  const rubro = cats.length === 1 ? cats[0] : catF; // con un solo rubro no hace falta elegir
  const inRubro = rubro ? closed.filter((p) => catOf(p) === rubro) : [];
  const fromPrice = (r: string) => { const v = closed.filter((p) => catOf(p) === r && p.show_price !== false).map((p) => { const o = payOptions(p); return Math.min(...o.map((x) => (x.mode === "once" ? x.once : x.monthly))); }).filter((n) => n > 0); return v.length ? Math.min(...v) : 0; };

  const bizCat = cats.find((c) => biz && c.toLowerCase().slice(0, 5) === biz.toLowerCase().slice(0, 5));
  const rec = forced ? pkgs.find((p) => p.id === forced) : recommendPkg(goals, bizCat ? pkgs.filter((p) => catOf(p as Pkg) === bizCat || p.kind === "custom") : pkgs);
  const dom = extras.find((e) => /dominio/i.test(e.name));
  const lines = useMemo(
    () => linesFromPick({ pkg: rec?.kind === "closed" ? rec : undefined, extras: goals.includes("domain") && dom ? [dom] : [], mode }),
    [rec, goals, dom, mode],
  );
  const sum = totals(lines, taxes);
  const mul = taxes ? TAX : 1;
  const wa = (text: string) => whatsappLink(text);
  const msg = `Hola, soy ${name.trim() || "(tu nombre)"}.${biz ? ` Mi negocio es: ${biz}.` : ""}${goals.length ? ` Quiero: ${GOALS.filter((g) => goals.includes(g.id)).map((g) => g.es.toLowerCase()).join("; ")}.` : ""}${rec ? ` Me interesa «${rec.name}».` : ""} ¿Me envías la propuesta?`;
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const fromExample = (sector: string) => { setBiz(sector); setForced(""); setStep(2); setTab("propuesta"); setTimeout(() => jump("propuesta-guiada"), 40); };
  const ask = (id: string) => { setForced(id); setMode(undefined); setStep(3); setTab("propuesta"); setTimeout(() => jump("propuesta-guiada"), 40); };
  const toggleGoal = (g: Goal) => setGoals((l) => (l.includes(g) ? l.filter((x) => x !== g) : [...l, g]));

  const tabs: { id: PricingTab; es: string; en: string }[] = [
    { id: "propuesta", es: "Mi propuesta", en: "My proposal" },
    { id: "ejemplos", es: "Ejemplos", en: "Examples" },
    { id: "precios", es: "Precios", en: "Prices" },
  ];

  return (
    <section id="precios" className="section" aria-labelledby="precios-title">
      <div className="shell">
        <p className="kicker" data-reveal><T es="Precios y propuestas" en="Pricing & proposals" /></p>
        <h2 id="precios-title" className="display mt-5 max-w-[22ch] text-[length:var(--step-4)]" data-reveal>
          <T es="Elige con calma. Te propongo lo que te convenga." en="Take your time. I'll propose what suits you." />
        </h2>
        <p className="lead mt-5 max-w-[40rem]" data-reveal style={{ ["--d" as string]: "100ms" }}>
          <T
            es="Cuéntame de tu negocio y te preparo una propuesta, mira ejemplos de problemas que ya resolvemos o ve directo a los precios. Sin compromiso."
            en="Tell me about your business and I'll prepare a proposal, browse problems we've already solved, or go straight to the prices. No strings attached."
          />
        </p>

        <div className="px-tabs" role="tablist" aria-label={t("Precios y propuestas", "Pricing and proposals")}>
          {tabs.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={tab === x.id} className={`px-tab ${tab === x.id ? "on" : ""}`} onClick={() => setTab(x.id)}>
              <T es={x.es} en={x.en} />
            </button>
          ))}
        </div>

        {/* ───────── Mi propuesta ───────── */}
        {tab === "propuesta" && (
          <div id="propuesta-guiada" className="px-prop" role="tabpanel">
            <ol className="px-dots" aria-label={t(`Paso ${step} de 3`, `Step ${step} of 3`)}>{[1, 2, 3].map((n) => <li key={n} className={n <= step ? "on" : ""} />)}</ol>

            {step === 1 && (
              <div className="px-step">
                <h3 className="px-h3"><T es="¿A qué se dedica tu negocio?" en="What does your business do?" /></h3>
                <div className="px-chips" role="group">{BUSINESS.map((b) => <button key={b} type="button" aria-pressed={biz === b} className={`px-chip ${biz === b ? "on" : ""}`} onClick={() => setBiz(b)}>{b}</button>)}</div>
                <div className="px-actions"><button type="button" className="btn btn-solid" onClick={() => { setForced(""); setStep(2); }}><T es="Continuar" en="Continue" /> <ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className="px-link" onClick={() => { setForced(""); setStep(2); }}><T es="Saltar" en="Skip" /></button></div>
              </div>
            )}

            {step === 2 && (
              <div className="px-step">
                <h3 className="px-h3"><T es="¿Qué te gustaría lograr?" en="What would you like to achieve?" /> <small><T es="Elige todo lo que quieras." en="Pick as many as you like." /></small></h3>
                <div className="px-chips col" role="group">{GOALS.map((g) => <button key={g.id} type="button" aria-pressed={goals.includes(g.id)} className={`px-chip ${goals.includes(g.id) ? "on" : ""}`} onClick={() => toggleGoal(g.id)}>{goals.includes(g.id) && <Check className="size-4" aria-hidden="true" />}<T es={g.es} en={g.en} /></button>)}</div>
                <div className="px-actions"><button type="button" className="btn btn-solid" onClick={() => setStep(3)}><T es="Ver mi propuesta" en="See my proposal" /> <ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className="px-link" onClick={() => setStep(1)}><T es="Atrás" en="Back" /></button></div>
              </div>
            )}

            {step === 3 && (
              <div className="px-step px-result">
                <label className="px-name"><span><T es="¿Cómo te llamo?" en="What should I call you?" /> <em><T es="(opcional)" en="(optional)" /></em></span><input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={t("Tu nombre", "Your name")} /></label>
                {rec ? (
                  <>
                    <p className="kicker mt-8">{name.trim() ? <T es={`${name.trim()}, esto te propongo`} en={`${name.trim()}, here's my proposal`} /> : <T es="Esto te propongo" en="Here's my proposal" />}</p>
                    <h3 className="display mt-3 text-[length:var(--step-3)]">{rec.name}</h3>
                    {rec.tagline && <p className="lead mt-2">{rec.tagline}</p>}
                    {goals.length > 0 && !forced && (
                      <div className="px-box" style={{ background: "var(--pastel-a)" }}><b><T es="Por qué te lo propongo" en="Why I suggest it" /></b><ul>{GOALS.filter((g) => goals.includes(g.id)).slice(0, 3).map((g) => <li key={g.id}>{g.why}</li>)}</ul></div>
                    )}
                    <div className="px-box" style={{ background: "var(--pastel-b)" }}><b><T es="Lo que incluye" en="What's included" /></b><ul className="px-ticks">{rec.features.filter((f) => f.included).slice(0, 7).map((f, i) => <li key={i}><Check className="size-4" aria-hidden="true" />{f.text}</li>)}</ul></div>

                    <details className="px-invest">
                      <summary><T es="Ver la inversión" en="See the investment" /></summary>
                      {rec.kind === "custom" ? (
                        <p>{rec.price_note ?? "Se cotiza"}. <T es="Primero conozco tu caso y te preparo una propuesta formal por escrito. Hasta entonces no pagas nada." en="First I get to know your case and prepare a written proposal. You pay nothing until then." /></p>
                      ) : (
                        <>
                          {payOptions(rec).length > 1 && (
                            <div className="px-modes" role="radiogroup">{payOptions(rec).map((o) => { const cur = (mode ?? payOptions(rec)[0].mode) === o.mode; return <button key={o.mode} type="button" role="radio" aria-checked={cur} className={`px-mode ${cur ? "on" : ""}`} onClick={() => setMode(o.mode)}>{o.mode === "once" ? t("Pago único", "One payment") : t("Mensualidad", "Monthly")}</button>; })}</div>
                          )}
                          <dl>{lines.map((l) => <div key={l.id}><dt>{l.label.replace(/ · .*/, "")} <small>{PERIOD_LABEL[l.period].es}</small></dt><dd>{money(l.unit * mul)}</dd></div>)}</dl>
                          <label className="px-check"><input type="checkbox" checked={taxes} onChange={(e) => setTaxes(e.target.checked)} /> <T es="Con impuestos (si necesitas factura)" en="With taxes (if you need an invoice)" /></label>
                          <p className="px-fine">{sum.once > 0 && <>{money(sum.once)} <T es="para empezar" en="to start" /></>}{sum.once > 0 && sum.month > 0 && " · "}{sum.month > 0 && <>{money(sum.month)} <T es="al mes" en="per month" /></>}. <T es="Puedes empezar cuando estés listo y ajustar lo que necesites." en="Start whenever you're ready and adjust whatever you need." /></p>
                        </>
                      )}
                    </details>
                  </>
                ) : (
                  <p className="lead mt-8"><T es="Cuéntame tu idea y te preparo una propuesta a tu medida." en="Tell me your idea and I'll prepare a proposal for you." /></p>
                )}
                <div className="px-actions">
                  <a className="btn btn-brass" href={wa(msg)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" aria-hidden="true" /> <T es="Quiero que me envíes esta propuesta" en="Send me this proposal" /></a>
                  <button type="button" className="px-link" onClick={() => { setForced(""); setStep(1); }}><T es="Cambiar mis respuestas" en="Change my answers" /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ───────── Ejemplos ───────── */}
        {tab === "ejemplos" && (
          <div className="px-ex" role="tabpanel">
            <h3 className="px-h3">{page.examplesTitle}</h3>
            <p className="lead mt-2 max-w-[38rem]">{page.examplesSub}</p>
            <div className="px-chips" role="tablist">
              {page.examples.map((e, i) => <button key={i} type="button" role="tab" aria-selected={exIdx === i} className={`px-chip ${exIdx === i ? "on" : ""}`} onClick={() => setExIdx(i)}>{e.sector}</button>)}
            </div>
            {(() => {
              const e = page.examples[Math.min(exIdx, page.examples.length - 1)];
              if (!e) return null;
              return (
                <div className="px-expanel" key={e.sector}>
                  <div><p className="px-l"><T es="Antes" en="Before" /></p><p>{e.problem}</p></div>
                  <div><p className="px-l ok"><T es="Con un sistema" en="With a system" /></p><p>{e.solution}</p></div>
                  <button type="button" className="btn btn-solid" onClick={() => fromExample(e.sector)}><T es="Quiero algo así" en="I want something like this" /> <ArrowRight className="size-4" aria-hidden="true" /></button>
                </div>
              );
            })()}
          </div>
        )}

        {/* ───────── Precios ───────── */}
        {tab === "precios" && (
          <div role="tabpanel" className="px-prices">
            <div className="px-prices-head">
              <div><h3 className="px-h3">{page.pricesTitle}</h3><p className="lead mt-2 max-w-[36rem]">{page.pricesSub}</p></div>
              <label className="px-iva"><input type="checkbox" checked={taxes} onChange={(e) => setTaxes(e.target.checked)} /> <T es="Con impuestos" en="With taxes" /></label>
            </div>
            {data !== null && cats.length > 1 && (
              <>
                <p className="px-step-label"><span>1</span><T es="Elige tu tipo de negocio" en="Pick your type of business" /></p>
                <div className="px-rubros" role="group">
                  {cats.map((c, i) => (
                    <button key={c} type="button" aria-pressed={rubro === c} className={`px-rubro ${rubro === c ? "on" : ""}`} style={{ background: TINT[i % 4] }} onClick={() => setCatF(c)}>
                      <b>{c}</b>
                      <small>{closed.filter((p) => catOf(p) === c).length} <T es="opciones" en="options" />{fromPrice(c) > 0 && <> · <T es="desde" en="from" /> {money(fromPrice(c) * mul)}</>}</small>
                    </button>
                  ))}
                </div>
              </>
            )}
            {data === null ? <p className="px-fine mt-8"><T es="Cargando precios…" en="Loading prices…" /></p> : closed.length === 0 ? (
              <p className="lead mt-8"><T es="Los precios se preparan según tu caso. Cuéntame tu idea y te hago una propuesta." en="Prices depend on your case. Tell me your idea and I'll prepare a proposal." /></p>
            ) : !rubro ? (
              <p className="px-fine mt-6"><T es="Toca tu tipo de negocio y verás las opciones y precios pensados para él." en="Tap your type of business to see the options and prices made for it." /></p>
            ) : (
              <>
              {cats.length > 1 && <p className="px-step-label mt-8"><span>2</span><T es={`Opciones para ${rubro}`} en={`Options for ${rubro}`} /></p>}
              <div className="px-pgrid">
                {inRubro.map((p, i) => {
                  const opts = payOptions(p);
                  const cur = opts.find((o) => o.mode === modes[p.id]) ?? opts[0];
                  const show = p.show_price !== false;
                  const pm = `Hola, me interesa «${p.name}»${show ? (cur.mode === "once" ? ` en pago único (${money(cur.once * mul)})` : ` con mensualidad (${money(cur.monthly * mul)} al mes y ${money(cur.setup * mul)} de activación)`) : ""}${taxes ? ", con impuestos" : ""}.`;
                  const yes = p.features.filter((f) => f.included);
                  return (
                    <article key={p.id} className={`px-pc ${p.recommended ? "rec" : ""}`}>
                      {p.recommended && <span className="px-badge"><T es="La más elegida" en="Most chosen" /></span>}
                      
                      <h4 className="display text-[length:var(--step-2)]">{p.name}</h4>
                      {p.tagline && <p className="text-[var(--mist)]">{p.tagline}</p>}
                      {show ? (
                        <div className="px-pricebox">
                          {opts.length > 1 && <div className="px-modes" role="radiogroup">{opts.map((o) => <button key={o.mode} type="button" role="radio" aria-checked={cur.mode === o.mode} className={`px-mode ${cur.mode === o.mode ? "on" : ""}`} onClick={() => setModes((m) => ({ ...m, [p.id]: o.mode }))}>{o.mode === "once" ? t("Pago único", "One payment") : t("Mensualidad", "Monthly")}</button>)}</div>}
                          {cur.mode === "once"
                            ? <p className="px-price"><b>{money(cur.once * mul)}</b> <small><T es="pago único" en="one payment" /></small></p>
                            : <><p className="px-price"><b>{money(cur.monthly * mul)}</b> <small><T es="al mes" en="per month" /></small></p>{cur.setup > 0 && <p className="px-fine"><T es={`+ ${money(cur.setup * mul)} de activación, una sola vez`} en={`+ ${money(cur.setup * mul)} setup, one time`} /></p>}</>}
                        </div>
                      ) : <p className="px-fine"><T es="El precio depende de tu caso. Te preparo una propuesta." en="The price depends on your case. I'll prepare a proposal." /></p>}
                      <ul className="px-ticks">{yes.slice(0, 5).map((f, j) => <li key={j}><Check className="size-4" aria-hidden="true" />{f.text}</li>)}</ul>
                      {yes.length > 5 && <details className="px-more"><summary><T es="Ver todo lo que incluye" en="See everything included" /></summary><ul className="px-ticks">{yes.slice(5).map((f, j) => <li key={j}><Check className="size-4" aria-hidden="true" />{f.text}</li>)}</ul></details>}
                      <a className={`btn ${p.recommended ? "btn-brass" : "btn-solid"} mt-auto`} href={wa(pm)} target="_blank" rel="noreferrer">{show ? <T es="Pedir este proyecto" en="Request this project" /> : <T es="Pedir propuesta" en="Request a proposal" />}</a>
                      <button type="button" className="px-link justify-center" onClick={() => ask(p.id)}><T es="Que me lo propongan" en="Propose it to me" /> <ArrowRight className="size-4" aria-hidden="true" /></button>
                    </article>
                  );
                })}
              </div>
              </>
            )}
            {rubro && extras.length > 0 && closed.length > 0 && <p className="px-extras"><b><T es="Extras:" en="Extras:" /></b> {extras.map((e) => `${e.name} ${e.approx ? "≈ " : ""}${money(e.amount * mul)} ${PERIOD_LABEL[e.period].es}`).join(" · ")}</p>}
            <p className="px-fine mt-4">{page.footer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
