"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { sampleAssets } from "../content";

type Level = (typeof sampleAssets)[number]["level"];

const ORDER: Level[] = ["alto", "medio", "bajo"];

const LEVEL_LABEL: Record<Level, string> = { alto: "Alto", medio: "Medio", bajo: "Bajo" };
const PRIORITY_LABEL: Record<Level, string> = {
  alto: "Prioridad alta",
  medio: "Prioridad media",
  bajo: "Prioridad baja",
};

const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "hallazgos", label: "Hallazgos" },
  { id: "plan", label: "Plan" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// Todo lo que aparece aquí se deriva de sampleAssets (datos de ejemplo), nunca de cifras reales.
const sorted = [...sampleAssets].sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level));
const counts = ORDER.map((level) => ({
  level,
  n: sampleAssets.filter((a) => a.level === level).length,
}));
const highHosts = sampleAssets.filter((a) => a.level === "alto").map((a) => a.host);

function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-medium font-[family-name:var(--font-geist-mono)]"
      style={{ background: `var(--${level}-bg)`, color: `var(--${level})` }}
    >
      <LevelMark level={level} />
      {LEVEL_LABEL[level]}
    </span>
  );
}

// Forma distinta por nivel para no depender solo del color.
function LevelMark({ level }: { level: Level }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className="shrink-0">
      {level === "alto" && <rect width="8" height="8" rx="1" fill="currentColor" />}
      {level === "medio" && <rect y="2" width="8" height="4" rx="1" fill="currentColor" />}
      {level === "bajo" && <circle cx="4" cy="4" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  );
}

function Hosts({ hosts }: { hosts: string[] }) {
  return (
    <>
      {hosts.map((h, i) => (
        <span key={h}>
          {i > 0 && (i === hosts.length - 1 ? " y " : ", ")}
          <span className="font-[family-name:var(--font-geist-mono)] text-[0.92em] text-[var(--ink)]">{h}</span>
        </span>
      ))}
    </>
  );
}

function Summary() {
  return (
    <div className="space-y-5">
      <ul className="space-y-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
        <li>
          Se revisaron <strong className="font-semibold text-[var(--ink)]">{sampleAssets.length} activos</strong>{" "}
          expuestos a internet dentro del alcance acordado.
        </li>
        <li>
          {counts.map((c, i) => (
            <span key={c.level}>
              {i > 0 && (i === counts.length - 1 ? " y " : ", ")}
              <strong className="font-semibold text-[var(--ink)]">{c.n}</strong> con nivel {c.level}
            </span>
          ))}
          .
        </li>
        <li>
          Conviene empezar por <Hosts hosts={highHosts} />.
        </li>
      </ul>

      {/* Distribución por nivel: una sola tira, sin ejes ni decoración. */}
      <figure>
        <div className="flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
          {sorted.map((a) => (
            <span key={a.host} className="flex-1" style={{ background: `var(--${a.level}-bar)` }} />
          ))}
        </div>
        <figcaption className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)] font-[family-name:var(--font-geist-mono)]">
          {counts.map((c) => (
            <span key={c.level} className="inline-flex items-center gap-1.5" style={{ color: `var(--${c.level})` }}>
              <LevelMark level={c.level} />
              <span className="text-[var(--muted)]">
                {LEVEL_LABEL[c.level]} · {c.n}
              </span>
            </span>
          ))}
        </figcaption>
      </figure>
    </div>
  );
}

function Findings() {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[17rem] border-collapse text-left text-[14px]">
        <caption className="sr-only">Activos del ejemplo ordenados por nivel</caption>
        <thead>
          <tr className="border-b border-[var(--rule)] text-[12px] text-[var(--muted)]">
            <th scope="col" className="pb-2 pr-3 font-medium">Activo</th>
            <th scope="col" className="pb-2 pr-3 font-medium">Tipo</th>
            <th scope="col" className="pb-2 font-medium">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => (
            <tr key={a.host} className="border-b border-[var(--rule)] last:border-b-0">
              <td className="py-2.5 pr-3 font-[family-name:var(--font-geist-mono)] text-[13px] text-[var(--ink)] break-all">
                {a.host}
              </td>
              <td className="py-2.5 pr-3 text-[var(--ink-soft)]">{a.kind}</td>
              <td className="py-2.5">
                <LevelBadge level={a.level} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Plan() {
  return (
    <ol className="space-y-4">
      {ORDER.map((level) => {
        const items = sorted.filter((a) => a.level === level);
        if (items.length === 0) return null;
        return (
          <li key={level}>
            <p className="mb-1.5 flex items-center gap-2 text-[13px] font-medium" style={{ color: `var(--${level})` }}>
              <LevelMark level={level} />
              {PRIORITY_LABEL[level]}
            </p>
            <ul className="space-y-1 border-l border-[var(--rule)] pl-4 text-[14px] text-[var(--ink-soft)]">
              {items.map((a) => (
                <li key={a.host}>
                  Revisar{" "}
                  <span className="font-[family-name:var(--font-geist-mono)] text-[13px] text-[var(--ink)]">{a.host}</span>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

export function ReportPreview() {
  const [active, setActive] = useState<TabId>("resumen");
  const reduce = useReducedMotion();
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const transition = reduce ? { duration: 0 } : { duration: 0.22, ease: [0.2, 0, 0, 1] as const };

  return (
    <article
      aria-labelledby={`${base}-title`}
      className="relative w-full min-w-0 rounded-xl border border-[var(--rule)] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_32px_-12px_rgba(17,24,39,0.18)]"
    >
      {/* Cabecera del documento */}
      <header className="border-b border-[var(--rule)] px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <h2 id={`${base}-title`} className="text-[15px] font-semibold text-[var(--ink)]">
            Informe de evaluación <span className="text-[var(--muted)]">·</span>{" "}
            <span className="font-[family-name:var(--font-geist-mono)] font-normal">ejemplo.com</span>
          </h2>
          <p className="rounded-md border border-dashed border-[var(--amber-rule)] px-2 py-0.5 text-[12px] font-medium text-[var(--medio)]">
            Ejemplo ilustrativo
          </p>
        </div>
        <p className="mt-1.5 text-[13px] text-[var(--muted)]">Datos ficticios con dominio y rangos IP de documentación.</p>
      </header>

      {/* Pestañas */}
      <div role="tablist" aria-label="Secciones del informe" className="flex gap-1 border-b border-[var(--rule)] px-3 sm:px-5">
        {TABS.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${base}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={selected ? `${base}-panel-${t.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative min-h-11 rounded-t-md px-3 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--emerald-ink)] ${
                selected ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
              {selected && (
                <motion.span
                  layoutId={`${base}-indicator`}
                  transition={transition}
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--emerald)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Contenido: altura mínima estable para que el documento no salte al cambiar de pestaña */}
      <div className="relative min-h-[19.5rem] px-5 py-6 sm:px-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`${base}-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${active}`}
            tabIndex={0}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={transition}
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--emerald-ink)]"
          >
            {active === "resumen" && <Summary />}
            {active === "hallazgos" && <Findings />}
            {active === "plan" && <Plan />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pie de página del documento */}
      <footer className="flex items-center justify-between border-t border-[var(--rule)] px-5 py-3 text-[12px] text-[var(--muted)] font-[family-name:var(--font-geist-mono)] sm:px-7">
        <span>StateX</span>
        <span>{TABS.findIndex((t) => t.id === active) + 1} / {TABS.length}</span>
      </footer>
    </article>
  );
}
