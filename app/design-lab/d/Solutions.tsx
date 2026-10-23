"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { complementary, sampleAssets, sections, solutions } from "../content";
import { SOLUTION_RINGS } from "./data";
import { CornerMarks } from "./marks";
import { display, mono, pad, section, wrap } from "./ui";

const C = 200;
const TICKS = Array.from({ length: 72 }, (_, i) => i);
// Ángulos (grados) de los activos de ejemplo sobre el anillo exterior, mismo orden que sampleAssets.
const ASSET_ANGLES = [208, 236, 302, 18, 112, 154];
const SCAN_FROM = -24;
const SCAN_TO = 6;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  // Redondeo: Math.cos/sin pueden diferir en el último decimal entre servidor y navegador (hidratación).
  const round = (n: number) => Math.round(n * 100) / 100;
  return [round(C + r * Math.cos(a)), round(C + r * Math.sin(a))] as const;
};

/**
 * Soluciones como índice técnico. El esquema de capas es un refuerzo visual (aria-hidden):
 * pasar el cursor por una solución ilumina la capa en la que actúa. Toda la información está en el texto.
 */
export function Solutions() {
  const [hot, setHot] = useState<string | null>(null);

  return (
    <section id="soluciones" aria-labelledby="soluciones-title" className={section}>
      <div className={`${wrap} ${pad}`}>
        <h2 id="soluciones-title" className={`${display} flex items-baseline gap-4`}>
          <span aria-hidden="true" className="h-[0.18em] w-[0.18em] shrink-0 -translate-y-[0.12em] bg-[color:var(--amber)]" />
          {sections.solutions}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <figure className="m-0 lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="relative mx-auto aspect-square w-full max-w-[420px] p-4">
                <Layers hot={hot} />
                <CornerMarks size={12} />
              </div>
              <figcaption className={`${mono} mx-auto mt-4 max-w-[420px] text-[11px] leading-5 text-[color:var(--muted)]`}>
                <span className="text-[color:var(--fg)]">FIG. 3</span>
                <span className="whitespace-pre">{"  "}</span>
                Capas en las que actúa cada solución, de internet hacia dentro. Esquema conceptual con activos de ejemplo.com.
              </figcaption>
            </div>
          </figure>

          <ul className="lg:col-span-7" onMouseLeave={() => setHot(null)}>
            {solutions.map((s) => {
              const dim = hot !== null && hot !== s.id;
              return (
                <li
                  key={s.id}
                  onMouseEnter={() => setHot(s.id)}
                  className="group relative grid grid-cols-1 gap-y-3 border-t border-[color:var(--line)] py-8 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-x-8 md:first:border-t md:first:pt-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-8 h-[calc(100%-4rem)] w-[2px] origin-top scale-y-0 bg-[color:var(--amber)] transition-transform duration-300 ease-out group-hover:scale-y-100 max-md:hidden"
                  />
                  <div>
                    <p className={`${mono} text-[12px] leading-5 text-[color:var(--muted)]`}>{s.short}</p>
                    <h3
                      className={`mt-1.5 text-[length:clamp(1.375rem,1rem+1vw,1.875rem)] font-medium leading-[1.1] tracking-[-0.03em] transition-colors duration-300 ${
                        dim ? "text-[color:var(--muted)]" : "text-[color:var(--fg)]"
                      }`}
                    >
                      {s.name}
                    </h3>
                  </div>
                  <p className="max-w-[46ch] text-[15px] leading-[1.6] text-[color:var(--muted)] md:pt-7">{s.text}</p>
                </li>
              );
            })}
            <li className="mt-2 grid grid-cols-1 gap-y-3 border border-dashed border-[rgba(232,230,227,0.2)] p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-x-8">
              <div>
                <p className={`${mono} text-[12px] leading-5 text-[color:var(--muted)]`}>{complementary.label}</p>
                <h3 className="mt-1.5 text-[20px] font-medium leading-[1.2] tracking-[-0.025em] text-[color:var(--fg)]">
                  {complementary.name}
                </h3>
              </div>
              <p className="max-w-[46ch] text-[15px] leading-[1.6] text-[color:var(--muted)] md:pt-7">{complementary.text}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Layers({ hot }: { hot: string | null }) {
  const reduce = useReducedMotion();
  const t = reduce ? "none" : "stroke 300ms ease, fill 300ms ease, opacity 300ms ease";
  const ringStroke = (id: string) => (hot === id ? "#FFB000" : hot ? "rgba(232,230,227,0.14)" : "rgba(232,230,227,0.3)");
  const label = (id: string) => (hot === id ? "#E8E6E3" : "#8A8F98");
  const ai = hot === "ai-research";
  const [sx0, sy0] = polar(186, SCAN_FROM);
  const [sx1, sy1] = polar(186, SCAN_TO);
  const [lx, ly] = polar(58, SCAN_TO);
  const names: Record<string, string> = Object.fromEntries(solutions.map((s) => [s.id, s.short.toLowerCase()]));

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true" focusable="false">
      {/* Escala exterior */}
      {TICKS.map((i) => {
        const long = i % 6 === 0;
        const [x0, y0] = polar(long ? 190 : 193, i * 5);
        const [x1, y1] = polar(198, i * 5);
        return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="rgba(232,230,227,0.22)" strokeWidth={1} />;
      })}

      {/* Sector de investigación con IA: atraviesa todas las capas */}
      <path
        d={`M${C},${C} L${sx0},${sy0} A186,186 0 0 1 ${sx1},${sy1} Z`}
        fill={ai ? "rgba(255,176,0,0.16)" : "rgba(255,176,0,0.05)"}
        style={{ transition: t }}
      />
      <line x1={C} y1={C} x2={sx1} y2={sy1} stroke={ai ? "#FFB000" : "rgba(255,176,0,0.45)"} strokeDasharray="3 4" style={{ transition: t }} />

      {/* Capas */}
      {Object.entries(SOLUTION_RINGS).map(([id, r]) => (
        <g key={id}>
          <circle cx={C} cy={C} r={r} fill="none" stroke={ringStroke(id)} strokeWidth={hot === id ? 1.5 : 1} style={{ transition: t }} />
          <text
            x={C}
            y={C - r + 3.5}
            fill={label(id)}
            fontSize={10}
            textAnchor="middle"
            stroke="#0B0C0E"
            strokeWidth={6}
            paintOrder="stroke"
            style={{ transition: t, fontFamily: "var(--font-jbm)" }}
          >
            {names[id]}
          </text>
        </g>
      ))}
      <line x1={C - 186} y1={C} x2={C + 186} y2={C} stroke="rgba(232,230,227,0.1)" />

      <text
        x={lx}
        y={ly}
        transform={`rotate(${SCAN_TO} ${lx} ${ly})`}
        dy={-5}
        fill={label("ai-research")}
        fontSize={10}
        stroke="#0B0C0E"
        strokeWidth={6}
        paintOrder="stroke"
        style={{ transition: t, fontFamily: "var(--font-jbm)" }}
      >
        {names["ai-research"]}
      </text>

      {/* Activos de ejemplo sobre la capa externa */}
      {sampleAssets.map((a, i) => {
        const [x, y] = polar(SOLUTION_RINGS.easm, ASSET_ANGLES[i]);
        const high = a.level === "alto";
        return (
          <rect
            key={a.host}
            x={x - 3.5}
            y={y - 3.5}
            width={7}
            height={7}
            fill={high ? "#FFB000" : "#0B0C0E"}
            stroke={high ? "#FFB000" : "rgba(232,230,227,0.7)"}
          />
        );
      })}
      <rect x={C - 4} y={C - 4} width={8} height={8} fill="#FFB000" />
    </svg>
  );
}
