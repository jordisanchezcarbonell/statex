"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { cta, hero, sampleAssets } from "../content";
import { GlobeCanvas } from "./GlobeCanvas";
import { CornerMarks } from "./marks";
import { btnGhost, btnPrimary, mono, wrap } from "./ui";

const EASE = [0.2, 0.7, 0.1, 1] as const;
const LEVEL: Record<string, string> = { alto: "exposición alta", medio: "exposición media", bajo: "exposición baja" };

export function Hero() {
  const reduce = useReducedMotion();
  const words = hero.title.split(" ");
  const off = reduce ? false : undefined;

  return (
    <MotionConfig reducedMotion="user">
    <section aria-labelledby="hero-title" className="relative isolate border-b border-[color:var(--line)]">
      <div className={`${wrap} relative grid min-h-[calc(100svh-3.5rem)] grid-cols-1 lg:grid-cols-12 lg:gap-x-10`}>
        <div className="relative z-10 flex flex-col justify-end pb-14 pt-[46svh] lg:col-span-6 lg:justify-center lg:py-24">
          <h1
            id="hero-title"
            className="max-w-[12ch] text-[length:clamp(2.5rem,1rem+5.2vw,6rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[color:var(--fg)]"
          >
            {words.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-top -mb-[0.1em]">
                  <motion.span
                    className="inline-block"
                    initial={off ?? { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.055 }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-[46ch] text-[17px] leading-[1.6] text-[color:var(--muted)] md:text-lg"
            initial={off ?? { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={off ?? { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.74 }}
          >
            <a href="#contacto" className={btnPrimary}>
              {cta.primary}
            </a>
            <a href="#soluciones" className={btnGhost}>
              {cta.explore}
            </a>
          </motion.div>
        </div>

        <figure className="pointer-events-none absolute inset-x-0 top-0 m-0 h-[58svh] lg:pointer-events-auto lg:relative lg:col-span-6 lg:flex lg:h-auto lg:flex-col lg:py-10">
          <motion.div
            className="absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:relative lg:flex-1 lg:opacity-100 lg:[mask-image:none]"
            initial={off ?? { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
          >
            <GlobeCanvas />
            <span className="hidden lg:contents">
              <CornerMarks size={14} className="border-[rgba(232,230,227,0.3)]" />
            </span>
          </motion.div>
          <figcaption
            className={`${mono} sr-only text-[11px] leading-5 text-[color:var(--muted)] lg:not-sr-only lg:mt-4 lg:text-right`}
          >
            <span className="text-[color:var(--fg)]">FIG. 1</span>
            <span className="whitespace-pre">{"  "}</span>
            Superficie expuesta de ejemplo.com. Ejemplo ilustrativo.
            <span className="sr-only">
              {" "}Objetivos marcados en la figura:{" "}
              {sampleAssets.map((a) => `${a.host} (${a.kind}, ${LEVEL[a.level]})`).join("; ")}.
            </span>
          </figcaption>
        </figure>

        {/* Pie visible también en móvil, bajo los botones. */}
        <p className={`${mono} -mt-6 pb-8 text-[11px] leading-5 text-[color:var(--muted)] lg:hidden`} aria-hidden="true">
          <span className="text-[color:var(--fg)]">FIG. 1</span>
          <span className="whitespace-pre">{"  "}</span>
          Superficie expuesta de ejemplo.com. Ejemplo ilustrativo.
        </p>
      </div>
    </section>
    </MotionConfig>
  );
}
