import Link from "next/link";
import { Shell } from "../../_site/Shell";
import { display, focus, muted, wrap } from "../../_site/ui";
import { prose } from "../../guias/_content/shared";

const contents = [
  ["#objetivo", "Objetivo y caso"],
  ["#reuso", "Proceso y herramientas"],
  ["#parche", "El parche"],
  ["#pruebas", "Validación"],
  ["#resultado", "Alcance y límites"],
  ["#detalles-tecnicos", "Detalles técnicos"],
];

const rows = [
  ["Suscriptor", "Podía consultar un registro ficticio reservado", "HTTP 403; acceso bloqueado"],
  ["Administrador", "Acceso legítimo al registro", "HTTP 200; acceso conservado"],
  ["Sesiones, portada y login", "Flujos básicos del laboratorio", "Comprobados según el caso"],
];

export function VisaWordPressArticle({ draft = false }: { draft?: boolean }) {
  return (
    <Shell base="/">
      <article className="pb-24 pt-32 sm:pt-40">
        <div className={wrap}>
          <p className={`m-0 text-sm ${muted}`}>{draft ? "Borrador local · StateX · Proceso de laboratorio" : "Investigación · StateX · Caso de laboratorio"}</p>
          <h1 className={`${display} mt-7 max-w-[18ch] text-[clamp(2.2rem,5.6vw,5rem)]`}>
            Cómo generamos y verificamos un parche de seguridad en WordPress con IA
          </h1>
          <p className="mt-8 max-w-[68ch] text-xl leading-relaxed text-(--h-ivory)/85">
            Probamos una cadena concreta: Visa VVAH y Claude generaron un cambio para un plugin sintético; StateX lo importó con un contrato restringido y lo comprobó en WordPress desechable. El evaluador HTTP independiente aprobó el candidato en este caso conocido.
          </p>
          <p className={`mt-5 text-sm ${muted}`}>Caso sintético conocido · Un candidato aprobado · Sin detección autónoma demostrada</p>
          <p className={`mt-4 text-sm leading-relaxed ${muted}`}>
            Por Jordi Sánchez · Fecha del experimento: <time dateTime="2026-11-03">3 de noviembre de 2026</time>
          </p>

          <nav aria-label="Índice del artículo" className="mt-10 max-w-[68ch] border-y border-(--h-line) py-5">
            <p className={`m-0 text-sm font-semibold ${muted}`}>En este artículo</p>
            <ol className="m-0 mt-3 grid list-none gap-x-8 p-0 sm:grid-cols-2">
              {contents.map(([href, label]) => (
                <li key={href}><a href={href} className={`inline-flex min-h-11 items-center py-2 text-sm underline underline-offset-4 ${focus}`}>{label}</a></li>
              ))}
            </ol>
          </nav>

          <div className={`mt-14 ${prose}`}>
            <section aria-labelledby="objetivo">
              <h2 id="objetivo" className="scroll-mt-28">Qué queríamos demostrar</h2>
              <p>Queríamos comprobar si podíamos reutilizar el flujo de delegación, edición y resultados estructurados de Visa Vulnerability Agentic Harness (VVAH), y mantener en StateX los límites de alcance y la decisión final. No intentábamos medir una tasa general de acierto ni encontrar un fallo desconocido.</p>
            </section>

            <section aria-labelledby="fallo">
              <h2 id="fallo" className="scroll-mt-28">Un permiso que faltaba</h2>
              <p>El plugin WordPress del laboratorio solo contenía datos ficticios. Su endpoint permitía leer un registro reservado a cualquier usuario que hubiera iniciado sesión. El requisito era bloquear al suscriptor y conservar el acceso del administrador.</p>
              <p>El fallo se conocía y se entregó como contexto al proceso de reparación. Por eso el ensayo no demuestra detección autónoma.</p>
            </section>

            <section aria-labelledby="intentos">
              <h2 id="intentos" className="scroll-mt-28">Los intentos locales también cuentan</h2>
              <p>Antes de la ejecución aprobada hubo respuestas locales sin el formato esperado y una propuesta sin cambios, que las pruebas HTTP rechazaron. Visa con un backend local tampoco completó la delegación al fixer. Después, una primera llamada API quedó bloqueada por saldo; una segunda reveló que nuestro validador rechazaba un campo legítimo de caller en el replay de herramientas.</p>
              <p>Reproducimos ese rechazo sin nuevas llamadas, contrastamos el campo con los tipos del SDK y añadimos soporte estricto para el caller directo. Las pruebas offline comprobaron el replay válido y rechazaron estructuras incorrectas. No rebajamos los controles restantes.</p>
            </section>

            <section aria-labelledby="reuso">
              <h2 id="reuso" className="scroll-mt-28">Qué reutilizamos y qué conserva StateX</h2>
              <p>Reutilizamos VVAH 1.5.1, su flujo S10 de padre y fixer, sus herramientas de lectura y edición y sus respuestas estructuradas. Claude Sonnet 4.6 de Anthropic fue el modelo de esta ejecución.</p>
              <p>StateX mantuvo el worker aislado en una copia desechable, el presupuesto compartido, el contrato que limita archivo y baseline, el adaptador de importación y el evaluador HTTP protegido. El worker no recibió las pruebas protegidas ni la solución de referencia. Se detuvo antes de importar el candidato.</p>
            </section>

            <section aria-labelledby="parche">
              <h2 id="parche" className="scroll-mt-28">El cambio que propuso Claude</h2>
              <p>Visa delegó el arreglo a su fixer. Claude cambió la comprobación de sesión por una comprobación de capacidad administrativa:</p>
              <pre className="overflow-x-auto rounded border border-(--h-line) bg-(--h-graphite) p-5 text-sm"><code>{`-    if (!is_user_logged_in()) {
    if (!current_user_can('manage_options')) {`}</code></pre>
              <p>El diff completo se conserva en los materiales técnicos. No editamos manualmente la salida antes de evaluarla.</p>
            </section>

            <section aria-labelledby="pruebas">
              <h2 id="pruebas" className="scroll-mt-28">StateX comprobó el comportamiento por HTTP</h2>
              <p>El contrato admitió un único archivo con el baseline esperado. Después, el evaluador reprodujo el estado vulnerable y probó el candidato en una instancia desechable. La decisión no dependió del veredicto de Visa.</p>
              <div className="my-7 overflow-x-auto" role="region" aria-label="Resultados antes y después" tabIndex={0}>
                <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
                  <thead><tr className={`border-b border-(--h-line) ${muted}`}><th scope="col" className="py-3 pr-5">Flujo</th><th scope="col" className="py-3 pr-5">Antes</th><th scope="col" className="py-3">Después</th></tr></thead>
                  <tbody>{rows.map(([role, before, after]) => <tr key={role} className="border-b border-(--h-line)"><th scope="row" className="py-4 pr-5 align-top font-semibold">{role}</th><td className="py-4 pr-5 align-top">{before}</td><td className="py-4 align-top">{after}</td></tr>)}</tbody>
                </table>
              </div>
              <p>Las comprobaciones protegidas también confirmaron el funcionamiento de sesiones, portada y login. StateX aprobó el candidato; las pruebas y evidencias previas y el plugin original conservaron sus hashes.</p>
            </section>

            <section aria-labelledby="resultado">
              <h2 id="resultado" className="scroll-mt-28">Qué demuestra y qué no</h2>
              <p>Demuestra que en este plugin mínimo y con un fallo conocido, Visa VVAH y Claude produjeron un candidato que pasó el contrato y las pruebas HTTP independientes de StateX. Se aprobó un candidato en un solo caso sintético.</p>
              <p>No demuestra detección autónoma, fiabilidad general, ausencia de otros fallos ni seguridad completa de una web. Tampoco medimos ahorro de mantenimiento ni retiramos los componentes propios. El cierre histórico del backend local mantiene una incidencia de apagado pendiente, separada del cierre limpio de este piloto API.</p>
            </section>

            <details id="detalles-tecnicos" className="my-12 scroll-mt-28 border-y border-(--h-line) py-6">
              <summary className="cursor-pointer font-semibold">Detalles técnicos y contabilidad de la evaluación</summary>
              <div className="mt-5">
                <h3>Aislamiento y control</h3>
                <p>Worker en red Docker interna sin puertos publicados; copia desechable del plugin; sin acceso al repositorio original, WordPress, pruebas, referencia, credencial real o socket Docker. Un broker de destino fijo gestionó las llamadas salientes. El host, Docker y el broker siguieron siendo de confianza; no se afirma aislamiento absoluto.</p>
                <h3>Secuencia y veredicto</h3>
                <p>La prueba inocua debía completar delegación, edición exacta y resultados estructurados. Solo tras pasarla se ejecutó un piloto WordPress. Se detuvo el productor, se importó el candidato con el adaptador StateX y se evaluó con HTTP protegido. El veredicto final fue aprobado.</p>
                <h3>Coste, no tarifa comercial</h3>
                <p>El coste API estimado acumulado de toda la evaluación fue de 0,298398 USD: 17 generaciones y 35 solicitudes HTTP al proveedor, incluidos los conteos de tokens. La facturación no se confirmó. Esta cifra incluye pruebas inocuas e intentos anteriores; no es el precio de una reparación ni una oferta comercial.</p>
                <p>La tarifa usada en el cálculo fue 3 USD por millón de tokens de entrada y 15 USD por millón de salida. La cota configurada para 24 generaciones era 4,702464 EUR con conversión de reserva conservadora. Detalle documental: <code>reports/vvah-api-2026-11-03/execution-after-replay-fix/RESULTS.md</code> y exportación comercial resumida.</p>
              </div>
            </details>
          </div>
          <p className="mt-12"><Link href="/investigacion" className={`underline underline-offset-4 ${focus}`}>Volver a Investigación</Link></p>
          {draft && <p className={`mt-8 text-sm ${muted}`}>Borrador local para revisión. No publicado.</p>}
        </div>
      </article>
    </Shell>
  );
}
