import type { CSSProperties } from "react";
import { Manrope, Unbounded } from "next/font/google";
import { LabBar } from "../_shared/LabBar";
import {
  brand,
  closing,
  complementary,
  cta,
  footer,
  hero,
  nav,
  services,
  trust,
} from "../content";
import { HeroSphere } from "./HeroSphere";
import { MethodPath } from "./MethodPath";
import { DeliverableLayers } from "./DeliverableLayers";
import styles from "./f.module.css";

export const metadata = { title: "Concept F" };

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-unbounded",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const tokens = {
  "--plata": "#EEF1F5",
  "--noche": "#0B1530",
  "--plasma": "#5B5BFF",
  "--cian": "#0891B2",
  "--bruma": "#5F6B82",
  fontFamily: "var(--font-manrope), system-ui, sans-serif",
} as CSSProperties;

const display = "[font-family:var(--font-unbounded)]";
const wrap = "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--plasma)]";
const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--noche)] px-6 text-[0.9375rem] font-semibold text-white shadow-[0_0_0_1px_rgba(91,91,255,0.55),0_10px_30px_-10px_rgba(91,91,255,0.7)] transition-shadow hover:shadow-[0_0_0_1px_rgba(91,91,255,0.9),0_14px_36px_-10px_rgba(91,91,255,0.9)] ${focus}`;
const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--noche)]/20 px-6 text-[0.9375rem] font-semibold text-[var(--noche)] transition-colors hover:border-[var(--noche)]/45 hover:bg-white/50 ${focus}`;
const h2 = `${display} text-[clamp(1.875rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--noche)]`;
const pending =
  "inline-block rounded-md border border-dashed border-[var(--bruma)]/50 px-2.5 py-1 text-[0.8125rem] text-[var(--bruma)]";

export default function ConceptF() {
  return (
    <div
      className={`${unbounded.variable} ${manrope.variable} relative min-h-screen overflow-x-clip bg-[var(--plata)] text-[var(--noche)] selection:bg-[var(--plasma)]/20`}
      style={tokens}
    >
      {/* Luz radial muy suave sobre el fondo plata */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(60%_55%_at_72%_18%,rgba(255,255,255,0.95),rgba(255,255,255,0)_70%)]"
      />

      <header className="sticky top-0 z-50 border-b border-[var(--noche)]/[0.07] bg-[var(--plata)]/75 backdrop-blur-lg">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a href="#inicio" className={`${display} rounded-sm text-[1.125rem] font-normal tracking-[-0.01em] ${focus}`}>
            {brand}
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-7 text-[0.875rem] font-medium text-[var(--bruma)]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`rounded-sm transition-colors hover:text-[var(--noche)] ${focus}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${btnPrimary} min-h-10 px-4 text-[0.8125rem] sm:px-5`}>
            {cta.primary}
          </a>
        </div>
      </header>

      <main id="inicio" className="relative">
        {/* Hero */}
        <section aria-labelledby="f-hero" className={`${wrap} grid items-center gap-14 pb-24 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-24`}>
          <div className="lg:col-span-6">
            <h1
              id="f-hero"
              className={`${display} text-[clamp(2.25rem,4.7vw,4.75rem)] font-light leading-[1.04] tracking-[-0.035em] [text-wrap:balance]`}
            >
              {hero.title}
            </h1>
            <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-[1.65] text-[var(--bruma)] sm:text-[1.125rem]">
              {hero.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contacto" className={btnPrimary}>
                {cta.primary}
              </a>
              <a href="#servicios" className={btnSecondary}>
                {cta.secondary}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroSphere />
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" aria-labelledby="f-servicios" className={`${wrap} scroll-mt-20 py-20 lg:py-28`}>
          <h2 id="f-servicios" className={h2}>
            {nav[0].label}
          </h2>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-x-6">
            {services.map((s) => (
              <li key={s.id} className="min-w-0">
                <div aria-hidden="true" className="h-px bg-gradient-to-r from-[var(--plasma)] to-[var(--cian)]" />
                <p className="mt-5 text-[0.8125rem] font-medium text-[var(--bruma)]">{s.short}</p>
                <h3 className="mt-2 text-[1.0625rem] font-semibold leading-snug [hyphens:auto]" lang="es">
                  {s.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--bruma)]">{s.text}</p>
              </li>
            ))}
          </ul>

          <aside
            aria-labelledby="f-complementario"
            className="mt-16 grid gap-4 rounded-[22px] border border-white/90 bg-white/45 p-6 shadow-[0_0_0_1px_rgba(11,21,48,0.06),0_30px_50px_-36px_rgba(11,21,48,0.35)] backdrop-blur-md sm:p-8 lg:mt-20 lg:grid-cols-12 lg:items-baseline lg:gap-10"
          >
            <div className="lg:col-span-5">
              <p className="text-[0.8125rem] font-medium text-[var(--bruma)]">{complementary.label}</p>
              <h3 id="f-complementario" className={`${display} mt-2 text-[1.25rem] font-light leading-snug tracking-[-0.01em] sm:text-[1.5rem]`}>
                {complementary.name}
              </h3>
            </div>
            <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-[var(--bruma)] lg:col-span-7">
              {complementary.text}
            </p>
          </aside>
        </section>

        {/* Metodología */}
        <section id="metodologia" aria-labelledby="f-metodologia" className={`${wrap} scroll-mt-20 py-20 lg:py-28`}>
          <h2 id="f-metodologia" className={h2}>
            {nav[1].label}
          </h2>
          <div className="mt-12 lg:mt-16">
            <MethodPath />
          </div>
        </section>

        {/* Entregables */}
        <section id="entregables" aria-labelledby="f-entregables" className={`${wrap} scroll-mt-20 py-20 lg:py-28`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 id="f-entregables" className={`${h2} lg:sticky lg:top-28`}>
                {nav[2].label}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <DeliverableLayers />
            </div>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="f-confianza" className={`${wrap} scroll-mt-20 py-20 text-center lg:py-28`}>
          <h2 id="f-confianza" className={h2}>
            {trust.title}
          </h2>
          <p
            className={`${display} mx-auto mt-10 max-w-[38ch] text-[clamp(1.25rem,2.3vw,2rem)] font-light leading-[1.4] tracking-[-0.015em] text-[var(--noche)]/90 [text-wrap:balance]`}
          >
            {trust.origin}
          </p>
          <p className="mt-6">
            <span className={pending}>{trust.originPending}</span>
          </p>

          <ul className="mx-auto mt-16 grid max-w-[1180px] gap-x-8 gap-y-10 text-left sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {trust.principles.map((p) => (
              <li key={p.name} className="border-t border-[var(--noche)]/12 pt-5">
                <h3 className="text-[1rem] font-semibold">{p.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--bruma)]">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <span className={pending}>{trust.principlesPending}</span>
          </p>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="f-contacto" className="relative scroll-mt-20 py-24 lg:py-36">
          <div aria-hidden="true" className="relative mx-auto h-px w-full max-w-[1360px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--plasma)] to-transparent opacity-70" />
            <div className={`absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--cian)] to-transparent ${styles.sweep}`} />
          </div>
          <div aria-hidden="true" className="mx-auto -mt-3 h-6 max-w-[900px] bg-[var(--plasma)]/25 blur-xl" />

          <div className={`${wrap} mt-16 text-center lg:mt-20`}>
            <h2 id="f-contacto" className={`${h2} mx-auto max-w-[20ch] [text-wrap:balance]`}>
              {closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-[var(--bruma)]">
              {closing.body}
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <button type="button" aria-describedby="f-contacto-pendiente" className={`${btnPrimary} min-h-12 px-8 text-[1rem]`}>
                {cta.primary}
              </button>
              <span id="f-contacto-pendiente" className={pending}>
                {closing.pending}
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--noche)]/[0.08]">
        <div className={`${wrap} flex flex-col gap-3 pb-28 pt-10 text-[0.875rem] text-[var(--bruma)] sm:flex-row sm:items-center sm:justify-between`}>
          <span className={`${display} text-[1rem] text-[var(--noche)]`}>{brand}</span>
          <span>© {footer.year} {brand}</span>
          <span className={pending}>{footer.legal}</span>
        </div>
      </footer>

      <LabBar current="f" />
    </div>
  );
}
