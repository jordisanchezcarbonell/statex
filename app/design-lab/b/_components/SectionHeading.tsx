type Props = {
  id: string;
  /** Título de la sección (desde `sections`). */
  label: string;
  /** Frase principal (si la sección la tiene). */
  title?: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
};

// Encabezado común: el nombre de la sección (h2) en voz baja, con la frase principal grande.
export function SectionHeading({ id, label, title, intro, tone = "light", className = "" }: Props) {
  const dark = tone === "dark";
  const big = `block text-[clamp(2rem,1.2rem+2.8vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.038em] ${dark ? "text-white" : "text-(--navy)"}`;
  return (
    <div className={className}>
      <h2 id={id}>
        {title ? (
          <>
            <span className={`mb-5 flex items-center gap-2.5 text-[15px] font-medium tracking-normal ${dark ? "text-[#A9B3CC]" : "text-(--muted)"}`}>
              <span aria-hidden="true" className={`h-px w-6 ${dark ? "bg-(--sky)" : "bg-(--sky-ink)"}`} />
              {label}
            </span>
            <span className={`${big} max-w-[20ch]`}>{title}</span>
          </>
        ) : (
          <span className={big}>{label}</span>
        )}
      </h2>
      {intro && (
        <p className={`mt-6 max-w-[56ch] text-[18px] leading-relaxed ${dark ? "text-[#C3CADB]" : "text-(--muted)"}`}>{intro}</p>
      )}
    </div>
  );
}
