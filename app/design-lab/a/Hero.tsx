"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cta, hero, sampleAssets } from "../content";
import { NodeMark, OrbitalMap } from "./OrbitalMap";
import { btnPrimary, btnSecondary, container, display } from "./styles";

const LEVEL_LABEL = { alto: "Exposición alta", medio: "Exposición media", bajo: "Exposición baja" } as const;

// Una única secuencia de carga: titular, texto, CTAs y, por último, el mapa.
export function Hero() {
  const reduce = useReducedMotion();

  const group: Variants = {
    hidden: {},
    show: { transition: reduce ? { duration: 0 } : { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const map: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduce ? { duration: 0 } : { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
    },
  };

  return (
    <section aria-labelledby="a-hero-title" className="pb-24 pt-14 sm:pt-20 lg:pb-36 lg:pt-28">
      <motion.div
        className={`${container} grid grid-cols-1 items-start gap-y-16 lg:grid-cols-12 lg:gap-x-10`}
        variants={group}
        initial="hidden"
        animate="show"
      >
        <div className="lg:col-span-7">
          <motion.h1
            id="a-hero-title"
            variants={item}
            className={`${display} text-balance text-[clamp(2.6rem,1rem+6.2vw,6.5rem)] leading-[0.94] tracking-[-0.04em]`}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-8 max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-[var(--pizarra)] sm:mt-10 sm:text-lg"
          >
            {hero.body}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a href="#contacto" className={btnPrimary}>
              {cta.primary}
            </a>
            <a href="#servicios" className={btnSecondary}>
              {cta.secondary}
            </a>
          </motion.div>
        </div>

        <motion.figure variants={map} className="mx-auto w-full max-w-[460px] lg:col-span-5 lg:mt-2 lg:max-w-none">
          <OrbitalMap />
          <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-[var(--linea)] pt-4 text-sm text-[var(--pizarra)]">
            <span className="font-medium text-[var(--tinta)]">Activos expuestos de ejemplo.com</span>
            <span>Ejemplo ilustrativo</span>
          </figcaption>
          <ul className="mt-1 text-sm">
            {sampleAssets.map((a) => (
              <li
                key={a.host}
                className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-x-3 border-b border-[var(--linea)] py-2.5 sm:grid-cols-[18px_minmax(0,1fr)_5.5rem_auto]"
              >
                <svg viewBox="-11 -11 22 22" className="size-[18px]" aria-hidden="true" focusable="false">
                  <NodeMark level={a.level} />
                </svg>
                <span className="truncate font-medium tabular-nums">{a.host}</span>
                <span className="hidden text-[var(--pizarra)] sm:block">{a.kind}</span>
                <span className="text-right text-[var(--pizarra)]">{LEVEL_LABEL[a.level]}</span>
              </li>
            ))}
          </ul>
        </motion.figure>
      </motion.div>
    </section>
  );
}
