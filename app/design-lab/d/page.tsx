import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Check, ClipboardList, FileText, ListChecks, Map as MapIcon, Presentation } from "lucide-react";
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
  trust,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { ReportPreview } from "./ReportPreview";
import { ServiceExplorer } from "./ServiceExplorer";

export const metadata: Metadata = { title: "Concept D" };

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

// Tokens de Concept D. Esmeralda #0E8A62 da 4,4:1 sobre blanco, así que se usa para
// filetes e indicadores; texto y fondos de botón usan --emerald-ink (5,3:1) para cumplir AA.
const tokens = {
  "--white": "#FFFFFF",
  "--ink": "#111827",
  "--ink-soft": "#374151",
  "--emerald": "#0E8A62",
  "--emerald-ink": "#0B7A57",
  "--emerald-deep": "#096A4C",
  "--mint": "#E8F5EE",
  "--muted": "#64748B",
  "--muted-on-mint": "#475569",
  "--rule": "#E5E7EB",
  "--rule-strong": "#CBD5E1",
  "--rule-mint": "#CFE6DA",
  "--alto": "#B42318",
  "--alto-bg": "#FEF3F2",
  "--alto-bar": "#B42318",
  "--medio": "#B45309",
  "--medio-bg": "#FFF7ED",
  "--medio-bar": "#D97706",
  "--bajo": "#0B7A57",
  "--bajo-bg": "#E8F5EE",
  "--bajo-bar": "#9FD3B9",
  "--amber-rule": "#F2C27B",
} as CSSProperties;

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--emerald-ink)]";
const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--emerald-ink)] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[var(--emerald-deep)] ${focus}`;
const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--rule-strong)] bg-white px-5 text-[15px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] ${focus}`;
const wrap = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";
const h2 = "text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--ink)]";

const deliverableIcons = [MapIcon, FileText, ClipboardList, ListChecks, Presentation];

export default function ConceptD() {
  return (
    <div
      style={{ ...tokens, fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif" }}
      className={`${geist.variable} ${geistMono.variable} min-h-screen overflow-x-clip bg-[var(--white)] text-[var(--ink)]`}
    >
      <a
        href="#main-d"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[var(--ink)] focus:outline-2 focus:outline-[var(--emerald-ink)]"
      >
        Saltar al contenido
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a href="#main-d" className={`rounded-sm text-[19px] font-semibold tracking-[-0.03em] ${focus}`}>
            {brand}
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-7 text-[14px] text-[var(--ink-soft)]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`rounded-sm transition-colors hover:text-[var(--ink)] ${focus}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${btnPrimary} min-h-10 px-4 text-[14px]`}>
            {cta.primary}
          </a>
        </div>
      </header>

      <main id="main-d">
        {/* Hero */}
        <section aria-labelledby="hero-title-d" className="border-b border-[var(--rule)]">
          <div className={`${wrap} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-16 lg:py-24`}>
            <div className="min-w-0">
              <h1
                id="hero-title-d"
                className="max-w-[15ch] text-[clamp(2.25rem,5.4vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance"
              >
                {hero.title}
              </h1>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px] text-pretty">
                {hero.body}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#contacto" className={btnPrimary}>
                  {cta.primary}
                </a>
                <a href="#servicios" className={btnSecondary}>
                  {cta.secondary}
                </a>
              </div>
            </div>

            {/* El "producto" visible: el informe. Se apoya sobre una superficie menta, como un documento sobre la mesa. */}
            <div className="relative min-w-0">
              <div
                aria-hidden="true"
                className="absolute -inset-x-3 -bottom-4 top-8 rounded-2xl bg-[var(--mint)] sm:-inset-x-6 sm:-bottom-6 lg:-right-8 lg:left-10"
              />
              <div className="relative">
                <ReportPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" aria-labelledby="servicios-title-d" className="scroll-mt-16 py-20 sm:py-28">
          <div className={wrap}>
            <h2 id="servicios-title-d" className={`${h2} mb-10 sm:mb-14`}>
              Servicios
            </h2>
            <ServiceExplorer />

            <aside
              aria-labelledby="complementario-title-d"
              className="mt-16 grid gap-3 border-t border-[var(--rule)] pt-6 sm:mt-20 md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16"
            >
              <p className="text-[14px] text-[var(--muted)]">Servicio complementario</p>
              <div className="max-w-[38rem]">
                <h3 id="complementario-title-d" className="text-[16px] font-semibold text-[var(--ink)]">
                  {complementary.name}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--muted)]">{complementary.text}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Metodología */}
        <section
          id="metodologia"
          aria-labelledby="metodologia-title-d"
          className="scroll-mt-16 border-y border-[var(--rule)] bg-[#FAFBFC] py-20 sm:py-28"
        >
          <div className={wrap}>
            <h2 id="metodologia-title-d" className={`${h2} mb-12 sm:mb-16`}>
              Metodología
            </h2>
            <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-8">
              {method.map((step, i) => (
                <li key={step.name} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 lg:block lg:pb-0">
                  {/* Conector: vertical en móvil, horizontal en escritorio */}
                  {i < method.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.125rem] top-9 bottom-0 w-px bg-[var(--rule-strong)] lg:left-11 lg:right-[-2rem] lg:top-[1.125rem] lg:bottom-auto lg:h-px lg:w-auto"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex size-9 items-center justify-center rounded-full border border-[var(--emerald)] bg-white text-[14px] font-medium text-[var(--emerald-ink)] font-[family-name:var(--font-geist-mono)]"
                  >
                    {i + 1}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="pt-1.5 text-[17px] font-semibold text-[var(--ink)] lg:pt-0">
                      <span className="sr-only">Paso {i + 1}: </span>
                      {step.name}
                    </h3>
                    <p className="mt-2 max-w-[34rem] text-[15px] leading-relaxed text-[var(--ink-soft)]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregables */}
        <section id="entregables" aria-labelledby="entregables-title-d" className="scroll-mt-16 py-20 sm:py-28">
          <div className={wrap}>
            <h2 id="entregables-title-d" className={`${h2} mb-12 sm:mb-16`}>
              Entregables
            </h2>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, i) => {
                const Icon = deliverableIcons[i] ?? FileText;
                return (
                  <li key={d.name} className="border-t border-[var(--rule)] py-7">
                    <Icon aria-hidden="true" className="size-5 text-[var(--emerald-ink)]" strokeWidth={1.75} />
                    <h3 className="mt-4 text-[17px] font-semibold text-[var(--ink)]">{d.name}</h3>
                    <p className="mt-1.5 max-w-[30rem] text-[15px] leading-relaxed text-[var(--ink-soft)]">{d.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="confianza-title-d" className="scroll-mt-16 bg-[var(--mint)] py-20 sm:py-28">
          <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20`}>
            <div>
              <h2 id="confianza-title-d" className={h2}>
                {trust.title}
              </h2>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-[var(--ink)] text-pretty">{trust.origin}</p>
              <p className="mt-4 text-[14px] text-[var(--muted-on-mint)] font-[family-name:var(--font-geist-mono)]">
                {trust.originPending}
              </p>
            </div>
            <div>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {trust.principles.map((p) => (
                  <li key={p.name} className="border-t border-[var(--rule-mint)] py-6">
                    <h3 className="flex items-center gap-2.5 text-[16px] font-semibold text-[var(--ink)]">
                      <Check aria-hidden="true" className="size-4 shrink-0 text-[var(--emerald-ink)]" strokeWidth={2.25} />
                      {p.name}
                    </h3>
                    <p className="mt-1.5 pl-[1.625rem] text-[15px] leading-relaxed text-[var(--muted-on-mint)]">{p.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-[var(--muted-on-mint)] font-[family-name:var(--font-geist-mono)]">
                {trust.principlesPending}
              </p>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="contacto-title-d" className="scroll-mt-16 bg-[var(--emerald-ink)] text-white">
          <div className={`${wrap} flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between`}>
            <div className="max-w-[40rem]">
              <h2
                id="contacto-title-d"
                className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
              >
                {closing.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/90">{closing.body}</p>
              <p className="mt-3 text-[14px] text-white font-[family-name:var(--font-geist-mono)]">{closing.pending}</p>
            </div>
            <a
              href="#contacto"
              className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-lg bg-white px-6 text-[16px] font-medium text-[var(--emerald-deep)] transition-colors hover:bg-[var(--mint)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:self-auto"
            >
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--rule)] pb-24 pt-8">
        <div className={`${wrap} flex flex-col gap-2 text-[14px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            <span className="font-semibold text-[var(--ink)]">{brand}</span> © {footer.year}
          </p>
          <p>{footer.legal}</p>
        </div>
      </footer>

      <LabBar current="d" />
    </div>
  );
}
