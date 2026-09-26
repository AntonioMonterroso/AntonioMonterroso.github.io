import Image from "next/image";
import { T } from "@/components/t";
import { sistemasIsometrico } from "@/lib/images";

const services = [
  {
    n: "01",
    title: { es: "Páginas web y landing pages", en: "Websites and landing pages" },
    body: {
      es: "Sitios rápidos que explican lo que haces y convierten visitas en mensajes. Se ven bien en el celular, cargan en segundos y Google los encuentra.",
      en: "Fast sites that explain what you do and turn visits into messages. They look right on a phone, load in seconds and Google can find them.",
    },
    tags: [
      { es: "Diseño con tu marca", en: "Designed around your brand" },
      { es: "Formularios y WhatsApp", en: "Forms and WhatsApp" },
      { es: "SEO básico", en: "SEO basics" },
      { es: "Español / inglés", en: "Spanish / English" },
    ],
  },
  {
    n: "02",
    title: { es: "Paneles administrativos", en: "Admin panels" },
    body: {
      es: "Un solo lugar para ver ventas, clientes, pagos o citas, sin buscar en diez archivos. Cada persona entra con su usuario y ve lo que le toca.",
      en: "One place to see sales, clients, payments or appointments without digging through ten files. Everyone logs in and sees what's theirs.",
    },
    tags: [
      { es: "Usuarios y roles", en: "Users and roles" },
      { es: "Reportes", en: "Reports" },
      { es: "Base de datos en la nube", en: "Cloud database" },
      { es: "Funciona en el celular", en: "Works on mobile" },
    ],
  },
  {
    n: "03",
    title: { es: "Excel y VBA a la medida", en: "Custom Excel and VBA" },
    body: {
      es: "Si tu empresa vive en Excel, no te pedimos que lo dejes. Lo automatizamos: macros, formularios y reportes que se arman solos. Menos copiar y pegar, menos errores.",
      en: "If your company runs on Excel, we won't ask you to drop it. We automate it: macros, forms and reports that build themselves. Less copy-paste, fewer mistakes.",
    },
    tags: [
      { es: "Macros", en: "Macros" },
      { es: "Formularios", en: "Forms" },
      { es: "Reportes automáticos", en: "Automatic reports" },
      { es: "Libros protegidos", en: "Protected workbooks" },
    ],
  },
  {
    n: "04",
    title: { es: "ERP completo", en: "Full ERP" },
    body: {
      es: "Inventario, ventas, compras, contabilidad y planillas conectados en un sistema. Tu propia instalación, tu propia base de datos y funciones nuevas cuando las necesites.",
      en: "Inventory, sales, purchasing, accounting and payroll connected in one system. Your own install, your own database, and new features when you need them.",
    },
    tags: [
      { es: "Módulos por área", en: "Modules per department" },
      { es: "Tus datos, aparte", en: "Your data, kept separate" },
      { es: "Crece contigo", en: "Grows with you" },
    ],
  },
];

export function Services() {
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div data-reveal>
            <p className="kicker"><T es="Qué hacemos" en="What we do" /></p>
            <h2 id="servicios-title" className="display mt-5 text-[length:var(--step-4)]">
              <T
                es="Una página web puede hacer mucho más que verse bien."
                en="A website can do a lot more than look good."
              />
            </h2>
          </div>
          <p className="lead max-w-[36rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <T
              es="Puede cobrar, agendar, llevar tu inventario, mandar reportes y ahorrarte horas de Excel. Trabajamos en cuatro frentes, y casi siempre se combinan."
              en="It can take payments, book appointments, track inventory, send reports and save you hours of Excel. We work on four fronts, and they usually end up working together."
            />
          </p>
        </div>

        <div className="mt-16">
          {services.map((s) => (
            <article key={s.n} className="service-row" data-reveal>
              <span className="service-num">{s.n}</span>
              <h3 className="display text-[length:var(--step-3)] !leading-[1.08]">
                <T es={s.title.es} en={s.title.en} />
              </h3>
              <div>
                <p className="text-[color-mix(in_oklab,var(--snow)_80%,var(--mist))]">
                  <T es={s.body.es} en={s.body.en} />
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t.es} className="tag"><T es={t.es} en={t.en} /></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--deep)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col justify-center gap-5 p-[clamp(1.75rem,1rem+3vw,3.5rem)]">
            <p className="kicker"><T es="Y también" en="And also" /></p>
            <h3 className="display text-[length:var(--step-3)]">
              <T es="Lo que hoy haces a mano." en="Whatever you still do by hand." />
            </h3>
            <p className="text-[color-mix(in_oklab,var(--snow)_80%,var(--mist))]">
              <T
                es="Automatizaciones, portales para tus clientes, agendas, cotizadores, tableros de indicadores, avisos por WhatsApp y correo. Si se repite todos los días, casi seguro se puede programar."
                en="Automations, client portals, booking calendars, quote builders, KPI dashboards, WhatsApp and email alerts. If it happens every day, it can almost certainly be automated."
              />
            </p>
          </div>
          <div className="photo photo-tint !rounded-none min-h-64">
            <Image
              src={sistemasIsometrico.src}
              width={sistemasIsometrico.width}
              height={sistemasIsometrico.height}
              alt="Ilustración de una computadora con código, un servidor y los lenguajes HTML, CSS, JavaScript y PHP"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
