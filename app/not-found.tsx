import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "./_site/Shell";
import { display, focus, muted, wrap } from "./_site/ui";

// 404 propia: mantiene el código 404 (sin redirigir a la home) y ofrece salidas claras.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

const textLink = `inline-flex min-h-12 items-center border-b border-(--h-ivory)/40 hover:border-(--h-red) ${focus}`;

export default function NotFound() {
  return (
    <Shell base="/">
      <section aria-labelledby="h-404" className="pb-[clamp(5rem,10vw,9rem)] pt-36 sm:pt-44">
        <div className={wrap}>
          <p className={`m-0 text-[14px] tabular-nums ${muted}`}>Error 404</p>
          <h1 id="h-404" className={`${display} m-0 mt-10 max-w-[18ch] text-[clamp(2.2rem,5.6vw,5rem)]`}>Esta página no existe.</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <p className="m-0 mt-10 max-w-[50ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.55] text-(--h-ivory)/85">
            Puede que la dirección esté mal escrita o que la página se haya movido.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/" className={`inline-flex min-h-12 items-center bg-(--h-ivory) px-7 font-medium text-(--h-ink) transition-colors hover:bg-white motion-reduce:transition-none ${focus}`}>
              Volver al inicio
            </Link>
            <Link href="/#servicios" className={textLink}>Ver servicios</Link>
            <Link href="/#contacto" className={textLink}>Solicitar evaluación</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
