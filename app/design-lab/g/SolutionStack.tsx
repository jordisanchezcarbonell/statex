"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import type { Solution } from "../content";

// Inclinación fija de cada ficha, como si se hubieran dejado caer sobre la mesa.
const TILT = [-1.2, 1.1, -0.7, 1.4, -1.0];
// Altura de la pestaña: lo que queda visible de cada ficha al apilarse.
const TAB_REM = 2.75;
const BASE_TOP_REM = 1.25;

function Ficha({ solution, index }: { solution: Solution; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 22%"] });
  const tilt = reduce ? 0 : TILT[index % TILT.length];
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt, 0]);

  return (
    <div
      ref={ref}
      style={{ zIndex: index + 1, "--stack-top": `${BASE_TOP_REM + index * TAB_REM}rem` } as CSSProperties}
      className="relative lg:sticky lg:top-(--stack-top)"
    >
      <motion.article
        aria-labelledby={`ficha-${solution.id}`}
        style={{ rotate }}
        className="relative border border-(--ink) bg-(--card) shadow-[0_1px_0_var(--ink),0_18px_40px_-28px_rgba(17,17,17,0.45)] motion-reduce:!transform-none lg:min-h-[22rem]"
      >
        {/* Pestaña: la ruta de la ficha, como un archivo en un directorio. */}
        <div
          className="flex items-center justify-between gap-4 border-b border-(--ink) px-4 font-(family-name:--f-mono) text-[13px] sm:px-6"
          style={{ minHeight: `${TAB_REM}rem` }}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="inline-block size-2.5 shrink-0 bg-(--red)" />
            <span className="truncate">soluciones/{solution.id}</span>
          </span>
          <span className="hidden text-(--archive-ink) sm:inline">{solution.short}</span>
        </div>

        <div className="grid gap-8 px-4 pt-7 pb-9 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pt-10">
          <div className="lg:col-span-7">
            <h3
              id={`ficha-${solution.id}`}
              className="font-(family-name:--f-serif) text-[clamp(2.1rem,4.4vw,4rem)] leading-[0.95] tracking-[-0.01em] text-balance"
            >
              {solution.name}
            </h3>
            <p className="mt-3 font-(family-name:--f-mono) text-[13px] text-(--archive-ink) sm:hidden">{solution.short}</p>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-dotted lg:border-(--archive) lg:pl-8">
            <p className="max-w-[46ch] text-[1.05rem] leading-[1.65]">{solution.text}</p>
          </div>
        </div>

        {/* Perforaciones de archivo: puro adorno. */}
        <div aria-hidden="true" className="absolute bottom-4 left-4 hidden gap-2 sm:left-6 lg:flex">
          <span className="size-3 rounded-full border border-(--archive) bg-(--paper)" />
          <span className="size-3 rounded-full border border-(--archive) bg-(--paper)" />
        </div>
      </motion.article>
    </div>
  );
}

/** Fichas apiladas: en escritorio cada una es sticky con un top creciente y se endereza al llegar. */
export function SolutionStack({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="flex flex-col gap-10 lg:gap-[18vh] lg:pb-[12vh]">
      {solutions.map((s, i) => (
        <Ficha key={s.id} solution={s} index={i} />
      ))}
    </div>
  );
}
