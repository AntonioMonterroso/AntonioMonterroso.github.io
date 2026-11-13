/**
 * Dibujitos de cada servicio, hechos con código (no son fotos).
 * Se animan cuando su tarjeta aparece en pantalla ([data-visible] en .service-row).
 */
export function ServiceArt({ kind }: { kind: "web" | "panel" | "excel" | "erp" }) {
  return (
    <svg className={`art art-${kind}`} viewBox="0 0 160 100" aria-hidden="true" focusable="false">
      {kind === "web" && (
        <>
          <rect className="art-frame" x="56" y="4" width="48" height="92" rx="10" />
          <rect className="art-soft" x="74" y="9" width="12" height="3" rx="1.5" />
          <rect className="art-line" x="63" y="22" width="34" height="14" rx="3" style={{ ["--i" as string]: 0 }} />
          <rect className="art-line" x="63" y="42" width="30" height="3" rx="1.5" style={{ ["--i" as string]: 1 }} />
          <rect className="art-line" x="63" y="49" width="22" height="3" rx="1.5" style={{ ["--i" as string]: 2 }} />
          <rect className="art-line" x="63" y="56" width="26" height="3" rx="1.5" style={{ ["--i" as string]: 3 }} />
          <rect className="art-fill art-pop" x="63" y="72" width="34" height="10" rx="5" style={{ ["--i" as string]: 4 }} />
          <circle className="art-fill art-pop" cx="128" cy="30" r="7" style={{ ["--i" as string]: 6 }} />
          <path className="art-draw" d="M121 30h-14" pathLength={1} style={{ ["--i" as string]: 5 }} />
        </>
      )}
      {kind === "panel" && (
        <>
          <rect className="art-frame" x="8" y="8" width="144" height="84" rx="8" />
          <path className="art-frame" d="M40 8v84" />
          <rect className="art-soft" x="15" y="18" width="18" height="3" rx="1.5" />
          <rect className="art-soft" x="15" y="27" width="14" height="3" rx="1.5" />
          <rect className="art-soft" x="15" y="36" width="16" height="3" rx="1.5" />
          {[30, 48, 38, 62, 54, 70].map((h, i) => (
            <rect key={i} className="art-bar" x={52 + i * 16} y={84 - h} width="9" height={h} rx="2" style={{ ["--i" as string]: i }} />
          ))}
        </>
      )}
      {kind === "excel" && (
        <>
          <rect className="art-frame" x="14" y="10" width="132" height="80" rx="6" />
          {[1, 2, 3, 4].map((r) => (
            <path key={`r${r}`} className="art-frame" d={`M14 ${10 + r * 16}h132`} />
          ))}
          {[1, 2, 3, 4].map((c) => (
            <path key={`c${c}`} className="art-frame" d={`M${14 + c * 26.4} 10v80`} />
          ))}
          {[
            [1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3],
          ].map(([c, r], i) => (
            <rect key={i} className="art-cell" x={14 + c * 26.4 + 4} y={10 + r * 16 + 5} width="18" height="6" rx="2" style={{ ["--i" as string]: i }} />
          ))}
          <rect className="art-fill art-pop" x={14 + 4 * 26.4 + 3} y={10 + 4 * 16 + 4} width="20" height="8" rx="2" style={{ ["--i" as string]: 10 }} />
        </>
      )}
      {kind === "erp" && (
        <>
          <path className="art-draw" d="M80 50L30 22" pathLength={1} style={{ ["--i" as string]: 0 }} />
          <path className="art-draw" d="M80 50L130 22" pathLength={1} style={{ ["--i" as string]: 1 }} />
          <path className="art-draw" d="M80 50L30 80" pathLength={1} style={{ ["--i" as string]: 2 }} />
          <path className="art-draw" d="M80 50L130 80" pathLength={1} style={{ ["--i" as string]: 3 }} />
          <rect className="art-node" x="14" y="12" width="32" height="20" rx="6" style={{ ["--i" as string]: 1 }} />
          <rect className="art-node" x="114" y="12" width="32" height="20" rx="6" style={{ ["--i" as string]: 2 }} />
          <rect className="art-node" x="14" y="70" width="32" height="20" rx="6" style={{ ["--i" as string]: 3 }} />
          <rect className="art-node" x="114" y="70" width="32" height="20" rx="6" style={{ ["--i" as string]: 4 }} />
          <circle className="art-fill art-pop" cx="80" cy="50" r="13" style={{ ["--i" as string]: 0 }} />
        </>
      )}
    </svg>
  );
}
