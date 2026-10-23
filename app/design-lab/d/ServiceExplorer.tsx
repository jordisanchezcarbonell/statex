"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cta, services } from "../content";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = services.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  const transition = reduce ? { duration: 0 } : { duration: 0.24, ease: [0.2, 0, 0, 1] as const };

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <div
        role="tablist"
        aria-label="Servicios de StateX"
        aria-orientation="vertical"
        className="flex flex-col border-l border-[var(--rule)]"
      >
        {services.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={selected ? `${base}-panel` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative min-h-12 py-3 pl-5 pr-3 text-left text-[15px] leading-snug transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--emerald-ink)] ${
                selected ? "font-medium text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${base}-indicator`}
                  transition={transition}
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-px w-0.5 bg-[var(--emerald)]"
                />
              )}
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="min-h-[15rem] border-t border-[var(--rule)] pt-8 md:border-t-0 md:pt-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.id}
            id={`${base}-panel`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${service.id}`}
            tabIndex={0}
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, x: -4 }}
            transition={transition}
            className="max-w-[38rem] rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--emerald-ink)]"
          >
            <p className="text-[14px] font-medium text-[var(--emerald-ink)]">{service.short}</p>
            <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--ink)] text-balance">
              {service.name}
            </h3>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-soft)] text-pretty">{service.text}</p>
            <a
              href="#contacto"
              className="mt-8 inline-flex min-h-11 items-center rounded-lg border border-[var(--rule-strong)] px-4 text-[15px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--emerald-ink)] hover:text-[var(--emerald-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--emerald-ink)]"
            >
              {cta.primary}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
