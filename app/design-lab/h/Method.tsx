"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { approach } from "../content";

/** Cinco pasos en secuencia real. La línea roja avanza sobre el filete de titanio al recorrer la sección. */
export function Method() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative mt-16 lg:mt-24">
      <div aria-hidden="true" className="absolute left-0 top-0 hidden h-px w-full bg-(--h-line) lg:block">
        <motion.div className="h-px origin-left bg-(--h-red)" style={{ scaleX: reduce ? 1 : progress }} />
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-(--h-line) lg:hidden">
        <motion.div className="h-full w-px origin-top bg-(--h-red)" style={{ scaleY: reduce ? 1 : progress }} />
      </div>

      <ol ref={ref} className="m-0 grid list-none gap-12 p-0 pl-8 lg:grid-cols-5 lg:gap-0 lg:pl-0">
        {approach.steps.map((s, i) => (
          <li key={s.name} className="lg:border-l lg:border-(--h-line) lg:px-7 lg:pt-10 lg:first:border-l-0 lg:first:pl-0">
            <span aria-hidden="true" className="block text-[clamp(2.75rem,4vw,4rem)] font-extralight leading-none tabular-nums tracking-[-0.04em] text-(--h-titanium)">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 mt-6 text-[1.15rem] font-semibold uppercase tracking-[0.01em]">
              <span className="sr-only">Paso {i + 1}: </span>
              {s.name}
            </h3>
            <p className="m-0 mt-3 max-w-[34ch] leading-[1.6] text-(--h-titanium)">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
