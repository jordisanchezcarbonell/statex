"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { approach, problem, sections } from "../../content";
import { ProcessMap } from "./ProcessMap";
import { SectionHeading } from "./SectionHeading";
import { mono, shell } from "./ui";

// #problema y #enfoque comparten un mapa fijo (sticky) en escritorio: el desorden del problema
// se ordena paso a paso mientras se recorre el enfoque. En móvil se muestran dos estados estáticos
// (antes / después), que se leen igual de bien sin animación.

export function ProblemApproach() {
  const [phase, setPhase] = useState(-1);
  const reduce = useReducedMotion();
  const problemRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const targets = [
      problemRef.current,
      ...Array.from(stepsRef.current?.querySelectorAll<HTMLElement>("[data-phase]") ?? []),
    ].filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setPhase(Number((e.target as HTMLElement).dataset.phase));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div className="border-y border-(--line) bg-white">
      <div className={`${shell} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24`}>
        <div className="min-w-0">
          <section
            id="problema"
            ref={problemRef}
            data-phase={-1}
            aria-labelledby="b-problema"
            className="scroll-mt-20 py-20 sm:py-24 lg:py-32"
          >
            <SectionHeading id="b-problema" label={sections.problem} title={problem.title} intro={problem.intro} />
            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {problem.risks.map((r) => (
                <li key={r.name} className="border-t border-(--line) pt-5">
                  <h3 className="flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.01em] text-(--navy)">
                    <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-(--signal) ring-2 ring-(--navy)" />
                    {r.name}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-(--muted)">{r.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-14 lg:hidden">
              <ProcessMap phase={-1} />
            </div>
          </section>

          <section
            id="enfoque"
            aria-labelledby="b-enfoque"
            className="scroll-mt-20 border-t border-(--line) pt-20 pb-20 sm:pt-24 lg:pt-32 lg:pb-[28vh]"
          >
            <SectionHeading id="b-enfoque" label={sections.approach} title={approach.title} intro={approach.intro} />
            <ol ref={stepsRef} className="relative mt-14">
              <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-(--line)" />
              <motion.span
                aria-hidden="true"
                className="absolute top-5 bottom-5 left-5 w-[2px] origin-top -translate-x-1/2 bg-(--sky)"
                style={{ scaleY: reduce ? scrollYProgress : progress }}
              />
              {approach.steps.map((s, i) => {
                const active = i === phase;
                const done = i < phase;
                return (
                  <li
                    key={s.name}
                    data-phase={i}
                    className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 pb-12 last:pb-0 lg:min-h-[38vh] lg:last:min-h-0"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative z-10 grid size-10 place-items-center rounded-full border text-[13px] font-medium transition-colors duration-300 ${mono} ${
                        active
                          ? "border-(--navy) bg-(--navy) text-white"
                          : done
                            ? "border-(--sky-ink) bg-white text-(--sky-ink)"
                            : "border-(--edge) bg-white text-(--navy)"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-(--navy)">{s.name}</h3>
                      <p className="mt-2 max-w-[44ch] text-[17px] leading-relaxed text-(--muted)">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-14 lg:hidden">
              <ProcessMap phase={approach.steps.length - 1} />
            </div>
          </section>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[max(5.5rem,calc(50vh-19rem))] py-10">
            <ProcessMap phase={phase} />
          </div>
        </div>
      </div>
    </div>
  );
}
