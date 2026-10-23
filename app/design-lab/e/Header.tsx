"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, cta, nav } from "../content";
import { PressLink } from "./Press";
import s from "./e.module.css";

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)]";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header className="relative z-40 border-b-[3px] border-black">
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center gap-3 px-5 sm:gap-4 sm:px-8 lg:px-12">
        <a href="#contenido" className={`${s.display} text-[1.6rem] leading-none sm:text-[2rem] ${focus}`}>
          {brand.name}
        </a>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="m-0 flex list-none gap-1 p-0">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`inline-flex min-h-11 items-center px-3 font-semibold decoration-[3px] underline-offset-[6px] hover:underline ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <PressLink
          href="#contacto"
          className="ml-auto min-h-11 bg-[var(--e-lilac)] px-3 text-[14px] text-black max-[399px]:hidden sm:min-h-12 sm:px-5 sm:text-[17px] lg:ml-2"
        >
          {cta.primary}
        </PressLink>

        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className={`ml-auto inline-flex size-11 shrink-0 cursor-pointer items-center justify-center border-[3px] border-black bg-white min-[400px]:ml-0 lg:hidden ${focus}`}
        >
          {open ? <X size={22} strokeWidth={2.5} aria-hidden="true" /> : <Menu size={22} strokeWidth={2.5} aria-hidden="true" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      <div
        ref={panel}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-[3px] border-black bg-[var(--e-concrete)] lg:hidden"
      >
        <nav aria-label="Principal (móvil)">
          <ul className="m-0 mx-auto list-none px-5 py-2 sm:px-8">
            {nav.map((n) => (
              <li key={n.href} className="border-b-[3px] border-black last:border-b-0">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`${s.display} flex min-h-14 items-center text-[1.6rem] ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-8 pt-3 sm:px-8">
            <PressLink href="#contacto" onClick={() => setOpen(false)} className="min-h-12 bg-[var(--e-lilac)] px-5 text-[17px] text-black">
              {cta.primary}
            </PressLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
