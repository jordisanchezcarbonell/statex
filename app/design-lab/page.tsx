import type { Metadata } from "next";
import { Compare } from "./_shared/Compare";

export const metadata: Metadata = { title: "Design lab" };

export default function DesignLab() {
  return (
    <main className="min-h-screen bg-[#efefec] px-4 pb-16 pt-8 font-sans text-zinc-900 sm:px-8 lg:px-10">
      <header className="mb-7 max-w-[54rem]">
        <h1 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight tracking-tight">StateX: design lab</h1>
        <p className="mt-2 text-zinc-600">
          Seis direcciones visuales para la misma homepage. Misma marca, mismos servicios y mismo contenido; cambian
          composición, tipografía, jerarquía, paleta y lenguaje visual.
        </p>
        <p className="mt-2 text-[15px] text-zinc-600">
          Cambia de concepto con las pestañas o las teclas 1–6. Marca tus favoritos con «Preseleccionar» (se guarda
          solo en este navegador). Donde faltan datos reales aparece <code className="rounded bg-zinc-200 px-1">[Pendiente]</code>.
          Investigación de referencias: <code className="rounded bg-zinc-200 px-1">docs/design-research.md</code>.
        </p>
      </header>
      <Compare />
    </main>
  );
}
