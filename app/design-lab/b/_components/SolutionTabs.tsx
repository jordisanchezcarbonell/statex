"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { solutions } from "../../content";
import { SOLUTION_VISUALS } from "./SolutionVisuals";
import { dotCanvas, mono, ring } from "./ui";

// Selector lateral: pestañas verticales (patrón ARIA tabs, activación automática).
export function SolutionTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = solutions.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const s = solutions[active];
  const Visual = SOLUTION_VISUALS[s.id];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
      <div role="tablist" aria-orientation="vertical" aria-label="Soluciones" className="relative flex flex-col border-l border-(--line)">
        {solutions.map((sol, i) => {
          const on = i === active;
          return (
            <button
              key={sol.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`b-tab-${sol.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="b-tabpanel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`group relative -ml-px rounded-r-xl py-4 pr-4 pl-6 text-left transition-colors ${on ? "bg-white" : "hover:bg-white/60"} ${ring}`}
            >
              {on && (
                <motion.span
                  layoutId="b-tab-indicator"
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-(--navy)"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className={`block text-[18px] font-semibold tracking-[-0.015em] ${on ? "text-(--navy)" : "text-(--navy)/80 group-hover:text-(--navy)"}`}>
                {sol.short}
              </span>
              <span className={`mt-1 block text-[12.5px] text-(--muted) ${mono}`}>{sol.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id="b-tabpanel"
        role="tabpanel"
        aria-labelledby={`b-tab-${s.id}`}
        tabIndex={0}
        className={`min-w-0 overflow-hidden rounded-[18px] border border-(--line) bg-white ${ring}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
            className="grid xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className="p-6 sm:p-8 xl:p-10">
              <div>
                <h3 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.125rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-(--navy)">
                  {s.name}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-(--muted)">{s.text}</p>
              </div>
            </div>
            <div
              className="aspect-[56/30] border-t border-(--line) bg-(--fog)/60 xl:aspect-auto xl:min-h-[22rem] xl:border-t-0 xl:border-l"
              style={dotCanvas}
            >
              <div className="grid size-full place-items-center p-3 sm:p-6">{Visual && <Visual />}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
