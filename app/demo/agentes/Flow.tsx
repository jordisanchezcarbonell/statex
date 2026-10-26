"use client";

import { useState } from "react";
import { caps, focus, muted } from "../../_site/ui";
import { checkpoints, findings as allFindings, severityOrder, stages, type Finding, type Severity } from "./data";

// Severidad con un único acento (la línea roja de StateX): rojo para lo que urge, titanio para el resto,
// marfil tenue para lo correcto. El color codifica dato, no decora.
const sevTone: Record<Severity, string> = {
  Crítica: "text-(--h-red-text) border-(--h-red)",
  Alta: "text-(--h-red-text) border-(--h-red)",
  Media: "text-(--h-ivory) border-(--h-titanium)",
  Baja: "text-(--h-titanium) border-(--h-titanium)/60",
  Informativa: "text-(--h-titanium) border-(--h-titanium)/40",
  Correcto: "text-(--h-ivory)/80 border-(--h-ivory)/30",
};

function SevChip({ s }: { s: Severity }) {
  return (
    <span className={`inline-flex items-center gap-2 border-l-2 pl-2 text-[12px] tabular-nums ${sevTone[s]}`}>
      {s}
    </span>
  );
}

function Count({ s, n }: { s: Severity; n: number }) {
  return (
    <span className={`inline-flex items-baseline gap-2 border-l-2 pl-3 ${sevTone[s]}`}>
      <span className="text-[1.6rem] tabular-nums leading-none">{n}</span>
      <span className="text-[13px]">{s}</span>
    </span>
  );
}

function FindingCard({ f }: { f: Finding }) {
  return (
    <li className="border-t border-(--h-line) py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="m-0 text-[1.05rem] font-semibold">{f.title}</h4>
        <SevChip s={f.severity} />
      </div>
      <p className={`m-0 mt-1 font-mono text-[12px] ${muted}`}>{f.location}</p>
      <p className="m-0 mt-3 max-w-[70ch] leading-[1.55]">{f.what}</p>
      <dl className="m-0 mt-3 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-[auto_1fr]">
        <dt className={`m-0 ${muted}`}>Evidencia</dt>
        <dd className="m-0 max-w-[70ch] leading-[1.5]">{f.evidence}</dd>
        <dt className={`m-0 ${muted}`}>Corrección</dt>
        <dd className="m-0 max-w-[70ch] leading-[1.5]">{f.fix}</dd>
      </dl>
      {f.needsManual && (
        <p className="m-0 mt-3 inline-flex items-center gap-2 border border-dashed border-(--h-titanium)/60 px-2 py-1 text-[12px] text-(--h-titanium)">
          Requiere confirmación manual — un agente no lo cierra sin prueba activa autorizada
        </p>
      )}
    </li>
  );
}

function Checkpoint({ label }: { label: string }) {
  return (
    <div className="relative my-1 ml-[11px] flex items-start gap-3 border-l-2 border-dashed border-(--h-ivory)/40 py-3 pl-6">
      <span className={`absolute -left-[7px] top-4 size-3 rounded-full border-2 border-(--h-ivory) bg-(--h-ink)`} aria-hidden="true" />
      <p className="m-0 max-w-[60ch] text-[14px] leading-[1.5]">
        <span className={`mr-2 ${caps} text-[12px] tracking-[0.12em] text-(--h-ivory)`}>Persona</span>
        <span className={muted}>{label}</span>
      </p>
    </div>
  );
}

export function Flow() {
  const [open, setOpen] = useState<number>(1);

  const entry = checkpoints.find((c) => c.after === 0);
  const counts = severityOrder
    .map((s) => ({ s, n: allFindings.filter((f) => f.severity === s).length }))
    .filter((c) => c.n > 0);

  return (
    <div>
      {/* Resumen de severidad */}
      {counts.length > 0 && (
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-y border-(--h-line) py-6">
          {counts.map((c) => (
            <Count key={c.s} s={c.s} n={c.n} />
          ))}
        </div>
      )}

      {/* Entrada: alcance firmado */}
      {entry && (
        <div className="mt-10">
          <Checkpoint label={entry.label} />
        </div>
      )}

      {/* Etapas */}
      <ol className="m-0 list-none p-0">
        {stages.map((st) => {
          const stFindings = allFindings.filter((f) => f.stage === st.n);
          const isOpen = open === st.n;
          const after = checkpoints.find((c) => c.after === st.n);
          return (
            <li key={st.key}>
              <div className="relative ml-[11px] border-l-2 border-(--h-red)/70 pl-6">
                <span
                  className="absolute -left-[13px] top-1 flex size-6 items-center justify-center rounded-full border-2 border-(--h-red) bg-(--h-ink) text-[12px] tabular-nums"
                  aria-hidden="true"
                >
                  {st.n}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : st.n)}
                  aria-expanded={isOpen}
                  className={`flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-1 text-left ${focus}`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`${caps} text-[clamp(1.15rem,2vw,1.5rem)] tracking-[0.01em]`}>{st.name}</span>
                    <span className={`text-[13px] ${muted}`}>{st.role}</span>
                  </span>
                  <span className={`text-[13px] tabular-nums ${muted}`}>
                    {stFindings.length > 0 ? `${stFindings.length} hallazgo${stFindings.length === 1 ? "" : "s"}` : "—"}
                  </span>
                </button>
                <div className="pb-6">
                  <p className={`m-0 mt-2 max-w-[70ch] leading-[1.55] ${muted}`}>{st.does}</p>
                  {isOpen && stFindings.length > 0 && (
                    <ul className="m-0 mt-5 list-none border-b border-(--h-line) p-0">
                      {stFindings.map((f) => (
                        <FindingCard key={f.title} f={f} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {after && <Checkpoint label={after.label} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
