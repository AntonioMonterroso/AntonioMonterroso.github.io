"use client";

import { useEffect, useRef, useState } from "react";
import { money } from "@/lib/pricing";

/**
 * Un monto que, al cambiar, cuenta hasta el nuevo valor en vez de saltar de golpe.
 * Con «reducir movimiento» cambia directo.
 */
export function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 520;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1;
      const e = 1 - Math.pow(1 - k, 4); // ease-out
      const v = start + (value - start) * e;
      from.current = v;
      setShown(k === 1 ? value : Math.round(v));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className="tabular-nums">{money(shown)}</span>;
}
