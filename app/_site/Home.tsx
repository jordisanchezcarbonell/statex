/*
 * Home de StateX — dirección H (Boutique Precision)
 *
 * Tesis: firma boutique de ciberseguridad con criterio de ingeniería de software. Sobriedad y
 * precisión de la ingeniería de alta gama, sin copiar a nadie.
 * A quién habla: CTO y responsables técnicos de SaaS, agencias digitales y empresas tecnológicas,
 * y la dirección que firma la propuesta.
 *
 * Orden (cada bloque tiene una función comercial distinta):
 *   hero (qué y para quién) · servicios (qué contratar) · enfoque (por qué StateX) ·
 *   método (cómo, con trazabilidad) · entregables (el valor antes de pagar) ·
 *   trayectoria (origen honesto) · equipo (quién hace el trabajo) · preguntas (objeciones) · contacto
 *
 * Elemento memorable: la línea roja. Es el único uso del rojo en toda la página.
 */
import type { ReactNode } from "react";
import { brand, contact, faq, seo, services, site, team, trajectory, value, method, report, servicesSection } from "./content";
import { ContactForm } from "./ContactForm";
import { Hero } from "./Hero";
import { Method } from "./Method";
import { Report } from "./Report";
import { Services } from "./Services";
import { JsonLd, Shell } from "./Shell";
import { SectionHead, caps, display, focus, muted, section, wrap } from "./ui";

export const homeOpenGraph = { title: seo.title, description: seo.description, type: "website", locale: site.locale, siteName: brand.name } as const;

const rule = "border-t border-(--h-line)";
const indent = "lg:ml-[calc(25%+0.625rem)]";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  url: site.url,
  description: seo.description,
  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressRegion: "Cataluña", addressCountry: "ES" },
  areaServed: [
    { "@type": "City", name: "Barcelona" },
    { "@type": "Country", name: "España" },
  ],
  founder: team.founders.map((f) => ({ "@type": "Person", name: f.name, sameAs: f.links.map((l) => l.url) })),
  knowsAbout: ["Seguridad de aplicaciones web", "Seguridad de APIs", "Pentesting web", "Superficie de ataque externa", "Desarrollo seguro"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: servicesSection.label,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Pack para agencias (5 webs)",
        description: servicesSection.agencies.text,
        priceSpecification: { "@type": "PriceSpecification", price: 1290, priceCurrency: "EUR", valueAddedTaxIncluded: false },
      },
      ...services.map((s) => ({
      "@type": "Offer",
      ...(s.priceFrom ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "EUR", valueAddedTaxIncluded: false } } : {}),
      itemOffered: { "@type": "Service", name: s.name, description: s.seoDescription, url: `${site.url}/servicios/${s.slug}` },
      })),
    ],
  },
};

export function StatexHome({ children }: { children?: ReactNode }) {
  return (
    <Shell after={children}>
      <JsonLd data={jsonLd} />
      <Hero />

      {/* Servicios */}
      <section id="servicios" aria-labelledby="h-servicios" className={section}>
        <div className={wrap}>
          <SectionHead id="h-servicios" label={servicesSection.label} title={servicesSection.title} intro={servicesSection.intro} />
          <Services />
        </div>
      </section>

      {/* Por qué StateX: la banda grafito, de borde a borde */}
      <section id="enfoque" aria-labelledby="h-enfoque" className={`${section} bg-(--h-graphite)`}>
        <div className={wrap}>
          <SectionHead id="h-enfoque" label={value.label} title={value.title} intro={value.intro} />
          <ul className="m-0 mt-16 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {value.points.map((p) => (
              <li key={p.name} className="border-t border-(--h-ivory)/20 pt-7">
                <h3 className="m-0 text-[1.1rem] font-semibold">{p.name}</h3>
                <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Metodología */}
      <section id="metodo" aria-labelledby="h-metodo" className={section}>
        <div className={wrap}>
          <SectionHead id="h-metodo" label={method.label} title={method.title} intro={method.intro} />
          <Method />
        </div>
      </section>

      {/* Entregables */}
      <section id="entregables" aria-labelledby="h-entregables" className={`${section} ${rule}`}>
        <div className={wrap}>
          <SectionHead id="h-entregables" label={report.label} title={report.title} intro={report.intro} />
          <Report />
        </div>
      </section>

      <TrajectorySection />
      <TeamSection />
      <FaqSection />

      <ContactSection />
    </Shell>
  );
}

/** Trayectoria e investigación: origen, investigación y hoy, claramente separados. */
export function TrajectorySection({ data = trajectory }: { data?: typeof trajectory }) {
  return (
    <section id="trayectoria" aria-labelledby="h-trayectoria" className={`${section} ${rule}`}>
      <div className={wrap}>
        <SectionHead id="h-trayectoria" label={data.label} title={data.title} intro={data.intro} />
        <div className={`mt-16 grid gap-px bg-(--h-line) lg:mt-20 lg:grid-cols-9 ${indent}`}>
          <div className="bg-(--h-ink) py-8 lg:col-span-5 lg:pr-10">
            <h3 className="m-0 flex flex-wrap items-baseline justify-between gap-3 text-[14px] font-normal">
              <span className={muted}>{data.origins.label}</span>
              <span className={`tabular-nums ${muted}`}>{data.origins.period}</span>
            </h3>
            <ul className="m-0 mt-4 list-none p-0">
              {data.origins.items.map((a) => (
                <li key={a.name} className={rule}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className={`group block py-6 ${focus}`}>
                    <span className="flex flex-wrap items-baseline justify-between gap-3">
                      <span className={`text-[clamp(1.4rem,2.2vw,1.9rem)] tracking-[-0.02em] ${caps} underline decoration-transparent decoration-1 underline-offset-8 transition-colors group-hover:decoration-(--h-red) motion-reduce:transition-none`}>
                        {a.name}
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </span>
                      <span className={`text-[14px] tabular-nums ${muted}`}>{a.years}</span>
                    </span>
                    <span className={`mt-2 block max-w-[52ch] leading-[1.6] ${muted}`}>{a.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className={`m-0 mt-2 text-[14px] ${muted}`}>{data.origins.disclaimer}</p>
          </div>
          <div className="grid content-start gap-px bg-(--h-line) lg:col-span-4">
            <div className="bg-(--h-ink) py-8 lg:pl-10">
              <h3 className={`m-0 text-[14px] font-normal ${muted}`}>{data.research.label}</h3>
              <p className="m-0 mt-4 max-w-[44ch] leading-[1.6]">{data.research.text}</p>
            </div>
            <div className="relative bg-(--h-ink) py-8 lg:pl-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-12 bg-(--h-red) lg:left-10" />
              <h3 className="m-0 flex items-baseline justify-between gap-3 text-[14px] font-normal">
                <span className={muted}>{data.today.label}</span>
                <span className={`tabular-nums ${muted}`}>{data.today.period}</span>
              </h3>
              <p className="m-0 mt-4 max-w-[44ch] leading-[1.6]">{data.today.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Equipo: fundadores con bio verificada y experiencia conjunta. */
export function TeamSection({ data = team }: { data?: typeof team }) {
  return (
    <section id="equipo" aria-labelledby="h-equipo" className={`${section} ${rule}`}>
      <div className={wrap}>
        <SectionHead id="h-equipo" label={data.label} title={data.title} intro={data.intro} />
        <div className={`mt-16 grid gap-12 lg:mt-20 lg:grid-cols-9 lg:gap-10 ${indent}`}>
          <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:col-span-5">
            {data.founders.map((f) => (
              <li key={f.name} className={`${rule} pt-6`}>
                <h3 className={`m-0 text-[clamp(1.3rem,2vw,1.6rem)] tracking-[-0.015em] ${caps}`}>{f.name}</h3>
                <p className={`m-0 mt-1 ${muted}`}>{f.role}</p>
                {f.bio && <p className="m-0 mt-4 max-w-[40ch] leading-[1.6]">{f.bio}</p>}
                {f.links.length > 0 && (
                  <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 p-0">
                    {f.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 hover:border-(--h-red) ${focus}`}>
                          {l.label}<span className="sr-only"> de {f.name} (se abre en una pestaña nueva)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-4">
            <h3 className={`m-0 text-[14px] font-normal ${muted}`}>{data.experienceLabel}</h3>
            <ul className="m-0 mt-5 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-1">
              {data.experience.map((x) => (
                <li key={x} className="grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ data = faq }: { data?: typeof faq }) {
  return (
    <section id="preguntas" aria-labelledby="h-preguntas" className={`${section} ${rule}`}>
      <div className={wrap}>
        <SectionHead id="h-preguntas" label={data.label} title={data.title} />
        <div className={`mt-14 border-b border-(--h-line) ${indent}`}>
          {data.items.map((f) => (
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
  );
}

/** Contacto: qué pasa después + formulario. Compartido por la home y las páginas de servicio. */
export function ContactSection({ defaultService, brandName }: { defaultService?: string; brandName?: string }) {
  return (
    <section id="contacto" aria-labelledby="h-contacto" className={`${section} ${rule}`}>
      <div className={wrap}>
        <h2 id="h-contacto" className={`${display} m-0 max-w-[16ch] text-[clamp(2.4rem,6.4vw,6rem)]`}>
          {contact.title}
        </h2>
        <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="m-0 max-w-[36ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.5]">{contact.intro}</p>
            <h3 className={`m-0 mt-12 text-[14px] font-normal ${muted}`}>{contact.stepsLabel}</h3>
            <ol className="m-0 mt-5 grid list-none gap-6 p-0">
              {contact.steps.map((s, i) => (
                <li key={s.name} className={`grid grid-cols-[2rem_1fr] gap-3 ${rule} pt-5`}>
                  <span aria-hidden="true" className={`tabular-nums ${muted}`}>{i + 1}</span>
                  <div>
                    <p className="m-0 font-semibold">{s.name}</p>
                    <p className={`m-0 mt-1 leading-[1.55] ${muted}`}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm defaultService={defaultService} brandName={brandName} />
          </div>
        </div>
      </div>
    </section>
  );
}
