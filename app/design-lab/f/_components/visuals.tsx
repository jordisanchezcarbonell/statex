"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { sampleAssets } from "../../content";

// Micro-visuales de cada solución. Todos son decorativos (aria-hidden en el contenedor);
// el nombre y el texto del servicio están siempre en el DOM.
// `active`: la celda está en vista. `run`: contador que se incrementa al entrar o en hover para repetir.
export type VisualProps = { active: boolean; run: number; reduce: boolean };

const ease = [0.22, 1, 0.36, 1] as const;

/* ───────────── Superficie externa: radar ───────────── */

const SWEEP = 6; // segundos por vuelta
const blips = [
  { a: 38, r: 0.72 },
  { a: 96, r: 0.42 },
  { a: 152, r: 0.86 },
  { a: 208, r: 0.58 },
  { a: 262, r: 0.8 },
  { a: 318, r: 0.34 },
];
const levelDot: Record<string, string> = {
  alto: "bg-(--violeta)",
  medio: "bg-(--cobalto)",
  bajo: "bg-(--hielo) ring-1 ring-(--cobalto)/30",
};

export function RadarVisual({ active, run, reduce }: VisualProps) {
  const still = reduce || !active;
  return (
    <div className="grid h-full items-center gap-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-8">
      <div className="relative mx-auto aspect-square w-full max-w-[15rem]">
        <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" fill="none">
          {[28, 56, 84, 112].map((r) => (
            <circle key={r} cx="120" cy="120" r={r} stroke="var(--tinta)" strokeOpacity={r === 112 ? 0.14 : 0.08} />
          ))}
          <path d="M120 6V234M6 120H234" stroke="var(--tinta)" strokeOpacity="0.06" />
        </svg>
        <motion.div
          key={`sweep-${run}`}
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={still ? { rotate: 0 } : { rotate: 360 }}
          transition={still ? { duration: 0 } : { duration: SWEEP, ease: "linear", repeat: Infinity }}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full" fill="none">
            <defs>
              <linearGradient id="f-sweep" x1="120" y1="120" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--cobalto)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--cobalto)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M120 120 L120 8 A112 112 0 0 0 40.8 40.8 Z" fill="url(#f-sweep)" />
            <path d="M120 120 L120 8" stroke="var(--cobalto)" strokeWidth="1.25" />
          </svg>
        </motion.div>
        {blips.map((b, i) => {
          const rad = (b.a * Math.PI) / 180;
          const x = Math.round((50 + 46.7 * b.r * Math.sin(rad)) * 100) / 100;
          const y = Math.round((50 - 46.7 * b.r * Math.cos(rad)) * 100) / 100;
          const level = sampleAssets[i].level;
          return (
            <motion.span
              key={`${run}-${i}`}
              className="absolute -ml-1 -mt-1 size-2 rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, background: level === "alto" ? "var(--violeta)" : "var(--cobalto)" }}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={reduce || active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease, delay: (b.a / 360) * SWEEP }}
            >
              {!still && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-current text-(--cobalto)"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3.4, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: (b.a / 360) * SWEEP }}
                />
              )}
            </motion.span>
          );
        })}
      </div>

      <div className="min-w-0">
        <ul className="divide-y divide-(--tinta)/8 border-y border-(--tinta)/8 text-[13px]">
          {sampleAssets.map((asset, i) => (
            <motion.li
              key={`${run}-${asset.host}`}
              className="flex items-center gap-3 py-2"
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={reduce || active ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.5, ease, delay: (blips[i].a / 360) * SWEEP + 0.1 }}
            >
              <span className={`size-1.5 shrink-0 rounded-full ${levelDot[asset.level]}`} />
              <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-(--tinta)">{asset.host}</span>
              <span className="shrink-0 text-(--gris)">{asset.kind}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] text-(--gris)">Ejemplo ilustrativo</p>
      </div>
    </div>
  );
}

/* ───────────── Seguridad web: petición / respuesta ───────────── */

const httpLines: { dir: "req" | "res" | "hdr"; text: string }[] = [
  { dir: "req", text: "GET /login HTTP/1.1" },
  { dir: "hdr", text: "Host: www.ejemplo.com" },
  { dir: "res", text: "HTTP/1.1 200 OK" },
  { dir: "hdr", text: "Set-Cookie: session=…; Secure; HttpOnly" },
  { dir: "req", text: "POST /api/v1/sesion" },
  { dir: "res", text: "HTTP/1.1 302 Found" },
  { dir: "req", text: "GET /api/v1/usuarios/42" },
  { dir: "res", text: "HTTP/1.1 403 Forbidden" },
  { dir: "hdr", text: "Content-Security-Policy: default-src 'self'" },
];

export function HttpVisual({ active, run, reduce }: VisualProps) {
  const still = reduce || !active;
  const block = (copy: number) =>
    httpLines.map((l, i) => (
      <li key={`${copy}-${i}`} className="flex h-7 items-center gap-2.5 whitespace-nowrap">
        <span
          className={`w-3 text-center ${l.dir === "req" ? "text-(--cobalto)" : l.dir === "res" ? "text-[#5A3CF0]" : "text-transparent"}`}
        >
          {l.dir === "req" ? "›" : l.dir === "res" ? "‹" : "·"}
        </span>
        <span className={l.dir === "hdr" ? "text-(--gris)" : "text-(--tinta)"}>{l.text}</span>
      </li>
    ));

  return (
    <div className="relative h-full overflow-hidden font-mono text-[12px] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]">
      {/* Línea de inspección fija: las peticiones la cruzan. */}
      <div className="absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 border-y border-(--cobalto)/25 bg-(--cobalto)/[0.05]" />
      <motion.ul
        key={run}
        className="relative px-4"
        initial={{ y: 0 }}
        animate={still ? { y: 0 } : { y: -httpLines.length * 28 }}
        transition={still ? { duration: 0 } : { duration: 16, ease: "linear", repeat: Infinity }}
      >
        {block(0)}
        {block(1)}
      </motion.ul>
    </div>
  );
}

/* ───────────── Vulnerabilidades: hallazgos que se ordenan ───────────── */

type Finding = { id: string; label: string; sev: "Alta" | "Media" | "Baja"; rank: number };
const findings: Finding[] = [
  { id: "f1", label: "Versión de software obsoleta", sev: "Media", rank: 1 },
  { id: "f2", label: "Cabecera de seguridad ausente", sev: "Baja", rank: 2 },
  { id: "f3", label: "Panel expuesto sin autenticación", sev: "Alta", rank: 0 },
];
const sevStyle: Record<Finding["sev"], string> = {
  Alta: "bg-[#5A3CF0] text-white",
  Media: "bg-(--cobalto) text-white",
  Baja: "bg-(--hielo) text-(--tinta)",
};

export function FindingsVisual({ active, run, reduce }: VisualProps) {
  const [sorted, setSorted] = useState(reduce);
  useEffect(() => {
    if (reduce) {
      setSorted(true);
      return;
    }
    setSorted(false);
    if (!active) return;
    const id = window.setTimeout(() => setSorted(true), 1100);
    return () => window.clearTimeout(id);
  }, [active, run, reduce]);

  const list = sorted ? [...findings].sort((a, b) => a.rank - b.rank) : findings;

  return (
    <ul className="flex h-full flex-col justify-center gap-2 px-3">
      {list.map((f) => (
        <motion.li
          key={f.id}
          layout={!reduce}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="flex items-center gap-3 rounded-xl border border-(--tinta)/8 bg-white px-3 py-2.5 text-[13px] shadow-[0_1px_0_rgb(10_15_31/0.03)]"
        >
          <span
            className={`inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[11px] font-semibold ${sevStyle[f.sev]}`}
          >
            {f.sev}
          </span>
          <span className="min-w-0 truncate text-(--tinta)">{f.label}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ───────────── Hardening: capas que se alinean ───────────── */

const plates = [
  { dx: -26, dy: 14 },
  { dx: 22, dy: -10 },
  { dx: -14, dy: -22 },
  { dx: 30, dy: 18 },
];

export function LayersVisual({ active, run, reduce }: VisualProps) {
  const aligned = reduce || active;
  return (
    <div className="grid h-full place-items-center [perspective:900px]">
      <div className="relative size-28 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-42deg)]">
        {plates.map((p, i) => {
          const top = i === plates.length - 1;
          return (
            <motion.div
              key={`${run}-${i}`}
              className={`absolute inset-0 rounded-[14px] border ${
                top
                  ? "border-(--cobalto) bg-[linear-gradient(135deg,var(--cobalto),var(--violeta))]"
                  : "border-(--cobalto)/30 bg-white/90"
              }`}
              style={{ z: i * 20 }}
              initial={reduce ? false : { x: p.dx, y: p.dy, opacity: 0.6 }}
              animate={aligned ? { x: 0, y: 0, opacity: 1 } : { x: p.dx, y: p.dy, opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.25 + i * 0.12 }}
            >
              {!top && <span className="absolute inset-3 rounded-[8px] border border-dashed border-(--cobalto)/20" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────── Investigación con IA: hipótesis que una persona verifica ───────────── */

type Hypothesis = { id: string; label: string; verdict: "ok" | "no" };
const hypotheses: Hypothesis[] = [
  { id: "h1", label: "staging.ejemplo.com sin autenticación", verdict: "ok" },
  { id: "h2", label: "Versión vulnerable en mail.ejemplo.com", verdict: "no" },
  { id: "h3", label: "api.ejemplo.com sin control de acceso", verdict: "ok" },
];

export function AiVisual({ active, run, reduce }: VisualProps) {
  const [resolved, setResolved] = useState(reduce ? hypotheses.length : 0);
  useEffect(() => {
    if (reduce) {
      setResolved(hypotheses.length);
      return;
    }
    setResolved(0);
    if (!active) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setResolved(n);
      if (n >= hypotheses.length) window.clearInterval(id);
    }, 900);
    return () => window.clearInterval(id);
  }, [active, run, reduce]);

  return (
    <ul className="flex h-full flex-col justify-center gap-2 px-3">
      {hypotheses.map((h, i) => {
        const done = i < resolved;
        return (
          <li
            key={h.id}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[12.5px] transition-[border-color,background-color,opacity] duration-500 ${
              done
                ? h.verdict === "ok"
                  ? "border-(--cobalto)/40 bg-white"
                  : "border-(--tinta)/8 bg-white/50 opacity-60"
                : "border-dashed border-(--violeta)/50 bg-(--violeta)/[0.04]"
            }`}
          >
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full ${
                done ? (h.verdict === "ok" ? "bg-(--cobalto) text-white" : "bg-(--tinta)/15 text-(--tinta)") : "border border-dashed border-(--violeta)"
              }`}
            >
              {done && (h.verdict === "ok" ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />)}
            </span>
            <span className={`min-w-0 truncate text-(--tinta) ${done && h.verdict === "no" ? "line-through" : ""}`}>{h.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────────── Complementario: código escribiéndose ───────────── */

const code: { indent: number; segs: { w: number; tone: "a" | "b" | "c" }[] }[] = [
  {
    indent: 0,
    segs: [
      { w: 14, tone: "b" },
      { w: 26, tone: "c" },
    ],
  },
  {
    indent: 1,
    segs: [
      { w: 10, tone: "a" },
      { w: 34, tone: "c" },
      { w: 8, tone: "b" },
    ],
  },
  {
    indent: 1,
    segs: [
      { w: 22, tone: "c" },
      { w: 16, tone: "a" },
    ],
  },
  {
    indent: 2,
    segs: [
      { w: 12, tone: "b" },
      { w: 40, tone: "c" },
    ],
  },
  { indent: 2, segs: [{ w: 28, tone: "c" }] },
  {
    indent: 1,
    segs: [
      { w: 8, tone: "a" },
      { w: 20, tone: "c" },
    ],
  },
  { indent: 0, segs: [{ w: 6, tone: "b" }] },
];
const tone = { a: "bg-(--cobalto)", b: "bg-(--violeta)/70", c: "bg-(--tinta)/15" };
const LINE_T = 0.32;

export function CodeVisual({ active, run, reduce }: VisualProps) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (reduce || !active) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), code.length * LINE_T * 1000 + 2600);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  const typing = !reduce && active;
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5">
      {code.map((line, i) => (
        <div key={`${run}-${cycle}-${i}`} className="flex items-center gap-2" style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
          <span className="w-4 shrink-0 text-right font-mono text-[10px] text-(--gris)">{i + 1}</span>
          {line.segs.map((s, j) => (
            <motion.span
              key={j}
              className={`h-2 origin-left rounded-full ${tone[s.tone]}`}
              style={{ width: `${s.w}%` }}
              initial={typing ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{
                duration: LINE_T / line.segs.length,
                ease: "linear",
                delay: i * LINE_T + (j * LINE_T) / line.segs.length,
              }}
            />
          ))}
          {i === code.length - 1 && !reduce && (
            <motion.span
              className="h-3.5 w-[2px] bg-(--cobalto)"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
