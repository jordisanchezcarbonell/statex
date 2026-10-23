import { XMark } from "./Composition";

// Tipografía de titulares: Bricolage Grotesque a tamaño óptico 96 y ligeramente estrecha.
export const display = "font-(family-name:--c-display) [font-variation-settings:'opsz'_96,'wdth'_86]";

/**
 * Logotipo tipográfico: «State» en Bricolage Grotesque 800 y la X construida con cuatro cuartos de círculo.
 * El nombre accesible es siempre «StateX».
 */
export function Wordmark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-baseline leading-none font-extrabold tracking-[-0.035em] ${display} ${className}`}>
      <span className="sr-only">StateX</span>
      <span aria-hidden="true">State</span>
      <span aria-hidden="true" className="ml-[0.04em] inline-block h-[0.7em] w-[0.7em] self-baseline">
        <XMark tone={tone} gap={0.06} className="h-full w-full" />
      </span>
    </span>
  );
}
