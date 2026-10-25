import Link from "next/link";
import { focus } from "../../_site/ui";
import { ExampleTable, Section, prose } from "./shared";

// Precios StateX (research/services-pricing.md §9): ≈600 €/día, API desde 690 €.
const examples = [
  { scope: "API pequeña", work: "Hasta 15 endpoints, un tipo de usuario, REST", days: "1–1,5 días", price: "desde 690 €" },
  { scope: "API de producto", work: "30–40 endpoints, 2–3 roles, REST con OAuth o JWT", days: "2,5–3,5 días", price: "1.500–2.100 €" },
  { scope: "API GraphQL", work: "Esquema mediano, 2 roles, consultas y mutaciones", days: "3–4 días", price: "1.800–2.400 €" },
  { scope: "API multiempresa (SaaS B2B)", work: "≈60 endpoints, 3 roles, aislamiento entre clientes y webhooks", days: "5–6 días", price: "3.000–3.600 €" },
];

// OWASP API Security Top 10 (edición 2023), explicado en lenguaje llano.
const top10 = [
  { id: "API1", name: "Autorización rota a nivel de objeto (BOLA)", text: "Cambiar un identificador en la URL o en el cuerpo de la petición permite leer o modificar recursos de otro usuario. Encabeza la lista de OWASP y suele ser de los más graves." },
  { id: "API2", name: "Autenticación rota", text: "Tokens que no caducan, recuperación de contraseña débil, ausencia de límite de intentos o claves de API que se aceptan sin validar." },
  { id: "API3", name: "Autorización rota a nivel de propiedad", text: "La API devuelve campos que el usuario no debería ver o acepta campos que no debería poder cambiar, como un rol o un precio." },
  { id: "API4", name: "Consumo de recursos sin límite", text: "Sin límites de peticiones, de tamaño o de paginación, cualquiera puede encarecer tu factura o degradar el servicio." },
  { id: "API5", name: "Autorización rota a nivel de función", text: "Un usuario normal puede llamar a funciones de administración porque el control solo existe en la interfaz." },
  { id: "API6", name: "Acceso sin control a flujos sensibles del negocio", text: "Flujos legítimos que se pueden automatizar de forma abusiva: compras masivas, creación de cuentas, envío de mensajes." },
  { id: "API7", name: "Falsificación de peticiones desde el servidor (SSRF)", text: "La API descarga una URL que le pasa el usuario y se la puede dirigir a servicios internos o a los metadatos del proveedor cloud." },
  { id: "API8", name: "Configuración insegura", text: "CORS permisivo, errores que muestran trazas, métodos HTTP innecesarios, cabeceras que faltan o TLS mal configurado." },
  { id: "API9", name: "Inventario de APIs descuidado", text: "Versiones antiguas o entornos de pruebas que siguen publicados sin los controles de la versión actual." },
  { id: "API10", name: "Consumo inseguro de APIs de terceros", text: "Confiar sin validar en lo que devuelve un proveedor externo o en lo que llega por un webhook." },
];

export function ApiAuditGuide() {
  return (
    <>
      <div className={prose}>
        <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.6] text-(--h-ivory)">
          En una aplicación moderna, la interfaz es solo una capa: casi todo lo importante pasa por la API. Por eso muchos de los fallos más graves no se ven en la web, pero se explotan con una simple petición. Esta guía explica qué revisa una auditoría de seguridad de APIs, qué tienes que preparar y de qué depende el precio.
        </p>

        <Section id="g-api-diferencia" title="Por qué una API necesita su propia auditoría">
          <p>Una auditoría web revisa la aplicación a través de la interfaz. Pero un atacante no usa tu interfaz: llama a la API directamente, con los parámetros que quiere y en el orden que quiere. Lo que la interfaz oculta, como un botón de administración o un campo que no se puede editar, la API puede seguir aceptándolo.</p>
          <p>Además, las APIs suelen tener consumidores que no ves: aplicaciones móviles, integraciones de clientes, webhooks o versiones antiguas que nadie apagó. Todo eso forma parte de la superficie de ataque.</p>
        </Section>

        <Section id="g-api-top10" title="Qué revisa: el OWASP API Security Top 10">
          <p>El marco de referencia es el OWASP API Security Top 10, la lista pública de los riesgos más habituales en APIs (edición de 2023). Una auditoría seria los cubre todos dentro del alcance acordado:</p>
        </Section>
      </div>

      <ol className="m-0 mt-6 grid max-w-[68rem] list-none gap-px bg-(--h-line) p-0 md:grid-cols-2">
        {top10.map((r) => (
          <li key={r.id} className="bg-(--h-ink) py-5 md:pr-8 md:odd:pr-10 md:even:pl-8">
            <p className="m-0 font-semibold">
              <span className="mr-3 font-normal tabular-nums text-(--h-titanium)">{r.id}</span>
              {r.name}
            </p>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-(--h-titanium)">{r.text}</p>
          </li>
        ))}
      </ol>

      <div className={`mt-4 ${prose}`}>
        <Section id="g-api-graphql" title="REST, GraphQL y webhooks">
          <ul>
            <li><strong>REST:</strong> se prueba cada endpoint con cada rol, cambiando identificadores, métodos y campos para comprobar que el servidor, y no la interfaz, decide qué está permitido.</li>
            <li><strong>GraphQL:</strong> además de lo anterior, se revisa si el esquema se expone sin necesidad (introspección), si se pueden pedir consultas muy profundas o agrupadas que saturen el servidor, y si los permisos se aplican en cada campo y no solo en la consulta principal.</li>
            <li><strong>Webhooks:</strong> que se verifique la firma de cada mensaje, que no se puedan reenviar mensajes antiguos y que una URL de destino no sirva para atacar servicios internos.</li>
          </ul>
        </Section>

        <Section id="g-api-preparar" title="Qué tienes que preparar">
          <ul>
            <li><strong>La especificación de la API</strong>, si la tienes: un fichero OpenAPI (Swagger), una colección de Postman o el esquema de GraphQL. Si no existe, se puede trabajar a partir del tráfico de la aplicación, pero lleva más tiempo.</li>
            <li><strong>Credenciales de prueba para cada rol</strong> y, si hay varias empresas cliente, al menos dos cuentas de empresas distintas para probar que no se ven entre ellas.</li>
            <li><strong>Un entorno de preproducción</strong> con datos ficticios, sobre todo si la API tiene operaciones que crean, borran o cobran.</li>
            <li><strong>Los límites conocidos:</strong> qué endpoints no se deben tocar, qué integraciones con terceros hay que simular y en qué horario se puede probar.</li>
          </ul>
          <p>Tienes la lista completa en <Link href="/guias/como-preparar-tu-web-para-una-auditoria-de-seguridad" className={focus}>cómo preparar tu web para una auditoría</Link>.</p>
        </Section>

        <Section id="g-api-entregables" title="Qué deberías recibir">
          <p>Lo mismo que en cualquier auditoría (resumen ejecutivo, hallazgos con severidad, evidencias reproducibles, impacto y recomendaciones) y, en el caso de una API, además:</p>
          <ul>
            <li>La <strong>petición y la respuesta exactas</strong> de cada hallazgo, listas para que tu equipo las repita.</li>
            <li>Una <strong>matriz de permisos</strong>: qué rol pudo hacer qué en cada endpoint probado, para que veáis de un vistazo dónde falla el control de acceso.</li>
            <li>La <strong>corrección en el punto exacto</strong>: en qué capa (controlador, middleware, consulta) conviene aplicar la comprobación para que no vuelva a pasar en otros endpoints.</li>
          </ul>
        </Section>

        <Section id="g-api-precio" title="De qué depende el precio">
          <ul>
            <li><strong>Número de endpoints</strong> u operaciones de GraphQL.</li>
            <li><strong>Roles y tipos de cliente:</strong> cada combinación de rol y recurso es una prueba de autorización más.</li>
            <li><strong>Multiempresa:</strong> el aislamiento entre clientes es lo más delicado y lo que más tiempo requiere.</li>
            <li><strong>Autenticación:</strong> claves de API, JWT, OAuth con terceros o firma de peticiones.</li>
            <li><strong>Documentación:</strong> con una especificación completa se dedica el tiempo a probar, no a descubrir.</li>
          </ul>
          <h3>Ejemplos orientativos</h3>
          <p>Nuestros precios para alcances habituales (sin IVA, octubre de 2026). El precio final se cierra siempre en una propuesta.</p>
        </Section>
      </div>

      <ExampleTable label="Ejemplos de alcance y precio de auditoría de APIs" rows={examples} />

      <div className={`mt-4 ${prose}`}>
        <p>Si la API sirve a una web con zona privada, normalmente conviene auditarlas juntas: compartimos la preparación y el informe, y sale más barato que por separado. Lo explicamos en la <Link href="/guias/que-incluye-una-auditoria-de-seguridad-web" className={focus}>guía de auditoría web</Link>.</p>
      </div>
    </>
  );
}
