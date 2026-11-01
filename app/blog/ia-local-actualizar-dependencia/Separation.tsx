export function Separation() {
  return (
    <figure className="my-10 border-y border-(--h-line) py-7" aria-labelledby="separation-caption">
      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        {[
          { title: "Modelo local", input: "Recibe: contexto autorizado", effect: "Devuelve: propuestas JSON", boundary: "Sin acceso directo al workspace, secreto o Docker." },
          { title: "Ejecutor aislado", input: "Recibe: lote validado", effect: "Aplica: acciones permitidas", boundary: "Solo copia de trabajo. npm calcula el lockfile en un worker offline." },
          { title: "Aceptación externa", input: "Recibe: candidato a parche", effect: "Comprueba y exporta", boundary: "Pruebas y políticas fuera del alcance de escritura del agente." },
        ].map((step, index) => (
          <li key={step.title} className="min-w-0">
            <p className="m-0 text-sm text-(--h-titanium)">{index === 0 ? "Contexto autorizado ↓" : index === 1 ? "JSON validado ↓" : "Candidato ↓"}</p>
            <p className="mb-3 mt-3 border-l-2 border-(--h-red) pl-3 text-lg font-semibold">{step.title}</p>
            <p className="my-1 text-sm leading-relaxed">{step.input}<br />{step.effect}</p>
            <p className="mb-0 mt-3 text-sm leading-relaxed text-(--h-titanium)">{step.boundary}</p>
          </li>
        ))}
      </ol>
      <figcaption id="separation-caption" className="mt-6 text-sm leading-relaxed text-(--h-titanium)">Flujo previsto, de izquierda a derecha; en móvil, de arriba abajo. El controlador coordina los tres dominios. En ambos pilotos el rechazo del JSON contractual detuvo el flujo antes de aplicar acciones.</figcaption>
    </figure>
  );
}
