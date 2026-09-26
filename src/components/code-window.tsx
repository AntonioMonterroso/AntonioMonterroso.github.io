"use client";

import { useEffect, useState } from "react";
import { usePrefs } from "@/components/prefs";

const needs = {
  es: ["una web que venda", "un panel administrativo", "Excel que trabaje solo", "un ERP completo", "control de inventario", "reportes en un clic"],
  en: ["a website that sells", "an admin panel", "Excel that runs itself", "a full ERP", "inventory control", "one-click reports"],
};

function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    if (reduce) {
      const id = setInterval(() => {
        i = (i + 1) % words.length;
        setText(words[i]);
      }, 2600);
      return () => clearInterval(id);
    }

    let chars = words[0].length;
    let deleting = true;
    const tick = () => {
      const word = words[i];
      if (deleting) {
        chars -= 1;
        setText(word.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
        timer = setTimeout(tick, 28);
      } else {
        const next = words[i];
        chars += 1;
        setText(next.slice(0, chars));
        if (chars === next.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
        } else {
          timer = setTimeout(tick, 55);
        }
      }
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

// Se monta con key={lang}: al cambiar de idioma arranca de nuevo con la primera palabra.
function Need({ words }: { words: string[] }) {
  const text = useTypewriter(words);
  return <span className="tok-str">&quot;{text}</span>;
}

export function CodeWindow() {
  const { lang } = usePrefs();
  const k = lang === "en"
    ? { obj: "project", client: "client", clientV: "your company", colors: "colors", colorsV: "yours", needs: "needs", templates: "templates" }
    : { obj: "proyecto", client: "cliente", clientV: "tu empresa", colors: "colores", colorsV: "los tuyos", needs: "necesita", templates: "plantillas" };

  return (
    <figure className="code-window" aria-label={lang === "en" ? "Project sketch in code" : "Boceto del proyecto en código"}>
      <div className="code-titlebar">
        <span className="code-dot" style={{ background: "#e0685a" }} />
        <span className="code-dot" style={{ background: "#e3b34f" }} />
        <span className="code-dot" style={{ background: "#63b173" }} />
        <span className="ml-3 text-[0.8125rem] text-[var(--mist)]">{k.obj}.config.js</span>
      </div>
      <pre className="code-body">
        <code>
          <span className="tok-kw">const</span> <span className="text-[var(--snow)]">{k.obj}</span> = {"{"}
          {"\n  "}
          <span className="tok-key">{k.client}</span>: <span className="tok-str">&quot;{k.clientV}&quot;</span>,
          {"\n  "}
          <span className="tok-key">{k.colors}</span>: <span className="tok-str">&quot;{k.colorsV}&quot;</span>,
          {"\n  "}
          <span className="tok-key">{k.needs}</span>: <Need key={lang} words={needs[lang]} />
          <span className="caret" aria-hidden="true" />
          <span className="tok-str">&quot;</span>,
          {"\n  "}
          <span className="tok-key">{k.templates}</span>: <span className="tok-num">0</span>,
          {"\n"}
          {"};"}
        </code>
      </pre>
    </figure>
  );
}
