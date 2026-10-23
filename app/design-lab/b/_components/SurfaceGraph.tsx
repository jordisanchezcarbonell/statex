"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ChevronRight, Pause, Play } from "lucide-react";
import { sampleAssets } from "../../content";
import { LevelChip, type Level } from "./level";
import { dotCanvas, mono, ring } from "./ui";

// Grafo conceptual: Internet → dominio / rangos de documentación → activos de ejemplo.
// Las aristas y nodos intermedios se dibujan en SVG con coordenadas en píxeles reales
// (medidas con ResizeObserver) para que el texto y los trazos sean nítidos a cualquier ancho.
// Los activos son botones HTML: son a la vez los nodos finales y la lista accesible.

const ROW = 60;

const GROUPS = [
  { label: "ejemplo.com", match: (h: string) => h.endsWith("ejemplo.com") },
  { label: "203.0.113.0/24", match: (h: string) => h.startsWith("203.0.113.") },
  { label: "198.51.100.0/24", match: (h: string) => h.startsWith("198.51.100.") },
];

const LEAVES = GROUPS.flatMap((g, gi) =>
  sampleAssets.filter((a) => g.match(a.host)).map((a) => ({ ...a, group: gi })),
);
const H = LEAVES.length * ROW;
const leafY = (i: number) => i * ROW + ROW / 2;
const GROUP_Y = GROUPS.map((_, gi) => {
  const ys = LEAVES.flatMap((l, i) => (l.group === gi ? [leafY(i)] : []));
  return ys.reduce((a, b) => a + b, 0) / ys.length;
});
const START = Math.max(0, LEAVES.findIndex((l) => l.level === "alto"));

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2;
  return `C ${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`;
};

export function SurfaceGraph() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [w, setW] = useState(0);
  const [sel, setSel] = useState(START);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = zoneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const auto = playing && !reduce;
  useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setInterval(() => setSel((s) => (s + 1) % LEAVES.length), 3400);
    return () => window.clearInterval(t);
  }, [auto, inView]);

  const choose = (i: number) => {
    setSel(i);
    setPlaying(false);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = LEAVES.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    leafRefs.current[next]?.focus();
  };

  const leaf = LEAVES[sel];
  const xI = 12;
  const xG = Math.max(w * 0.5, 56);
  const yI = H / 2;
  const showGroupLabels = w >= 190;
  const route = `M ${xI} ${yI} ${curve(xI, yI, xG, GROUP_Y[leaf.group])} ${curve(xG, GROUP_Y[leaf.group], w, leafY(sel))}`;

  return (
    <figure
      ref={rootRef}
      aria-labelledby="b-graph-caption"
      className="relative min-w-0 overflow-hidden rounded-[18px] border border-(--line) bg-white shadow-[0_1px_0_rgba(11,21,51,0.04),0_30px_60px_-30px_rgba(11,21,51,0.28)]"
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-(--line) px-4 py-3 sm:px-5">
        <span id="b-graph-caption" className="flex items-center gap-3">
          <span aria-hidden="true" className="h-7 w-px bg-(--sky)" />
          <span className="text-[13px] leading-[1.25]">
            <span className="block font-semibold text-(--navy)">Visualización conceptual</span>
            <span className="block text-(--muted)">Ejemplo ilustrativo</span>
          </span>
        </span>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium text-(--muted) hover:bg-(--fog) hover:text-(--navy) ${ring}`}
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {playing ? "Pausar recorrido" : "Reanudar recorrido"}
          </button>
        )}
      </figcaption>

      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="min-w-0 px-4 pt-4 pb-5 sm:px-5">
          {/* Cabeceras de columna */}
          <div
            aria-hidden="true"
            className="grid grid-cols-[minmax(0,1fr)_11.5rem] pb-2 text-[12px] font-medium text-(--muted) sm:grid-cols-[minmax(0,1fr)_14rem]"
          >
            <span className="relative">
              Origen
              {showGroupLabels && (
                <span className="absolute top-0 -translate-x-1/2 whitespace-nowrap" style={{ left: xG }}>
                  Dominio o rango
                </span>
              )}
            </span>
            <span className="pl-5">Activo expuesto</span>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_11.5rem] sm:grid-cols-[minmax(0,1fr)_14rem]">
            <div
              ref={zoneRef}
              aria-hidden="true"
              className="relative rounded-l-xl"
              style={{ ...dotCanvas, height: H }}
            >
              {w > 0 && (
                <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} className="absolute inset-0 overflow-visible">
                  {GROUPS.map((g, gi) => (
                    <path
                      key={g.label}
                      d={`M ${xI} ${yI} ${curve(xI, yI, xG, GROUP_Y[gi])}`}
                      fill="none"
                      stroke="var(--edge)"
                      strokeWidth={1.25}
                    />
                  ))}
                  {LEAVES.map((l, i) => (
                    <path
                      key={l.host}
                      d={`M ${xG} ${GROUP_Y[l.group]} ${curve(xG, GROUP_Y[l.group], w, leafY(i))}`}
                      fill="none"
                      stroke={l.level === "alto" ? "#E3B21E" : "var(--edge)"}
                      strokeWidth={l.level === "alto" ? 1.5 : 1.25}
                      strokeDasharray={l.level === "bajo" ? "3 4" : undefined}
                    />
                  ))}

                  {/* Camino seleccionado */}
                  <motion.path
                    key={`route-${sel}`}
                    d={route}
                    fill="none"
                    stroke="var(--sky)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
                  />
                  {!reduce && (
                    <circle key={`packet-${sel}`} r={3.5} fill="var(--sky-ink)">
                      <animateMotion dur="2.4s" repeatCount="indefinite" path={route} />
                    </circle>
                  )}

                  {/* Internet */}
                  <circle cx={xI} cy={yI} r={10} fill="var(--navy)" />
                  <circle cx={xI} cy={yI} r={3.5} fill="var(--sky)" />
                  <text
                    x={2}
                    y={yI - 19}
                    className="fill-(--navy) font-(family-name:--f-mono) text-[12px] font-medium"
                  >
                    Internet
                  </text>

                  {/* Dominio y rangos */}
                  {GROUPS.map((g, gi) => {
                    const on = gi === leaf.group;
                    return (
                      <g key={g.label}>
                        <circle
                          cx={xG}
                          cy={GROUP_Y[gi]}
                          r={6}
                          fill={on ? "var(--sky)" : "#FFFFFF"}
                          stroke={on ? "var(--sky-ink)" : "var(--navy)"}
                          strokeWidth={1.5}
                        />
                        {showGroupLabels && (
                          <text
                            x={xG}
                            y={GROUP_Y[gi] - 14}
                            textAnchor="middle"
                            stroke="#FFFFFF"
                            strokeWidth={5}
                            paintOrder="stroke"
                            className="fill-(--navy) font-(family-name:--f-mono) text-[11.5px]"
                          >
                            {g.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            <ul aria-label="Activos de ejemplo" className="relative" style={{ height: H }}>
              {LEAVES.map((l, i) => {
                const on = i === sel;
                return (
                  <li key={l.host} style={{ height: ROW }}>
                    <button
                      ref={(el) => {
                        leafRefs.current[i] = el;
                      }}
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={`relative flex h-full w-full items-center rounded-r-xl pr-2 pl-5 text-left transition-colors ${
                        on ? "bg-(--fog)" : "hover:bg-(--fog)/60"
                      } ${ring}`}
                    >
                      <LeafNode level={l.level} active={on} reduce={!!reduce} />
                      <span className="min-w-0">
                        <span className={`block truncate text-[12.5px] sm:text-[13px] ${mono} ${on ? "font-medium" : ""}`}>
                          {l.host}
                        </span>
                        <span className="mt-1 flex items-center gap-2 text-[12px] text-(--muted)">
                          {l.kind}
                          <LevelChip level={l.level} />
                        </span>
                      </span>
                      {on && <span aria-hidden="true" className="absolute inset-y-2 right-0 w-[3px] rounded-full bg-(--sky)" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <Inspector leaf={leaf} live={!auto} />
      </div>
    </figure>
  );
}

function LeafNode({ level, active, reduce }: { level: Level; active: boolean; reduce: boolean }) {
  const fill = level === "alto" ? "bg-(--signal)" : level === "medio" ? "bg-white" : "bg-(--fog)";
  const stroke = active ? "ring-(--sky-ink)" : level === "bajo" ? "ring-(--edge)" : "ring-(--navy)";
  return (
    <span aria-hidden="true" className="absolute top-1/2 left-0 grid size-0 place-items-center">
      {level === "alto" &&
        (reduce ? (
          <span className="absolute size-6 rounded-full bg-(--signal)/35" />
        ) : (
          <motion.span
            className="absolute size-6 rounded-full bg-(--signal)"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      <span className={`absolute size-3 rounded-full ring-2 ${fill} ${stroke}`} />
    </span>
  );
}

function Inspector({ leaf, live }: { leaf: (typeof LEAVES)[number]; live: boolean }) {
  const steps = ["Internet", GROUPS[leaf.group].label, leaf.host];
  return (
    <div className="border-t border-(--line) bg-(--fog)/50 px-4 py-4 sm:px-5 xl:border-t-0 xl:border-l xl:py-5">
      <p className="text-[12px] font-medium text-(--muted)">Activo seleccionado</p>
      <div aria-live={live ? "polite" : "off"} aria-atomic="true">
        <p className={`mt-1 text-[15px] font-medium break-all text-(--navy) ${mono}`}>{leaf.host}</p>
        <dl className="mt-4 grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-2.5 text-[13px] sm:grid-cols-[4.5rem_minmax(0,1fr)_4.5rem_minmax(0,1fr)] xl:grid-cols-[4rem_minmax(0,1fr)]">
          <dt className="text-(--muted)">Tipo</dt>
          <dd className="font-medium text-(--navy)">{leaf.kind}</dd>
          <dt className="text-(--muted)">Nivel</dt>
          <dd>
            <LevelChip level={leaf.level} />
          </dd>
          <dt className="self-start text-(--muted) sm:col-start-1">Ruta</dt>
          <dd className="sm:col-span-3 xl:col-span-1">
            <ol className={`flex flex-wrap items-center gap-x-1 gap-y-1 text-[12px] text-(--navy) ${mono}`}>
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-1 break-all">
                  {i > 0 && <ChevronRight size={12} aria-hidden="true" className="shrink-0 text-(--muted)" />}
                  {s}
                </li>
              ))}
            </ol>
          </dd>
        </dl>
      </div>
    </div>
  );
}
