"use client";

import { motion, useReducedMotion } from "motion/react";

// Mini-visuales abstractos, uno por solución. Decorativos: el texto del panel lleva la información.
// Lienzo común 560×300. Marino = estructura, azul = acción de StateX, amarillo = exposición.

const NAVY = "#0B1533";
const SKY = "#3D8BFF";
const SIGNAL = "#FFC933";
const EDGE = "#B9C2D3";
const MUTED = "#4B5675";
const label = "font-(family-name:--f-mono) text-[12px]";

function Pulse({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <circle cx={cx} cy={cy} r={r + 6} fill={SIGNAL} opacity={0.3} />;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={SIGNAL}
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 2.4, opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function Travel({ path, dur = 3 }: { path: string; dur?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <circle r={4} fill={SKY}>
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

/** Superficie externa: el inventario conocido y lo que aparece fuera de él. */
export function EasmVisual() {
  const known = [
    [90, 110], [150, 90], [210, 120], [120, 180], [190, 200], [250, 170],
  ];
  const found = [
    [400, 80], [460, 160], [390, 230],
  ];
  return (
    <svg viewBox="0 0 560 300" className="size-full" aria-hidden="true">
      <rect x={50} y={50} width={250} height={200} rx={18} fill="#FFFFFF" stroke={EDGE} />
      <text x={66} y={238} className={label} fill={MUTED}>inventario</text>
      {known.map(([x, y], i) =>
        known.slice(i + 1, i + 3).map(([x2, y2]) => (
          <line key={`${i}-${x2}`} x1={x} y1={y} x2={x2} y2={y2} stroke={EDGE} />
        )),
      )}
      {found.map(([x, y], i) => (
        <path
          key={`l${i}`}
          d={`M ${known[[2, 5, 4][i]][0]} ${known[[2, 5, 4][i]][1]} C 330 ${y}, 340 ${y}, ${x} ${y}`}
          fill="none"
          stroke={SKY}
          strokeWidth={1.5}
          strokeDasharray="4 5"
        />
      ))}
      {known.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={7} fill={NAVY} />
      ))}
      {found.map(([x, y]) => (
        <g key={`f${x}`}>
          <Pulse cx={x} cy={y} />
          <circle cx={x} cy={y} r={9} fill={SIGNAL} stroke={NAVY} strokeWidth={2} />
        </g>
      ))}
      <text x={372} y={276} className={label} fill={MUTED}>fuera del inventario</text>
    </svg>
  );
}

/** Aplicaciones web: una petición atraviesa controles; uno falla. */
export function AppSecVisual() {
  const nodes = [
    { x: 40, w: 90, t: "cliente" },
    { x: 190, w: 110, t: "aplicación" },
    { x: 360, w: 70, t: "API" },
    { x: 470, w: 70, t: "datos" },
  ];
  const gates = [160, 330, 450];
  return (
    <svg viewBox="0 0 560 300" className="size-full" aria-hidden="true">
      <line x1={60} y1={150} x2={510} y2={150} stroke={EDGE} strokeWidth={1.5} />
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x} y={118} width={n.w} height={64} rx={12} fill="#FFFFFF" stroke={NAVY} strokeWidth={1.5} />
          <text x={n.x + n.w / 2} y={155} textAnchor="middle" className={label} fill={NAVY}>{n.t}</text>
        </g>
      ))}
      {gates.map((g, i) => {
        const weak = i === 1;
        return (
          <g key={g}>
            {weak && <Pulse cx={g} cy={150} r={8} />}
            <rect x={g - 5} y={128} width={10} height={44} rx={3} fill={weak ? SIGNAL : SKY} stroke={weak ? NAVY : "none"} strokeWidth={1.5} />
          </g>
        );
      })}
      <text x={330} y={210} textAnchor="middle" className={label} fill={NAVY}>control de acceso</text>
      <line x1={330} y1={178} x2={330} y2={194} stroke={NAVY} />
      <Travel path="M 60 150 L 510 150" dur={3.2} />
    </svg>
  );
}

/** Vulnerabilidades: muchas señales, pocas verificadas, ordenadas. */
export function VaVisual() {
  const reduce = useReducedMotion();
  const cols = 10;
  const rows = 6;
  const hot = new Set(["2-1", "6-3", "8-0"]);
  const maybe = new Set(["4-4", "1-5", "7-2", "9-4", "3-2"]);
  return (
    <svg viewBox="0 0 560 300" className="size-full" aria-hidden="true">
      {!reduce && (
        <motion.rect
          y={36}
          width={26}
          height={228}
          rx={8}
          fill={SKY}
          opacity={0.12}
          initial={{ x: 38 }}
          animate={{ x: [38, 296, 38] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {Array.from({ length: cols * rows }, (_, k) => {
        const c = k % cols;
        const r = Math.floor(k / cols);
        const id = `${c}-${r}`;
        const x = 51 + c * 28;
        const y = 56 + r * 38;
        if (hot.has(id)) return <circle key={id} cx={x} cy={y} r={7} fill={SIGNAL} stroke={NAVY} strokeWidth={2} />;
        if (maybe.has(id)) return <circle key={id} cx={x} cy={y} r={6} fill="#FFFFFF" stroke={MUTED} strokeDasharray="2 2" />;
        return <circle key={id} cx={x} cy={y} r={3.5} fill={EDGE} />;
      })}
      {[["2-1", 0], ["6-3", 1], ["8-0", 2]].map(([id, i]) => {
        const [c, r] = String(id).split("-").map(Number);
        const y2 = 104 + Number(i) * 44;
        return (
          <path key={String(id)} d={`M ${51 + c * 28} ${56 + r * 38} C 380 ${56 + r * 38}, 380 ${y2}, 410 ${y2}`} fill="none" stroke={SKY} strokeWidth={1.5} />
        );
      })}
      {[140, 104, 72].map((w, i) => (
        <g key={w}>
          <text x={402} y={108 + i * 44} textAnchor="end" className={label} fill={NAVY}>{i + 1}</text>
          <rect x={414} y={94 + i * 44} width={w} height={20} rx={6} fill={i === 0 ? NAVY : "#FFFFFF"} stroke={NAVY} strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
}

/** Ingeniería de seguridad: controles integrados en el ciclo de desarrollo. */
export function EngineeringVisual() {
  const st = ["código", "build", "pruebas", "despliegue", "nube"];
  const xs = [60, 170, 280, 390, 500];
  return (
    <svg viewBox="0 0 560 300" className="size-full" aria-hidden="true">
      <path d="M 500 150 C 500 250, 60 250, 60 150" fill="none" stroke={EDGE} strokeWidth={1.5} strokeDasharray="4 6" />
      <line x1={60} y1={150} x2={500} y2={150} stroke={NAVY} strokeWidth={1.5} />
      {xs.slice(0, -1).map((x) => (
        <rect key={x} x={x + 49} y={143} width={14} height={14} rx={3} fill={SKY} transform={`rotate(45 ${x + 56} 150)`} />
      ))}
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={150} r={14} fill="#FFFFFF" stroke={NAVY} strokeWidth={2} />
          <circle cx={x} cy={150} r={4} fill={NAVY} />
          <text x={x} y={114} textAnchor="middle" className={label} fill={NAVY}>{st[i]}</text>
        </g>
      ))}
      <text x={280} y={262} textAnchor="middle" className={label} fill={MUTED}>control automatizado en cada paso</text>
      <Travel path="M 60 150 L 500 150 C 500 250, 60 250, 60 150" dur={5} />
    </svg>
  );
}

/** Investigación con IA: el modelo propone, una persona verifica. */
export function AiVisual() {
  const sug = [70, 140, 210, 280, 350, 420, 490];
  const kept = new Set([70, 280, 490]);
  return (
    <svg viewBox="0 0 560 300" className="size-full" aria-hidden="true">
      <text x={40} y={50} className={label} fill={MUTED}>propuestas del modelo</text>
      <line x1={40} y1={158} x2={520} y2={158} stroke={NAVY} strokeWidth={1.5} />
      <text x={104} y={184} className={label} fill={NAVY}>verificación humana</text>
      {sug.map((x) => {
        const k = kept.has(x);
        return (
          <g key={x}>
            <circle cx={x} cy={96} r={13} fill="#FFFFFF" stroke={SKY} strokeWidth={1.5} strokeDasharray="3 3" />
            {k ? (
              <>
                <line x1={x} y1={110} x2={x} y2={226} stroke={SKY} strokeWidth={1.5} />
                <circle cx={x} cy={158} r={4} fill={SKY} />
                <circle cx={x} cy={240} r={14} fill={NAVY} />
                <path d={`M ${x - 5} ${240} l 4 4 l 7 -8`} fill="none" stroke="#FFFFFF" strokeWidth={2} />
              </>
            ) : (
              <>
                <line x1={x} y1={110} x2={x} y2={146} stroke={EDGE} strokeWidth={1.5} />
                <path d={`M ${x - 5} 153 l 10 10 M ${x + 5} 153 l -10 10`} stroke={MUTED} strokeWidth={1.5} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export const SOLUTION_VISUALS: Record<string, () => React.JSX.Element> = {
  easm: EasmVisual,
  appsec: AppSecVisual,
  va: VaVisual,
  engineering: EngineeringVisual,
  "ai-research": AiVisual,
};
