"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ContourPath } from "./contours";

type Cota = { x: number; y: number; host: string; level: string; side: "left" | "right" };

type Props = {
  paths: ContourPath[];
  width: number;
  height: number;
  cotas: Cota[];
};

const RANGE = 8; // px máximos de desplazamiento con el cursor

// Relieve a sangre del hero. El SVG usa `slice` anclado a la derecha; las cotas son HTML
// y se colocan con la misma transformación vía unidades de contenedor (sin JS de medida).
export function Relief({ paths, width, height, cotas }: Props) {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || !finePointer) {
      mx.set(0);
      my.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * -RANGE);
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * -RANGE);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, finePointer, mx, my]);

  return (
    <motion.div
      className="absolute -inset-[10px] [container-type:size]"
      style={reduce ? undefined : { x, y }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMaxYMid slice"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="var(--acero)"
            strokeOpacity={p.major ? 0.55 : 0.2}
            strokeWidth={p.major ? 1.1 : 0.75}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      <ul
        aria-label="Ejemplo ilustrativo de hallazgos sobre el relieve"
        className="absolute inset-0"
        style={{ ["--s" as string]: `max(calc(100cqw / ${width}), calc(100cqh / ${height}))` }}
      >
        {cotas.map((c, i) => (
          <motion.li
            key={c.host}
            className={`absolute flex items-center gap-2.5 font-[family-name:var(--font-b-mono)] text-[12px] leading-tight ${
              c.side === "left" ? "-translate-x-[calc(100%-5px)] flex-row-reverse" : "-translate-x-[5px]"
            } -translate-y-1/2`}
            style={{
              left: `calc(100cqw - ${width - c.x} * var(--s))`,
              top: `calc(50cqh + ${c.y - height / 2} * var(--s))`,
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.25, duration: 0.6, ease: "easeOut" }}
          >
            <span aria-hidden="true" className="block size-2.5 shrink-0 rotate-45 bg-[var(--hallazgo)]" />
            <span className={`flex flex-col gap-0.5 ${c.side === "left" ? "items-end text-right" : ""}`}>
              <span className="text-[var(--hueso)] [text-shadow:0_0_6px_var(--grafito),0_0_2px_var(--grafito)]">
                {c.host}
              </span>
              <span className="text-[var(--acero)] [text-shadow:0_0_6px_var(--grafito)]">nivel {c.level}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
