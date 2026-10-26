import Link from "next/link";
import type { IdentityKey } from "./ui";

// Barra flotante y neutral para comparar las identidades. No forma parte de ningún diseño.
// Lista literal (no importa las identidades) para que cada preview cargue solo su propia fuente.
const ITEMS: { key: IdentityKey; name: string }[] = [
  { key: "statex", name: "StateX" },
  { key: "noxen", name: "Noxen" },
  { key: "vantis", name: "Vantis" },
];

export function PreviewBar({ current }: { current: IdentityKey }) {
  const item =
    "inline-flex min-h-11 items-center justify-center rounded-full px-3.5 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  return (
    <nav
      aria-label="Comparar identidades"
      className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full bg-zinc-900/90 p-1 font-sans text-[13px] font-medium text-zinc-50 shadow-[0_6px_24px_rgba(0,0,0,0.25)] backdrop-blur"
    >
      <span className="px-3 text-zinc-400">Preview</span>
      {ITEMS.map((i) => (
        <Link key={i.key} href={`/preview/${i.key}`} aria-current={i.key === current ? "page" : undefined} className={`${item} ${i.key === current ? "bg-white/15" : ""}`}>
          {i.name}
        </Link>
      ))}
      <Link href="/" className={`${item} text-zinc-400`}>Web actual</Link>
    </nav>
  );
}
