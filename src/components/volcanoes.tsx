/**
 * Paisaje del hero: Acatenango, Fuego y Agua entre capas de niebla, con las luces
 * del valle al pie. Todo usa las variables de la paleta activa.
 */
const lights = [
  [548, 918, 1.6], [566, 926, 2.2], [590, 914, 1.4], [612, 930, 1.8], [640, 921, 2.4], [662, 934, 1.5],
  [688, 917, 1.9], [705, 928, 1.3], [731, 922, 2.1], [752, 936, 1.6], [779, 919, 1.4], [801, 930, 2.3],
  [826, 924, 1.5], [850, 938, 1.9], [874, 921, 1.4], [898, 933, 2.2], [921, 926, 1.3], [946, 940, 1.8],
  [969, 924, 1.5], [995, 935, 2], [1022, 928, 1.4], [1049, 941, 1.7], [1076, 930, 1.3], [1102, 943, 1.9],
] as const;

export function Volcanoes() {
  return (
    <svg
      className="hero-landscape"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--navy-2)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--navy)" }} />
          <stop offset="1" style={{ stopColor: "var(--deep)" }} />
        </linearGradient>
        <radialGradient id="glow" cx="0.74" cy="0.16" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--mist)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--mist)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--mist)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--mist)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--mist)", stopOpacity: 0 }} />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="lightglow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect className="hero-sky" width="1600" height="1000" fill="url(#sky)" />
      <rect className="hero-sky" width="1600" height="1000" fill="url(#glow)" />

      {/* Fumarola del Fuego */}
      <g filter="url(#soft)" style={{ fill: "var(--mist)" }}>
        <ellipse cx="668" cy="420" rx="34" ry="22" opacity="0.28" />
        <ellipse cx="716" cy="388" rx="54" ry="26" opacity="0.18" />
        <ellipse cx="790" cy="366" rx="80" ry="24" opacity="0.1" />
      </g>

      {/* Cordillera lejana: Acatenango y Fuego */}
      <path
        d="M0 780 Q 240 700 390 610 Q 470 540 520 478 L 548 474 Q 580 492 606 500 Q 632 470 652 452 L 668 454 Q 720 520 820 600 Q 960 700 1180 760 L 1600 800 L 1600 1000 L 0 1000 Z"
        style={{ fill: "color-mix(in oklab, var(--navy-2) 70%, var(--mist))" }}
        opacity="0.5"
      />

      <g className="fog-drift-slow">
        <rect x="-120" y="600" width="1840" height="220" fill="url(#fog)" />
      </g>

      {/* Volcán de Agua */}
      <path
        d="M760 830 Q 1030 610 1112 432 L 1160 428 Q 1250 610 1530 830 L 1600 850 L 1600 1000 L 700 1000 Z"
        style={{ fill: "var(--navy)" }}
      />
      <path
        d="M1112 432 L 1160 428 Q 1172 452 1186 486 Q 1160 470 1136 480 Q 1118 468 1098 470 Q 1106 452 1112 432 Z"
        style={{ fill: "var(--mist)" }}
        opacity="0.16"
      />

      <g className="fog-drift">
        <rect x="-120" y="740" width="1840" height="200" fill="url(#fog)" />
      </g>

      {/* Colinas cercanas */}
      <path
        d="M0 880 Q 200 830 420 856 T 860 846 T 1300 866 T 1600 836 L 1600 1000 L 0 1000 Z"
        style={{ fill: "var(--deep)" }}
      />

      {/* Luces del valle */}
      <g style={{ fill: "var(--brass)" }}>
        <g filter="url(#lightglow)" opacity="0.7">
          {lights.map(([x, y, r]) => (
            <circle key={`g${x}`} cx={x} cy={y} r={r * 2.4} />
          ))}
        </g>
        {lights.map(([x, y, r]) => (
          <circle key={x} cx={x} cy={y} r={r} opacity="0.95" />
        ))}
      </g>

      <path d="M0 950 Q 320 912 720 940 T 1600 928 L 1600 1000 L 0 1000 Z" style={{ fill: "var(--ink)" }} />
    </svg>
  );
}
