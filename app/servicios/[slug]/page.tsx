import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, guides, method, services, servicesSection, site } from "../../_site/content";
import { ContactSection } from "../../_site/Home";
import { OfferLink } from "../../_site/ContactForm";
import { JsonLd, Shell } from "../../_site/Shell";
import { display, focus, muted, section, wrap } from "../../_site/ui";

// Una página por servicio: para quién, qué se revisa, qué se recibe, cuándo tiene sentido y el
// formulario con el servicio preseleccionado. Estáticas (generateStaticParams).

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const path = `/servicios/${s.slug}`;
  return {
    title: s.name,
    description: s.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: `${s.name} · ${brand.name}`, description: s.seoDescription, url: path, type: "website", locale: site.locale, siteName: brand.name },
  };
}

const rule = "border-t border-(--h-line)";
const dash = <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />;

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={`${rule} pt-7`}>
      <h2 className={`m-0 text-[14px] font-normal ${muted}`}>{title}</h2>
      <ul className="m-0 mt-5 grid list-none gap-3 p-0">
        {items.map((x) => (
          <li key={x} className="grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]">{dash}{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.id !== s.id);
  const url = `${site.url}/servicios/${s.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.seoDescription,
      url,
      serviceType: s.name,
      areaServed: { "@type": "Country", name: "España" },
      provider: { "@type": "ProfessionalService", name: brand.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${site.url}/#servicios` },
        { "@type": "ListItem", position: 3, name: s.name, item: url },
      ],
    },
  ];

  return (
    <Shell base="/">
      <JsonLd data={jsonLd} />

      <section aria-labelledby="h-servicio" className="pb-[clamp(4rem,8vw,7rem)] pt-36 sm:pt-44">
        <div className={wrap}>
          <nav aria-label="Ruta de navegación">
            <ol className={`m-0 flex list-none flex-wrap gap-x-2 p-0 text-[14px] ${muted}`}>
              <li><Link href="/" className={`hover:text-(--h-ivory) ${focus}`}>Inicio</Link> /</li>
              <li><Link href="/#servicios" className={`hover:text-(--h-ivory) ${focus}`}>Servicios</Link> /</li>
              <li aria-current="page" className="text-(--h-ivory)/85">{s.name}</li>
            </ol>
          </nav>
          <h1 id="h-servicio" className={`${display} m-0 mt-10 max-w-[18ch] text-[clamp(2.2rem,5.6vw,5rem)]`}>{s.name}</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <p className="m-0 max-w-[50ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.55] text-(--h-ivory)/85 lg:col-span-7">{s.summary}</p>
            <div className="lg:col-span-5 lg:justify-self-end">
              <OfferLink interest={s.id} className="bg-(--h-ivory) px-7 text-(--h-ink) hover:bg-white">Solicitar evaluación</OfferLink>
            </div>
          </div>
          {s.price && <p className="m-0 mt-8 text-[1.1rem] tabular-nums">{s.price}</p>}
          <p className={`m-0 mt-2 max-w-[70ch] text-[14px] leading-[1.55] ${muted}`}>{s.priceScope}</p>
          <p className={`m-0 mt-2 text-[14px] ${muted}`}>Referencia: {s.reference}</p>
        </div>
      </section>

      <section aria-label="Detalle del servicio" className={`${section} ${rule}`}>
        <div className={`${wrap} grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10`}>
          <Block title="Para quién" items={s.forWho} />
          <Block title={s.scopeLabel} items={s.scope} />
          <Block title="Qué recibes" items={s.deliverables} />
        </div>
        <div className={`${wrap} mt-16 grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <h2 className={`m-0 text-[14px] font-normal ${muted}`}>Cuándo tiene sentido</h2>
            <p className="m-0 mt-4 max-w-[60ch] text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.55]">{s.when}</p>
            {s.note && <p className="m-0 mt-6 max-w-[60ch] border-l-2 border-(--h-ivory) pl-5 leading-[1.55]">{s.note}</p>}
          </div>
          <div className="lg:col-span-5">
            <h2 className={`m-0 text-[14px] font-normal ${muted}`}>{servicesSection.commitmentsLabel}</h2>
            <ul className="m-0 mt-4 grid list-none gap-4 p-0">
              {servicesSection.commitments.map((c) => (
                <li key={c.name} className="border-t border-(--h-line) pt-4">
                  <p className="m-0 font-semibold">{c.name}</p>
                  <p className={`m-0 mt-1 text-[15px] leading-[1.55] ${muted}`}>{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="h-como" className={`${section} bg-(--h-graphite)`}>
        <div className={wrap}>
          <h2 id="h-como" className={`${display} m-0 max-w-[18ch] text-[clamp(1.75rem,4vw,3.25rem)]`}>{method.title}</h2>
          <ol className="m-0 mt-14 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {method.steps.map((m, i) => (
              <li key={m.name} className="border-t border-(--h-ivory)/20 pt-6">
                <p className="m-0 font-semibold uppercase">
                  <span className={`mr-3 font-normal tabular-nums ${muted}`}>{String(i + 1).padStart(2, "0")}</span>
                  {m.name}
                </p>
                <p className={`m-0 mt-3 leading-[1.6] ${muted}`}>{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-12 max-w-[60ch] leading-[1.55]">{method.rule}</p>
          <Link href="/#entregables" className={`mt-8 inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium hover:border-(--h-red) ${focus}`}>
            Ver un informe de demostración
          </Link>
        </div>
      </section>

      <section aria-labelledby="h-otros" className={`${section} ${rule}`}>
        <div className={wrap}>
          <h2 id="h-guias" className={`m-0 text-[14px] font-normal ${muted}`}>Guías para leer antes</h2>
          <ul className="m-0 mt-4 grid list-none gap-1 p-0">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 hover:border-(--h-red) ${focus}`}>{g.title}</Link>
              </li>
            ))}
          </ul>
          <h2 id="h-otros" className={`m-0 mt-14 text-[14px] font-normal ${muted}`}>Otros servicios</h2>
          <ul className="m-0 mt-6 grid list-none gap-px bg-(--h-line) p-0 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.id} className="bg-(--h-ink)">
                <Link href={`/servicios/${o.slug}`} className={`group block py-6 md:pr-10 ${focus}`}>
                  <span className="block text-[clamp(1.3rem,2vw,1.7rem)] font-semibold uppercase tracking-[-0.015em] underline decoration-transparent decoration-1 underline-offset-8 transition-colors group-hover:decoration-(--h-red) motion-reduce:transition-none">
                    {o.name}
                  </span>
                  <span className={`mt-2 block max-w-[48ch] leading-[1.6] ${muted}`}>{o.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection defaultService={s.id} />
    </Shell>
  );
}
