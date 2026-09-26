"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Option<T extends string> = { id: T; label: string };

/**
 * Grupo de botones con indicador que se desliza.
 * Técnica: se duplica la lista con el estilo "activo" encima y se recorta (clip-path)
 * para que solo se vea el botón elegido. Al cambiar, se anima el recorte: fondo y
 * texto cambian juntos, sin dos colores cruzándose.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
  itemClassName,
  activeClassName,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
  itemClassName: string;
  activeClassName: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const btn = list.querySelector<HTMLElement>(`[data-id="${value}"]`);
      if (!btn) return;
      const top = btn.offsetTop;
      const left = btn.offsetLeft;
      const right = list.clientWidth - left - btn.offsetWidth;
      const bottom = list.clientHeight - top - btn.offsetHeight;
      setClip(`inset(${top}px ${right}px ${bottom}px ${left}px round 999px)`);
    };
    measure();
    // Activa la transición hasta después de la primera medida, para que no "vuele" al cargar
    const id = requestAnimationFrame(() => setReady(true));
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [value]);

  return (
    <div role="group" aria-label={label} ref={listRef} className={cn("seg", className)} data-ready={clip ? ready : undefined}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          data-id={o.id}
          className={itemClassName}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
      {clip && (
        <div aria-hidden="true" inert className={cn("seg-active", className)} style={{ clipPath: clip }}>
          {options.map((o) => (
            <span key={o.id} className={cn(itemClassName, activeClassName)}>
              {o.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
