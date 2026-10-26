import { Wordmark, type IdentityKey } from "../ui";

// Logotipos de las previews, con el mismo tratamiento que STATEX: mayúsculas, interletrado amplio y la línea
// roja bajo la última letra. Solo lo importan componentes de servidor (Shell, Report), así los nombres en
// estudio no viajan en el JavaScript público de la web de producción.
const NAMES: Record<Exclude<IdentityKey, "statex">, string> = { noxen: "Noxe", vantis: "Vanti" };
const LAST: Record<Exclude<IdentityKey, "statex">, string> = { noxen: "N", vantis: "S" };

export function BrandMark({ className = "", identity = "statex" }: { className?: string; identity?: IdentityKey }) {
  if (identity === "statex") return <Wordmark className={className} />;
  return (
    <span className={`inline-flex items-baseline font-semibold uppercase leading-none tracking-[0.32em] ${className}`}>
      {NAMES[identity]}
      <span className="relative">
        {LAST[identity]}
        <span aria-hidden="true" className="absolute -bottom-[0.28em] left-0 right-[0.32em] h-[0.09em] min-h-px bg-(--h-red)" />
      </span>
    </span>
  );
}
