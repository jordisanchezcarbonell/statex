"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { deliverables } from "../content";

export function DeliverableLayers() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <ul ref={ref} className="relative grid gap-3">
      {deliverables.map((d, i) => (
        <Layer key={d.name} index={i} name={d.name} text={d.text} progress={scrollYProgress} reduce={!!reduce} />
      ))}
    </ul>
  );
}

function Layer({
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
  // Paralaje mínimo: cada capa se desplaza un poco más que la anterior.
  const y = useTransform(progress, [0, 1], [index * 7, -index * 7]);

  return (
    <motion.li
      style={{ y: reduce ? 0 : y, ["--off" as string]: `${index * 1.75}rem`, zIndex: index }}
      className="relative rounded-[18px] border border-white/90 bg-white/60 px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(11,21,48,0.06),0_24px_40px_-28px_rgba(11,21,48,0.3)] backdrop-blur-md sm:grid sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-8 sm:px-7 lg:ml-[var(--off)]"
    >
      <h3 className="text-[1rem] font-semibold text-[var(--noche)]">{name}</h3>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--bruma)] sm:mt-0">{text}</p>
    </motion.li>
  );
}
