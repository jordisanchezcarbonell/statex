import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { about, brand, contact, cta, footer, nav, problem, research, sections, technology } from "../content";
import { asciiHorizon } from "./globe";
import { CornerMarks, Wordmark } from "./marks";
import { MobileNav } from "./MobileNav";
import { body, btnGhost, btnPrimary, display, focusRing, mono, pad, pending, section, wrap } from "./ui";
import styles from "./concept.module.css";

// Secciones estáticas de Concept D (Server Components).

/** Cabecera de sección: nombre de la sección (de content.sections) + titular, en un único h2. */
function SectionHead({ id, label, title, intro }: { id: string; label: string; title: string; intro?: string }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
      <h2 id={id} className="lg:col-span-7">
        <span className="mb-5 flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] text-[color:var(--fg)]">
          <span aria-hidden="true" className="h-[7px] w-[7px] bg-[color:var(--amber)]" />
          {label}
        </span>
        <span className={`block max-w-[20ch] ${display}`}>{title}</span>
      </h2>
      {intro ? <p className={`${body} max-w-[46ch] lg:col-span-5 lg:pb-2`}>{intro}</p> : null}
    </div>
  );
}

function Fig({ n, children }: { n: number; children: ReactNode }) {
  return (
    <>
      <span className="text-[color:var(--fg)]">FIG. {n}</span>
      <span className="whitespace-pre">{"  "}</span>
      {children}
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(11,12,14,0.85)] backdrop-blur-md">
      <div className={`${wrap} relative flex h-14 items-center justify-between gap-4`}>
        <a href="#top" className={`rounded-[2px] ${focusRing}`} aria-label={`${brand.name}, inicio`}>
          <Wordmark />
        </a>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`rounded-[2px] text-[14px] text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--fg)] ${focusRing}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-[2px] bg-[color:var(--amber)] px-3.5 text-[14px] font-medium text-[#0B0C0E] transition-colors duration-200 hover:bg-[#FFC640] ${focusRing}`}
          >
            {cta.primary}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-title" className={section}>
      <div className={`${wrap} ${pad}`}>
        <SectionHead id="problema-title" label={sections.problem} title={problem.title} intro={problem.intro} />

        <div className="relative mt-14 md:mt-20">
          <ul className="grid grid-cols-1 gap-px border-y border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-2">
            {problem.risks.map((r) => (
              <li key={r.name} className="bg-[color:var(--bg)] py-8 md:px-10 md:py-12 md:odd:pl-0 md:even:pr-0">
                <h3 className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-[color:var(--fg)]">{r.name}</h3>
                <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-[color:var(--muted)]">{r.text}</p>
              </li>
            ))}
          </ul>
          {/* Cruz de retícula en la intersección central. */}
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color:var(--amber)]" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--amber)]" />
          </span>
        </div>
      </div>
    </section>
  );
}

export function Technology() {
  const { today, roadmap } = technology;
  return (
    <section id="tecnologia" aria-labelledby="tecnologia-title" className={section}>
      <div className={`${wrap} ${pad}`}>
        <SectionHead id="tecnologia-title" label={sections.technology} title={technology.title} intro={technology.intro} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-0">
          {/* Hoy: trazo continuo, superficie sólida, texto principal. */}
          <div className="relative border-t-2 border-[color:var(--amber)] bg-[color:var(--surface)] p-6 md:p-10">
            <h3 className="flex items-center gap-2.5 text-[20px] font-medium tracking-[-0.02em] text-[color:var(--fg)]">
              <span aria-hidden="true" className="h-2 w-2 bg-[color:var(--amber)]" />
              {today.label}
            </h3>
            <ul className="mt-6 grid gap-4">
              {today.items.map((it) => (
                <li key={it} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 text-[15px] leading-[1.6] text-[color:var(--fg)]">
                  <span aria-hidden="true" className="mt-[0.62em] h-px w-full bg-[color:var(--fg)]" />
                  {it}
                </li>
              ))}
            </ul>
            <p className={`${pending} mt-8`}>{today.pending}</p>
          </div>

          {/* Visión: trazo discontinuo, fondo rayado, sin relleno. Se lee como "todavía no". */}
          <div className="relative border-t-2 border-dashed border-[color:var(--muted)] bg-[repeating-linear-gradient(135deg,rgba(232,230,227,0.035)_0_1px,transparent_1px_9px)] p-6 outline outline-1 -outline-offset-1 outline-[color:var(--line)] md:p-10">
            <h3 className="flex flex-wrap items-center gap-2.5 text-[20px] font-medium tracking-[-0.02em] text-[color:var(--muted)]">
              <span aria-hidden="true" className="h-2 w-2 border border-[color:var(--muted)]" />
              {roadmap.label}
            </h3>
            <ul className="mt-6 grid gap-4">
              {roadmap.items.map((it) => (
                <li key={it} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 text-[15px] leading-[1.6] text-[color:var(--muted)]">
                  <span aria-hidden="true" className="mt-[0.62em] h-px w-full border-t border-dashed border-[color:var(--muted)]" />
                  {it}
                </li>
              ))}
            </ul>
            <p className={`${mono} mt-8 text-[12px] leading-5 text-[color:var(--muted)]`}>{roadmap.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Research() {
  const row =
    "grid grid-cols-1 gap-y-1.5 px-5 py-5 md:grid-cols-[minmax(0,13rem)_8.5rem_minmax(0,1fr)] md:gap-x-6 md:px-6 md:py-4";
  return (
    <section id="investigacion" aria-labelledby="investigacion-title" className={section}>
      <div className={`${wrap} ${pad}`}>
        <SectionHead id="investigacion-title" label={sections.research} title={research.title} intro={research.intro} />

        <figure className="m-0 mt-14 md:mt-20">
          <div className="relative border border-[color:var(--line)] bg-[color:var(--surface)]">
            <div className={`${mono} flex items-center justify-between gap-4 border-b border-[color:var(--line)] px-5 py-3 text-[12px] text-[color:var(--muted)] md:px-6`}>
              <span className="text-[color:var(--fg)]">~/statex/archivo</span>
              <span className="hidden sm:inline">enlaces externos, se abren en otra pestaña</span>
            </div>

            <div aria-hidden="true" className={`${mono} ${row} hidden border-b border-[color:var(--line)] text-[11px] text-[color:var(--muted)] md:grid md:py-2.5`}>
              <span>nombre</span>
              <span>años</span>
              <span>contenido</span>
            </div>

            <ul className="divide-y divide-[color:var(--line)]">
              {research.archive.map((a) => (
                <li key={a.name} className={row}>
                  <h3 className="text-[17px] font-medium tracking-[-0.015em]">
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-1.5 rounded-[2px] text-[color:var(--fg)] underline decoration-[rgba(232,230,227,0.3)] underline-offset-4 transition-colors hover:decoration-[color:var(--amber)] ${focusRing}`}
                    >
                      {a.name}
                      <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" className="text-[color:var(--amber)]" />
                      <span className="sr-only">(abre en una pestaña nueva)</span>
                    </a>
                  </h3>
                  <p className={`${mono} text-[13px] leading-6 text-[color:var(--fg)] md:leading-[1.7]`}>{a.years}</p>
                  <div>
                    <p className="max-w-[60ch] text-[15px] leading-[1.6] text-[color:var(--muted)]">{a.text}</p>
                    <p className={`${mono} mt-1 break-all text-[12px] text-[color:var(--muted)]`}>{hostOf(a.url)}</p>
                  </div>
                </li>
              ))}

              <li className={row}>
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[color:var(--fg)]">{research.lab.name}</h3>
                <p className={`${mono} text-[13px] leading-6 text-[color:var(--muted)] md:leading-[1.7]`}>
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">Sin publicaciones todavía</span>
                </p>
                <div>
                  <p className="max-w-[60ch] text-[15px] leading-[1.6] text-[color:var(--muted)]">{research.lab.text}</p>
                  <p className={`${pending} mt-3`}>{research.lab.pending}</p>
                </div>
              </li>
            </ul>

            <div className={`${mono} border-t border-[color:var(--line)] px-5 py-5 text-[13px] leading-[1.9] md:px-6`}>
              <h3 className="text-[color:var(--fg)]">
                Temas recurrentes<span aria-hidden="true" className="text-[color:var(--muted)]">/</span>
              </h3>
              <ul className="mt-1">
                {research.topics.map((t, i) => (
                  <li key={t} className="flex gap-2 text-[color:var(--muted)]">
                    <span aria-hidden="true" className="shrink-0 whitespace-pre">
                      {i === research.topics.length - 1 ? "└─" : "├─"}
                    </span>
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CornerMarks size={8} className="border-[rgba(255,176,0,0.5)]" />
          </div>
          <figcaption className={`${mono} mt-4 text-[11px] leading-5 text-[color:var(--muted)]`}>
            <Fig n={4}>Archivo público de InfoStateX y DoubleReboot.</Fig>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const T0 = 2012;
const T1 = 2026;
const YEARS = Array.from({ length: T1 - T0 + 1 }, (_, i) => T0 + i);
const pct = (y: number) => ((y - T0) / (T1 - T0)) * 100;

export function About() {
  const lastQuiet = 2018; // fin de la etapa del blog: el tramo hasta el relanzamiento se dibuja discontinuo
  return (
    <section id="sobre" aria-labelledby="sobre-title" className={section}>
      <div className={`${wrap} ${pad}`}>
        <SectionHead id="sobre-title" label={sections.about} title={about.title} intro={about.text} />

        <div className="relative mt-16 md:mt-24">
          {/* Eje temporal proporcional (solo escritorio, decorativo). */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden lg:block">
            <span className="absolute left-0 top-0 h-px bg-[color:var(--fg)]" style={{ width: `${pct(lastQuiet)}%` }} />
            <span
              className="absolute top-0 h-px border-t border-dashed border-[color:var(--muted)]"
              style={{ left: `${pct(lastQuiet)}%`, right: 0 }}
            />
            {YEARS.map((y) => (
              <span key={y} className="absolute top-0 h-[7px] w-px -translate-y-1/2 bg-[color:var(--muted)]" style={{ left: `${pct(y)}%` }} />
            ))}
          </div>

          <ol className="relative grid gap-8 border-l border-[color:var(--line)] pl-6 lg:block lg:h-[300px] lg:border-l-0 lg:pl-0">
            {about.timeline.map((e, i) => {
              const up = i % 2 === 0;
              const last = i === about.timeline.length - 1;
              return (
                <li
                  key={e.year}
                  style={{ "--x": `${pct(Number(e.year))}%` } as CSSProperties}
                  className="relative lg:absolute lg:inset-y-0 lg:left-[var(--x)] lg:w-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[28px] top-[7px] h-[7px] w-[7px] lg:left-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:h-[9px] lg:w-[9px] ${
                      last ? "bg-[color:var(--amber)]" : "border border-[color:var(--fg)] bg-[color:var(--bg)]"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 hidden w-px bg-[color:var(--line)] lg:block ${up ? "bottom-1/2 h-[34px] mb-2" : "top-1/2 h-[34px] mt-2"}`}
                  />
                  <div
                    className={`lg:absolute lg:w-[24ch] ${up ? "lg:bottom-[calc(50%+3rem)]" : "lg:top-[calc(50%+3rem)]"} ${
                      last ? "lg:right-0 lg:text-right" : "lg:left-0 lg:-translate-x-[1px]"
                    }`}
                  >
                    <p className={`${mono} text-[13px] ${last ? "text-[color:var(--amber)]" : "text-[color:var(--fg)]"}`}>{e.year}</p>
                    <p className="mt-1 text-[15px] leading-[1.5] text-[color:var(--muted)]">{e.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className={`${pending} mt-14 lg:mt-10`}>{about.pending}</p>
      </div>
    </section>
  );
}

// Generados una vez en el servidor: mismo globo que el hero, como horizonte estático.
// Versión ancha para tablet/escritorio y una estrecha para móvil, donde el arco cabe entero.
const HORIZON = asciiHorizon(240, 26);
const HORIZON_SM = asciiHorizon(64, 18);

export function Contact() {
  const paths = [
    { ...contact.primary, id: "contacto-empresas", btn: btnPrimary },
    { ...contact.secondary, id: "contacto-socios", btn: btnGhost },
  ];
  return (
    <section id="contacto" aria-labelledby="contacto-title" className={`${section} relative isolate overflow-hidden`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[220px] md:h-[312px]">
        <pre
          className={`${mono} absolute bottom-0 left-1/2 m-0 hidden -translate-x-1/2 text-[10px] leading-[12px] text-[rgba(232,230,227,0.22)] [mask-image:linear-gradient(to_top,transparent,black_45%)] md:block`}
        >
          {HORIZON}
        </pre>
        <pre
          className={`${mono} absolute bottom-0 left-1/2 m-0 -translate-x-1/2 text-[9px] leading-[11px] text-[rgba(232,230,227,0.22)] [mask-image:linear-gradient(to_top,transparent,black_40%)] md:hidden`}
        >
          {HORIZON_SM}
        </pre>
        <div
          className={`${styles.sweep} absolute inset-y-0 left-0 w-[22vw] bg-[linear-gradient(90deg,transparent,rgba(255,176,0,0.07)_85%,rgba(255,176,0,0.35)_100%)] [mask-image:linear-gradient(to_top,transparent,black_60%)]`}
        >
          <span className="absolute inset-y-0 right-0 w-px bg-[rgba(255,176,0,0.55)]" />
        </div>
      </div>

      <div className={`${wrap} pb-60 pt-24 md:pb-80 md:pt-32`}>
        <h2 id="contacto-title">
          <span className="mb-5 flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] text-[color:var(--fg)]">
            <span aria-hidden="true" className="h-[7px] w-[7px] bg-[color:var(--amber)]" />
            {sections.contact}
          </span>
          <span className="block max-w-[16ch] text-[length:clamp(2.5rem,1rem+4.6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[color:var(--fg)]">
            {contact.title}
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 border-t border-[color:var(--line)] md:mt-20 md:grid-cols-2">
          {paths.map((p, i) => (
            <div
              key={p.id}
              className={`flex flex-col items-start gap-4 border-b border-[color:var(--line)] bg-[rgba(11,12,14,0.6)] py-8 md:border-b-0 md:py-10 ${
                i === 0 ? "md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <h3 id={p.id} className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-[color:var(--fg)]">
                {p.label}
              </h3>
              <p className="max-w-[40ch] text-[15px] leading-[1.6] text-[color:var(--muted)]">{p.text}</p>
              <button type="button" className={`${p.btn} mt-2`} aria-describedby="contacto-pendiente">
                {p.cta}
              </button>
            </div>
          ))}
        </div>
        <p id="contacto-pendiente" className={`${pending} mt-8 bg-[color:var(--bg)]`}>
          {contact.pending}
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className={`${wrap} grid grid-cols-1 gap-4 pb-28 pt-10 text-[13px] text-[color:var(--muted)] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10`}>
        <Wordmark />
        <p className="text-[14px] text-[color:var(--fg)]">{brand.tagline}</p>
        <div className={`${mono} flex flex-col gap-1 md:items-end`}>
          <p>
            © {footer.year} {brand.name}
          </p>
          <p>{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
