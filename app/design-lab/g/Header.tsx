"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { brand, cta, footer, nav } from "../content";
import { Wordmark, focusRing, mono } from "./parts";

/** Cabecera de documento. En móvil, la navegación se despliega como un listado bajo un botón. */
export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const link = `inline-flex min-h-8 items-center underline-offset-[6px] hover:underline hover:decoration-(--red) hover:decoration-2 ${focusRing}`;

  return (
    <header className="relative mx-auto w-full max-w-[1600px] px-5 pt-5 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between gap-2 sm:gap-6">
        <a href="#inicio" aria-label="StateX, inicio" className={`text-[1.75rem] sm:text-[2rem] ${focusRing}`}>
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${mono} text-[13px]`}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="#contacto"
            className={`inline-flex min-h-11 items-center border border-(--ink) px-3 ${mono} text-[12px] font-medium transition-colors hover:bg-(--ink) hover:text-(--card) sm:px-4 sm:text-[13px] ${focusRing}`}
          >
            {cta.primary}
          </a>
          <button
            ref={btn}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex size-11 items-center justify-center lg:hidden ${focusRing}`}
          >
            {open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <nav
        id={panelId}
        aria-label="Principal (móvil)"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-y border-(--ink) bg-(--card) px-5 pt-3 pb-5 sm:px-8 lg:hidden"
      >
        <p aria-hidden="true" className={`${mono} text-[12px] text-(--archive-ink)`}>
          ~/statex $ ls
        </p>
        <ul className="mt-2">
          {nav.map((n) => (
            <li key={n.href} className="border-b border-dotted border-(--archive) last:border-b-0">
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center font-(family-name:--f-serif) text-[1.6rem] leading-none ${focusRing}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`mt-5 flex justify-between gap-4 border-t border-(--ink) pt-2 ${mono} text-[12px] text-(--archive-ink)`}>
        <span>{brand.tagline}</span>
        <span className="shrink-0">{footer.year}</span>
      </div>
    </header>
  );
}
