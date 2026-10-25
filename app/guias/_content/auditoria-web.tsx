import Link from "next/link";
import { focus } from "../../_site/ui";
import { ExampleTable, Section, prose } from "./shared";

const examples = [
  { scope: "Web corporativa sin zona privada", work: "Exposición externa y revisión de la web pública", days: "0,5 días", price: "290 € (evaluación inicial)" },
  { scope: "API pequeña", work: "Hasta 15 endpoints, autenticación y autorización", days: "1–1,5 días", price: "desde 690 €" },
  { scope: "Web con zona privada", work: "Hasta 10 pantallas y un rol de usuario", days: "1,5–2 días", price: "desde 990 €" },
  { scope: "Tienda online con panel de gestión", work: "Cliente y administrador, pagos, pedidos y cupones", days: "3–4 días", price: "1.800–2.400 €" },
  { scope: "SaaS B2B", work: "Web y API (≈40 endpoints), 3 roles, varias empresas cliente", days: "5–7 días", price: "3.000–4.200 €" },
];

export function WebAuditGuide() {
  return (
    <>
    <div className={prose}>
      <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.6] text-(--h-ivory)">
        Si estás pidiendo presupuestos para auditar la seguridad de tu web, verás precios que van de unos cientos a varios miles de euros por lo que parece el mismo servicio. No lo es. Esta guía explica qué debería incluir una auditoría, qué tienes que recibir al final y qué factores hacen que cueste más o menos.
      </p>

      <Section id="g-que-es" title="Qué es (y qué no es) una auditoría de seguridad web">
        <p>Una auditoría de seguridad web, también llamada pentest web o prueba de penetración, es una revisión en la que alguien intenta, con tu permiso, hacer con tu aplicación lo que no debería poder hacerse: ver datos de otro usuario, saltarse un pago, convertirse en administrador o acceder a lo que no está publicado.</p>
        <p><strong>No es un escáner automático.</strong> Los escáneres son útiles para encontrar versiones antiguas o configuraciones conocidas, pero generan falsos positivos y no entienden tu negocio. No saben, por ejemplo, que un usuario de la empresa A no debería ver las facturas de la empresa B. Esos fallos de autorización y de lógica de negocio son de los más graves y solo los encuentra una persona.</p>
        <p>Una auditoría seria combina herramientas con pruebas manuales y <strong>verifica cada hallazgo</strong> antes de incluirlo en el informe.</p>
      </Section>

      <Section id="g-incluye" title="Qué revisa">
        <p>El marco de referencia más usado es la guía de pruebas de OWASP (OWASP WSTG) y, para APIs, el OWASP API Security Top 10 (lo explicamos en <Link href="/guias/que-incluye-una-auditoria-de-seguridad-de-apis" className={focus}>la guía de auditoría de APIs</Link>). En la práctica, una auditoría de una web con zona privada revisa como mínimo:</p>
        <ul>
          <li><strong>Autenticación:</strong> registro, inicio de sesión, recuperación de contraseña, sesiones, doble factor.</li>
          <li><strong>Autorización:</strong> que cada usuario solo vea y modifique lo suyo, y que un rol básico no pueda hacer cosas de administrador.</li>
          <li><strong>Exposición de datos:</strong> información de más en respuestas, errores, ficheros o copias de seguridad accesibles.</li>
          <li><strong>Validación de entradas:</strong> inyecciones (SQL, comandos, plantillas), XSS y subida de ficheros.</li>
          <li><strong>Lógica de negocio:</strong> precios, cupones, límites, flujos que se pueden saltar o repetir.</li>
          <li><strong>Configuración:</strong> cabeceras de seguridad, TLS, CORS, cookies, paneles y entornos de pruebas expuestos.</li>
          <li><strong>Dependencias e integraciones:</strong> librerías con vulnerabilidades conocidas, webhooks, claves de terceros.</li>
        </ul>
        <h3>Qué no suele incluir (salvo que se pida)</h3>
        <ul>
          <li>Pruebas de denegación de servicio.</li>
          <li>Ingeniería social, phishing o acceso físico.</li>
          <li>La red interna de la oficina, el Active Directory o las aplicaciones móviles.</li>
          <li>Revisión completa del código fuente (se puede añadir de forma focalizada).</li>
          <li>Una certificación de cumplimiento (ISO 27001, ENS, NIS2). Una auditoría técnica aporta evidencias, pero no certifica.</li>
        </ul>
      </Section>

      <Section id="g-entregables" title="Qué deberías recibir">
        <ol>
          <li><strong>Resumen ejecutivo</strong> para dirección: qué se ha probado, qué riesgo hay y qué decisión hay que tomar, sin jerga.</li>
          <li><strong>Inventario de hallazgos</strong> con severidad y prioridad de corrección.</li>
          <li><strong>Evidencias reproducibles</strong> de cada hallazgo: la petición, la respuesta y los pasos para repetirlo. Sin evidencia, tu equipo no puede comprobarlo.</li>
          <li><strong>Impacto</strong> explicado en términos de tu negocio, no solo una puntuación.</li>
          <li><strong>Recomendaciones concretas</strong> para tu tecnología, no un enlace genérico.</li>
          <li><strong>Sesión de resultados</strong> con tu equipo técnico.</li>
          <li><strong>Retest:</strong> una comprobación posterior de que lo corregido está bien corregido.</li>
        </ol>
        <p>Pide siempre un <strong>informe de ejemplo</strong> antes de contratar. Puedes ver <a href="/informe-de-ejemplo.html" className={focus}>nuestro informe de ejemplo completo</a>, con datos ficticios, o <a href="/informe-de-ejemplo.pdf" download className={focus}>descargarlo en PDF</a>.</p>
      </Section>

      <Section id="g-precio" title="De qué depende el precio">
        <p>Casi todos los proveedores calculan el precio a partir de los <strong>días de trabajo</strong> que necesita el alcance. Lo que más mueve esa cifra:</p>
        <ul>
          <li><strong>Tamaño funcional:</strong> número de pantallas, formularios y funcionalidades con lógica propia.</li>
          <li><strong>Roles de usuario:</strong> cada rol (cliente, gestor, administrador…) multiplica las combinaciones de permisos que hay que probar.</li>
          <li><strong>Endpoints de API:</strong> en aplicaciones modernas, la API es donde está la mayor parte del riesgo.</li>
          <li><strong>Multiempresa:</strong> si varias empresas cliente comparten la plataforma, hay que probar a fondo el aislamiento entre ellas.</li>
          <li><strong>Autenticación compleja:</strong> SSO, doble factor u OAuth con terceros.</li>
          <li><strong>Integraciones:</strong> pagos, webhooks, almacenamiento de ficheros, proveedores externos.</li>
          <li><strong>Entorno:</strong> con un entorno de preproducción se puede probar con más profundidad y menos riesgo que en producción.</li>
          <li><strong>Retest y urgencia:</strong> si el retest está incluido o se cobra aparte, y si hay que hacerlo con plazos muy cortos.</li>
        </ul>
        <h3>Ejemplos orientativos</h3>
        <p>Para que te hagas una idea, estos son nuestros precios para alcances habituales (sin IVA, octubre de 2026). El precio final siempre se cierra en una propuesta.</p>
      </Section>
    </div>

    <ExampleTable label="Ejemplos de alcance y precio" rows={examples} />

    <div className={`mt-4 ${prose}`}>
      <p>Si eres una agencia con varias webs de clientes, tenemos un pack de 5 webs por 1.290 € (240 € cada web adicional) que revisa la exposición externa y la parte pública de cada una.</p>

      <Section id="g-preparar" title="Qué tienes que preparar">
        <ul>
          <li><strong>Autorización por escrito</strong> del titular de los sistemas. Si la web es de un cliente tuyo, la firma él. Auditar sin autorización es delito.</li>
          <li><strong>El alcance:</strong> dominios, aplicaciones y APIs que entran, y lo que queda fuera.</li>
          <li><strong>Cuentas de prueba</strong> para cada rol, a ser posible en un entorno de preproducción. Tienes la lista completa en <Link href="/guias/como-preparar-tu-web-para-una-auditoria-de-seguridad" className={focus}>cómo preparar tu web para una auditoría</Link>.</li>
          <li><strong>Una persona de contacto técnica</strong> y una ventana horaria para las pruebas que puedan afectar al servicio.</li>
        </ul>
        <p>No envíes nunca contraseñas reales ni datos de clientes por formulario o correo sin cifrar.</p>
      </Section>

      <Section id="g-comparar" title="Cómo comparar presupuestos">
        <p>Antes de elegir solo por precio, haz estas preguntas a cualquier proveedor, también a nosotros:</p>
        <ol>
          <li>¿Qué incluye exactamente el precio? ¿Cuántos roles, pantallas o endpoints?</li>
          <li>¿Las pruebas son manuales o es un escaneo automático con informe?</li>
          <li>¿Verificáis cada hallazgo antes de incluirlo?</li>
          <li>¿El retest está incluido? ¿Durante cuánto tiempo?</li>
          <li>¿Quién hace el trabajo: la persona con la que hablo o un tercero?</li>
          <li>¿Me podéis enseñar un informe de ejemplo?</li>
          <li>¿Qué pasa si encontráis algo crítico a mitad de la auditoría?</li>
        </ol>
      </Section>

      <Section id="g-cuando" title="Cuándo tiene sentido hacerla">
        <ul>
          <li>Antes de lanzar una aplicación o una versión con cambios importantes.</li>
          <li>Cuando un cliente grande te pide evidencias de seguridad o un cuestionario.</li>
          <li>Antes de una due diligence o una ronda de inversión.</li>
          <li>Tras un incidente, una migración o la integración de un proveedor nuevo.</li>
          <li>De forma periódica, si la aplicación cambia a menudo.</li>
        </ul>
      </Section>
    </div>

    </>
  );
}
