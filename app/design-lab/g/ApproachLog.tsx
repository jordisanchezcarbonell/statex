"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1] as const;

type Step = { name: string; text: string };

/** Barra de censura que se retira al entrar en vista. Decorativa; sin JS o con reduced motion no existe. */
function Bar({ delay, from }: { delay: number; from: "left" | "right" }) {
  return (
    <motion.span
      aria-hidden="true"
      className="ed-bar inset-x-[-0.2em] inset-y-[0.06em]"
      style={{ originX: from === "left" ? 0 : 1 }}
      initial={{ scaleX: 1 }}
      whileInView={{ scaleX: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
    />
  );
}

/** Enfoque como registro: cinco asientos en orden, cada uno con su fase numerada. */
export function ApproachLog({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  const total = String(steps.length).padStart(2, "0");
  return (
    <ol className="relative">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-(--ink)" />
      {steps.map((s, i) => {
        const num = String(i + 1).padStart(2, "0");
        return (
          <li key={s.name} className="relative grid gap-3 pb-14 pl-9 last:pb-0 sm:pl-12 md:grid-cols-[8.5rem_1fr] md:gap-8">
            <span aria-hidden="true" className="absolute top-[0.45rem] left-0 size-[11px] border border-(--ink) bg-(--red)" />
            <p className="font-(family-name:--f-mono) text-[13px] leading-6 text-(--archive-ink)">
              Fase {num}
              <span aria-hidden="true">/{total}</span>
            </p>
            <div>
              <h3 className="relative w-fit font-(family-name:--f-serif) text-[clamp(2rem,3.6vw,3.25rem)] leading-[1] tracking-[-0.01em]">
                {s.name}
                {!reduce && <Bar delay={0.05} from={i % 2 === 0 ? "right" : "left"} />}
              </h3>
              <p className="relative mt-3 w-fit max-w-[52ch] text-[1.05rem] leading-[1.65]">
                {s.text}
                {!reduce && <Bar delay={0.25} from={i % 2 === 0 ? "left" : "right"} />}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
