"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { brand as statex, cta, nav } from "./content";
import { Wordmark, caps, focus } from "./ui";

// `logo` llega ya renderizado desde el servidor (Shell): así este componente de cliente no contiene otros nombres de marca.
type HeaderBrand = { logo: ReactNode; name: string; tagline: string; layout: "standard" | "centered" | "ledger" };

/**
 * Transparente sobre el hero; al hacer scroll pasa a Obsidiana sólida con filete inferior (sin cristal ni desenfoque).
 * `base` = "" en la home (anclas en la misma página) y "/" en las páginas interiores (vuelven a la home).
 * `brand` solo lo pasan las previews de /preview: "centered" centra el logotipo entre navegación y CTA;
 * "ledger" añade una franja superior con ubicación y tagline, que se recoge al hacer scroll.
 */
export function Header({ base = "", items = nav, brand }: { base?: "" | "/"; items?: { href: string; label: string }[]; brand?: HeaderBrand }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const layout = brand?.layout ?? "standard";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const filled = solid || open;
  const href = (h: string) => `${base}${h}`;
  const link = `relative inline-flex min-h-11 items-center px-3 text-[14px] text-(--h-ivory)/80 transition-colors hover:text-(--h-ivory) after:absolute after:inset-x-3 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-(--h-red) after:transition-transform hover:after:scale-x-100 motion-reduce:after:transition-none ${focus}`;

  const logo = (
    <a href={base || "#inicio"} aria-label={`${brand?.name ?? statex.name}, inicio`} className={`text-[15px] sm:text-[17px] ${layout === "centered" ? "lg:justify-self-center" : ""} ${focus}`}>
      {brand?.logo ?? <Wordmark />}
    </a>
  );
  const links = (
    <nav aria-label="Principal" className={layout === "centered" ? "hidden lg:block" : "ml-auto hidden lg:block"}>
      <ul className={`m-0 flex list-none p-0 ${layout === "centered" ? "-ml-3" : ""}`}>
        {items.map((n) => (
          <li key={n.href}>
            <a href={href(n.href)} className={link}>{n.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
  const actions = (
    <div className={`ml-auto flex items-center gap-2 sm:gap-4 ${layout === "centered" ? "lg:ml-0 lg:justify-self-end" : "lg:ml-4"}`}>
      <a
        href={href("#contacto")}
        className={`inline-flex min-h-11 items-center whitespace-nowrap border border-(--h-ivory)/70 px-3 text-[13px] font-medium transition-colors hover:border-(--h-ivory) hover:bg-(--h-ivory) hover:text-(--h-ink) motion-reduce:transition-none sm:px-5 sm:text-[14px] ${focus}`}
      >
        {cta.primary}
      </a>
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex size-11 shrink-0 cursor-pointer items-center justify-center lg:hidden ${focus}`}
      >
        {open ? <X size={22} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.5} aria-hidden="true" />}
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 motion-reduce:transition-none ${
        filled ? "border-(--h-line) bg-(--h-ink)" : "border-transparent bg-transparent"
      }`}
    >
      {layout === "ledger" && brand && (
        <div hidden={filled} className="border-b border-(--h-line) max-lg:hidden">
          <p className="mx-auto m-0 flex h-9 w-full max-w-[1440px] items-center justify-between px-14 text-[13px] text-(--h-titanium)">
            <span>Barcelona · Consultoría de ciberseguridad y desarrollo seguro</span>
            <span>{brand.tagline}</span>
          </p>
        </div>
      )}
      <div
        className={`mx-auto flex h-18 w-full max-w-[1440px] items-center gap-2 px-4 sm:h-20 sm:gap-4 sm:px-8 lg:px-14 ${
          layout === "centered" ? "lg:grid lg:grid-cols-[1fr_auto_1fr]" : ""
        }`}
      >
        {layout === "centered" ? (
          <>
            {links}
            {logo}
            {actions}
          </>
        ) : (
          <>
            {logo}
            {links}
            {actions}
          </>
        )}
      </div>

      <div id={panelId} hidden={!open} className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-(--h-ink) sm:top-20 lg:hidden">
        <nav aria-label="Principal (móvil)" className="px-4 pb-28 pt-6 sm:px-8">
          <ul className="m-0 list-none p-0">
            {items.map((n) => (
              <li key={n.href} className="border-b border-(--h-line)">
                <a
                  href={href(n.href)}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-16 items-center text-[1.6rem] tracking-[-0.02em] ${caps} ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={href("#contacto")}
            onClick={() => setOpen(false)}
            className={`mt-10 inline-flex min-h-13 items-center bg-(--h-ivory) px-6 font-medium text-(--h-ink) ${focus}`}
          >
            {cta.primary}
          </a>
        </nav>
      </div>
    </header>
  );
}
