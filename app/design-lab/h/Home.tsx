/*
 * Concept H — Boutique Precision
 *
 * Tesis: StateX como firma boutique de alta gama; la seguridad tratada con la sobriedad y la
 * precisión de la ingeniería de lujo (principios de Porsche/Ferrari traducidos, sin copiar nada).
 * A quién habla: dirección (CEO, consejo) y CISO que compran confianza antes que herramientas.
 *
 * Paleta: Obsidiana #0B0D10 · Grafito #20242A · Marfil #F2F0EA · Titanio #A8A39B · Rojo línea #A83A35
 * Tipografía: Inter (opsz 32) en mayúsculas para titulares; Inter para texto; cifras tabulares.
 *
 * Layout
 *   ┌─────────────────────────────────────────────┐
 *   │ STATEX              nav…        [Solicitar] │  ← transparente; sólido al hacer scroll
 *   │      ║ ║ ║  pórticos en perspectiva  ║ ║ ║  │
 *   │      ║ ║ ║ ───── línea roja ─────── ║ ║ ║  │
 *   │ ENCONTRAMOS LO QUE TU EMPRESA EXPONE…       │
 *   │ texto                    [Solicitar] Ver →  │
 *   └─────────────────────────────────────────────┘
 *   rail | H2 en mayúsculas  (todas las secciones: rail lateral + un solo titular)
 *   problema 2×2 · método 01–05 con línea roja de avance · servicios en paneles que se ensanchan
 *   ofertas · rigor (grafito) · hoy/visión · investigación · sobre · preguntas · contacto + formulario
 *
 * Elemento memorable: la línea roja. Es el único uso del rojo en toda la página.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import {
  about,
  approach,
  brand,
  company,
  complementary,
  contact,
  faq,
  footer,
  legalLinks,
  nav,
  offers,
  principles,
  problem,
  research,
  sections,
  solutionsHead,
  technology,
} from "../content";
import { inter } from "./font";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Method } from "./Method";
import { Solutions } from "./Solutions";
import { ContactForm, OfferLink } from "./ContactForm";
import { Pending, SectionHead, Wordmark, display, focus, muted, section, tokens, wrap } from "./ui";

// Dirección elegida. Se renderiza en `/` (web) y en /design-lab/h (con la barra del lab).
export const homeOpenGraph = { title: `${brand.name} — ${brand.descriptor}`, description: brand.tagline, type: "website", locale: "es_ES" } as const;

const rule = "border-t border-(--h-line)";

export function StatexHome({ children }: { children?: ReactNode }) {
  return (
    <div
      style={tokens}
      className={`${inter.variable} min-h-dvh overflow-x-clip bg-(--h-ink) font-(family-name:--h-sans) text-(--h-ivory) antialiased selection:bg-(--h-red) selection:text-(--h-ivory)`}
    >
      <a href="#contenido" className="sr-only z-[60] bg-(--h-ivory) px-4 py-3 text-(--h-ink) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />

        {/* Problema */}
        <section id="problema" aria-labelledby="h-problema" className={section}>
          <div className={wrap}>
            <SectionHead id="h-problema" label={sections.problem} title={problem.title} intro={problem.intro} />
            <ul className="m-0 mt-16 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:ml-[calc(25%+0.625rem)] lg:mt-20">
              {problem.risks.map((r) => (
                <li key={r.name} className={`${rule} py-8`}>
                  <h3 className="m-0 text-[1.2rem] font-semibold">{r.name}</h3>
                  <p className={`m-0 mt-3 max-w-[44ch] leading-[1.6] ${muted}`}>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Enfoque */}
        <section id="enfoque" aria-labelledby="h-enfoque" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-enfoque" label={sections.approach} title={approach.title} intro={approach.intro} />
            <Method />
          </div>
        </section>

        {/* Soluciones */}
        <section id="soluciones" aria-labelledby="h-soluciones" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-soluciones" label={sections.solutions} title={solutionsHead.title} />
            <div className="mt-16 lg:mt-20">
              <Solutions />
            </div>
            <aside aria-labelledby="h-complementario" className="mt-10 grid gap-3 lg:grid-cols-12 lg:gap-10">
              <p className={`m-0 text-[14px] lg:col-span-3 ${muted}`}>{complementary.label}</p>
              <div className="lg:col-span-9">
                <h3 id="h-complementario" className="m-0 text-[1.15rem] font-semibold">{complementary.name}</h3>
                <p className={`m-0 mt-2 max-w-[60ch] leading-[1.6] ${muted}`}>{complementary.text}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Ofertas */}
        <section id="ofertas" aria-labelledby="h-ofertas" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-ofertas" label={offers.label} title={offers.title} intro={offers.intro} />
            <ul className="m-0 mt-16 grid list-none gap-px bg-(--h-line) p-0 lg:mt-20 lg:grid-cols-3">
              {offers.items.map((o) => (
                <li key={o.id} className={`relative flex flex-col p-7 sm:p-10 ${o.featured ? "bg-(--h-graphite)" : "bg-(--h-ink)"}`}>
                  {o.featured && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-(--h-red)" />}
                  <p className={`m-0 min-h-5 text-[13px] ${muted}`}>{o.featured ? "Recomendado para empezar" : ""}</p>
                  <h3 className="m-0 mt-5 text-[clamp(1.4rem,2vw,1.75rem)] font-semibold uppercase leading-[1.05] tracking-[-0.015em] text-balance">
                    {o.name}
                  </h3>
                  <p className="m-0 mt-4 leading-[1.6] text-(--h-ivory)/85">{o.forWho}</p>
                  <ul className={`m-0 mt-8 grid flex-1 list-none content-start gap-3 p-0 text-[15px] ${muted}`}>
                    {o.includes.map((x) => (
                      <li key={x} className="grid grid-cols-[1rem_1fr] gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-full bg-(--h-titanium)" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Pending className="mt-8 self-start">{offers.pricePending}</Pending>
                  <OfferLink
                    interest={o.id}
                    className={`mt-6 self-start ${o.featured ? "bg-(--h-ivory) px-6 text-(--h-ink) hover:bg-white" : "border-b border-(--h-ivory)/40 hover:border-(--h-red)"}`}
                  >
                    {offers.cta}
                  </OfferLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Rigor: la banda grafito, de borde a borde */}
        <section id="rigor" aria-labelledby="h-rigor" className={`${section} bg-(--h-graphite)`}>
          <div className={wrap}>
            <SectionHead id="h-rigor" label={principles.label} title={principles.title} />
            <ul className="m-0 mt-16 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {principles.items.map((p) => (
                <li key={p.name} className="border-t border-(--h-ivory)/20 pt-7">
                  <h3 className="m-0 text-[1.1rem] font-semibold">{p.name}</h3>
                  <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tecnología: hoy (filete marfil continuo) frente a visión (discontinuo, atenuado) */}
        <section id="tecnologia" aria-labelledby="h-tecnologia" className={section}>
          <div className={wrap}>
            <SectionHead id="h-tecnologia" label={sections.technology} title={technology.title} intro={technology.intro} />
            <div className="mt-16 grid gap-12 lg:ml-[calc(25%+0.625rem)] lg:mt-20 lg:grid-cols-2 lg:gap-10">
              <article aria-labelledby="h-hoy" className="border-t-2 border-(--h-ivory) pt-8">
                <h3 id="h-hoy" className="m-0 text-[1.15rem] font-semibold uppercase">{technology.today.label}</h3>
                <ul className="m-0 mt-6 grid list-none gap-5 p-0">
                  {technology.today.items.map((t) => (
                    <li key={t} className="leading-[1.6]">{t}</li>
                  ))}
                </ul>
                <Pending className="mt-8">{technology.today.pending}</Pending>
              </article>
              <article aria-labelledby="h-vision" className="border-t-2 border-dashed border-(--h-titanium)/60 pt-8">
                <h3 id="h-vision" className={`m-0 text-[1.15rem] font-semibold uppercase ${muted}`}>{technology.roadmap.label}</h3>
                <ul className={`m-0 mt-6 grid list-none gap-5 p-0 ${muted}`}>
                  {technology.roadmap.items.map((t) => (
                    <li key={t} className="leading-[1.6]">{t}</li>
                  ))}
                </ul>
                <p className={`m-0 mt-8 text-[14px] ${muted}`}>{technology.roadmap.note}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Investigación */}
        <section id="investigacion" aria-labelledby="h-investigacion" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-investigacion" label={sections.research} title={research.title} intro={research.intro} />
            <ul className="m-0 mt-16 list-none p-0 lg:ml-[calc(25%+0.625rem)] lg:mt-20">
              {research.archive.map((a) => (
                <li key={a.name} className={rule}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10 ${focus}`}
                  >
                    <span>
                      <span className="block text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase tracking-[-0.02em] underline decoration-transparent decoration-1 underline-offset-8 transition-colors group-hover:decoration-(--h-red) motion-reduce:transition-none">
                        {a.name}
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </span>
                      <span className={`mt-3 block max-w-[56ch] leading-[1.6] ${muted}`}>{a.text}</span>
                    </span>
                    <span className={`text-[15px] tabular-nums ${muted}`}>{a.years}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-10 lg:ml-[calc(25%+0.625rem)] lg:grid-cols-2">
              <div>
                <h3 className={`m-0 text-[14px] font-normal ${muted}`}>{research.topicsLabel}</h3>
                <ul className="m-0 mt-4 grid list-none gap-2 p-0">
                  {research.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="m-0 text-[1.05rem] font-semibold">{research.lab.name}</h3>
                <p className={`m-0 mt-2 ${muted}`}>{research.lab.text}</p>
                <Pending className="mt-4">{research.lab.pending}</Pending>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre StateX */}
        <section id="sobre" aria-labelledby="h-sobre" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-sobre" label={sections.about} title={about.title} intro={about.text} />
            <ol className="m-0 mt-16 grid list-none gap-px bg-(--h-line) p-0 sm:grid-cols-2 lg:ml-[calc(25%+0.625rem)] lg:mt-20 lg:grid-cols-4">
              {about.timeline.map((t, i) => {
                const last = i === about.timeline.length - 1;
                return (
                  <li key={t.year} className="relative bg-(--h-ink) py-8 sm:pr-8 lg:pl-8 lg:first:pl-0">
                    {last && <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-12 bg-(--h-red) lg:left-8" />}
                    <p className="m-0 text-[clamp(2.25rem,3.4vw,3rem)] font-extralight leading-none tabular-nums tracking-[-0.04em]">{t.year}</p>
                    <p className={`m-0 mt-4 leading-[1.55] ${muted}`}>{t.text}</p>
                  </li>
                );
              })}
            </ol>
            <div className="mt-16 grid gap-10 border-t border-(--h-line) pt-10 lg:ml-[calc(25%+0.625rem)] lg:grid-cols-9 lg:gap-10">
              <p className="m-0 max-w-[30ch] text-[clamp(1.25rem,1.8vw,1.5rem)] font-medium leading-[1.35] text-balance lg:col-span-3">{about.foundersNote}</p>
              <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:col-span-6">
                {about.founders.map((f) => (
                  <li key={f.name}>
                    <p className="m-0 text-[1.1rem] font-semibold">{f.name}</p>
                    <p className={`m-0 mt-1 ${muted}`}>{f.role}</p>
                    <Pending className="mt-4">{f.bio}</Pending>
                  </li>
                ))}
              </ul>
            </div>
            <Pending className="mt-10 lg:ml-[calc(25%+0.625rem)]">{about.pending}</Pending>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="preguntas" aria-labelledby="h-preguntas" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="h-preguntas" label={faq.label} title={faq.title} />
            <div className="mt-14 border-b border-(--h-line) lg:ml-[calc(25%+0.625rem)]">
              {faq.items.map((f) => (
                <details key={f.q} className="group border-t border-(--h-line)">
                  <summary
                    className={`flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(1.05rem,1.5vw,1.2rem)] font-medium ${focus} [&::-webkit-details-marker]:hidden`}
                  >
                    {f.q}
                    <span aria-hidden="true" className="relative size-4 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-(--h-ivory)" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-(--h-ivory) transition-transform group-open:scale-y-0 motion-reduce:transition-none" />
                    </span>
                  </summary>
                  <p className={`m-0 max-w-[62ch] pb-7 leading-[1.6] ${muted}`}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="h-contacto" className={`${section} ${rule}`}>
          <div className={wrap}>
            <h2 id="h-contacto" className={`${display} m-0 max-w-[16ch] text-[clamp(2.4rem,6.4vw,6rem)]`}>
              {contact.title}
            </h2>
            <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />

            <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
              <div className="grid content-start gap-12 lg:col-span-4">
                <div>
                  <h3 className="m-0 text-[1.1rem] font-semibold">{contact.primary.label}</h3>
                  <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{contact.primary.text}</p>
                </div>
                <div className={`${rule} pt-10`}>
                  <h3 className="m-0 text-[1.1rem] font-semibold">{contact.secondary.label}</h3>
                  <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{contact.secondary.text}</p>
                  <OfferLink interest="colaboracion" className="mt-4 border-b border-(--h-ivory)/40 hover:border-(--h-red)">
                    {contact.secondary.cta}
                  </OfferLink>
                </div>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={rule}>
        <div className={`${wrap} grid gap-10 pb-32 pt-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <Wordmark className="text-[17px]" />
            <p className={`m-0 mt-5 max-w-[30ch] ${muted}`}>{brand.tagline}</p>
          </div>
          <nav aria-label="Pie de página" className="lg:col-span-4">
            <ul className="m-0 grid list-none gap-1 p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`inline-flex min-h-10 items-center text-(--h-ivory)/80 hover:text-(--h-ivory) ${focus}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`grid content-start gap-3 text-[14px] lg:col-span-4 ${muted}`}>
            {company.email ? (
              <a href={`mailto:${company.email}`} className={`justify-self-start text-(--h-ivory)/80 hover:text-(--h-ivory) ${focus}`}>{company.email}</a>
            ) : (
              <Pending className="justify-self-start">[Pendiente: correo corporativo]</Pending>
            )}
            {company.legalName && company.taxId ? (
              <span>{company.legalName} · {company.taxId}</span>
            ) : (
              <Pending className="justify-self-start">{footer.legal}</Pending>
            )}
            <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`inline-flex min-h-10 items-center hover:text-(--h-ivory) ${focus}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <span className="mt-4">© {footer.year} {brand.name}</span>
          </div>
        </div>
      </footer>

      {children}
    </div>
  );
}
