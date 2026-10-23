import type { ReactNode } from "react";
import Link from "next/link";
import { DIRECTIONS } from "../directions";

// Ficha de identidad común a todos los conceptos: misma estructura para poder compararlas.
// Cada concepto aporta sus piezas (logotipo, sistema gráfico, tarjeta, portada…) como slots.
type Props = {
  slug: string;
  /** Logotipo principal sobre fondo claro y oscuro. */
  logoLight: ReactNode;
  logoDark: ReactNode;
  /** Símbolo / monograma reducido (favicon, avatar de GitHub, LinkedIn). */
  symbol: ReactNode;
  /** Muestra tipográfica con la jerarquía real. */
  typeSpecimen: ReactNode;
  /** Demostración del sistema gráfico (patrones, retícula, iconografía…). */
  graphicSystem: ReactNode;
  /** Tarjeta de presentación digital: anverso y reverso. */
  cardFront: ReactNode;
  cardBack: ReactNode;
  /** Portada de pitch deck en 16:9. */
  deckCover: ReactNode;
  /** Aplicaciones: portada de informe, banner de LinkedIn, cabecera de GitHub… */
  applications?: { name: string; node: ReactNode; ratio?: string }[];
  /** Notas de uso del sistema (2–4 frases). */
  notes?: string[];
};

export function BrandBoard(p: Props) {
  const d = DIRECTIONS.find((x) => x.slug === p.slug)!;
  const h2 = "text-[13px] font-semibold text-zinc-500";
  const box = "overflow-hidden rounded-xl border border-zinc-300";

  return (
    <main className="min-h-screen bg-[#efefec] px-4 pb-24 pt-8 font-sans text-zinc-900 sm:px-8 lg:px-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[14px] text-zinc-600">Identidad · Dirección {d.letter}</p>
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">{d.name}</h1>
          <p className="mt-1 max-w-[46rem] text-zinc-600">{d.intent}</p>
        </div>
        <nav aria-label="Navegación del concepto" className="flex flex-wrap gap-2 text-[14px] font-semibold">
          <Link href={`/design-lab/${d.slug}`} className="rounded-lg bg-zinc-900 px-3.5 py-2.5 text-white hover:bg-zinc-700">Ver homepage</Link>
          <Link href="/design-lab" className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 hover:border-zinc-900">Volver al design lab</Link>
        </nav>
      </header>

      <section aria-labelledby="logo" className="grid gap-4 lg:grid-cols-[2fr_2fr_1fr]">
        <h2 id="logo" className={`${h2} lg:col-span-3`}>Logotipo</h2>
        <div className={`${box} grid min-h-[240px] place-items-center bg-white p-8`}>{p.logoLight}</div>
        <div className={`${box} grid min-h-[240px] place-items-center bg-zinc-950 p-8`}>{p.logoDark}</div>
        <div className={`${box} grid min-h-[240px] place-items-center bg-white p-8`}>{p.symbol}</div>
      </section>

      <section aria-labelledby="paleta" className="mt-12">
        <h2 id="paleta" className={h2}>Paleta</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {d.palette.map((c) => (
            <li key={c.hex} className={box}>
              <div className="h-28" style={{ background: c.hex }} />
              <div className="bg-white p-3 text-[13px]">
                <b className="block">{c.name}</b>
                <code className="text-zinc-600">{c.hex}</code>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tipografia" className="mt-12 grid gap-4 lg:grid-cols-[1fr_3fr]">
        <div>
          <h2 id="tipografia" className={h2}>Tipografía</h2>
          <ul className="mt-3 grid gap-2 text-[15px]">
            {d.fonts.map((f) => (
              <li key={f.family}><b>{f.family}</b><span className="block text-zinc-600">{f.role}</span></li>
            ))}
          </ul>
        </div>
        <div className={`${box} bg-white`}>{p.typeSpecimen}</div>
      </section>

      <section aria-labelledby="sistema" className="mt-12">
        <h2 id="sistema" className={h2}>Sistema gráfico</h2>
        <div className={`${box} mt-4`}>{p.graphicSystem}</div>
      </section>

      <section aria-labelledby="tarjeta" className="mt-12">
        <h2 id="tarjeta" className={h2}>Tarjeta de presentación digital</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className={`${box} aspect-[1.75/1]`}>{p.cardFront}</div>
          <div className={`${box} aspect-[1.75/1]`}>{p.cardBack}</div>
        </div>
      </section>

      <section aria-labelledby="deck" className="mt-12">
        <h2 id="deck" className={h2}>Portada de pitch deck</h2>
        <div className={`${box} mt-4 aspect-video`}>{p.deckCover}</div>
      </section>

      {p.applications && p.applications.length > 0 && (
        <section aria-labelledby="aplicaciones" className="mt-12">
          <h2 id="aplicaciones" className={h2}>Aplicaciones</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {p.applications.map((a) => (
              <li key={a.name}>
                <div className={box} style={{ aspectRatio: a.ratio ?? "16 / 9" }}>{a.node}</div>
                <p className="mt-2 text-[14px] text-zinc-600">{a.name}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.notes && p.notes.length > 0 && (
        <section aria-labelledby="notas" className="mt-12 max-w-[52rem]">
          <h2 id="notas" className={h2}>Cómo se usa</h2>
          <ul className="mt-3 grid list-disc gap-1.5 pl-5">
            {p.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </section>
      )}
    </main>
  );
}
