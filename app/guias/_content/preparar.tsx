import Link from "next/link";
import { focus } from "../../_site/ui";
import { Section, prose } from "./shared";

// Lista de comprobación previa a una auditoría. Sin afirmaciones sobre políticas concretas de
// proveedores: se remite a la política de pruebas de cada uno.

const checklist = [
  {
    phase: "Dos semanas antes",
    items: [
      "Decide quién firma la autorización: el titular de los sistemas. Si la web es de un cliente tuyo, la firma el cliente.",
      "Revisa la política de pruebas de seguridad de tu proveedor de hosting o cloud y si exige avisarle.",
      "Define el alcance por escrito: dominios, aplicaciones, APIs y lo que queda fuera.",
      "Reúne la documentación que tengas: especificación de la API, esquema de la arquitectura, lista de integraciones.",
    ],
  },
  {
    phase: "La semana anterior",
    items: [
      "Prepara un entorno de preproducción lo más parecido posible a producción, con datos ficticios.",
      "Crea cuentas de prueba para cada rol (y para dos empresas distintas si la plataforma es multiempresa).",
      "Confirma que hay copia de seguridad reciente y que sabéis restaurarla.",
      "Acuerda la ventana horaria para las pruebas que puedan afectar al servicio.",
      "Nombra una persona de contacto técnica y otra para urgencias, con teléfono.",
    ],
  },
  {
    phase: "El día que empieza",
    items: [
      "Avisa a quien vigile alertas o registros para que no confunda las pruebas con un ataque real.",
      "Si tenéis WAF o bloqueo por IP, decide con el auditor si se permite su IP para probar la aplicación y no solo el WAF.",
      "No despliegues cambios grandes durante la auditoría sin avisar: invalidan lo probado.",
    ],
  },
];

export function PrepareGuide() {
  return (
    <>
      <div className={prose}>
        <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.6] text-(--h-ivory)">
          Una auditoría bien preparada encuentra más y cuesta menos: el tiempo se dedica a probar, no a esperar cuentas o a descubrir qué hay que revisar. Esta guía es la lista que te pediremos nosotros, y que te debería pedir cualquier proveedor serio.
        </p>

        <Section id="g-prep-legal" title="Lo primero: la autorización">
          <p>Probar la seguridad de un sistema sin permiso de su titular es delito en España. Por eso, antes de cualquier prueba activa, tiene que haber un documento firmado que diga <strong>quién autoriza, qué se puede probar, cuándo y con qué límites</strong>.</p>
          <ul>
            <li>Lo firma el titular de los sistemas. Una agencia no puede autorizar la auditoría de la web de su cliente: tiene que hacerlo el cliente.</li>
            <li>Si la aplicación está en un hosting o en la nube, revisa la política de pruebas de ese proveedor. Algunos piden aviso previo para ciertos servicios o tipos de prueba.</li>
            <li>Si hay servicios de terceros en el alcance (pasarela de pago, proveedor de identidad), se prueban en su modo de pruebas o se dejan fuera.</li>
          </ul>
        </Section>

        <Section id="g-prep-lista" title="Lista de comprobación">
          <p>Ordenada por cuándo conviene hacer cada cosa:</p>
        </Section>
      </div>

      <div className="mt-6 grid max-w-[68rem] gap-px bg-(--h-line) md:grid-cols-3">
        {checklist.map((c) => (
          <section key={c.phase} aria-label={c.phase} className="bg-(--h-ink) py-6 md:px-6 md:first:pl-0">
            <h3 className="m-0 text-[1.05rem] font-semibold uppercase tracking-[0.01em]">{c.phase}</h3>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {c.items.map((x) => (
                <li key={x} className="grid grid-cols-[1rem_1fr] gap-3 text-[15px] leading-[1.55] text-(--h-ivory)/85">
                  <span aria-hidden="true" className="mt-[0.4em] size-3 border border-(--h-titanium)" />
                  {x}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={`mt-4 ${prose}`}>
        <Section id="g-prep-entorno" title="Producción o preproducción">
          <p>Siempre que se pueda, mejor <strong>preproducción</strong>: se puede probar con más profundidad (crear, borrar, forzar errores) sin riesgo para tus clientes. Lo importante es que sea fiel a producción: misma versión, misma configuración y mismas integraciones.</p>
          <p>Algunas cosas solo se pueden comprobar en <strong>producción</strong>, como la configuración real del servidor, los certificados o los dominios publicados. Esas pruebas son pasivas o de bajo impacto y se hacen en la ventana acordada.</p>
        </Section>

        <Section id="g-prep-datos" title="Qué no tienes que enviar">
          <ul>
            <li><strong>Contraseñas reales</strong> de personas: se crean cuentas de prueba.</li>
            <li><strong>Datos de clientes:</strong> el entorno de pruebas debe usar datos ficticios.</li>
            <li><strong>Secretos por correo o por formulario:</strong> si hace falta compartir una credencial, se acuerda un canal cifrado.</li>
          </ul>
        </Section>

        <Section id="g-prep-durante" title="Durante y después">
          <ul>
            <li>Si aparece algo crítico, el auditor debería avisarte ese mismo día para que lo corrijas sin esperar al informe.</li>
            <li>Si una prueba afecta al servicio, se para y se te llama.</li>
            <li>Con el informe, planifica las correcciones por prioridad y pide el <strong>retest</strong> cuando estén desplegadas.</li>
            <li>Al terminar, elimina las cuentas de prueba y revoca las credenciales que se crearon para la auditoría.</li>
          </ul>
          <p>Si quieres saber qué debería incluir la auditoría y cuánto cuesta, lo explicamos en la <Link href="/guias/que-incluye-una-auditoria-de-seguridad-web" className={focus}>guía de auditoría web</Link> y en la de <Link href="/guias/que-incluye-una-auditoria-de-seguridad-de-apis" className={focus}>auditoría de APIs</Link>.</p>
        </Section>
      </div>
    </>
  );
}
