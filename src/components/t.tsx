import type { ReactNode } from "react";

/** Texto bilingüe. Renderiza ambos idiomas y el CSS muestra el activo (html[lang]). */
export function T({ es, en }: { es: ReactNode; en: ReactNode }) {
  return (
    <>
      <span className="l-es">{es}</span>
      <span className="l-en" lang="en">
        {en}
      </span>
    </>
  );
}
