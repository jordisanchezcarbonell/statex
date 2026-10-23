"use client";

import { motion, useReducedMotion } from "motion/react";
import { sampleAssets } from "../content";

type Level = (typeof sampleAssets)[number]["level"];

// Órbitas concéntricas: radio horizontal/vertical, inclinación base, duración de una vuelta y sentido.
const ORBITS = [
  { rx: 78, ry: 56, tilt: -18, duration: 70, dir: 1, stroke: "var(--linea)" },
  { rx: 118, ry: 86, tilt: 12, duration: 96, dir: -1, stroke: "var(--pizarra)", opacity: 0.35 },
  { rx: 154, ry: 112, tilt: -6, duration: 120, dir: 1, stroke: "var(--linea)" },
  { rx: 186, ry: 138, tilt: 22, duration: 88, dir: -1, stroke: "var(--linea)" },
] as const;

// Posición de cada activo de ejemplo: órbita y ángulo (grados) sobre la elipse.
const PLACEMENT: Record<string, { orbit: number; angle: number }> = {
  "www.ejemplo.com": { orbit: 0, angle: 160 },
  "staging.ejemplo.com": { orbit: 1, angle: 38 },
  "api.ejemplo.com": { orbit: 2, angle: 312 },
  "203.0.113.14": { orbit: 3, angle: 204 },
  "mail.ejemplo.com": { orbit: 3, angle: 70 },
  "198.51.100.7": { orbit: 2, angle: 128 },
};

const C = 200;

export function NodeMark({ level, cx = 0, cy = 0 }: { level: Level; cx?: number; cy?: number }) {
  if (level === "alto") {
    return (
      <g>
        <circle cx={cx} cy={cy} r={10} fill="none" stroke="var(--azul)" strokeOpacity={0.35} strokeWidth={1} />
        <circle cx={cx} cy={cy} r={5.5} fill="var(--azul)" />
      </g>
    );
  }
  if (level === "medio") {
    return <circle cx={cx} cy={cy} r={5} fill="var(--porcelana)" stroke="var(--azul)" strokeWidth={1.5} />;
  }
  return <circle cx={cx} cy={cy} r={3} fill="var(--tinta)" />;
}

export function OrbitalMap() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="-20 -20 440 440"
      className="block h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      {ORBITS.map((o, i) => {
        const nodes = sampleAssets.filter((a) => PLACEMENT[a.host]?.orbit === i);
        return (
          <motion.g
            key={i}
            style={{ transformBox: "view-box", transformOrigin: `${C}px ${C}px` }}
            initial={{ rotate: 0 }}
            animate={reduce ? { rotate: 0 } : { rotate: 360 * o.dir }}
            transition={reduce ? { duration: 0 } : { duration: o.duration, ease: "linear", repeat: Infinity }}
          >
            <g transform={`rotate(${o.tilt} ${C} ${C})`}>
              <ellipse
                cx={C}
                cy={C}
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke={o.stroke}
                strokeOpacity={"opacity" in o ? o.opacity : 1}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              {nodes.map((a) => {
                const t = (PLACEMENT[a.host].angle * Math.PI) / 180;
                const x = C + o.rx * Math.cos(t);
                const y = C + o.ry * Math.sin(t);
                return <NodeMark key={a.host} level={a.level} cx={x} cy={y} />;
              })}
            </g>
          </motion.g>
        );
      })}

      {/* Núcleo: el dominio de ejemplo. Estático para que siempre se lea. */}
      <circle cx={C} cy={C} r={46} fill="#FFFFFF" stroke="var(--linea)" strokeWidth={1} />
      <text
        x={C}
        y={C}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--tinta)"
        style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}
      >
        ejemplo.com
      </text>
    </svg>
  );
}
