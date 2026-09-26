import { Fragment } from "react";

/**
 * Parte un texto en palabras enmascaradas para el revelado por líneas
 * ([data-reveal="lines"]). RevealObserver agrupa las palabras por renglón
 * al momento de revelar, así el escalonado sigue las líneas reales en cualquier ancho.
 */
export function Split({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
