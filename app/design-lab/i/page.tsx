/*
 * Concept I — Private Advisory (dirección C de research/creative-directions.md)
 *
 * Tesis: quiet confidence, security by design. Una firma privada y pequeña en la que hablas con quien
 * hace el trabajo; la calidez y el aire del lujo silencioso con la precisión de la ingeniería.
 * A quién habla: CTO y dirección de empresas que construyen aplicaciones web y APIs.
 *
 * Paleta: Ivory #F5F2EC · Sand #D9D0C3 · Graphite #33352F · Olive #777E70 (solo grande) · Olive texto #5C6356 · Paper #FBFAF7
 * Tipografía: Newsreader (titulares, opsz 72) · Inter (texto y navegación) · IBM Plex Mono (solo en artefactos)
 *
 * Layout
 *   ┌───────────────────────────────────────────────────────┐
 *   │ StateX | Ciberseguridad        nav…     [Solicitar]   │
 *   │ Titular serif grande               ┌──────────┐       │
 *   │ entradilla                         │ INFORME  │╲ hojas│
 *   │ [Solicitar evaluación]  Ver informe│ ejemplo  │ │     │
 *   │ descriptor · desde 2012 · Jordi y Albert Sánchez      │
 *   └───────────────────────────────────────────────────────┘
 *   rail | titular (asimétrico en todas las secciones) · método como tabla editorial con entregables ·
 *   ofertas en tres bloques amplios · informe de ejemplo en tres páginas · la firma con sus fundadores ·
 *   contacto sobre grafito
 *
 * Elemento memorable: el informe de ejemplo como fotografía de producto. Sin rojo, sin fotos inventadas.
 */
import type { Metadata } from "next";
import {
  about,
  approach,
  brand,
  complementary,
  contact,
  cta,
  faq,
  footer,
  hero,
  nav,
  offers,
  principles,
  problem,
  research,
  sampleReport,
  sections,
  solutions,
  solutionsHead,
  technology,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { fontVars } from "./font";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { ReportCover, ReportPages } from "./Report";
import { ContactForm, OfferLink } from "./ContactForm";
import { Pending, SectionHead, Underline, Wordmark, body, btn, display, focus, monoCls, rule, section, serifCls, sub, textLink, tokens, wrap } from "./ui";

export const metadata: Metadata = {
  title: "Concept I",
  description: hero.body,
  openGraph: { title: `${brand.name} · Ciberseguridad`, description: brand.tagline, type: "website", locale: "es_ES" },
};

const founders = about.founders.map((f) => f.name.split(" ")[0]).join(" y ");

export default function ConceptI() {
  return (
    <div
      style={tokens}
      className={`${fontVars} min-h-dvh overflow-x-clip bg-(--i-ivory) font-(family-name:--i-sans) text-(--i-graphite) antialiased selection:bg-(--i-graphite) selection:text-(--i-ivory)`}
    >
      <a href="#contenido" className="sr-only z-[60] bg-(--i-graphite) px-4 py-3 text-(--i-ivory) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        {/* Hero */}
        <section id="inicio" aria-labelledby="i-hero" className="pt-32 sm:pt-40">
          <div className={`${wrap} grid items-center gap-16 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24`}>
            <div className="lg:col-span-7">
              <h1 id="i-hero" className={`${display} m-0 max-w-[17ch] text-[clamp(2.6rem,5.4vw,5.5rem)]`}>{hero.title}</h1>
              <p className={`m-0 mt-8 max-w-[50ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.65] ${sub}`}>{hero.body}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#contacto" className={btn}>{cta.primary}</a>
                <a href="#informe" className={textLink}><Underline>Ver el informe de ejemplo</Underline></a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ReportCover />
            </div>
          </div>
          <div className={wrap}>
            <div className={`${rule} flex flex-wrap justify-between gap-x-8 gap-y-2 py-5 text-[13px] ${sub}`}>
              <span>{brand.descriptor}</span>
              <span>Investigación propia desde {about.timeline[0].year}</span>
              <span>Dirigida por {founders} Sánchez</span>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section id="problema" aria-labelledby="i-problema" className={section}>
          <div className={wrap}>
            <SectionHead id="i-problema" label={sections.problem} title={problem.title} intro={problem.intro} />
            <ul className={`m-0 mt-16 grid list-none gap-x-12 p-0 sm:grid-cols-2 lg:mt-20 ${body}`}>
              {problem.risks.map((r, i) => (
                <li key={r.name} className={`${rule} py-8`}>
                  <Reveal delay={i * 0.06}>
                    <h3 className={`${serifCls} m-0 text-[1.6rem] leading-[1.15] tracking-[-0.01em]`}>{r.name}</h3>
                    <p className={`m-0 mt-3 max-w-[44ch] leading-[1.65] ${sub}`}>{r.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Enfoque: tabla editorial con el entregable de cada fase */}
        <section id="enfoque" aria-labelledby="i-enfoque" className={`${section} bg-(--i-paper)`}>
          <div className={wrap}>
            <SectionHead id="i-enfoque" label={sections.approach} title={approach.title} intro={approach.intro} />
            <ol className="m-0 mt-16 list-none border-b border-(--i-line) p-0 lg:mt-20">
              {approach.steps.map((s, i) => (
                <li key={s.name} className={rule}>
                  <Reveal className="grid gap-3 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                    <span aria-hidden="true" className={`${serifCls} text-[1.25rem] tabular-nums text-(--i-olive) lg:col-span-1`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={`${serifCls} m-0 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.1] tracking-[-0.01em] lg:col-span-3 lg:col-start-2`}>
                      <span className="sr-only">Paso {i + 1}: </span>{s.name}
                    </h3>
                    <p className={`m-0 max-w-[48ch] leading-[1.65] ${sub} lg:col-span-4`}>{s.text}</p>
                    <p className="m-0 text-[14px] lg:col-span-3 lg:col-start-10">
                      <span className={`block ${sub}`}>Entregable</span>
                      <span className="mt-1 block font-medium">{s.deliverable}</span>
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Soluciones */}
        <section id="soluciones" aria-labelledby="i-soluciones" className={section}>
          <div className={wrap}>
            <SectionHead id="i-soluciones" label={sections.solutions} title={solutionsHead.title} />
            <ul className={`m-0 mt-16 list-none border-b border-(--i-line) p-0 lg:mt-20 ${body}`}>
              {solutions.map((s) => (
                <li key={s.id} className={`${rule} grid gap-3 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10`}>
                  <div>
                    <span className={`block text-[13px] ${sub}`}>{s.short}</span>
                    <h3 className={`${serifCls} m-0 mt-2 text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.15] tracking-[-0.01em]`}>{s.name}</h3>
                  </div>
                  <p className={`m-0 max-w-[56ch] self-end leading-[1.65] ${sub}`}>{s.text}</p>
                </li>
              ))}
            </ul>
            <aside aria-labelledby="i-complementario" className={`mt-10 ${body}`}>
              <p className={`m-0 text-[13px] ${sub}`}>{complementary.label}</p>
              <h3 id="i-complementario" className="m-0 mt-2 text-[1.05rem] font-medium">{complementary.name}</h3>
              <p className={`m-0 mt-2 max-w-[60ch] leading-[1.65] ${sub}`}>{complementary.text}</p>
            </aside>
          </div>
        </section>

        {/* Ofertas: tres bloques amplios, separados solo por filetes */}
        <section id="ofertas" aria-labelledby="i-ofertas" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="i-ofertas" label={offers.label} title={offers.title} intro={offers.intro} />
            <ul className="m-0 mt-16 grid list-none p-0 lg:mt-20 lg:grid-cols-3">
              {offers.items.map((o, i) => (
                <li key={o.id} className={`flex flex-col border-t border-(--i-line) py-10 lg:px-10 lg:first:pl-0 lg:last:pr-0 ${i > 0 ? "lg:border-l" : ""}`}>
                  <p className={`m-0 min-h-5 text-[13px] ${sub}`}>{o.featured ? "Recomendado para empezar" : ""}</p>
                  <h3 className={`${serifCls} m-0 mt-4 text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.1] tracking-[-0.01em]`}>{o.name}</h3>
                  <p className="m-0 mt-4 leading-[1.65]">{o.forWho}</p>
                  <ul className={`m-0 mt-8 grid flex-1 list-none content-start gap-3 p-0 text-[15px] ${sub}`}>
                    {o.includes.map((x) => (
                      <li key={x} className="border-t border-(--i-line) pt-3">{x}</li>
                    ))}
                  </ul>
                  <Pending className={`mt-8 self-start ${sub}`}>{offers.pricePending}</Pending>
                  <OfferLink
                    interest={o.id}
                    className={`mt-6 self-start ${o.featured ? "bg-(--i-graphite) px-6 text-(--i-ivory) hover:bg-[#1F201C]" : "group"}`}
                  >
                    {o.featured ? offers.cta : <Underline>{offers.cta}</Underline>}
                  </OfferLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Informe de ejemplo */}
        <section id="informe" aria-labelledby="i-informe" className={`${section} bg-(--i-sand)/45`}>
          <div className={wrap}>
            <SectionHead id="i-informe" label={sampleReport.label} title={sampleReport.title} intro={sampleReport.intro} />
            <div className={`mt-16 lg:mt-20 ${body}`}>
              <ReportPages />
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="text-[15px] font-medium">{sampleReport.cta}</span>
                <Pending className={sub}>{sampleReport.pending}</Pending>
              </div>
              <p className={`m-0 mt-4 text-[13px] ${sub}`}>{sampleReport.note}</p>
            </div>
          </div>
        </section>

        {/* Tecnología: hoy (filete continuo) frente a visión (discontinuo y atenuado) */}
        <section id="tecnologia" aria-labelledby="i-tecnologia" className={section}>
          <div className={wrap}>
            <SectionHead id="i-tecnologia" label={sections.technology} title={technology.title} intro={technology.intro} />
            <div className={`mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-12 ${body}`}>
              <article aria-labelledby="i-hoy" className="border-t border-(--i-graphite) pt-8">
                <h3 id="i-hoy" className={`${serifCls} m-0 text-[1.6rem]`}>{technology.today.label}</h3>
                <ul className="m-0 mt-6 grid list-none gap-4 p-0 leading-[1.65]">
                  {technology.today.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <Pending className={`mt-8 ${sub}`}>{technology.today.pending}</Pending>
              </article>
              <article aria-labelledby="i-vision" className="border-t border-dashed border-(--i-olive) pt-8">
                <h3 id="i-vision" className={`${serifCls} m-0 text-[1.6rem] text-(--i-olive-text)`}>{technology.roadmap.label}</h3>
                <ul className={`m-0 mt-6 grid list-none gap-4 p-0 leading-[1.65] ${sub}`}>
                  {technology.roadmap.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <p className={`m-0 mt-8 text-[14px] ${sub}`}>{technology.roadmap.note}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Investigación */}
        <section id="investigacion" aria-labelledby="i-investigacion" className={`${section} ${rule}`}>
          <div className={wrap}>
            <SectionHead id="i-investigacion" label={sections.research} title={research.title} intro={research.intro} />
            <ul className={`m-0 mt-16 list-none border-b border-(--i-line) p-0 lg:mt-20 ${body}`}>
              {research.archive.map((a) => (
                <li key={a.name} className={rule}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className={`group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10 ${focus}`}>
                    <span>
                      <span className={`${serifCls} block text-[clamp(1.6rem,2.6vw,2.25rem)] tracking-[-0.01em]`}>
                        <Underline>{a.name}</Underline>
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </span>
                      <span className={`mt-3 block max-w-[56ch] leading-[1.65] ${sub}`}>{a.text}</span>
                    </span>
                    <span className={`${monoCls} text-[13px] tabular-nums ${sub}`}>{a.years}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={`mt-12 grid gap-10 lg:grid-cols-2 ${body}`}>
              <div>
                <h3 className={`m-0 text-[14px] font-normal ${sub}`}>{research.topicsLabel}</h3>
                <ul className="m-0 mt-4 grid list-none gap-2 p-0">
                  {research.topics.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="m-0 text-[1.05rem] font-medium">{research.lab.name}</h3>
                <p className={`m-0 mt-2 ${sub}`}>{research.lab.text}</p>
                <Pending className={`mt-4 ${sub}`}>{research.lab.pending}</Pending>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre StateX: la firma y sus fundadores */}
        <section id="sobre" aria-labelledby="i-sobre" className={`${section} bg-(--i-paper)`}>
          <div className={wrap}>
            <SectionHead id="i-sobre" label={sections.about} title={about.title} intro={about.text} />

            <div className={`mt-16 lg:mt-20 ${body}`}>
              <p className={`${serifCls} m-0 max-w-[26ch] text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]`}>{about.foundersNote}</p>
              <ul className="m-0 mt-12 grid list-none gap-10 p-0 sm:grid-cols-2">
                {about.founders.map((f) => (
                  <li key={f.name} className={`${rule} pt-6`}>
                    <div aria-hidden="true" className="grid aspect-[3/2] place-items-center bg-(--i-sand)/50 text-[13px] text-(--i-olive-text)">[Pendiente: retrato]</div>
                    <h3 className={`${serifCls} m-0 mt-6 text-[1.75rem] tracking-[-0.01em]`}>{f.name}</h3>
                    <p className={`m-0 mt-1 text-[14px] ${sub}`}>{f.role}</p>
                    <Pending className={`mt-4 ${sub}`}>{f.bio}</Pending>
                  </li>
                ))}
              </ul>
            </div>

            <ol className={`m-0 mt-20 grid list-none gap-px bg-(--i-line) p-0 sm:grid-cols-2 lg:grid-cols-4 ${body}`}>
              {about.timeline.map((t) => (
                <li key={t.year} className="bg-(--i-paper) py-7 sm:pr-8 lg:pl-8 lg:first:pl-0">
                  <p className={`${serifCls} m-0 text-[2.5rem] leading-none tabular-nums`}>{t.year}</p>
                  <p className={`m-0 mt-3 leading-[1.55] ${sub}`}>{t.text}</p>
                </li>
              ))}
            </ol>

            <div className={`mt-20 ${body}`}>
              <h3 className={`m-0 text-[14px] font-normal ${sub}`}>{principles.label}: {principles.title.toLowerCase()}</h3>
              <ul className="m-0 mt-6 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2">
                {principles.items.map((p) => (
                  <li key={p.name} className={`${rule} pt-5`}>
                    <h4 className="m-0 text-[1.05rem] font-medium">{p.name}</h4>
                    <p className={`m-0 mt-2 leading-[1.65] ${sub}`}>{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="preguntas" aria-labelledby="i-preguntas" className={section}>
          <div className={wrap}>
            <SectionHead id="i-preguntas" label={faq.label} title={faq.title} />
            <div className={`mt-14 border-b border-(--i-line) ${body}`}>
              {faq.items.map((f) => (
                <details key={f.q} className={`group ${rule}`}>
                  <summary className={`flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 ${serifCls} text-[clamp(1.2rem,1.7vw,1.45rem)] ${focus} [&::-webkit-details-marker]:hidden`}>
                    {f.q}
                    <span aria-hidden="true" className="relative size-3.5 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
                    </span>
                  </summary>
                  <p className={`m-0 max-w-[62ch] pb-7 leading-[1.65] ${sub}`}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto sobre grafito */}
        <section id="contacto" aria-labelledby="i-contacto" className={`${section} bg-(--i-graphite) text-(--i-ivory)`}>
          <div className={wrap}>
            <SectionHead id="i-contacto" label={sections.contact} title={contact.title} dark />
            <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-10">
              <div className="grid content-start gap-12 lg:col-span-3">
                <div>
                  <h3 className="m-0 text-[1.05rem] font-medium">{contact.primary.label}</h3>
                  <p className="m-0 mt-3 leading-[1.65] text-(--i-sand)">{contact.primary.text}</p>
                </div>
                <div className="border-t border-(--i-ivory)/15 pt-10">
                  <h3 className="m-0 text-[1.05rem] font-medium">{contact.secondary.label}</h3>
                  <p className="m-0 mt-3 leading-[1.65] text-(--i-sand)">{contact.secondary.text}</p>
                  <OfferLink interest="colaboracion" dark className="group mt-3">
                    <Underline>{contact.secondary.cta}</Underline>
                  </OfferLink>
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={`${wrap} grid gap-10 pb-32 pt-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <Wordmark className="text-[15px]" />
            <p className={`m-0 mt-5 max-w-[30ch] ${sub}`}>{brand.tagline}</p>
          </div>
          <nav aria-label="Pie de página" className="lg:col-span-4">
            <ul className="m-0 grid list-none gap-1 p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`group inline-flex min-h-10 items-center ${focus}`}><Underline>{n.label}</Underline></a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`grid content-start gap-3 text-[14px] lg:col-span-4 ${sub}`}>
            <span>Esta página no usa cookies ni trackers.</span>
            <Pending className="justify-self-start">[Pendiente: correo corporativo y clave PGP]</Pending>
            <Pending className="justify-self-start">{footer.legal}</Pending>
            <Pending className="justify-self-start">[Pendiente: aviso legal y privacidad]</Pending>
            <span className="mt-4">© {footer.year} {brand.name}</span>
          </div>
        </div>
      </footer>

      <LabBar current="i" />
    </div>
  );
}
