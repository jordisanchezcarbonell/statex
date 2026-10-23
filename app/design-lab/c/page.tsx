import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import {
  brand,
  closing,
  complementary,
  cta,
  deliverables,
  footer,
  hero,
  method,
  nav,
  services,
  trust,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { HeroTitle } from "./HeroTitle";
import { Ink } from "./Ink";
import s from "./c.module.css";

export const metadata: Metadata = { title: "Concept C" };

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-c-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-c-sans",
  display: "swap",
});

// Contenedor común: deja en escritorio un margen izquierdo para el lomo vertical "StateX".
const wrap = "mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:pl-28 lg:pr-14";

const btnPrimary = `${s.focus} inline-flex min-h-11 items-center justify-center bg-[var(--blue)] px-5 py-2.5 text-[0.95rem] font-semibold text-white shadow-[4px_4px_0_var(--pink)] transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[6px_6px_0_var(--pink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--pink)]`;

const btnSecondary = `${s.focus} inline-flex min-h-11 items-center px-1 text-[0.95rem] font-semibold text-[var(--ink)] underline decoration-[var(--blue)] decoration-2 underline-offset-[6px] hover:decoration-[var(--pink)]`;

const pending =
  "inline-block border border-dashed border-current px-2 py-1 text-sm text-[var(--grey)]";

// Desplazamientos escalonados de los servicios (composición, no tarjetas).
const serviceOffsets = ["lg:ml-0", "lg:ml-[22%]", "lg:ml-[8%]", "lg:ml-[30%]", "lg:ml-[14%]"];
// Cada paso del método cae un poco más: la secuencia se lee como una escalera.
const stepOffsets = ["lg:mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-30", "lg:mt-40"];

export default function ConceptC() {
  return (
    <div className={`${s.root} ${serif.variable} ${sans.variable} min-h-screen`}>
      <a
        href="#contenido"
        className={`${s.focus} sr-only z-[60] bg-[var(--ink)] px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4`}
      >
        Saltar al contenido
      </a>

      <header className={`${wrap} pt-5 sm:pt-7`}>
        <div className="flex items-end justify-between gap-4 pb-3">
          <a
            href="/design-lab/c"
            className={`${s.serif} ${s.focus} text-[2.5rem] leading-[0.85] tracking-[-0.01em] sm:text-[3.5rem] lg:text-[4.25rem]`}
          >
            {brand}
          </a>
          <div className="flex items-center gap-8">
            <nav aria-label="Principal" className="hidden md:block">
              <ul className="flex gap-6 text-[0.95rem] font-medium">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`${s.focus} underline-offset-[6px] hover:underline hover:decoration-[var(--blue)] hover:decoration-2`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href="#contacto" className={`${btnPrimary} max-sm:px-3.5 max-sm:text-sm`}>
              {cta.primary}
            </a>
          </div>
        </div>
        {/* Filete doble de cabecera de publicación. */}
        <div aria-hidden="true">
          <div className="h-[3px] bg-[var(--ink)]" />
          <div className="mt-[3px] h-px bg-[var(--ink)]" />
        </div>
      </header>

      <main id="contenido">
        {/* Hero */}
        <section aria-labelledby="c-hero-title" className="relative">
          <p
            aria-hidden="true"
            className={`${s.serif} ${s.vertical} absolute bottom-16 left-8 top-14 hidden select-none text-center text-[2.25rem] leading-none text-[var(--grey)] lg:block`}
          >
            {brand}
          </p>
          <div className={`${wrap} grid grid-cols-12 gap-x-6 pb-24 pt-12 sm:pt-16 lg:pb-32`}>
            <div className="col-span-12 lg:col-span-8 lg:row-start-1 lg:-ml-2 lg:pt-36">
              <HeroTitle
                id="c-hero-title"
                text={hero.title}
                className="text-balance text-[clamp(3.1rem,8.6vw,9rem)] leading-[0.92] tracking-[-0.02em]"
              />
            </div>

            <div className="col-span-12 mt-12 sm:grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-end sm:gap-10 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:block">
              <div aria-hidden="true" className="relative mx-auto w-fit sm:mx-0">
                <span className={s.halftoneX}>X</span>
                <div className={`${s.dotsBlue} absolute -bottom-2 right-[-12%] aspect-square w-[62%]`} />
              </div>
              <div className="mt-10 sm:mt-0 lg:mt-12">
                <p className="max-w-[44ch] text-[1.075rem] leading-relaxed">{hero.body}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href="#contacto" className={btnPrimary}>
                    {cta.primary}
                  </a>
                  <a href="#servicios" className={btnSecondary}>
                    {cta.secondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" aria-labelledby="c-servicios" className="scroll-mt-6">
          <div className={`${wrap} border-t border-[var(--ink)] pb-24 pt-14 lg:pb-32`}>
            <Ink
              id="c-servicios"
              text="Servicios"
              className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]"
            />
            <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-20">
              <ul className="col-span-12 space-y-14 lg:col-span-8 lg:space-y-20">
                {services.map((svc, i) => (
                  <li key={svc.id} className={`max-w-[36rem] ${serviceOffsets[i] ?? ""}`}>
                    <h3
                      className={`${s.serif} text-balance text-[clamp(2rem,3.8vw,3.25rem)] italic leading-[1.02] tracking-[-0.01em]`}
                    >
                      {svc.name}
                    </h3>
                    <p className="mt-4 max-w-[48ch] leading-relaxed text-[var(--grey)]">{svc.text}</p>
                  </li>
                ))}
              </ul>
              <aside
                aria-labelledby="c-complementario"
                className="col-span-12 border-l-2 border-[var(--ink)] pl-5 sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end"
              >
                <p className="text-[0.85rem] font-medium text-[var(--grey)]">{complementary.label}</p>
                <h3 id="c-complementario" className={`${s.serif} mt-1 text-[1.75rem] italic leading-tight`}>
                  {complementary.name}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-[var(--grey)]">
                  {complementary.text}
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* Metodología */}
        <section id="metodologia" aria-labelledby="c-metodologia" className="scroll-mt-6">
          <div className={`${wrap} border-t border-[var(--ink)] pb-24 pt-14 lg:pb-32`}>
            <div className="lg:ml-[33%]">
              <Ink
                id="c-metodologia"
                text="Metodología"
                className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]"
              />
            </div>
            <ol
              role="list"
              className="mt-14 grid list-none gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:mt-20 lg:grid-cols-5"
            >
              {method.map((step, i) => (
                <li key={step.name} className={stepOffsets[i] ?? ""}>
                  <span aria-hidden="true" className={`${s.numeral} block text-[clamp(5rem,9vw,8rem)]`}>
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.name}</h3>
                  <p className="mt-2 max-w-[34ch] leading-relaxed text-[var(--grey)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregables */}
        <section id="entregables" aria-labelledby="c-entregables" className="scroll-mt-6">
          <div className={`${wrap} grid grid-cols-12 gap-x-6 border-t border-[var(--ink)] pb-24 pt-14 lg:pb-32`}>
            <div className="col-span-12 lg:col-span-4">
              <Ink
                id="c-entregables"
                text="Entregables"
                className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em] lg:text-[clamp(3.25rem,5.6vw,6rem)]"
              />
            </div>
            <dl className="col-span-12 mt-12 lg:col-span-8 lg:mt-3">
              {deliverables.map((d) => (
                <div
                  key={d.name}
                  className="border-b border-[var(--ink)]/25 py-5 first:pt-0 md:flex md:items-baseline md:gap-4"
                >
                  <dt className={`${s.serif} ${s.leader} text-[1.75rem] leading-tight md:flex-1 md:text-[2.1rem]`}>
                    {d.name}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-[var(--grey)] md:mt-0 md:w-[38%] md:shrink-0">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="c-confianza" className="scroll-mt-6">
          <div className={`${wrap} border-t border-[var(--ink)] pb-24 pt-14 lg:pb-32`}>
            <Ink
              id="c-confianza"
              text={trust.title}
              className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]"
            />
            <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-20">
              <div className="col-span-12 lg:col-span-9 lg:col-start-3">
                <div className="flex gap-5 sm:gap-8">
                  <div aria-hidden="true" className="w-2 shrink-0 bg-[var(--pink)] mix-blend-multiply sm:w-3" />
                  <div>
                    <p
                      className={`${s.serif} max-w-[30ch] text-pretty text-[clamp(1.75rem,3.6vw,3.25rem)] italic leading-[1.12]`}
                    >
                      {trust.origin}
                    </p>
                    <p className="mt-6">
                      <span className={pending}>{trust.originPending}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-12 mt-20 lg:col-span-8 lg:col-start-5">
                <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
                  {trust.principles.map((p) => (
                    <li key={p.name} className="border-t border-[var(--ink)] pt-4">
                      <h3 className={`${s.serif} text-[1.9rem] leading-tight`}>{p.name}</h3>
                      <p className="mt-2 max-w-[40ch] leading-relaxed text-[var(--grey)]">{p.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-10">
                  <span className={pending}>{trust.principlesPending}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto: plancha rosa a sangre */}
        <section id="contacto" aria-labelledby="c-contacto" className="scroll-mt-6 bg-[var(--pink)]">
          <div className={`${wrap} grid grid-cols-12 gap-x-6 py-20 sm:py-28 lg:py-36`}>
            <h2
              id="c-contacto"
              className={`${s.serif} col-span-12 text-balance text-[clamp(3rem,7.5vw,7.75rem)] leading-[0.92] tracking-[-0.02em] text-[var(--navy)] lg:col-span-8`}
            >
              {closing.title}
            </h2>
            <div className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
              <p className="max-w-[36ch] text-[1.15rem] leading-relaxed text-[var(--ink)]">{closing.body}</p>
              <button
                type="button"
                aria-describedby="c-contacto-pendiente"
                className={`${s.focus} mt-8 inline-flex min-h-12 items-center bg-[var(--ink)] px-6 py-3 font-semibold text-white shadow-[4px_4px_0_var(--navy)] transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[6px_6px_0_var(--navy)]`}
              >
                {cta.primary}
              </button>
              <p className="mt-6">
                <span
                  id="c-contacto-pendiente"
                  className="inline-block border border-dashed border-[var(--ink)] px-2 py-1 text-sm text-[var(--ink)]"
                >
                  {closing.pending}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${wrap} pb-28 pt-10`}>
        <div aria-hidden="true">
          <div className="h-px bg-[var(--ink)]" />
          <div className="mt-[3px] h-[3px] bg-[var(--ink)]" />
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className={`${s.serif} text-[2rem] leading-none`}>{brand}</p>
          <p className="text-sm text-[var(--grey)]">
            © {footer.year} {brand}
          </p>
          <p className="text-sm text-[var(--grey)]">{footer.legal}</p>
        </div>
      </footer>

      <LabBar current="c" />
    </div>
  );
}
