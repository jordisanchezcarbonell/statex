"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, cta, nav } from "../../content";
import { LensMark } from "./LensMark";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--tinta)/8 bg-(--nieve)/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5 rounded-md text-[18px] font-semibold tracking-[-0.04em] text-(--tinta)">
          <LensMark className="size-6" />
          {brand.name}
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[14px] font-medium text-(--gris) transition-colors duration-200 hover:bg-(--tinta)/5 hover:text-(--tinta)"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="hidden min-h-10 items-center rounded-full bg-(--tinta) px-4.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-(--cobalto) sm:inline-flex"
          >
            {cta.primary}
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="f-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-(--tinta)/15 text-(--tinta) lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <nav
        id="f-menu"
        aria-label="Principal (móvil)"
        hidden={!open}
        className="border-t border-(--tinta)/8 bg-(--nieve) lg:hidden"
      >
        <ul className="mx-auto grid max-w-[1440px] gap-1 px-5 py-4 sm:px-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-3 text-[20px] font-medium tracking-[-0.02em] text-(--tinta) hover:bg-(--tinta)/5"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-(--tinta) px-5 text-[16px] font-medium text-white"
            >
              {cta.primary}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
