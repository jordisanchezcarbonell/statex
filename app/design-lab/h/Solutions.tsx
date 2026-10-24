"use client";

import { useId, useState } from "react";
import { solutions } from "../content";
import { focus } from "./ui";

/**
 * Escritorio: cinco paneles altos en fila; el activo se ensancha y muestra su descripción
 * (hover o teclado, con botones aria-expanded). Móvil: lista vertical con todo visible.
 */
export function Solutions() {
  const [active, setActive] = useState(0);
  const base = useId();

  return (
    <>
      <ul className="m-0 hidden h-[34rem] list-none gap-px bg-(--h-line) p-0 lg:flex">
        {solutions.map((s, i) => {
          const on = i === active;
          const panel = `${base}-${s.id}`;
          return (
            <li
              key={s.id}
              onMouseEnter={() => setActive(i)}
              className={`relative flex min-w-0 flex-col overflow-hidden transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                on ? "grow-[2.6] bg-(--h-graphite)" : "grow bg-(--h-ink)"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-(--h-red) transition-transform duration-700 motion-reduce:transition-none ${on ? "scale-x-100" : "scale-x-0"}`}
              />
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={panel}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex w-full cursor-pointer flex-col items-start p-7 text-left xl:p-9 ${focus} focus-visible:-outline-offset-4`}
                >
                  <span className="text-[13px] text-(--h-titanium)">{s.short}</span>
                  <span className="mt-6 block text-[clamp(1.25rem,1.7vw,1.6rem)] font-semibold uppercase leading-[1.05] tracking-[-0.015em] text-balance">
                    {s.name}
                  </span>
                </button>
              </h3>
              <div
                id={panel}
                className={`mt-auto w-[28rem] max-w-full px-7 pb-9 transition-opacity duration-500 motion-reduce:transition-none xl:px-9 ${
                  on ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={!on}
              >
                <p className="m-0 text-[17px] leading-[1.6] text-(--h-ivory)/85">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="m-0 grid list-none border-t border-(--h-line) p-0 lg:hidden">
        {solutions.map((s) => (
          <li key={s.id} className="border-b border-(--h-line) py-8">
            <span className="text-[13px] text-(--h-titanium)">{s.short}</span>
            <h3 className="m-0 mt-3 text-[1.35rem] font-semibold uppercase leading-[1.1] tracking-[-0.015em]">{s.name}</h3>
            <p className="m-0 mt-4 max-w-[56ch] leading-[1.6] text-(--h-ivory)/85">{s.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
