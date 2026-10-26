import type { Metadata } from "next";
import Link from "next/link";
import { inter } from "../../_site/font";
import { Wordmark, caps, display, focus, muted, tokens, wrap } from "../../_site/ui";
import { Flow } from "./Flow";
import { alertNote, findings, stages } from "./data";

export const metadata: Metadata = {
  title: { absolute: "StateX · Demo interna — Pipeline de agentes de seguridad" },
  description: "Demostración interna del pipeline de agentes de StateX, ejecutado sobre nuestra propia web.",
};

// Demo interna (noindex). Muestra el flujo del servicio de agentes de StateX funcionando sobre
// nuestro propio sitio, con hallazgos reales. No es una capacidad anunciada en la web pública.
export default function AgentesDemo() {
  const total = findings.filter((f) => f.severity !== "Correcto").length;
  const ok = findings.filter((f) => f.severity === "Correcto").length;

  return (
    <div
      style={tokens}
      className={`${inter.variable} min-h-dvh overflow-x-clip bg-(--h-ink) font-(family-name:--h-sans) text-(--h-ivory) antialiased`}
    >
      <a href="#flujo" className="sr-only z-[60] bg-(--h-ivory) px-4 py-3 text-(--h-ink) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al flujo
      </a>

      {/* Barra: deja claro que es interno */}
      <header className="border-b border-(--h-line)">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-5`}>
          <Link href="/" className={`inline-flex items-center ${focus}`} aria-label="StateX, inicio">
            <Wordmark className="text-[17px]" />
          </Link>
          <span className={`inline-flex items-center gap-2 border border-(--h-titanium)/50 px-3 py-1 text-[12px] ${muted}`}>
            Demo interna · no indexada
          </span>
        </div>
      </header>

      <main>
        {/* Intro */}
        <section className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
          <p className={`m-0 flex items-center gap-3 text-[14px] ${muted}`}>
            <span aria-hidden="true" className="h-px w-8 bg-(--h-titanium)/60" />
            Servicio en diseño · agentes de IA para encontrar vulnerabilidades
          </p>
          <h1 className={`${display} m-0 mt-7 max-w-[20ch] text-[clamp(2rem,5.5vw,4.5rem)]`}>
            El pipeline, funcionando sobre nuestra propia web.
          </h1>
          <p className="m-0 mt-8 max-w-[62ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.55]">
            Cinco agentes acotan, analizan, verifican, priorizan y redactan. Entre ellos, una persona de StateX
            decide en cada barrera. Lo que ves abajo son los hallazgos reales de auditar este mismo sitio.
          </p>

          <div className="mt-10 grid gap-px border border-(--h-line) bg-(--h-line) sm:grid-cols-3">
            {[
              { k: "Objetivo", v: "La web de StateX", d: "Nuestro repo. Autorizado: código y configuración." },
              { k: "Hallazgos", v: `${total}`, d: "Ningún Crítico ni Alto. 1 Media, el resto Bajas e Informativas." },
              { k: "Confirmaciones", v: `${ok}`, d: "El pipeline también valida lo que está bien hecho." },
            ].map((c) => (
              <div key={c.k} className="bg-(--h-ink) p-6">
                <p className={`m-0 text-[13px] ${muted}`}>{c.k}</p>
                <p className={`m-0 mt-2 text-[clamp(1.4rem,2.4vw,2rem)] tabular-nums ${caps}`}>{c.v}</p>
                <p className={`m-0 mt-2 text-[14px] leading-[1.5] ${muted}`}>{c.d}</p>
              </div>
            ))}
          </div>

          {/* Encuadre honesto */}
          <div className="mt-8 border-l-2 border-(--h-red) pl-5">
            <p className="m-0 max-w-[72ch] leading-[1.55]">
              Los agentes <strong>asisten</strong> un encargo autorizado; no atacan solos. Ninguna prueba activa
              empieza sin autorización escrita, alcance firmado y reglas de intervención. Esta página es interna:
              el servicio aún se está validando y no se anuncia en la web pública.
            </p>
          </div>
        </section>

        {/* Flujo interactivo */}
        <section id="flujo" aria-labelledby="h-flujo" className={`${wrap} scroll-mt-20 border-t border-(--h-line) py-[clamp(3.5rem,8vw,6rem)]`}>
          <h2 id="h-flujo" className={`${display} m-0 text-[clamp(1.6rem,3.5vw,2.75rem)]`}>
            El flujo, paso a paso.
          </h2>
          <p className={`m-0 mt-5 max-w-[60ch] leading-[1.55] ${muted}`}>
            Pulsa una etapa para ver qué encontró. Los puntos marcados «Persona» son paradas humanas obligatorias.
          </p>
          <div className="mt-12 lg:max-w-[52rem]">
            <Flow />
          </div>

          {/* Aviso transversal */}
          <div className="mt-14 max-w-[72rem] border border-(--h-line) p-6 lg:p-8">
            <h3 className={`m-0 text-[14px] font-normal ${muted}`}>Aviso de críticos (control transversal)</h3>
            <p className="m-0 mt-3 max-w-[72ch] leading-[1.55]">{alertNote}</p>
          </div>
        </section>

        {/* Pie de la demo */}
        <section className={`${wrap} border-t border-(--h-line) py-12`}>
          <p className={`m-0 text-[14px] leading-[1.6] ${muted}`}>
            Diseño del servicio: <span className="text-(--h-ivory)">docs/servicio-agentes-vulnerabilidades-2026-10-26.md</span>.
            {" "}Auditoría ejecutada el 2026-10-26 sobre la rama de trabajo. {stages.length} etapas · revisión humana en 4 barreras.
          </p>
          <Link
            href="/"
            className={`mt-6 inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium hover:border-(--h-red) ${focus}`}
          >
            Volver a la web
          </Link>
        </section>
      </main>
    </div>
  );
}
