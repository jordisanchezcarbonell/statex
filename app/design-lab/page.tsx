import type { Metadata } from "next";
import { Compare } from "./_shared/Compare";

export const metadata: Metadata = { title: "Design lab" };

export default function DesignLab() {
  return (
    <main className="min-h-screen bg-[#efefec] px-4 pb-16 pt-8 font-sans text-zinc-900 sm:px-8 lg:px-10">
      <header className="mb-7 max-w-[56rem]">
        <h1 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight tracking-tight">StateX: design lab</h1>
        <p className="mt-2 text-zinc-600">
          Siete direcciones de marca y homepage para la misma empresa: mismo posicionamiento, mismos servicios y mismos
          hechos. Cambian la composición, la tipografía, la paleta, el sistema gráfico y el movimiento.
        </p>
        <p className="mt-2 text-[15px] text-zinc-600">
          Cambia de concepto con las pestañas o las teclas 1–7, alterna entre homepage e identidad de marca, y entre
          escritorio y móvil. Donde faltan datos reales aparece <code className="rounded bg-zinc-200 px-1">[Pendiente]</code>.
          Investigación: <code className="rounded bg-zinc-200 px-1">docs/design-research.md</code>.
        </p>
      </header>
      <Compare />
    </main>
  );
}
