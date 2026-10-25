"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cta, nav } from "./content";
import { Wordmark, focus } from "./ui";

/**
 * Transparente sobre el hero; al hacer scroll pasa a Obsidiana sólida con filete inferior (sin cristal ni desenfoque).
 * `base` = "" en la home (anclas en la misma página) y "/" en las páginas interiores (vuelven a la home).
 */
export function Header({ base = "" }: { base?: "" | "/" }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 motion-reduce:transition-none ${
        filled ? "border-(--h-line) bg-(--h-ink)" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-[1440px] items-center gap-2 px-4 sm:gap-4 sm:h-20 sm:px-8 lg:px-14">
        <a href={base || "#inicio"} aria-label="StateX, inicio" className={`text-[15px] sm:text-[17px] ${focus}`}>
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="m-0 flex list-none p-0">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={href(n.href)} className={link}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={href("#contacto")}
          className={`ml-auto inline-flex min-h-11 items-center whitespace-nowrap border border-(--h-ivory)/70 px-3 text-[13px] font-medium transition-colors hover:border-(--h-ivory) hover:bg-(--h-ivory) hover:text-(--h-ink) motion-reduce:transition-none sm:px-5 sm:text-[14px] lg:ml-4 ${focus}`}
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

      <div id={panelId} hidden={!open} className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-(--h-ink) sm:top-20 lg:hidden">
        <nav aria-label="Principal (móvil)" className="px-4 pb-28 pt-6 sm:px-8">
          <ul className="m-0 list-none p-0">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-(--h-line)">
                <a
                  href={href(n.href)}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-16 items-center text-[1.6rem] font-semibold uppercase tracking-[-0.02em] ${focus}`}
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
