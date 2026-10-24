"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cta, nav as baseNav, sampleReport } from "../content";
import { Wordmark, focus } from "./ui";

// I añade el informe de ejemplo al menú: es la prueba principal de la firma.
const nav = [baseNav[0], { href: "#informe", label: sampleReport.label }, ...baseNav.slice(1, -1)];

/** Sobre el hero, sin fondo; al hacer scroll, marfil sólido con filete. */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
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

  const link = `group relative inline-flex min-h-11 items-center px-3 text-[14px] ${focus}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 motion-reduce:transition-none ${
        solid || open ? "border-(--i-line) bg-(--i-ivory)" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-[1480px] items-center gap-4 px-4 sm:h-20 sm:px-8 lg:px-16">
        <a href="#inicio" aria-label="StateX, inicio" className={`text-[15px] ${focus}`}>
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="m-0 flex list-none p-0">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                  <span aria-hidden="true" className="absolute inset-x-3 bottom-2.5 h-px origin-left scale-x-0 bg-(--i-graphite) transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contacto"
          className={`ml-auto hidden min-h-11 items-center bg-(--i-graphite) px-5 text-[14px] font-medium text-(--i-ivory) transition-colors hover:bg-[#1F201C] motion-reduce:transition-none sm:inline-flex lg:ml-4 ${focus}`}
        >
          {cta.primary}
        </a>

        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className={`ml-auto inline-flex size-11 shrink-0 cursor-pointer items-center justify-center sm:ml-0 lg:hidden ${focus}`}
        >
          {open ? <X size={22} strokeWidth={1.25} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.25} aria-hidden="true" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      <div id={panelId} hidden={!open} className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-(--i-ivory) sm:top-20 lg:hidden">
        <nav aria-label="Principal (móvil)" className="px-4 pb-28 pt-4 sm:px-8">
          <ul className="m-0 list-none p-0">
            {[...nav, baseNav.at(-1)!].map((n) => (
              <li key={n.href} className="border-b border-(--i-line)">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-16 items-center font-(family-name:--i-serif) text-[1.9rem] tracking-[-0.01em] ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className={`mt-10 inline-flex min-h-13 items-center bg-(--i-graphite) px-6 font-medium text-(--i-ivory) ${focus}`}
          >
            {cta.primary}
          </a>
        </nav>
      </div>
    </header>
  );
}
