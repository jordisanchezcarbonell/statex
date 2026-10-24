"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { about, brand, cta, hero } from "../content";
import { display, focus, wrap } from "./ui";

// Escena: una nave de pórticos en perspectiva central (un solo punto de fuga), como un pasillo
// de infraestructura visto de frente. Al fondo, la línea roja: el umbral que StateX vigila.
const VP = { x: 800, y: 210 };
const FRAMES = Array.from({ length: 11 }, (_, i) => {
  const d = 1 + i * 0.62; // profundidad
  return {
    d,
    left: VP.x - 1250 / d,
    right: VP.x + 1250 / d,
    top: VP.y - 720 / d,
    bottom: VP.y + 560 / d,
    fin: 70 / d,
    o: Math.max(0.12, 1 - i * 0.085),
  };
});
const far = FRAMES[FRAMES.length - 1];
const ease = [0.22, 1, 0.36, 1] as const;

function Scene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="h-light" cx={VP.x} cy={VP.y} r="520" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2F0EA" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#F2F0EA" stopOpacity="0.07" />
          <stop offset="1" stopColor="#F2F0EA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h-fin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2C3138" />
          <stop offset="1" stopColor="#181B20" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#0B0D10" />
      <rect width="1600" height="900" fill="url(#h-light)" />

      {/* Suelo pulido: guías hacia el punto de fuga */}
      <g stroke="#F2F0EA" strokeOpacity="0.05">
        {[-1400, -700, -250, 250, 700, 1400].map((dx) => (
          <line key={dx} x1={VP.x} y1={VP.y} x2={VP.x + dx} y2={900} />
        ))}
      </g>

      {/* Pórticos, del más lejano al más cercano */}
      {[...FRAMES].reverse().map((f, k) => (
        <motion.g
          key={f.d}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: f.o }}
          transition={{ duration: 1.4, delay: 0.1 + k * 0.06, ease }}
        >
          <rect x={f.left - f.fin} y={f.top} width={f.fin} height={f.bottom - f.top} fill="url(#h-fin)" />
          <rect x={f.right} y={f.top} width={f.fin} height={f.bottom - f.top} fill="url(#h-fin)" />
          {/* Canto iluminado hacia el fondo */}
          <line x1={f.left} y1={f.top} x2={f.left} y2={f.bottom} stroke="#F2F0EA" strokeOpacity="0.4" />
          <line x1={f.right} y1={f.top} x2={f.right} y2={f.bottom} stroke="#F2F0EA" strokeOpacity="0.4" />
          <line x1={f.left - f.fin} y1={f.top} x2={f.right + f.fin} y2={f.top} stroke="#F2F0EA" strokeOpacity="0.16" />
        </motion.g>
      ))}

      {/* La línea roja, al fondo del pasillo */}
      <motion.line
        x1={far.left + 8}
        x2={far.right - 8}
        y1={VP.y + 14}
        y2={VP.y + 14}
        stroke="#A83A35"
        strokeWidth="2"
        style={{ transformOrigin: `${VP.x}px ${VP.y}px`, transformBox: "view-box" }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease }}
      />
    </svg>
  );
}

export function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const words = hero.title.split(" ");

  return (
    <section id="inicio" ref={ref} aria-labelledby="h-hero" className="relative isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden">
      {/* En móvil la escena ocupa solo la parte alta, para que la línea roja quede sobre el titular y no lo cruce */}
      <motion.div
        className="absolute inset-0 -z-10 max-sm:bottom-auto max-sm:h-[56svh] max-sm:[mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
        style={reduce ? undefined : { scale, opacity: dim }}>
        <Scene reduce={reduce} />
      </motion.div>
      {/* Velo inferior para que el texto se lea sobre la escena */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#0B0D10_6%,rgba(11,13,16,0.78)_34%,rgba(11,13,16,0)_62%)]" />

      <div className={`${wrap} mt-auto pb-10 pt-40 sm:pb-14`}>
        <h1 id="h-hero" className={`${display} m-0 max-w-[19ch] text-[clamp(2.1rem,5.4vw,5.5rem)]`}>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.045, ease }}
                >
                  {w}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
          className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <p className="m-0 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-(--h-titanium) lg:col-span-6">{hero.body}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end">
            <a
              href="#contacto"
              className={`inline-flex min-h-13 items-center bg-(--h-ivory) px-7 font-medium text-(--h-ink) transition-colors hover:bg-white motion-reduce:transition-none ${focus}`}
            >
              {cta.primary}
            </a>
            <a
              href="#soluciones"
              className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium transition-colors hover:border-(--h-red) motion-reduce:transition-none ${focus}`}
            >
              {cta.explore}
            </a>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-(--h-line) pt-5 text-[13px] text-(--h-titanium)">
          <span>{brand.descriptor}</span>
          <span>Investigación propia desde {about.timeline[0].year}</span>
        </div>
      </div>
    </section>
  );
}
