import Link from "next/link";
import type { ReactNode } from "react";
import { brand, company, footer, guides, legalLinks, nav, services } from "./content";
import { inter } from "./font";
import { Header } from "./Header";
import { BrandMark } from "./identities/BrandMark";
import type { Identity } from "./identities/types";
import { focus, muted, tokens, wrap } from "./ui";

type NavItem = { href: string; label: string };

const footLink = `inline-flex min-h-11 items-center text-(--h-ivory)/80 hover:text-(--h-ivory) ${focus}`;

/** Pie corporativo: marca, servicios, secciones, datos de empresa (solo si existen) y legales. */
function Footer({ base, identity, items }: { base: "" | "/"; identity?: Identity; items: NavItem[] }) {
  return (
    <footer className="border-t border-(--h-line)">
      <div className={`${wrap} grid gap-10 pb-32 pt-14 sm:grid-cols-2 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <BrandMark className="text-[17px]" identity={identity?.key} />
          <p className={`m-0 mt-5 max-w-[32ch] ${muted}`}>{identity ? `${identity.tagline} ${brand.tagline}` : brand.tagline}</p>
        </div>
        <nav aria-label="Servicios" className="lg:col-span-3">
          <p className={`m-0 text-[14px] ${muted}`}>{footer.servicesLabel}</p>
          <ul className="m-0 mt-3 grid list-none gap-1 p-0">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className={footLink}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <p className={`m-0 mt-6 text-[14px] ${muted}`}>{footer.guidesLabel}</p>
          <ul className="m-0 mt-3 grid list-none gap-1 p-0">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className={footLink}>{g.short}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Secciones" className="lg:col-span-2">
          <p className={`m-0 text-[14px] ${muted}`}>{footer.siteLabel}</p>
          <ul className="m-0 mt-3 grid list-none gap-1 p-0">
            {[...items, { href: "#preguntas", label: "Preguntas" }, { href: "#contacto", label: "Contacto" }].map((n) => (
              <li key={n.href}>
                <a href={`${base}${n.href}`} className={footLink}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`grid content-start gap-3 text-[14px] lg:col-span-3 ${muted}`}>
          {company.email && (
            <a href={`mailto:${company.email}`} className={`justify-self-start text-(--h-ivory)/80 hover:text-(--h-ivory) ${focus}`}>{company.email}</a>
          )}
          {company.legalName && company.taxId && <span>{company.legalName} · {company.taxId}</span>}
          <span>{footer.location}</span>
          <span>{footer.privacy}</span>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`inline-flex min-h-11 items-center hover:text-(--h-ivory) ${focus}`}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <span className="mt-4">© {footer.year} {identity?.name ?? brand.name}</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * Armazón de todas las páginas públicas: tokens, tipografía, salto al contenido, cabecera y pie.
 * `identity` y `navItems` solo los usan las previews de /preview: sin ellos, es la web de StateX.
 */
export function Shell({
  base = "",
  children,
  after,
  identity,
  navItems = nav,
}: {
  base?: "" | "/";
  children: ReactNode;
  after?: ReactNode;
  identity?: Identity;
  navItems?: NavItem[];
}) {
  return (
    <div
      style={tokens}
      className={`${inter.variable} min-h-dvh overflow-x-clip bg-(--h-ink) font-(family-name:--h-sans) text-(--h-ivory) antialiased selection:bg-(--h-red) selection:text-(--h-ivory)`}
    >
      <a href="#contenido" className="sr-only z-[60] bg-(--h-ivory) px-4 py-3 text-(--h-ink) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>
      <Header
        base={base}
        items={navItems}
        brand={identity ? { logo: <BrandMark identity={identity.key} />, name: identity.name } : undefined}
      />
      <main id="contenido">{children}</main>
      <Footer base={base} identity={identity} items={navItems} />
      {after}
    </div>
  );
}

/** Datos estructurados (JSON-LD). Se escapa "<" para que el contenido no pueda cerrar la etiqueta. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
