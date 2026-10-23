"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cta, nav } from "../content";
import { btnInk, focus } from "./ui";
import { display } from "./Wordmark";

// Navegación móvil: botón con aria-expanded, panel que se cierra con Escape, al elegir un enlace
// o al pasar a escritorio. El foco vuelve al botón al cerrar con Escape.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="c-menu"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-l-[0.3rem] rounded-r-full border-2 border-(--ink) pr-4 pl-3 text-[0.9375rem] font-semibold ${focus}`}
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        {open ? "Cerrar" : "Menú"}
      </button>
      <div
        id="c-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-y-2 border-(--ink) bg-(--paper) px-5 pt-4 pb-8 sm:px-8"
      >
        <nav aria-label="Principal (móvil)">
          <ul className="grid">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-(--ink)/15">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center text-[1.75rem] font-bold tracking-[-0.02em] ${display} ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contacto" onClick={() => setOpen(false)} className={`${btnInk} mt-6 w-full sm:w-auto`}>
          {cta.primary}
        </a>
      </div>
    </div>
  );
}
