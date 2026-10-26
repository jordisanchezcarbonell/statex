"use client";

import { useActionState } from "react";
import { scan, type Check, type CheckStatus, type ScanState } from "../../actions/scan";
import { focus, muted } from "../../_site/ui";

const initial: ScanState = { status: "idle" };

// Estilo por estado: el rojo de StateX solo para lo que hay que arreglar; titanio/marfil para el resto.
const tone: Record<CheckStatus, { border: string; text: string; word: string }> = {
  ok: { border: "border-(--h-ivory)/40", text: "text-(--h-ivory)/80", word: "Bien" },
  aviso: { border: "border-(--h-red)", text: "text-(--h-red-text)", word: "Aviso" },
  falta: { border: "border-(--h-red)", text: "text-(--h-red-text)", word: "Falta" },
  info: { border: "border-(--h-titanium)/60", text: "text-(--h-titanium)", word: "Info" },
};

function Row({ c }: { c: Check }) {
  const t = tone[c.status];
  return (
    <li className="grid gap-1 border-t border-(--h-line) py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
      <div>
        <p className="m-0 font-medium">{c.label}</p>
        <p className={`m-0 mt-1 max-w-[70ch] text-[14px] leading-[1.5] ${muted}`}>{c.detail}</p>
      </div>
      <span className={`inline-flex items-center self-start border-l-2 pl-2 text-[12px] tabular-nums sm:justify-self-end ${t.border} ${t.text}`}>
        {t.word}
      </span>
    </li>
  );
}

export function Checker() {
  const [state, action, pending] = useActionState(scan, initial);
  const problems = state.checks?.filter((c) => c.status === "aviso" || c.status === "falta").length ?? 0;

  return (
    <div>
      <form action={action} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="url">URL a comprobar</label>
        <input
          id="url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          placeholder="ejemplo.com"
          defaultValue={state.target ?? ""}
          className={`min-h-12 flex-1 border border-(--h-line) bg-transparent px-4 text-[16px] text-(--h-ivory) placeholder:text-(--h-titanium)/70 ${focus}`}
        />
        <button
          type="submit"
          disabled={pending}
          className={`min-h-12 bg-(--h-ivory) px-6 font-medium text-(--h-ink) transition-opacity hover:opacity-90 disabled:opacity-60 motion-reduce:transition-none ${focus}`}
        >
          {pending ? "Comprobando…" : "Comprobar"}
        </button>
      </form>

      <p className={`m-0 mt-3 text-[13px] ${muted}`}>
        Una sola lectura de lo público, como la de un navegador. No prueba vulnerabilidades ni toca nada.
      </p>

      {/* Mensajes de error / estado */}
      {state.status !== "idle" && state.status !== "ok" && state.message && (
        <p className="m-0 mt-6 border-l-2 border-(--h-red) pl-4 text-(--h-red-text)">{state.message}</p>
      )}

      {/* Resultados */}
      {state.status === "ok" && state.checks && (
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-(--h-line) pb-4">
            <p className="m-0 font-mono text-[13px] break-all">{state.target}</p>
            <p className={`m-0 text-[14px] ${muted}`}>
              {problems === 0 ? "Sin avisos en lo comprobado" : `${problems} aviso${problems === 1 ? "" : "s"} a revisar`}
            </p>
          </div>
          <ul className="m-0 list-none border-b border-(--h-line) p-0">
            {state.checks.map((c) => (
              <Row key={c.id} c={c} />
            ))}
          </ul>
          <p className={`m-0 mt-5 max-w-[70ch] text-[14px] leading-[1.55] ${muted}`}>
            Esto es una foto superficial de lo que la web expone en abierto, no una auditoría. Una evaluación real
            revisa la aplicación por dentro (autenticación, lógica, APIs) y requiere alcance y autorización firmados.
          </p>
        </div>
      )}
    </div>
  );
}
