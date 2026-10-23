import type { CSSProperties, ReactNode } from "react";
import { Instrument_Sans } from "next/font/google";
import { LabBar } from "../_shared/LabBar";
import {
  brand,
  closing,
  complementary,
  cta,
  deliverables,
  footer,
  method,
  nav,
  services,
  trust,
} from "../content";
import { Hero } from "./Hero";
import { btnPrimary, container, display, focusRing } from "./styles";

export const metadata = { title: "Concept A" };

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-a",
});

// Paleta del Concept A. Azul StateX es el único acento.
const palette = {
  "--porcelana": "#F6F7F9",
  "--tinta": "#0C1424",
  "--azul": "#2F5BFF",
  "--azul-hondo": "#1F45D9",
  "--pizarra": "#5A6478",
  "--linea": "#DDE1E8",
  "--niebla": "#AEB7C7", // texto secundario sobre Tinta (≈9:1)
} as CSSProperties;

const h2 = `${display} text-[clamp(2.25rem,1.2rem+3vw,4rem)] leading-[1] tracking-[-0.035em]`;
const section = "scroll-mt-20 py-24 lg:py-36";
const label = (s: string) => nav.find((n) => n.href === s)?.label ?? "";

function Pending({ children, id, onDark = false }: { children: ReactNode; id?: string; onDark?: boolean }) {
  return (
    <p
      id={id}
      className={`inline-block rounded-md border border-dashed px-2.5 py-1 text-sm ${
        onDark ? "border-[var(--niebla)] text-[var(--niebla)]" : "border-[var(--pizarra)] text-[var(--pizarra)]"
      }`}
    >
      {children}
    </p>
  );
}

export default function ConceptA() {
  return (
    <div
      style={palette}
      className={`${instrument.variable} min-h-screen overflow-x-clip bg-[var(--porcelana)] font-[family-name:var(--font-a)] text-[var(--tinta)] antialiased selection:bg-[var(--azul)] selection:text-white`}
    >
      <a
        href="#a-main"
        className={`sr-only z-[60] rounded-[10px] bg-[var(--tinta)] px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${focusRing}`}
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-50 border-b border-[var(--linea)] bg-[var(--porcelana)]/85 backdrop-blur-md">
        <div className={`${container} flex h-[68px] items-center justify-between gap-6`}>
          <a
            href="#a-main"
            className={`${display} rounded-sm text-[22px] tracking-[-0.03em] ${focusRing}`}
            aria-label={`${brand}, inicio`}
          >
            {brand}
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`rounded-sm text-[var(--pizarra)] transition-colors hover:text-[var(--tinta)] ${focusRing}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${btnPrimary} min-h-10 px-4 text-sm`}>
            {cta.primary}
          </a>
        </div>
      </header>

      <main id="a-main" className="scroll-mt-20">
        <Hero />

        {/* Servicios */}
        <section id="servicios" aria-labelledby="a-servicios" className={`${section} border-t border-[var(--linea)]`}>
          <div className={`${container} grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10`}>
            <div className="lg:col-span-4">
              <h2 id="a-servicios" className={`${h2} lg:sticky lg:top-28`}>
                {label("#servicios")}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-b border-[var(--linea)]">
                {services.map((s) => (
                  <li key={s.id} className="border-t border-[var(--linea)] py-9 lg:py-11">
                    <h3
                      className={`${display} text-[clamp(1.6rem,1rem+1.7vw,2.5rem)] leading-[1.05] tracking-[-0.03em]`}
                    >
                      {s.name}
                    </h3>
                    <p className="mt-4 max-w-[40rem] text-pretty text-[17px] leading-[1.6] text-[var(--pizarra)] sm:text-lg">
                      {s.text}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-14 rounded-xl border border-[var(--linea)] bg-white/70 p-6 sm:p-8">
                <p className="text-[14px] font-medium text-[var(--pizarra)]">{complementary.label}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.01em]">{complementary.name}</h3>
                <p className="mt-2 max-w-[40rem] text-pretty text-[16px] leading-[1.6] text-[var(--pizarra)]">
                  {complementary.text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metodología: secuencia real, por eso numerada */}
        <section id="metodologia" aria-labelledby="a-metodologia" className={`${section} bg-white`}>
          <div className={container}>
            <h2 id="a-metodologia" className={h2}>
              {label("#metodologia")}
            </h2>
            <ol className="mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
              {method.map((m, i) => (
                <li key={m.name} className="relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12">
                  {/* Filete de la línea: vertical en móvil, horizontal en escritorio */}
                  <span
                    aria-hidden="true"
                    className={`absolute bg-[var(--linea)] left-[7px] top-4 h-full w-px lg:left-0 lg:top-[7px] lg:h-px ${
                      i === method.length - 1 ? "hidden lg:block lg:w-full" : "lg:w-[calc(100%+2rem)]"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 size-[15px] rounded-full border-[1.5px] border-[var(--azul)] bg-white lg:top-0"
                  />
                  <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.015em]">
                    <span className="text-[15px] font-medium tabular-nums text-[var(--azul)]">{i + 1}</span>
                    {m.name}
                  </h3>
                  <p className="mt-3 max-w-[30rem] text-pretty text-[16px] leading-[1.6] text-[var(--pizarra)]">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregables */}
        <section id="entregables" aria-labelledby="a-entregables" className={section}>
          <div className={container}>
            <h2 id="a-entregables" className={h2}>
              {label("#entregables")}
            </h2>
            <ul className="mt-14 grid grid-cols-1 gap-x-16 md:grid-cols-2 lg:mt-20">
              {deliverables.map((d) => (
                <li
                  key={d.name}
                  className="grid grid-cols-1 gap-y-2 border-t border-[var(--linea)] py-7 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-8"
                >
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em]">{d.name}</h3>
                  <p className="text-pretty text-[16px] leading-[1.6] text-[var(--pizarra)]">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="a-confianza" className={`${section} border-t border-[var(--linea)]`}>
          <div className={container}>
            <h2 id="a-confianza" className={h2}>
              {trust.title}
            </h2>
            <p className="mt-12 max-w-[34ch] text-pretty text-[clamp(1.6rem,1rem+2.1vw,3rem)] font-medium leading-[1.18] tracking-[-0.025em] [font-stretch:90%] lg:mt-16">
              {trust.origin}
            </p>
            <div className="mt-6">
              <Pending>{trust.originPending}</Pending>
            </div>

            <ul className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
              {trust.principles.map((p) => (
                <li key={p.name} className="border-t border-[var(--tinta)] pt-5">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{p.name}</h3>
                  <p className="mt-2 text-pretty text-[16px] leading-[1.6] text-[var(--pizarra)]">{p.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Pending>{trust.principlesPending}</Pending>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="a-contacto" className="scroll-mt-20 pb-24 lg:pb-32">
          <div className={container}>
            <div className="grid grid-cols-1 gap-y-10 rounded-[24px] bg-[var(--tinta)] px-6 py-14 text-[var(--porcelana)] sm:px-12 sm:py-20 lg:grid-cols-12 lg:gap-x-10 lg:px-16 lg:py-24">
              <h2
                id="a-contacto"
                className="text-balance text-[clamp(2.25rem,1.2rem+3.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] [font-stretch:82%] lg:col-span-8"
              >
                {closing.title}
              </h2>
              <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:self-end">
                <p className="text-pretty text-[17px] leading-[1.6] text-[var(--niebla)] sm:text-lg">{closing.body}</p>
                <Pending id="a-contacto-pending" onDark>
                  {closing.pending}
                </Pending>
                <button
                  type="button"
                  aria-describedby="a-contacto-pending"
                  className={`inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[var(--azul)] px-6 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[var(--azul-hondo)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--porcelana)]`}
                >
                  {cta.primary}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--linea)]">
        <div
          className={`${container} flex flex-col gap-3 pb-28 pt-10 text-sm text-[var(--pizarra)] sm:flex-row sm:items-center sm:justify-between`}
        >
          <span className={`${display} text-lg tracking-[-0.02em]`}>{brand}</span>
          <span>
            © {footer.year} {brand}
          </span>
          <span>{footer.legal}</span>
        </div>
      </footer>

      <LabBar current="a" />
    </div>
  );
}
