import { Fragment } from "react";

/**
 * Parte un texto en palabras enmascaradas para el revelado por líneas
 * ([data-reveal="lines"]). RevealObserver agrupa las palabras por renglón
 * al momento de revelar, así el escalonado sigue las líneas reales en cualquier ancho.
 * `mark`: palabra que, al aparecer, se subraya con un trazo hecho a mano.
 */
export function Split({ text, mark }: { text: string; mark?: string }) {
  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[.,;:!?¿¡]/g, "").toLowerCase();
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          {mark && clean(w) === mark.toLowerCase() ? (
            <span className="w w-mark">
              <span>{w}</span>
              <svg className="scribble" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 9.5C22 4.5 46 3.8 70 5.6c9 .7 18 1.8 27 3.6" pathLength={1} />
              </svg>
            </span>
          ) : (
            <span className="w">
              <span>{w}</span>
            </span>
          )}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
