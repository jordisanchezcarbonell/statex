"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sampleAssets } from "../content";

const SHADOW = 6;

function hardShadow(color: string, d = SHADOW) {
  return `${d}px ${d}px 0px 0px ${color}`;
}

/** Enlace con sombra dura que "se pulsa": se desplaza sobre su sombra al hover o al pulsar. */
export function PressLink({
  href,
  children,
  className = "",
  shadowColor = "#000000",
  describedBy,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  shadowColor?: string;
  describedBy?: string;
}) {
  const reduce = useReducedMotion();
  const pressed = { x: SHADOW, y: SHADOW, boxShadow: hardShadow(shadowColor, 0) };

  return (
    <motion.a
      href={href}
      aria-describedby={describedBy}
      initial={false}
      style={{ boxShadow: hardShadow(shadowColor) }}
      whileHover={reduce ? undefined : pressed}
      whileTap={reduce ? undefined : pressed}
      transition={{ type: "spring", stiffness: 700, damping: 32 }}
      className={`inline-flex items-center justify-center whitespace-nowrap border-[3px] border-black font-bold leading-none tracking-[-0.01em] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)] ${className}`}
    >
      {children}
    </motion.a>
  );
}

const levelStyle: Record<(typeof sampleAssets)[number]["level"], string> = {
  alto: "bg-[var(--e-lilac)]",
  medio: "bg-[var(--e-mint)]",
  bajo: "bg-white",
};

// Desplazamiento horizontal de cada bloque, como fracción de --e-stack-shift (8% móvil, 18% desde sm).
const shift = [0, 0.78, 0.28, 1];

/** Pila de bloques desplazados con activos de ejemplo. */
export function HeroStack() {
  const reduce = useReducedMotion();
  const assets = sampleAssets.slice(0, 4);
  const pressed = { x: SHADOW, y: SHADOW, boxShadow: hardShadow("#000000", 0) };

  return (
    <figure className="m-0">
      <ul className="m-0 flex list-none flex-col gap-4 p-0 [--e-stack-shift:8%] sm:[--e-stack-shift:18%]" aria-label="Activos expuestos de ejemplo">
        {assets.map((a, i) => (
          <motion.li
            key={a.host}
            initial={reduce ? false : { opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 520, damping: 30, delay: 0.15 + i * 0.09 }
            }
            style={{ marginLeft: `calc(${shift[i]} * var(--e-stack-shift))` }}
            className="w-[92%] sm:w-[82%]"
          >
            <motion.div
              initial={false}
              whileHover={reduce ? undefined : pressed}
              transition={{ type: "spring", stiffness: 700, damping: 32 }}
              style={{ boxShadow: hardShadow("#000000") }}
              className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-[3px] border-black bg-white px-4 py-3.5 sm:px-5"
            >
              <span className="min-w-0">
                <span className="block break-all font-[family-name:var(--e-mono)] text-[15px] sm:text-base">
                  {a.host}
                </span>
                <span className="block text-[15px] text-black/75">{a.kind}</span>
              </span>
              <span
                className={`shrink-0 border-2 border-black px-2 py-1 font-[family-name:var(--e-mono)] text-[13px] leading-none ${levelStyle[a.level]}`}
              >
                Nivel {a.level}
              </span>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      <figcaption className="mt-6 font-[family-name:var(--e-mono)] text-[13px]">
        Ejemplo ilustrativo
      </figcaption>
    </figure>
  );
}
