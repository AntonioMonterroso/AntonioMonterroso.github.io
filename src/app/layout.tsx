import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const display = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const title = "Monterroso Dev Studio — Páginas web y sistemas a tu medida";
const description =
  "Estudio de desarrollo en Guatemala. Diseñamos y programamos páginas web, paneles administrativos, Excel automatizado y ERP con tu color, tu logo y tu forma de trabajar.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_GT",
    alternateLocale: ["en_US"],
    siteName: site.name,
  },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

// Aplica idioma y paleta guardados antes de pintar, para evitar un parpadeo.
const prefsScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var l=localStorage.getItem('mds-lang');if(l==='en'||l==='es')d.lang=l;var p=localStorage.getItem('mds-palette');if(p==='crema'||p==='salvia'||p==='rosa'||p==='lila'||p==='marino'||p==='bosque'||p==='vino')d.dataset.palette=p;}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description,
  url: site.url,
  email: site.email,
  areaServed: ["GT", "Worldwide"],
  address: { "@type": "PostalAddress", addressCountry: "GT" },
  knowsAbout: ["Desarrollo web", "Paneles administrativos", "Excel y VBA", "ERP"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-palette="crema"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${code.variable} h-full antialiased`}
    >
      <head>
        <Script id="prefs" strategy="beforeInteractive">
          {prefsScript}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full"><div className="aurora" aria-hidden="true"><i /><i /><i /></div>{children}</body>
    </html>
  );
}
