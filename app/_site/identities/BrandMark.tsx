import { Wordmark, type IdentityKey } from "../ui";

// Logotipos de las previews. Solo lo importan componentes de servidor (Shell, Report): así los nombres
// de marca en estudio no viajan en el JavaScript público de la web de producción. El acento es var(--h-red).
export function BrandMark({ className = "", identity = "statex" }: { className?: string; identity?: IdentityKey }) {
  if (identity === "noxen")
    return (
      <span className={`inline-flex items-baseline font-normal uppercase leading-none tracking-[0.42em] [font-family:var(--h-display)] ${className}`}>
        N
        <span className="relative">
          O
          <span aria-hidden="true" className="absolute -top-[0.34em] left-0 right-[0.42em] h-[0.08em] min-h-px bg-(--h-red)" />
        </span>
        XEN
      </span>
    );
  if (identity === "vantis")
    return (
      <span className={`inline-flex items-baseline gap-[0.12em] text-[1.18em] font-medium leading-none tracking-[-0.01em] [font-family:var(--h-display)] ${className}`}>
        Vantis
        <span aria-hidden="true" className="inline-block size-[0.2em] min-h-[3px] min-w-[3px] bg-(--h-red)" />
      </span>
    );
  return <Wordmark className={className} />;
}
