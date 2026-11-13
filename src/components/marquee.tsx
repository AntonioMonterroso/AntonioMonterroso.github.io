import { T } from "@/components/t";

const words = {
  es: ["A tu medida", "Con tu marca", "Rápida", "En el celular", "Sin plantillas"],
  en: ["Made to fit", "Your brand", "Fast", "Mobile-first", "No templates"],
};

/** Franja con palabras grandes que corre sola entre secciones. */
export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = (lang: "es" | "en") => (
    <>
      {[0, 1].map((k) => (
        <span key={k} className="marquee-group" aria-hidden={k === 1 || undefined}>
          {words[lang].map((w, i) => (
            <span key={w} className={i % 2 ? "marquee-word marquee-outline" : "marquee-word"}>
              {w}
              <i aria-hidden="true">✳</i>
            </span>
          ))}
        </span>
      ))}
    </>
  );
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""}`} role="presentation">
      <div className="marquee-track">
        <T es={row("es")} en={row("en")} />
      </div>
    </div>
  );
}
