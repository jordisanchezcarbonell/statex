"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { approach } from "../../content";

const ease = [0.22, 1, 0.36, 1] as const;
const STEP = 0.32; // segundos entre pasos

// Secuencia real (1→5): un frente de onda recorre los pasos una sola vez al entrar en vista.
export function ApproachSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const on = reduce || inView;
  const n = approach.steps.length;

  return (
    <ol ref={ref} className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
      {/* Frente que recorre la secuencia (lg). */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 hidden h-[2px] origin-left bg-[linear-gradient(90deg,var(--cobalto),var(--violeta))] lg:block"
        initial={reduce ? false : { scaleX: 0 }}
        animate={on ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: reduce ? 0 : STEP * n, ease: "linear" }}
      />
      {approach.steps.map((s, i) => (
        <motion.li
          key={s.name}
          className="relative flex flex-col rounded-2xl border border-(--tinta)/10 bg-(--nieve)/90 p-5 backdrop-blur-[2px] lg:rounded-none lg:border-y-0 lg:border-l lg:border-r-0 lg:pt-8 lg:first:border-l-0 sm:p-6"
          initial={reduce ? false : { opacity: 0.35 }}
          animate={on ? { opacity: 1 } : { opacity: 0.35 }}
          transition={{ duration: 0.5, ease, delay: reduce ? 0 : i * STEP }}
        >
          <span
            aria-hidden="true"
            className="text-[clamp(2.75rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.06em] text-(--cobalto) tabular-nums"
          >
            {i + 1}
          </span>
          <h3 className="mt-6 text-[20px] font-semibold leading-[1.2] tracking-[-0.025em] text-(--tinta)">
            <span className="sr-only">Paso {i + 1}: </span>
            {s.name}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.55] text-(--gris)">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
