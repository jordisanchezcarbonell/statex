"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cta, nav } from "../content";
import { Logo } from "./Mark";
import { focus } from "./ui";

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
    <header className="sticky top-0 z-50 border-b border-(--line) bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-5 sm:gap-6 sm:px-8 lg:px-14">
        <a href="#top" className={`-mx-1 px-1 text-[22px] text-(--ink) sm:text-[24px] ${focus}`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`inline-flex min-h-10 items-center px-3 text-[15px] font-medium text-(--gray) transition-colors hover:text-(--ink) ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contacto"
          className={`ml-auto inline-flex min-h-10 items-center bg-(--ink) px-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-(--teal) sm:px-4 sm:text-[15px] lg:ml-2 ${focus}`}
        >
          {cta.primary}
        </a>

        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className={`-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-(--ink) lg:hidden ${focus}`}
        >
          {open ? <X size={20} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.75} aria-hidden="true" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      <div
        ref={panel}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-(--line) bg-white lg:hidden"
      >
        <nav aria-label="Principal (móvil)">
          <ul className="mx-auto max-w-[1440px] px-5 py-2 sm:px-8">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-(--line) last:border-b-0">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center text-[22px] font-bold tracking-[-0.03em] text-(--ink) ${focus}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
