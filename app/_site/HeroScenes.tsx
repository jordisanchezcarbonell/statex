"use client";

import { motion } from "motion/react";

// Escenas del hero para las previews de identidad (la de StateX, el pasillo de pórticos, vive en Hero.tsx).
// Todos los colores salen de los tokens de la identidad (var(--h-…)) y el acento se usa una sola vez.
// Decorativas: aria-hidden, sin texto, y estáticas con prefers-reduced-motion.

const ease = [0.22, 1, 0.36, 1] as const;
const ink = { fill: "var(--h-ink)" };
const ivory = { stroke: "var(--h-ivory)" };
const accent = { stroke: "var(--h-red)" };

/**
 * Noxen · Dark Precision: un horizonte nocturno. Un halo muy tenue sobre la línea del horizonte,
 * un plano que se aleja con filetes cada vez más juntos y, en el centro, un trazo de bronce.
 */
// Horizonte alto: como en la escena de StateX, el acento queda por encima del titular y nunca lo cruza.
const HY = 215;
const BANDS = Array.from({ length: 14 }, (_, i) => {
  const t = (i + 1) / 14;
  return { y: HY + 685 * t ** 2.1, o: 0.03 + 0.11 * t };
});

export function HorizonScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="nx-halo" cx="800" cy={HY} r="760" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--h-ivory)", stopOpacity: 0.16 }} />
          <stop offset="0.5" style={{ stopColor: "var(--h-ivory)", stopOpacity: 0.035 }} />
          <stop offset="1" style={{ stopColor: "var(--h-ivory)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" style={ink} />
      <rect width="1600" height={HY} fill="url(#nx-halo)" />

      {BANDS.map((b, i) => (
        <motion.line
          key={b.y}
          x1="0"
          x2="1600"
          y1={b.y}
          y2={b.y}
          style={ivory}
          strokeOpacity={b.o}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 + i * 0.05, ease }}
        />
      ))}
      <line x1="0" x2="1600" y1={HY} y2={HY} style={ivory} strokeOpacity="0.28" />

      <motion.line
        x1="640"
        x2="960"
        y1={HY}
        y2={HY}
        style={{ ...accent, transformOrigin: `800px ${HY}px`, transformBox: "view-box" }}
        strokeWidth="2"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease }}
      />
    </svg>
  );
}

/**
 * Vantis · Corporate Intelligence: una retícula de doce columnas y una línea escalonada de cuatro
 * tramos (detectar, priorizar, corregir, verificar) que sube de izquierda a derecha.
 */
const COLS = Array.from({ length: 13 }, (_, i) => 100 + (i * 1400) / 12);
const ROWS = Array.from({ length: 9 }, (_, i) => 90 + i * 90);
// En la mitad derecha y alta, lejos del titular (abajo a la izquierda).
const STEPS = [
  [640, 400],
  [860, 400],
  [860, 310],
  [1080, 310],
  [1080, 220],
  [1300, 220],
  [1300, 130],
  [1520, 130],
] as const;
const NODES = [STEPS[1], STEPS[3], STEPS[5], STEPS[7]];

export function LedgerScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="vt-light" cx="1250" cy="220" r="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--h-ivory)", stopOpacity: 0.09 }} />
          <stop offset="1" style={{ stopColor: "var(--h-ivory)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" style={ink} />
      <rect width="1600" height="900" fill="url(#vt-light)" />

      <g style={ivory}>
        {COLS.map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="900" strokeOpacity="0.06" />
        ))}
        {ROWS.map((y) => (
          <line key={y} x1="0" x2="1600" y1={y} y2={y} strokeOpacity="0.035" />
        ))}
      </g>

      <motion.polyline
        points={STEPS.map((p) => p.join(",")).join(" ")}
        fill="none"
        style={accent}
        strokeWidth="2"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease }}
      />
      {NODES.map(([x, y], i) => (
        <motion.rect
          key={x}
          x={x - 5}
          y={y - 5}
          width="10"
          height="10"
          style={{ fill: "var(--h-ivory)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.6, delay: 0.9 + i * 0.35, ease }}
        />
      ))}
    </svg>
  );
}
