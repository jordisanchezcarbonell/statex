"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { method } from "../content";

// Altura (px) de cada estación sobre la onda en escritorio. La curva pasa por ellas.
const WAVE = [28, 92, 44, 100, 56];
const END_Y = 30;
const H = 128;

function wavePath() {
  // Estaciones en el borde izquierdo de cada columna: x = i * 200 sobre 1000.
  const pts = WAVE.map((y, i) => [i * 200, y] as const);
  pts.push([1000, END_Y]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
  }
  return d;
}

const D = wavePath();

export function MethodPath() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <div className="relative">
      {/* Trazo horizontal en escritorio */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 1000 ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 hidden w-full overflow-visible lg:block"
        style={{ height: H }}
      >
        <defs>
          <linearGradient id="f-method-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--plasma)" />
            <stop offset="100%" stopColor="var(--cian)" />
          </linearGradient>
        </defs>
        <path d={D} fill="none" stroke="var(--noche)" strokeOpacity={0.1} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <motion.path
          d={D}
          fill="none"
          stroke="url(#f-method-stroke)"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : progress }}
        />
      </svg>

      {/* Trazo vertical en móvil y tablet */}
      <svg
        aria-hidden="true"
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
        className="absolute bottom-2 left-[5px] top-2 w-[10px] lg:hidden"
      >
        <path d="M5 0 C9 33 1 66 5 100" fill="none" stroke="var(--noche)" strokeOpacity={0.1} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <motion.path
          d="M5 0 C9 33 1 66 5 100"
          fill="none"
          stroke="var(--plasma)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : progress }}
        />
      </svg>

      <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-0">
        {method.map((step, i) => (
          <Station
            key={step.name}
            index={i}
            name={step.name}
            text={step.text}
            progress={progress}
            reduce={!!reduce}
          />
        ))}
      </ol>
    </div>
  );
}

function Station({
  index,
  name,
  text,
  progress,
  reduce,
}: {
  index: number;
  name: string;
  text: string;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const at = index / 5;
  const fill = useTransform(progress, [Math.max(0, at - 0.02), at + 0.03], [0, 1]);
  const y = WAVE[index];

  return (
    <li className="relative pl-9 lg:pl-0 lg:pr-8" style={{ ["--wy" as string]: `${y}px` }}>
      {/* Estación: posición sobre la curva en escritorio, sobre la línea vertical en móvil */}
      <span
        aria-hidden="true"
        className="absolute left-[10px] top-[0.35rem] size-[11px] -translate-x-1/2 rounded-full border border-[var(--plasma)] bg-[var(--plata)] lg:left-0 lg:top-[var(--wy)] lg:-translate-y-1/2"
      >
        <motion.span
          className="absolute inset-[2px] rounded-full bg-[var(--plasma)]"
          style={{ opacity: reduce ? 1 : fill }}
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 hidden w-px bg-[var(--noche)]/12 lg:block"
        style={{ top: `calc(var(--wy) + 10px)`, height: `calc(${H + 12}px - var(--wy))` }}
      />
      <div className="lg:pt-[152px] lg:pl-5">
        <h3 className="flex items-baseline gap-3 text-[1.0625rem] font-semibold text-[var(--noche)]">
          <span className="[font-family:var(--font-unbounded)] text-[0.8125rem] font-normal text-[var(--bruma)] [font-variant-numeric:tabular-nums]">
            {index + 1}
          </span>
          {name}
        </h3>
        <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-[var(--bruma)]">{text}</p>
      </div>
    </li>
  );
}
