"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { cta, hero, sampleAssets } from "../../content";
import { useStage } from "./FieldStage";

const ease = [0.22, 1, 0.36, 1] as const;

// Posiciones de las etiquetas dentro de la zona de la lente (%). Se anclan con translateX(-x%)
// para no salirse de la caja a ningún ancho.
const spots = [
  { x: 8, y: 10 },
  { x: 86, y: 22 },
  { x: 40, y: 36 },
  { x: 94, y: 52 },
  { x: 14, y: 62 },
  { x: 62, y: 76 },
];

const levelDot = { alto: "bg-(--lavanda)", medio: "bg-(--hielo)", bajo: "border border-(--hielo)/70" } as const;
const levelText = { alto: "riesgo alto", medio: "riesgo medio", bajo: "riesgo bajo" } as const;

const lensMask =
  "radial-gradient(circle at var(--x, 50%) var(--y, 45%), #000 calc(var(--r, 110px) - 1px), transparent var(--r, 110px))";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const stage = useStage();
  const reduce = useReducedMotion();
  const [exposed, setExposed] = useState(false);
  const words = hero.title.split(" ");

  useEffect(() => {
    if (!stage || !sectionRef.current || !textRef.current || !fieldRef.current || !tagsRef.current) return;
    stage.bind({
      section: sectionRef.current,
      text: textRef.current,
      field: fieldRef.current,
      tags: tagsRef.current,
    });
    return () => stage.bind(null);
  }, [stage]);

  useEffect(() => {
    stage?.setExposed(exposed);
  }, [stage, exposed]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="f-hero-title"
      className="relative flex min-h-svh flex-col justify-end bg-(--nieve) group-data-[gl=ready]/stage:bg-transparent"
    >
      {/* Fondo CSS equivalente mientras carga el shader o si WebGL falla. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_top,transparent_0%,transparent_45%,black_85%)] group-data-[gl=ready]/stage:hidden lg:[mask-image:linear-gradient(105deg,transparent_0%,transparent_50%,black_85%)]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 78% 30%, transparent 0 17px, rgb(44 75 255 / 0.22) 17px 18px), repeating-radial-gradient(circle at 58% 70%, transparent 0 19px, rgb(122 92 255 / 0.18) 19px 20px)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-8 px-5 pb-14 pt-24 sm:px-8 md:pb-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pt-32">
        <div ref={textRef} className="lg:col-span-7 lg:self-end">
          <h1
            id="f-hero-title"
            className="text-[clamp(2.5rem,6.6vw,5.75rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-(--tinta) [text-wrap:balance]"
          >
            {words.map((word, i) => (
              <span key={i}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.05, ease, delay: 0.15 + i * 0.05 }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.75)} className="mt-8 max-w-[36rem] text-[17px] leading-[1.55] text-(--gris) sm:text-[18px]">
            {hero.body}
          </motion.p>
          <motion.div {...rise(0.9)} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="inline-flex min-h-12 items-center rounded-full bg-(--tinta) px-6 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-(--cobalto)"
            >
              {cta.primary}
            </a>
            <a
              href="#soluciones"
              className="inline-flex min-h-12 items-center rounded-full border border-(--tinta)/20 bg-white/70 px-6 text-[15px] font-medium text-(--tinta) backdrop-blur-sm transition-colors duration-300 hover:border-(--tinta)/60 hover:bg-white"
            >
              {cta.explore}
            </a>
          </motion.div>
        </div>
        {/* Zona de la lente: la capa del atacante aparece aquí, bajo el cursor o al pulsar el botón. */}
        <div ref={fieldRef} className="relative flex h-[17rem] flex-col justify-end sm:h-[19rem] order-first lg:order-none lg:col-span-5 lg:h-auto lg:min-h-[28rem]">
          <div
            ref={tagsRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none"
            style={{ maskImage: lensMask, WebkitMaskImage: lensMask } as CSSProperties}
          >
            {sampleAssets.map((a, i) => (
              <span
                key={a.host}
                className="absolute flex max-w-[calc(100%-0.5rem)] items-center gap-2 rounded-md border border-(--hielo)/30 bg-(--tinta)/85 px-2.5 py-1.5 text-[13px] leading-tight text-white"
                style={{ left: `${spots[i].x}%`, top: `${spots[i].y}%`, transform: `translate(-${spots[i].x}%, -50%)` }}
              >
                <span className={`size-2 shrink-0 rounded-full ${levelDot[a.level]}`} />
                <span className="truncate font-semibold tabular-nums">{a.host}</span>
                <span className="hidden shrink-0 text-(--hielo) sm:inline">
                  {a.kind}, {levelText[a.level]}
                </span>
              </span>
            ))}
          </div>

          <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              aria-pressed={exposed}
              onClick={() => setExposed((v) => !v)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-(--tinta)/25 bg-(--nieve)/90 px-4.5 text-[15px] font-medium text-(--tinta) backdrop-blur-sm transition-colors duration-300 hover:border-(--tinta)/60 aria-pressed:border-(--hielo)/50 aria-pressed:bg-(--tinta) aria-pressed:text-white"
            >
              {exposed ? <EyeOff aria-hidden="true" className="size-4.5" /> : <Eye aria-hidden="true" className="size-4.5" />}
              Ver como atacante
            </button>
            <span
              className={`rounded-full px-3 py-1 text-[13px] ${
                exposed ? "bg-(--tinta) text-(--hielo)" : "bg-(--nieve)/90 text-(--gris)"
              }`}
            >
              Ejemplo ilustrativo
            </span>
          </div>
        </div>

      </div>

      <div className="sr-only">
        <p>Ejemplo ilustrativo de lo que ve un atacante desde internet:</p>
        <ul>
          {sampleAssets.map((a) => (
            <li key={a.host}>
              {a.host}: {a.kind}, {levelText[a.level]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
