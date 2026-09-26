/* ═══════════════════════════════════════════════════════════════════════════
   CONTENIDO EDITABLE DE LA PÁGINA — Monterroso Dev Studio

   Aquí cambias contacto, links de GitHub, redes, horario, precios y proyectos.
   Reglas sencillas:
     • El texto va entre comillas: "así".
     • Donde dice null significa "todavía no hay". Cámbialo por "el-link-entre-comillas".
     • No borres las comas del final de cada línea.
   Si editas este archivo en github.com y guardas (Commit changes), la página
   se vuelve a publicar sola en uno o dos minutos.
   ═══════════════════════════════════════════════════════════════════════════ */

export const site = {
  name: "Monterroso Dev Studio",

  // ── Contacto ──────────────────────────────────────────────────────────────
  email: "Jocetony02@gmail.com",
  phoneDisplay: "+502 3764 5139", // como se ve en la página
  whatsapp: "50237645139", // solo números, con código de país (502)
  location: { es: "Guatemala · clientes de cualquier país", en: "Guatemala · clients anywhere" },

  // Horario de atención. Ejemplo: { es: "Lunes a viernes, 8:00 a 17:00", en: "Monday to Friday, 8am to 5pm" }
  hours: null as null | { es: string; en: string },

  // ── GitHub y redes ────────────────────────────────────────────────────────
  // Tu perfil de GitHub. Ejemplo: "https://github.com/tu-usuario"
  github: null as null | string,

  // Redes sociales. Ejemplo:
  // social: [
  //   { label: "Instagram", href: "https://instagram.com/tu-cuenta" },
  //   { label: "LinkedIn", href: "https://linkedin.com/in/tu-perfil" },
  // ],
  social: [] as { label: string; href: string }[],

  // Dirección pública de la página. La publicación en GitHub la llena sola;
  // cámbiala solo si compras un dominio propio.
  url: process.env.SITE_URL || "https://monterroso-dev-studio.github.io",
};

/* ── Proyectos (sección "Trabajos") ──────────────────────────────────────────
   Para cada proyecto, cambia  demo: null  por el link de su demo, por ejemplo
   demo: "https://github.com/tu-usuario/promad-cloud",
   Mientras diga null, la página muestra "(demo en GitHub, próximamente)".
   cat puede ser: "web", "panel", "erp" o "esp" (especializado).            */
export const projects: {
  cat: "web" | "panel" | "erp" | "esp";
  name: { es: string; en: string };
  body: { es: string; en: string };
  demo: string | null;
}[] = [
  {
    cat: "erp",
    name: { es: "ProMad Cloud", en: "ProMad Cloud" },
    body: {
      es: "ERP propio que se instala por cliente: su dirección web, su base de datos y sus funciones, sin mezclarse con nadie más.",
      en: "Our own ERP, installed per client: their own address, their own database and their own features, never mixed with anyone else's.",
    },
    demo: null,
  },
  {
    cat: "esp",
    name: { es: "AR Monterroso", en: "AR Monterroso" },
    body: {
      es: "Evaluación de riesgo AML/CFT para firmas contables, bajo el Decreto 15-2026 de Guatemala.",
      en: "AML/CFT risk assessment for accounting firms under Guatemala's Decree 15-2026.",
    },
    demo: null,
  },
  {
    cat: "panel",
    name: { es: "Centro de sistemas", en: "Systems hub" },
    body: {
      es: "Reúne contabilidad, agendas, calendario, pagos, planillas y cierres de una firma de auditoría en un mismo lugar.",
      en: "Brings an audit firm's accounting, agendas, calendar, payments, payroll and closings into one place.",
    },
    demo: null,
  },
  {
    cat: "panel",
    name: { es: "Inventario y ventas", en: "Inventory and sales" },
    body: {
      es: "Productos únicos, varias vendedoras, cajas, gastos y comisiones que se calculan solas.",
      en: "One-of-a-kind products, several sellers, cash registers, expenses and commissions that calculate themselves.",
    },
    demo: null,
  },
  {
    cat: "panel",
    name: { es: "Panel para restaurante", en: "Restaurant panel" },
    body: {
      es: "La administración de un restaurante, desde el navegador.",
      en: "Running a restaurant's back office from the browser.",
    },
    demo: null,
  },
  {
    cat: "panel",
    name: { es: "Clientes y reportes", en: "Clients and reports" },
    body: {
      es: "Seguimiento de clientes y reportes para una empresa agropecuaria.",
      en: "Client tracking and reporting for an agricultural business.",
    },
    demo: null,
  },
  {
    cat: "panel",
    name: { es: "Control de proyectos", en: "Project tracking" },
    body: {
      es: "Acceso por usuario y el avance de cada proyecto en una sola vista.",
      en: "Per-user access and every project's progress in a single view.",
    },
    demo: null,
  },
  {
    cat: "web",
    name: { es: "Web corporativa", en: "Corporate website" },
    body: {
      es: "Sitio para una firma de auditoría y consultoría.",
      en: "Website for an audit and consulting firm.",
    },
    demo: null,
  },
  {
    cat: "esp",
    name: { es: "Foco del día", en: "Focus of the day" },
    body: {
      es: "Una app pequeña de productividad personal.",
      en: "A small personal productivity app.",
    },
    demo: null,
  },
];

/* ── Precios de los planes (sección "Planes") ───────────────────────────────
   Mientras diga null, la página muestra "Precio (por cotizar)".
   Ejemplo: presencia: { es: "Desde Q2,500", en: "From $325" },              */
export const planPrices: Record<"presencia" | "operacion" | "empresa", null | { es: string; en: string }> = {
  presencia: null,
  operacion: null,
  empresa: null,
};

/* ─────────────── De aquí para abajo no hace falta tocar nada ─────────────── */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const projectTypes = [
  { id: "web", es: "Página web", en: "Website" },
  { id: "panel", es: "Panel administrativo", en: "Admin panel" },
  { id: "excel", es: "Excel y VBA", en: "Excel & VBA" },
  { id: "erp", es: "ERP", en: "ERP" },
  { id: "otro", es: "Otra cosa", en: "Something else" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];

export const palettes = [
  { id: "marino", es: "Marino", en: "Navy", ink: "#07111f", accent: "#1a3558" },
  { id: "bosque", es: "Bosque", en: "Forest", ink: "#08120d", accent: "#1e3c2e" },
  { id: "vino", es: "Vino", en: "Wine", ink: "#14080c", accent: "#43202c" },
  { id: "grafito", es: "Grafito", en: "Graphite", ink: "#0e0f11", accent: "#2e3237" },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];
