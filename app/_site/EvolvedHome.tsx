/*
 * Evolución comercial de la home, la que se compara en /preview/<identidad>.
 *
 * Conserva la estructura, la línea de acento y los componentes de la web actual (Shell, Hero, Method,
 * Report, Trayectoria, FAQ y formulario) y cambia lo que el brief pide: un hero centrado en la corrección,
 * tres áreas de oferta, el método Detectar → Verificar, «Por qué elegirnos» y «Quiénes somos».
 *
 * Orden: hero · servicios (qué contratar) · método (cómo) · por qué (diferencia) · entregables (prueba
 * antes de pagar) · equipo (quién) · trayectoria (origen) · preguntas · contacto.
 */
import Link from "next/link";
import { report, servicesSection } from "./content";
import { OfferLink } from "./ContactForm";
import { evolution, type Evolution } from "./evolution";
import { ContactSection, FaqSection, TeamSection, TrajectorySection } from "./Home";
import { Hero } from "./Hero";
import type { Identity } from "./identities/types";
import { Method } from "./Method";
import { PreviewBar } from "./PreviewBar";
import { Report } from "./Report";
import { ServiceExtras } from "./Services";
import { Shell } from "./Shell";
import { SectionHead, caps, focus, muted, section, wrap } from "./ui";

const listItem = "grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]";
const dash = <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />;

/** Tres áreas en filas editoriales, como los servicios de producción: qué es, qué incluye y por dónde empezar. */
function Areas({ data }: { data: Evolution["areas"] }) {
  return (
    <ul className="m-0 mt-16 list-none border-b border-(--h-line) p-0 lg:mt-20">
      {data.items.map((a) => (
        <li key={a.id} className="group relative grid gap-10 border-t border-(--h-line) py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-(--h-red) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
          />
          <div className="lg:col-span-5">
            <p className={`m-0 text-[13px] ${muted}`}>{a.descriptor}</p>
            <h3 lang="en" className={`m-0 mt-4 max-w-[14ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.02] tracking-[-0.02em] text-balance ${caps}`}>
              {a.name}
            </h3>
            <p className="m-0 mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-(--h-ivory)/85">{a.summary}</p>
          </div>
          <div className="lg:col-span-4">
            <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{data.includesLabel}</h4>
            <ul className="m-0 mt-5 grid list-none gap-3 p-0">
              {a.lines.map((x) => (
                <li key={x} className={listItem}>{dash}{x}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{data.entryLabel}</h4>
            <ul className="m-0 mt-5 grid list-none gap-5 p-0">
              {a.entries.map((s) => (
                <li key={s.id}>
                  <Link href={`/servicios/${s.slug}`} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium transition-colors hover:border-(--h-red) motion-reduce:transition-none ${focus}`}>
                    {s.name}
                  </Link>
                  {s.price && <p className={`m-0 mt-1 text-[14px] tabular-nums ${muted}`}>{s.price}</p>}
                </li>
              ))}
              {a.entries.length === 0 && (
                <li>
                  <OfferLink interest={servicesSection.start.interest} className="border-b border-(--h-ivory)/40 hover:border-(--h-red)">
                    {servicesSection.start.cta}
                  </OfferLink>
                  <p className={`m-0 mt-1 text-[14px] tabular-nums ${muted}`}>{servicesSection.start.price}</p>
                </li>
              )}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EvolvedHome({ identity }: { identity: Identity }) {
  const e = evolution(identity.name);

  return (
    <Shell identity={identity} navItems={e.nav} after={<PreviewBar current={identity.key} />}>
      <Hero
        lines={e.hero.lines}
        body={e.hero.body}
        strip={{ lead: `${identity.tagline} · Barcelona`, items: e.hero.claim }}
        size="text-[clamp(1.75rem,5vw,5.25rem)]"
      />

      <section id="servicios" aria-labelledby="h-servicios" className={section}>
        <div className={wrap}>
          <SectionHead id="h-servicios" label={e.areas.label} title={e.areas.title} intro={e.areas.intro} />
          <Areas data={e.areas} />
          <p className={`m-0 mt-6 max-w-[70ch] text-[14px] leading-[1.6] ${muted}`}>{e.areas.note}</p>
          <ServiceExtras />
        </div>
      </section>

      <section id="metodo" aria-labelledby="h-metodo" className={`${section} border-t border-(--h-line)`}>
        <div className={wrap}>
          <SectionHead id="h-metodo" label={e.method.label} title={e.method.title} intro={e.method.intro} />
          <Method data={e.method} />
        </div>
      </section>

      {/* Por qué elegirnos: la banda grafito, de borde a borde */}
      <section id="por-que" aria-labelledby="h-por-que" className={`${section} bg-(--h-graphite)`}>
        <div className={wrap}>
          <SectionHead id="h-por-que" label={e.why.label} title={e.why.title} intro={e.why.intro} />
          <ul className="m-0 mt-16 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {e.why.points.map((p) => (
              <li key={p.name} className="border-t border-(--h-ivory)/20 pt-7">
                <h3 className="m-0 text-[1.1rem] font-semibold">{p.name}</h3>
                <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="entregables" aria-labelledby="h-entregables" className={section}>
        <div className={wrap}>
          <SectionHead id="h-entregables" label={report.label} title={report.title} intro={report.intro} />
          <Report identity={identity.key} />
        </div>
      </section>

      <TeamSection data={e.team} />
      <TrajectorySection data={e.trajectory} />
      <FaqSection />
      <ContactSection brandName={identity.name} />
    </Shell>
  );
}
