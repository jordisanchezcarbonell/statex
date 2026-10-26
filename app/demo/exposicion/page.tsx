import type { Metadata } from "next";
import Link from "next/link";
import { inter } from "../../_site/font";
import { Wordmark, caps, display, focus, muted, tokens, wrap } from "../../_site/ui";
import { Checker } from "./Checker";

export const metadata: Metadata = {
  title: { absolute: "StateX · Comprobador de exposición (demo interna)" },
  description: "Comprobador pasivo: lee las cabeceras de seguridad que una web expone en abierto.",
};

// Demo interna (noindex, protegida por proxy.ts). Comprobador pasivo: lee lo que cualquier visitante ve,
// sin pruebas activas. El servicio real (escaneo activo) sí requiere alcance y autorización firmados.
export const maxDuration = 15;

export default function ExposicionDemo() {
  const steps = [
    { k: "Lee", v: "Las cabeceras que la web devuelve a cualquier visitante." },
    { k: "Evalúa", v: "CSP, HSTS, clickjacking, nosniff, referrer, tecnología expuesta y security.txt." },
    { k: "No hace", v: "Pruebas activas, rastreo, formularios ni nada que requiera permiso." },
  ];

  return (
    <div
      style={tokens}
      className={`${inter.variable} min-h-dvh overflow-x-clip bg-(--h-ink) font-(family-name:--h-sans) text-(--h-ivory) antialiased`}
    >
      <a href="#comprobar" className="sr-only z-[60] bg-(--h-ivory) px-4 py-3 text-(--h-ink) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al comprobador
      </a>

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
        <section className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
          <p className={`m-0 flex items-center gap-3 text-[14px] ${muted}`}>
            <span aria-hidden="true" className="h-px w-8 bg-(--h-titanium)/60" />
            Comprobador pasivo de exposición
          </p>
          <h1 className={`${display} m-0 mt-7 max-w-[18ch] text-[clamp(2rem,5.5vw,4.5rem)]`}>
            Mira qué expone una web en abierto.
          </h1>
          <p className="m-0 mt-8 max-w-[62ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.55]">
            Pega una URL y StateX lee, con una sola petición, las cabeceras de seguridad que esa web devuelve a
            cualquiera. Sin pruebas activas: solo lo público.
          </p>

          <div id="comprobar" className="mt-10 scroll-mt-20 border border-(--h-line) p-6 lg:p-8">
            <Checker />
          </div>

          <div className="mt-10 grid gap-px border border-(--h-line) bg-(--h-line) sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.k} className="bg-(--h-ink) p-6">
                <p className={`m-0 text-[13px] ${caps}`}>{s.k}</p>
                <p className={`m-0 mt-3 text-[14px] leading-[1.5] ${muted}`}>{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-(--h-red) pl-5">
            <p className="m-0 max-w-[72ch] leading-[1.55]">
              Esto es una foto superficial, no una auditoría. Detectar vulnerabilidades de verdad —probando la
              aplicación por dentro— es el servicio real de StateX, y empieza siempre con alcance y{" "}
              <strong>autorización firmados</strong> por el dueño del sistema. Esta página es interna: no se anuncia
              en la web pública.
            </p>
          </div>

          <Link
            href="/"
            className={`mt-8 inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium hover:border-(--h-red) ${focus}`}
          >
            Volver a la web
          </Link>
        </section>
      </main>
    </div>
  );
}
