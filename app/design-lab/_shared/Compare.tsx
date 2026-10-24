"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DIRECTIONS } from "../directions";

const SIZES = { desktop: { w: 1440, h: 900 }, mobile: { w: 390, h: 844 } } as const;
type Device = keyof typeof SIZES;
type View = "home" | "marca";
const STORE = "statex-lab-shortlist";

export function Compare() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const [view, setView] = useState<View>("home");
  const [scale, setScale] = useState(0.5);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const d = DIRECTIONS[active];
  const size = SIZES[device];
  const src = `/design-lab/${d.slug}${view === "marca" ? "/marca" : ""}`;

  // Preselección solo en este navegador (localStorage puede no estar disponible).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "[]");
      if (Array.isArray(saved)) setShortlist(saved.filter((x) => typeof x === "string"));
    } catch {}
  }, []);
  function toggleShortlist(slug: string) {
    setShortlist((cur) => {
      const next = cur.includes(slug) ? cur.filter((x) => x !== slug) : [...cur, slug];
      try { localStorage.setItem(STORE, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  // La propuesta se renderiza a tamaño real y se escala para caber en el escenario.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const byWidth = (e.contentRect.width - (device === "mobile" ? 48 : 0)) / size.w;
      setScale(Math.min(1, device === "mobile" ? Math.min(byWidth, 720 / size.h) : byWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [device, size.w, size.h]);

  // Teclas 1–8 para saltar entre conceptos.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= DIRECTIONS.length) setActive(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + DIRECTIONS.length) % DIRECTIONS.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const focus = "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";
  const seg = (on: boolean) => `min-h-11 rounded-md px-3.5 ${focus} ${on ? "bg-zinc-900 text-white" : "hover:bg-zinc-100"}`;
  const picked = shortlist.includes(d.slug);

  return (
    <>
      <div className="mb-4 grid gap-3">
        <div role="tablist" aria-label="Conceptos" onKeyDown={onTabKey} className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 xl:grid-cols-8">
          {DIRECTIONS.map((x, i) => {
            const sel = i === active;
            return (
              <button
                key={x.slug}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${x.slug}`}
                aria-selected={sel}
                aria-controls="concept-panel"
                tabIndex={sel ? 0 : -1}
                onClick={() => setActive(i)}
                className={`grid min-h-14 gap-0.5 rounded-[10px] border px-3.5 py-2.5 text-left ${focus} ${sel ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white hover:border-zinc-900"}`}
              >
                <b className="text-[15px]">Concept {x.letter}{shortlist.includes(x.slug) ? " ★" : ""}</b>
                <span className={`text-[13px] leading-snug ${sel ? "text-zinc-300" : "text-zinc-600"}`}>{x.name}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          <div role="group" aria-label="Qué ver" className="flex gap-1 rounded-[10px] border border-zinc-300 bg-white p-1">
            <button aria-pressed={view === "home"} onClick={() => setView("home")} className={seg(view === "home")}>Homepage</button>
            <button aria-pressed={view === "marca"} onClick={() => setView("marca")} className={seg(view === "marca")}>Identidad de marca</button>
          </div>
          <div role="group" aria-label="Tamaño de pantalla" className="flex gap-1 rounded-[10px] border border-zinc-300 bg-white p-1">
            <button aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} className={seg(device === "desktop")}>Escritorio</button>
            <button aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} className={seg(device === "mobile")}>Móvil</button>
          </div>
        </div>
      </div>

      <div role="tabpanel" id="concept-panel" aria-labelledby={`tab-${d.slug}`} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div ref={stage} className={`flex min-w-0 justify-center ${device === "mobile" ? "rounded-xl bg-zinc-200 py-6" : ""}`}>
          <div
            className={`relative overflow-hidden bg-white ${device === "mobile" ? "rounded-[28px] shadow-[0_0_0_8px_#18181b]" : "rounded-[10px] shadow-[0_0_0_1px_#d4d4d8,0_24px_48px_-28px_rgba(0,0,0,0.35)]"}`}
            style={{ width: size.w * scale, height: size.h * scale }}
          >
            <iframe
              key={`${src}-${device}`}
              src={src}
              title={`Concept ${d.letter}, ${view === "home" ? "homepage" : "identidad"} en ${device === "desktop" ? "escritorio" : "móvil"}`}
              width={size.w}
              height={size.h}
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
        </div>

        <aside className="rounded-xl border border-zinc-300 bg-white p-5">
          <h2 className="text-xl font-bold leading-tight">
            <span className="block text-base font-medium text-zinc-600">Concept {d.letter}</span>
            {d.name}
          </h2>
          <p className="mt-3">{d.intent}</p>
          <dl className="mt-4 grid gap-1 text-[15px]">
            <dt className="mt-2 text-zinc-600">Lo memorable</dt>
            <dd>{d.memorable}</dd>
            <dt className="mt-2 text-zinc-600">Movimiento</dt>
            <dd>{d.motion}</dd>
            <dt className="mt-2 text-zinc-600">Tipografía</dt>
            <dd>
              <ul>{d.fonts.map((f) => <li key={f.family}><b>{f.family}</b><span className="block text-zinc-600">{f.role}</span></li>)}</ul>
            </dd>
            <dt className="mt-2 text-zinc-600">Referencias verificadas</dt>
            <dd>
              <ul className="grid gap-1.5">
                {d.references.map((r) => (
                  <li key={r.name}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-2 ${focus}`}>{r.name}</a>
                    <span className="block text-zinc-600">{r.takeaway}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <ul aria-label="Paleta" className="my-4 grid gap-1.5 text-[13px] text-zinc-600">
            {d.palette.map((c) => (
              <li key={c.hex} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-[18px] rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" style={{ background: c.hex }} />
                {c.name} <code>{c.hex}</code>
              </li>
            ))}
          </ul>
          <div className="grid gap-2">
            <Link href={`/design-lab/${d.slug}`} className={`flex min-h-11 items-center justify-center rounded-lg bg-zinc-900 px-3.5 text-center font-semibold text-white hover:bg-zinc-700 ${focus}`}>
              Abrir homepage completa
            </Link>
            <Link href={`/design-lab/${d.slug}/marca`} className={`flex min-h-11 items-center justify-center rounded-lg border border-zinc-300 px-3.5 text-center font-semibold hover:border-zinc-900 ${focus}`}>
              Abrir identidad de marca
            </Link>
            <button
              aria-pressed={picked}
              onClick={() => toggleShortlist(d.slug)}
              className={`min-h-11 rounded-lg border px-3.5 font-semibold ${focus} ${picked ? "border-zinc-900 bg-amber-100" : "border-zinc-300 hover:border-zinc-900"}`}
            >
              {picked ? "★ Preseleccionado" : "Preseleccionar"}
            </button>
          </div>
        </aside>
      </div>

      <section aria-labelledby="table-title" className="mt-14">
        <h2 id="table-title" className="text-xl font-bold">Comparativa de las direcciones</h2>
        <p className="mt-1 text-zinc-600">Tipografías, colores, recurso principal, ventajas e inconvenientes.</p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-300 bg-white">
          <table className="w-full min-w-[1100px] border-collapse text-left text-[14px]">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th scope="col" className="p-3 font-semibold">Concepto</th>
                <th scope="col" className="p-3 font-semibold">Tipografía</th>
                <th scope="col" className="p-3 font-semibold">Paleta</th>
                <th scope="col" className="p-3 font-semibold">Lo memorable</th>
                <th scope="col" className="p-3 font-semibold">Ventajas</th>
                <th scope="col" className="p-3 font-semibold">Inconvenientes</th>
              </tr>
            </thead>
            <tbody>
              {DIRECTIONS.map((x, i) => (
                <tr key={x.slug} className="border-t border-zinc-200 align-top">
                  <th scope="row" className="p-3">
                    <button onClick={() => { setActive(i); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`text-left font-semibold underline-offset-2 hover:underline ${focus}`}>
                      Concept {x.letter}{shortlist.includes(x.slug) ? " ★" : ""}
                      <span className="block font-normal text-zinc-600">{x.name}</span>
                    </button>
                  </th>
                  <td className="p-3">{x.fonts.map((f) => f.family).join(" + ")}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {x.palette.map((c) => (
                        <span key={c.hex} title={`${c.name} ${c.hex}`} className="size-6 rounded-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" style={{ background: c.hex }} />
                      ))}
                    </div>
                  </td>
                  <td className="p-3">{x.memorable}</td>
                  <td className="p-3"><ul className="grid list-disc gap-1 pl-4">{x.pros.map((t) => <li key={t}>{t}</li>)}</ul></td>
                  <td className="p-3"><ul className="grid list-disc gap-1 pl-4">{x.cons.map((t) => <li key={t}>{t}</li>)}</ul></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
