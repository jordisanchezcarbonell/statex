"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { approach, problem, sampleAssets } from "../../content";
import { type Level } from "./level";
import { dotCanvas, levelOrder, mono } from "./ui";

// Mapa del proceso: los mismos elementos pasan de "estado desordenado" (fase -1, el problema)
// a una lista ordenada por prioridad (fases 0–4, los pasos del enfoque).
// Es decorativo (aria-hidden en el contenedor); la información está en el texto de las secciones.

type Kind = "asset" | "noise" | "risk";
type Item = { id: string; kind: Kind; label: string; level?: Level; rank?: number };

const ranked = [...sampleAssets]
  .map((a, i) => ({ a, i }))
  .sort((x, y) => levelOrder[x.a.level] - levelOrder[y.a.level] || x.i - y.i);
const rankOf = (i: number) => ranked.findIndex((r) => r.i === i);

const ITEMS: Item[] = [
  ...sampleAssets.map((a, i) => ({ id: `a${i}`, kind: "asset" as const, label: a.host, level: a.level, rank: rankOf(i) })),
  ...[0, 1, 2].map((i) => ({ id: `n${i}`, kind: "noise" as const, label: "alerta sin verificar" })),
  ...problem.risks.map((r, i) => ({ id: `r${i}`, kind: "risk" as const, label: r.name })),
];

// Posiciones del desorden: [left %, top %, rotación]. Ancladas a la izquierda, centradas en vertical.
const SCATTER: Record<string, [number, number, number]> = {
  r0: [5, 7, -3],
  a1: [44, 12, 6],
  n0: [22, 21, -7],
  a0: [3, 31, 4],
  r1: [42, 33, 3],
  a2: [16, 45, -5],
  n1: [46, 52, 7],
  r2: [4, 60, 4],
  a3: [40, 66, -4],
  a4: [12, 77, 6],
  n2: [44, 81, -6],
  a5: [4, 92, 3],
  r3: [42, 93, -3],
};
// Orden de descubrimiento (fases 1–2): una columna con activos y alertas mezclados.
const DISCOVERY = ["a0", "n0", "a1", "a2", "n1", "a3", "a4", "n2", "a5"];

const TANGLE: [string, string][] = [
  ["r0", "a1"], ["r0", "n0"], ["a0", "r1"], ["n0", "a2"], ["r1", "n1"], ["a2", "r2"],
  ["n1", "a3"], ["r2", "a4"], ["a3", "n2"], ["a4", "r3"], ["n2", "a5"], ["a1", "r1"], ["a0", "a2"],
];

const BANDS: { level: Level; label: string }[] = [
  { level: "alto", label: "Primero" },
  { level: "medio", label: "Después" },
  { level: "bajo", label: "Seguimiento" },
];

const listTop = (rank: number) => 15 + rank * 13.5;

function place(item: Item, phase: number) {
  const [sx, sy, sr] = SCATTER[item.id] ?? [0, 0, 0];
  if (phase < 0) return { left: sx, top: sy, rotate: sr, opacity: 1 };
  if (item.kind === "risk") return { left: sx + 4, top: sy, rotate: 0, opacity: 0 };
  if (phase === 0) return { left: 6 + sx * 0.9, top: 14 + sy * 0.76, rotate: 0, opacity: 1 };
  const d = DISCOVERY.indexOf(item.id);
  if (phase <= 2) return { left: 8, top: 12 + d * 9.6, rotate: 0, opacity: item.kind === "noise" && phase === 2 ? 0.55 : 1 };
  if (item.kind === "noise") return { left: 2, top: 12 + d * 9.6, rotate: 0, opacity: 0 };
  return { left: 8, top: listTop(item.rank ?? 0), rotate: 0, opacity: 1 };
}

export function ProcessMap({ phase }: { phase: number }) {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.9 };
  const status = phase < 0 ? "Sin ordenar" : approach.steps[phase]?.name;

  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[18px] border border-(--line) bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-(--line) px-4 py-3 sm:px-5">
        <span className="flex items-center gap-3 text-[13px] leading-[1.25]">
          <span className="h-7 w-px bg-(--sky)" />
          <span>
            <span className="block font-semibold text-(--navy)">Visualización conceptual</span>
            <span className="block text-(--muted)">Ejemplo ilustrativo</span>
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          {[-1, 0, 1, 2, 3, 4].map((p) => (
            <span
              key={p}
              className={`h-1.5 rounded-full transition-all duration-300 ${p === phase ? "w-5 bg-(--navy)" : p < phase ? "w-1.5 bg-(--sky)" : "w-1.5 bg-(--edge)"}`}
            />
          ))}
        </span>
      </div>

      <div className="@container relative h-[28rem] sm:h-[32rem]" style={dotCanvas}>
        {/* Maraña del estado desordenado */}
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          initial={false}
          animate={{ opacity: phase < 0 ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          {TANGLE.map(([a, b]) => {
            const [ax, ay] = SCATTER[a];
            const [bx, by] = SCATTER[b];
            return (
              <line
                key={a + b}
                x1={ax + 14}
                y1={ay}
                x2={bx + 14}
                y2={by}
                stroke="var(--edge)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </motion.svg>

        {/* Alcance autorizado */}
        <motion.div
          className="absolute inset-[4%] rounded-2xl border-[1.5px] border-dashed border-(--sky)"
          initial={false}
          animate={{ opacity: phase >= 0 ? 1 : 0, scale: phase >= 0 ? 1 : 1.04 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <span className="absolute -top-2.5 left-4 bg-white px-1.5 text-[12px] font-medium text-(--sky-ink)">
            Alcance autorizado
          </span>
        </motion.div>

        {/* Bandas del plan (fase de reducción) */}
        {BANDS.map((b, bi) => {
          const top = listTop(bi * 2) - 4.5;
          const bottom = listTop(bi * 2 + 1) + 4.5;
          return (
            <motion.div
              key={b.level}
              className="absolute right-[6%] flex items-center"
              style={{ top: `${top}%`, height: `${bottom - top}%` }}
              initial={false}
              animate={{ opacity: phase >= 4 ? 1 : 0, x: phase >= 4 ? 0 : 8 }}
              transition={reduce ? { duration: 0 } : { duration: 0.4, delay: phase >= 4 ? bi * 0.12 : 0 }}
            >
              <span className={`hidden text-[12px] font-medium @md:inline ${bi === 0 ? "text-(--navy)" : "text-(--muted)"}`}>{b.label}</span>
              <span className={`ml-2 h-full w-2 rounded-r-md border-y-[1.5px] border-r-[1.5px] ${bi === 0 ? "border-(--navy)" : "border-(--edge)"}`} />
            </motion.div>
          );
        })}

        {ITEMS.map((item) => {
          const p = place(item, phase);
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ y: "-50%" }}
              initial={false}
              animate={{ left: `${p.left}%`, top: `${p.top}%`, rotate: p.rotate, opacity: p.opacity }}
              transition={t}
            >
              <Pill item={item} phase={phase} />
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-(--line) px-4 py-3 text-[13px] sm:px-5">
        <span className="text-(--muted)">Paso</span>
        <span className="font-semibold text-(--navy)">{status}</span>
      </div>
    </div>
  );
}

function Pill({ item, phase }: { item: Item; phase: number }) {
  if (item.kind === "risk") {
    return (
      <span className="block max-w-[10.5rem] rounded-lg border-[1.5px] border-(--navy) bg-white px-2.5 py-1.5 text-[13px] leading-tight font-semibold text-(--navy)">
        {item.label}
      </span>
    );
  }
  if (item.kind === "noise") {
    const discarded = phase >= 2;
    return (
      <span
        className={`flex items-center gap-2 rounded-full border border-dashed border-(--muted)/60 bg-white px-2.5 py-1 text-[12px] text-(--muted) ${mono}`}
      >
        <span className="size-2 rounded-full border border-(--muted)" />
        <span className={discarded ? "line-through" : ""}>{discarded ? "descartada" : item.label}</span>
      </span>
    );
  }
  const level = item.level!;
  const planned = phase >= 4;
  const dot =
    level === "alto"
      ? planned ? "bg-(--signal) ring-(--sky-ink)" : "bg-(--signal) ring-(--navy)"
      : level === "medio" ? "bg-white ring-(--navy)" : "bg-(--fog) ring-(--edge)";
  return (
    <span className="flex items-center gap-2 rounded-full border border-(--line) bg-white py-1 pr-3 pl-1.5 text-[12.5px] text-(--navy) shadow-[0_1px_2px_rgba(11,21,51,0.06)]">
      <motion.span
        initial={false}
        animate={{ width: phase >= 3 ? "auto" : 0, opacity: phase >= 3 ? 1 : 0 }}
        className={`grid h-5 min-w-0 place-items-center overflow-hidden rounded-full bg-(--navy) text-[11px] font-medium text-white ${mono}`}
      >
        <span className="px-1.5">{(item.rank ?? 0) + 1}</span>
      </motion.span>
      <span className={`ml-1 size-2.5 shrink-0 rounded-full ring-2 ${dot}`} />
      <span className={mono}>{item.label}</span>
      {phase >= 2 && <Check size={14} strokeWidth={2.5} aria-hidden="true" className="text-(--sky-ink)" />}
    </span>
  );
}
