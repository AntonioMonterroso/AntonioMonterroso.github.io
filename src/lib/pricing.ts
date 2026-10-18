import { world } from "@/lib/site";

/* Precios y propuestas: los datos los edita Antonio en Monterroso World (Trabajo → Precios públicos y Propuestas)
   y esta página los lee en vivo. Aquí solo viven los tipos, las cuentas y los textos de arranque. */
export type Feature = { text: string; included: boolean };
export type Billing = "once" | "monthly" | "both";
export type PayMode = "once" | "monthly";
export type Pkg = {
  id: string; name: string; tagline: string | null; kind: "closed" | "custom";
  setup_fee: number; monthly_fee: number; once_price?: number; billing?: Billing;
  price_note: string | null; category?: string | null; show_price?: boolean;
  features: Feature[]; recommended: boolean; published: boolean; position: number;
};
export type Extra = { id: string; name: string; detail: string | null; amount: number; period: "once" | "month" | "year"; approx: boolean; published: boolean; position: number };
export type Pair = { title: string; text: string };
export type Example = { sector: string; problem: string; solution: string };
export type Page = {
  steps: Pair[]; faq: { q: string; a: string }[];
  monthlyTitle: string; monthlyText: string; footer: string; validity_days: number;
  examplesTitle: string; examplesSub: string; examples: Example[];
  pricesTitle: string; pricesSub: string;
  whatsapp_text: string;
};

export const PERIOD_LABEL = { once: { es: "una vez", en: "one time" }, month: { es: "al mes", en: "per month" }, year: { es: "al año", en: "per year" } } as const;
/** Los impuestos se muestran como un simple "con impuestos": el cliente no ve el porcentaje. */
export const TAX_RATE = 0.12;
const r2 = (n: number) => Math.round(n * 100) / 100;

export const DEFAULT_PAGE: Page = {
  steps: [
    { title: "Inicio del proyecto", text: "Se abona la activación para comenzar con tu marca, logotipo, precios e imágenes." },
    { title: "Configuración e integración", text: "Dejamos listo tu catálogo, horarios y el panel de administración en tu teléfono." },
    { title: "Capacitación", text: "Te muestro cómo usar tu panel, gestionar tu información y revisar tus números." },
    { title: "Entrega y puesta en marcha", text: "Se entrega en aproximadamente 1 semana, o menos, listo para compartir con tus clientes." },
  ],
  faq: [
    { q: "¿Cómo reservan mis clientes?", a: "Eligen el servicio, la fecha y la hora disponible y confirman con su nombre y teléfono, sin crear contraseñas." },
    { q: "¿Y si prefieren escribirme?", a: "Pueden seguir escribiéndote por WhatsApp con el botón integrado en la página." },
    { q: "¿Mis datos están seguros?", a: "Sí. Tu base de clientes, historial y finanzas son privados y solo se ven desde tu cuenta de administrador." },
    { q: "¿Puedo cambiar de paquete después?", a: "Sí. Puedes empezar con uno y subir al otro cuando quieras, pagando solo la diferencia." },
  ],
  monthlyTitle: "¿Qué incluye la mensualidad?",
  monthlyText: "El sistema funcionando 24/7, soporte por WhatsApp, cambios de precios, fotos y ajustes pequeños, actualizaciones continuas, respaldo diario de datos y la infraestructura. Mínimo de permanencia inicial de 3 meses. Tus datos son 100% tuyos. Los cambios grandes se analizan y pueden ajustar la mensualidad.",
  footer: "Precios expresados en quetzales. Si necesitas factura, activa «Con impuestos» para ver el precio final. Los montos del dominio son aproximados y los fijan los proveedores globales.",
  validity_days: 15,
  examplesTitle: "Problemas que ya resolvemos",
  examplesSub: "Cada negocio es distinto, pero los dolores se parecen. Estos son ejemplos del tipo de proyectos que construyo.",
  examples: [
    { sector: "Barbería o salón", problem: "Las citas llegan por WhatsApp y se cruzan; los clientes faltan sin avisar.", solution: "Reservas en línea con horas libres, recordatorios en un toque y la agenda del día en tu teléfono." },
    { sector: "Pastelería y postres", problem: "Los pedidos por encargo se anotan en una libreta: se pierden fechas, anticipos y gustos del cliente.", solution: "Catálogo de postres con fotos y precios, pedidos con fecha de entrega, anticipo y saldo, y un aviso el día de cada entrega." },
    { sector: "Restaurante o cafetería", problem: "Menú, ventas del día y gastos viven en papeles y en la memoria de alguien.", solution: "Un panel donde ves lo vendido hoy, los gastos y el cierre de caja, y cambias el menú tú mismo." },
    { sector: "Tienda con vendedoras", problem: "Inventario de productos únicos y comisiones calculadas a mano cada fin de mes.", solution: "Inventario, cajas y gastos en un solo lugar, con las comisiones calculadas solas." },
    { sector: "Oficina o despacho formal", problem: "Agendas, pagos, planillas y cierres en carpetas distintas; nadie sabe qué sigue.", solution: "Un centro de sistemas con usuarios y roles: cada persona ve lo suyo y todo queda ordenado por cliente." },
    { sector: "Empresa con clientes y reportes", problem: "Seguimiento de clientes en hojas sueltas y reportes armados a mano.", solution: "Seguimiento de clientes y reportes descargables, siempre al día." },
  ],
  pricesTitle: "Precios de proyectos listos",
  pricesSub: "Si ya sabes lo que necesitas, aquí está claro. ¿Algo distinto? Pide una propuesta y la preparo a tu medida.",
  whatsapp_text: "Hola, vi tus precios y me interesa",
};

// ───────── Qué recomendar según lo que quiere lograr ─────────
export type Goal = "found" | "booking" | "control" | "accounting" | "domain" | "other";
export const GOALS: { id: Goal; es: string; en: string; why: string }[] = [
  { id: "found", es: "Que me encuentren en internet", en: "Be found online", why: "Una página clara con tus servicios, tu ubicación y un botón de WhatsApp hace que quien te busca te encuentre y te escriba." },
  { id: "booking", es: "Recibir citas o reservas solo", en: "Get bookings on autopilot", why: "Con reservas en línea, tus clientes eligen su hora a cualquier hora y tú dejas de contestar el mismo mensaje cien veces." },
  { id: "control", es: "Controlar ventas, inventario o clientes", en: "Track sales, stock or clients", why: "Un sistema a tu medida te muestra cuánto entró, qué falta y quién te compra, sin hojas sueltas." },
  { id: "accounting", es: "Ordenar mi contabilidad o mis reportes", en: "Organize my books or reports", why: "Los reportes que hoy armas a mano pueden salir solos, con tu forma de trabajar." },
  { id: "domain", es: "Tener mi propio dominio (.com)", en: "Have my own .com domain", why: "Un .com a tu nombre se ve serio y se recuerda fácil." },
  { id: "other", es: "Otra cosa", en: "Something else", why: "Cuéntame y lo pensamos juntos." },
];
export function recommendPkg(goals: Goal[], pkgs: Pkg[]): Pkg | undefined {
  const sorted = [...pkgs].sort((a, b) => a.position - b.position);
  const closed = sorted.filter((p) => p.kind === "closed");
  const custom = sorted.find((p) => p.kind === "custom");
  if (goals.includes("control") || goals.includes("accounting")) return custom ?? closed.at(-1);
  if (goals.includes("booking")) return closed.find((p) => p.recommended) ?? closed.at(-1) ?? custom;
  if (goals.includes("found")) return closed[0] ?? custom;
  return closed.find((p) => p.recommended) ?? closed[0] ?? custom;
}

// ───────── Cuentas ─────────
export const billingOf = (p: Pkg): Billing => p.billing ?? "monthly";
export function payOptions(p: Pkg): { mode: PayMode; once: number; setup: number; monthly: number }[] {
  const b = billingOf(p);
  const out: { mode: PayMode; once: number; setup: number; monthly: number }[] = [];
  if ((b === "once" || b === "both") && Number(p.once_price) > 0) out.push({ mode: "once", once: Number(p.once_price), setup: 0, monthly: 0 });
  if (b === "monthly" || b === "both" || out.length === 0) out.push({ mode: "monthly", once: 0, setup: Number(p.setup_fee), monthly: Number(p.monthly_fee) });
  return out;
}
export type Line = { id: string; label: string; detail?: string; qty: number; unit: number; period: "once" | "month" | "year"; optional?: boolean; on?: boolean };
let n = 0;
const uid = () => `l${++n}`;
export function linesFromPick(o: { pkg?: Pkg; extras: Extra[]; mode?: PayMode }): Line[] {
  const out: Line[] = [];
  if (o.pkg) {
    const opts = payOptions(o.pkg);
    const x = opts.find((q) => q.mode === o.mode) ?? opts[0];
    if (x.mode === "once") out.push({ id: uid(), label: `Pago único · ${o.pkg.name}`, qty: 1, unit: x.once, period: "once" });
    else {
      if (x.setup > 0) out.push({ id: uid(), label: `Activación · ${o.pkg.name}`, qty: 1, unit: x.setup, period: "once" });
      if (x.monthly > 0) out.push({ id: uid(), label: `Mensualidad · ${o.pkg.name}`, qty: 1, unit: x.monthly, period: "month" });
    }
  }
  for (const e of o.extras) out.push({ id: uid(), label: e.name, qty: 1, unit: Number(e.amount), period: e.period });
  return out;
}
/** Suma por periodo; con `taxes` se muestra el precio final con impuestos. */
export function totals(lines: Line[], taxes: boolean): { once: number; month: number; year: number } {
  const by = (p: Line["period"]) => lines.filter((l) => l.period === p && (!l.optional || l.on)).reduce((s, l) => s + Math.max(0, l.qty) * Math.max(0, l.unit), 0);
  const k = taxes ? 1 + TAX_RATE : 1;
  return { once: r2(by("once") * k), month: r2(by("month") * k), year: r2(by("year") * k) };
}
const GTQ = new Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ", maximumFractionDigits: 2 });
export const money = (v: number) => GTQ.format(v);

// ───────── Lectura pública (no requiere sesión) ─────────
async function rpc<T>(fn: string, body: object): Promise<T | null> {
  try {
    const r = await fetch(`${world.supabaseUrl}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: { apikey: world.anonKey, Authorization: `Bearer ${world.anonKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}
export type Pricing = { page: Partial<Page>; packages: Pkg[]; extras: Extra[] };
export const fetchPricing = () => rpc<Pricing>("public_pricing", {});

export type Milestone = { id: string; title: string; status: "todo" | "doing" | "done"; note?: string };
export type UpdateNote = { id: string; date: string; text: string };
export type Progress = { milestones?: Milestone[]; updates?: UpdateNote[]; eta?: string | null; headline?: string };
export type Body = { intro: string; sections: { title: string; items: string[] }[]; exclusions: string[]; support: string; process: Pair[]; conditions: string[]; notes: string };
export type SharedQuote = {
  title: string; client_name: string; client_contact: string | null; status: "draft" | "sent" | "accepted" | "rejected";
  lines: Line[]; iva: "none" | "included" | "added"; upfront_pct: number; valid_until: string | null;
  body: Body; progress?: Progress; page: Partial<Page>; created_at?: string;
};
export const fetchQuote = (t: string) => rpc<SharedQuote>("quote_by_token", { t });

/** Si la lectura falla (sin internet, por ejemplo), se muestran los paquetes de arranque en lugar de dejar vacía la sección. */
export const FALLBACK_PACKAGES: Pkg[] = [
  { id: "f1", name: "Página de presentación", tagline: "Para que te encuentren y te escriban, con una vitrina que se ve profesional.", kind: "closed", setup_fee: 500, monthly_fee: 250, price_note: null, recommended: false, published: true, position: 1, billing: "monthly",
    features: [{ text: "Diseño propio con tus colores, logo y fotos", included: true }, { text: "Catálogo de servicios con precios", included: true }, { text: "Estilos, ubicación y horario", included: true }, { text: "Botón de WhatsApp para pedir cita", included: true }, { text: "Vista previa bonita al compartir el link", included: true }, { text: "Sin reservas en línea", included: false }] },
  { id: "f2", name: "Sistema completo de citas", tagline: "Para que tus clientes reserven solos y tú tengas todo el día en una pantalla.", kind: "closed", setup_fee: 600, monthly_fee: 350, price_note: null, recommended: true, published: true, position: 2, billing: "monthly",
    features: [{ text: "Reserva en línea con horas libres en tiempo real", included: true }, { text: "El cliente confirma, reprograma o cancela solo", included: true }, { text: "Panel en el teléfono (se instala como app)", included: true }, { text: "Avisos al teléfono: cita nueva, cancelación, confirmación", included: true }, { text: "Recordatorio de mañana por WhatsApp en un toque", included: true }, { text: "Clientes, faltas, cumpleaños y ficha de preferencias", included: true }, { text: "Finanzas: ingresos, gastos, reportes y cierre de caja", included: true }] },
  { id: "f3", name: "Programa a tu medida", tagline: "Para lo que no cabe en una plantilla: contabilidad, inventarios, paneles, lo que tu operación pida.", kind: "custom", setup_fee: 0, monthly_fee: 0, price_note: "Se cotiza según módulos", recommended: false, published: true, position: 3, billing: "monthly",
    features: [{ text: "Análisis de lo que necesitas", included: true }, { text: "Módulos a tu elección", included: true }, { text: "Instalación, adecuación y capacitación", included: true }, { text: "Soporte y garantía inicial", included: true }, { text: "Propuesta formal por escrito", included: true }] },
];
export const FALLBACK_EXTRAS: Extra[] = [
  { id: "fe1", name: "Dominio propio (.com)", detail: "Tu cliente entra escribiendo tunegocio.com. Se registra a tu nombre y se paga al registrador; ronda entre US$10 y US$11 al año.", amount: 85, period: "year", approx: true, published: true, position: 1 },
];
