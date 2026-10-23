"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "../content";
import { focusRing } from "./ui";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const id = useId();
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

  return (
    <div className="md:hidden">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-[2px] text-[color:var(--fg)] hover:bg-[rgba(232,230,227,0.06)] ${focusRing}`}
      >
        {open ? <X size={18} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.5} aria-hidden="true" />}
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
      <nav
        id={id}
        aria-label="Principal"
        hidden={!open}
        className="absolute inset-x-0 top-14 border-b border-[color:var(--line)] bg-[color:var(--bg)]"
      >
        <ul className="px-5 py-2">
          {nav.map((n) => (
            <li key={n.href} className="border-b border-[color:var(--line)] last:border-b-0">
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center text-[17px] text-[color:var(--fg)] ${focusRing}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
