"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X as Close } from "lucide-react";
import { cta, nav } from "../../content";
import { Wordmark } from "./Logo";
import { ring, shell } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const link = `inline-flex min-h-10 items-center rounded-lg px-3 text-[15px] font-medium text-(--muted) transition-colors hover:text-(--navy) ${ring}`;

  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-white/90 backdrop-blur-md">
      <div className={`${shell} flex h-16 items-center justify-between gap-6`}>
        <a href="#inicio" className={`rounded-md ${ring}`}>
          <Wordmark className="text-[25px]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className={`hidden min-h-10 items-center rounded-[10px] bg-(--navy) px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#1A2650] sm:inline-flex ${ring}`}
          >
            {cta.primary}
          </a>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="b-menu-movil"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex size-11 items-center justify-center rounded-[10px] border border-(--line) text-(--navy) lg:hidden ${ring}`}
          >
            {open ? <Close size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="sr-only">Menú</span>
          </button>
        </div>
      </div>

      <div id="b-menu-movil" hidden={!open} className="border-t border-(--line) bg-white lg:hidden">
        <nav aria-label="Principal (móvil)" className={`${shell} py-4`}>
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-lg px-3 text-[17px] font-medium text-(--navy) hover:bg-(--fog) ${ring}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className={`mt-4 flex min-h-12 w-full items-center justify-center rounded-[10px] bg-(--navy) px-5 text-[16px] font-semibold text-white sm:hidden ${ring}`}>
            {cta.primary}
          </a>
        </nav>
      </div>
    </header>
  );
}
