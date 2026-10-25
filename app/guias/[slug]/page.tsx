import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { brand, guides, site, team } from "../../_site/content";
import { JsonLd, Shell } from "../../_site/Shell";
import { display, focus, muted, wrap } from "../../_site/ui";
import { ApiAuditGuide } from "../_content/auditoria-api";
import { WebAuditGuide } from "../_content/auditoria-web";
import { PrepareGuide } from "../_content/preparar";

// Contenido de cada guía (su metadato vive en guides de app/_site/content.ts).
const bodies: Record<string, ComponentType> = {
  "que-incluye-una-auditoria-de-seguridad-web": WebAuditGuide,
  "que-incluye-una-auditoria-de-seguridad-de-apis": ApiAuditGuide,
  "como-preparar-tu-web-para-una-auditoria-de-seguridad": PrepareGuide,
};

// Guías: contenido de referencia para quien está comparando proveedores. Sin cifras de mercado
// inventadas; los precios de ejemplo son los de StateX (research/services-pricing.md §9).

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  const path = `/guias/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: path },
    openGraph: { title: g.title, description: g.description, url: path, type: "article", locale: site.locale, siteName: brand.name, publishedTime: g.published },
  };
}





export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  const Body = g && bodies[g.slug];
  if (!g || !Body) notFound();
  const url = `${site.url}/guias/${g.slug}`;
  const authors = team.founders.map((f) => f.name).join(" y ");
  const date = new Date(`${g.published}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      url,
      datePublished: g.published,
      inLanguage: "es",
      author: team.founders.map((f) => ({ "@type": "Person", name: f.name, sameAs: f.links.map((l) => l.url) })),
      publisher: { "@type": "Organization", name: brand.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: g.title, item: url },
      ],
    },
  ];

  return (
    <Shell base="/">
      <JsonLd data={jsonLd} />
      <article aria-labelledby="h-guia" className="pb-[clamp(5rem,10vw,8rem)] pt-36 sm:pt-44">
        <div className={wrap}>
          <nav aria-label="Ruta de navegación">
            <ol className={`m-0 flex list-none flex-wrap gap-x-2 p-0 text-[14px] ${muted}`}>
              <li><Link href="/" className={`hover:text-(--h-ivory) ${focus}`}>Inicio</Link> /</li>
              <li aria-current="page" className="text-(--h-ivory)/85">{g.short}</li>
            </ol>
          </nav>
          <h1 id="h-guia" className={`${display} m-0 mt-10 max-w-[22ch] text-[clamp(2rem,4.8vw,4rem)]`}>{g.title}</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <p className={`m-0 mt-8 text-[14px] ${muted}`}>
            Por {authors} · <time dateTime={g.published}>{date}</time>
          </p>

          <div className="mt-12">
            <Body />
          </div>

          <aside aria-labelledby="h-guia-cta" className="mt-20 grid gap-6 bg-(--h-graphite) p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-8">
              <h2 id="h-guia-cta" className="m-0 text-[1.35rem] font-semibold">¿Quieres saber cuánto costaría la tuya?</h2>
              <p className={`m-0 mt-3 max-w-[60ch] leading-[1.6] ${muted}`}>
                Cuéntanos qué aplicación quieres revisar y te enviamos una propuesta cerrada en 48 horas laborables. También puedes ver el detalle de la <Link href="/servicios/auditoria-seguridad-web-api" className={`underline underline-offset-4 hover:text-(--h-ivory) ${focus}`}>auditoría de seguridad web y APIs</Link>.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link href="/#contacto" className={`inline-flex min-h-12 items-center bg-(--h-ivory) px-6 font-medium text-(--h-ink) hover:bg-white ${focus}`}>
                Solicitar evaluación
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </Shell>
  );
}
