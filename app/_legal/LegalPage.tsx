import Link from "next/link";
import type { ReactNode } from "react";
import { brand, company, footer, legalLinks } from "../_site/content";
import { inter } from "../_site/font";
import { Pending, Wordmark, display, focus, muted, tokens, wrap } from "../_site/ui";

// Páginas legales con el sistema visual de H: misma paleta y tipografía, sin escena ni línea roja.

/** Dato de la empresa o, si aún no existe, su [Pendiente] visible. */
export function Company({ field, label }: { field: "legalName" | "taxId" | "address" | "registry" | "email"; label: string }) {
  const value = company[field];
  if (!value) return <Pending>[Pendiente: {label}]</Pending>;
  return field === "email" ? <a href={`mailto:${value}`}>{value}</a> : <>{value}</>;
}

const prose =
  "max-w-[68ch] text-[17px] leading-[1.7] text-(--h-ivory)/85 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-[1.2rem] [&_h2]:font-semibold [&_h2]:text-(--h-ivory) [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:my-2 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-(--h-ivory) [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-(--h-ivory) [&_dl]:my-6 [&_dl]:grid [&_dl]:gap-x-8 [&_dl]:gap-y-3 sm:[&_dl]:grid-cols-[max-content_1fr] [&_dt]:text-(--h-titanium) [&_dd]:m-0 max-sm:[&_dd]:mb-2";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div
      style={tokens}
      className={`${inter.variable} min-h-dvh bg-(--h-ink) font-(family-name:--h-sans) text-(--h-ivory) antialiased selection:bg-(--h-red) selection:text-(--h-ivory)`}
    >
      <header className="border-b border-(--h-line)">
        <div className={`${wrap} flex min-h-18 items-center justify-between gap-6`}>
          <Link href="/" aria-label={`${brand.name}, inicio`} className={`inline-flex min-h-11 items-center ${focus}`}>
            <Wordmark className="text-[15px]" />
          </Link>
          <Link href="/" className={`inline-flex min-h-11 items-center text-[14px] text-(--h-ivory)/80 hover:text-(--h-ivory) ${focus}`}>
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className={`${wrap} py-[clamp(4rem,9vw,7rem)]`}>
        <h1 className={`${display} m-0 max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.75rem)]`}>{title}</h1>
        <p className={`m-0 mt-6 text-[14px] ${muted}`}>Última actualización: {updated}</p>
        <Pending className="mt-6">[Pendiente: revisión legal antes de publicar]</Pending>
        <div className={`mt-12 ${prose}`}>{children}</div>
      </main>

      <footer className="border-t border-(--h-line)">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-10 text-[14px] ${muted}`}>
          <nav aria-label="Legal">
            <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`inline-flex min-h-10 items-center hover:text-(--h-ivory) ${focus}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <span>© {footer.year} {brand.name}</span>
        </div>
      </footer>
    </div>
  );
}
