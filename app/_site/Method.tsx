"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { method } from "./content";
import { caps, muted } from "./ui";

/**
 * Cuatro fases en secuencia real, cada una con lo que queda por escrito (trazabilidad).
 * La línea roja avanza sobre el filete de titanio al recorrer la sección.
 */
export function Method({ data = method }: { data?: typeof method }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <div className="relative mt-16 lg:mt-24">
        <div aria-hidden="true" className="absolute left-0 top-0 hidden h-px w-full bg-(--h-line) lg:block">
          <motion.div className="h-px origin-left bg-(--h-red)" style={{ scaleX: reduce ? 1 : progress }} />
        </div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-(--h-line) lg:hidden">
          <motion.div className="h-full w-px origin-top bg-(--h-red)" style={{ scaleY: reduce ? 1 : progress }} />
        </div>

        <ol ref={ref} className="m-0 grid list-none gap-12 p-0 pl-8 lg:grid-cols-4 lg:gap-0 lg:pl-0">
          {data.steps.map((s, i) => (
            <li key={s.name} className="flex flex-col lg:border-l lg:border-(--h-line) lg:px-8 lg:pt-10 lg:first:border-l-0 lg:first:pl-0">
              <span aria-hidden="true" className="block text-[clamp(2.75rem,4vw,4rem)] font-extralight leading-none tabular-nums tracking-[-0.04em] text-(--h-titanium)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`m-0 mt-6 text-[1.2rem] tracking-[0.01em] ${caps}`}>
                <span className="sr-only">Fase {i + 1}: </span>
                {s.name}
              </h3>
              <p className={`m-0 mt-3 max-w-[36ch] leading-[1.6] ${muted}`}>{s.text}</p>
              <p className="m-0 mt-6 border-t border-(--h-line) pt-4 text-[14px] lg:mt-auto">
                <span className={`block text-[13px] ${muted}`}>{data.recordLabel}</span>
                <span className="mt-1 block">{s.record}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
      <p className="m-0 mt-14 max-w-[60ch] border-l-2 border-(--h-ivory) pl-5 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.5] lg:ml-[calc(25%+0.625rem)]">
        {data.rule}
      </p>
    </>
  );
}
