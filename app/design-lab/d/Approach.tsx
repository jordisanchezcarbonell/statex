"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { approach, sections } from "../content";
import { APPROACH_LOGS, KEY_WIDTH } from "./data";
import { CornerMarks } from "./marks";
import { body, display, mono, section, wrap } from "./ui";
import styles from "./concept.module.css";

const steps = approach.steps;
const n2 = (i: number) => String(i + 1).padStart(2, "0");
const headerLine = (i: number) => `── ${n2(i)} ${steps[i].name.toLowerCase()} `;
const blockLines = (i: number) => [headerLine(i), ...APPROACH_LOGS[i].map(([k, v]) => `${k.padEnd(KEY_WIDTH)}${v}`)];

/**
 * Enfoque: en escritorio la sección se fija y una terminal escribe el registro ilustrativo de cada
 * paso según avanza el scroll. En móvil, tablet y lectores de pantalla el mismo registro es texto estático.
 */
export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <section id="enfoque" aria-labelledby="enfoque-title" className={section}>
      <div ref={ref} className="relative lg:h-[460svh]">
        <div className="lg:sticky lg:top-14 lg:flex lg:h-[calc(100svh-3.5rem)] lg:flex-col">
          <div className={`${wrap} flex flex-1 flex-col py-20 md:py-28 lg:min-h-0 lg:py-10`}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
              <h2 id="enfoque-title" className="lg:col-span-7">
                <span className="mb-4 flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] text-[color:var(--fg)]">
                  <span aria-hidden="true" className="h-[7px] w-[7px] bg-[color:var(--amber)]" />
                  {sections.approach}
                </span>
                <span className={`block max-w-[18ch] ${display} lg:text-[length:clamp(2rem,0.8rem+2.4vw,3.25rem)]`}>
                  {approach.title}
                </span>
              </h2>
              <p className={`${body} max-w-[44ch] lg:col-span-5 lg:pb-1.5`}>{approach.intro}</p>
            </div>

            <div className="mt-12 grid flex-1 grid-cols-1 gap-10 lg:mt-8 lg:min-h-0 lg:grid-cols-12">
              <figure className="m-0 hidden lg:col-span-7 lg:flex lg:min-h-0 lg:flex-col" aria-hidden="true">
                <Terminal active={active} reduce={!!reduce} />
                <figcaption className={`${mono} mt-3 text-[11px] leading-5 text-[color:var(--muted)]`}>
                  <span className="text-[color:var(--fg)]">FIG. 2</span>
                  <span className="whitespace-pre">{"  "}</span>
                  Registro de una evaluación sobre ejemplo.com. Ejemplo ilustrativo.
                </figcaption>
              </figure>

              <div className="relative lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
                {/* Raíl de progreso: solo en la versión fijada. */}
                <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-[color:var(--line)] lg:block" aria-hidden="true">
                  <motion.div className="h-full w-px origin-top bg-[color:var(--amber)]" style={{ scaleY: scrollYProgress }} />
                </div>
                <ol className="lg:pl-8">
                  {steps.map((step, i) => (
                    <li
                      key={step.name}
                      data-active={i === active}
                      aria-current={i === active ? "step" : undefined}
                      className="group border-t border-[color:var(--line)] py-6 first:border-t-0 first:pt-0 lg:border-t-0 lg:py-2.5 lg:first:pt-2.5"
                    >
                      <h3 className="flex items-baseline gap-4 text-[22px] font-medium leading-tight tracking-[-0.025em] text-[color:var(--fg)] transition-colors duration-300 lg:text-[length:clamp(1.125rem,0.55rem+0.9vw,1.5rem)] lg:text-[color:var(--muted)] lg:group-data-[active=true]:text-[color:var(--fg)]">
                        <span
                          className={`${mono} w-6 shrink-0 text-[12px] font-normal tracking-normal text-[color:var(--muted)] lg:group-data-[active=true]:text-[color:var(--amber)]`}
                        >
                          {n2(i)}
                        </span>
                        {step.name}
                      </h3>
                      <p className="mt-2 max-w-[44ch] pl-10 text-[15px] leading-[1.6] text-[color:var(--muted)] lg:text-[14px]">
                        {step.text}
                      </p>

                      {/* Registro estático: móvil/tablet y lectores de pantalla. */}
                      <div className="mt-5 pl-10 lg:sr-only">
                        <p className={`${mono} text-[11px] text-[color:var(--muted)]`}>Registro ilustrativo</p>
                        <dl
                          className={`${mono} mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 rounded-[2px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 text-[12px] leading-5`}
                        >
                          {APPROACH_LOGS[i].map(([k, v]) => (
                            <div key={k} className="contents">
                              <dt className="text-[color:var(--muted)]">{k}</dt>
                              <dd className="min-w-0 break-words text-[color:var(--fg)]">{v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Terminal({ active, reduce }: { active: number; reduce: boolean }) {
  const [typed, setTyped] = useState(Number.POSITIVE_INFINITY);

  useEffect(() => {
    if (reduce) {
      setTyped(Number.POSITIVE_INFINITY);
      return;
    }
    const total = blockLines(active).join("").length;
    let n = 0;
    setTyped(0);
    const id = window.setInterval(() => {
      n += 2;
      setTyped(n);
      if (n >= total) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  // Líneas del bloque activo recortadas a los caracteres ya escritos.
  let left = typed;
  const current = blockLines(active).map((line) => {
    const shown = line.slice(0, Math.max(0, left));
    left -= line.length;
    return { shown, started: left + line.length > 0 };
  });
  const lastStarted = current.reduce((acc, l, i) => (l.started ? i : acc), 0);

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[3px] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className={`${mono} flex items-center justify-between border-b border-[color:var(--line)] px-5 py-3 text-[11px] text-[color:var(--muted)]`}>
        <span className="text-[color:var(--fg)]">Registro ilustrativo</span>
        <span>
          paso {n2(active)}/{n2(steps.length - 1)}
        </span>
      </div>

      {/* Indicador de fase: cinco segmentos, el activo en ámbar. */}
      <div className="grid grid-cols-5 gap-px border-b border-[color:var(--line)] bg-[color:var(--line)]">
        {steps.map((s, i) => (
          <div
            key={s.name}
            className={`${mono} truncate bg-[color:var(--surface)] px-3 py-2 text-[10.5px] transition-colors duration-300 ${
              i === active ? "text-[color:var(--fg)]" : "text-[color:var(--muted)]"
            }`}
          >
            <span
              className={`mr-2 inline-block h-[5px] w-[5px] -translate-y-px transition-colors duration-300 ${
                i === active ? "bg-[color:var(--amber)]" : i < active ? "bg-[color:var(--muted)]" : "border border-[color:var(--muted)]"
              }`}
            />
            {s.name.toLowerCase()}
          </div>
        ))}
      </div>

      <div className={`${mono} flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-5 py-5 text-[13px] leading-[1.75]`}>
        {Array.from({ length: active }, (_, b) =>
          blockLines(b).map((line, i) => (
            <div
              key={`${b}-${i}`}
              className={`whitespace-pre ${i === 0 ? "mt-3 text-[color:var(--muted)] first:mt-0" : "text-[color:var(--muted)]"}`}
            >
              {line}
            </div>
          )),
        )}
        {current.map(({ shown, started }, i) =>
          started ? (
            <div
              key={`c-${active}-${i}`}
              className={`whitespace-pre text-[color:var(--fg)] ${i === 0 && active > 0 ? "mt-3" : ""}`}
            >
              {i === 0 ? shown : <KeyValue text={shown} />}
              {i === lastStarted ? (
                <span className={`${styles.cursor} ml-px inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-[color:var(--amber)]`} />
              ) : null}
            </div>
          ) : null,
        )}
      </div>
      <CornerMarks size={8} className="border-[rgba(255,176,0,0.5)]" />
    </div>
  );
}

function KeyValue({ text }: { text: string }) {
  return (
    <>
      <span className="text-[color:var(--muted)]">{text.slice(0, KEY_WIDTH)}</span>
      {text.slice(KEY_WIDTH)}
    </>
  );
}
