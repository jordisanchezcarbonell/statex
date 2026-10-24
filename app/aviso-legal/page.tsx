import type { Metadata } from "next";
import { Company, LegalPage } from "../_legal/LegalPage";
import { Pending } from "../design-lab/h/ui";

export const metadata: Metadata = { title: "Aviso legal" };

// Información exigida por el art. 10 de la LSSI-CE. Borrador: revisar antes de publicar.
export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" updated="24 de octubre de 2026">
      <h2>Titular de la web</h2>
      <dl>
        <dt>Titular</dt>
        <dd><Company field="legalName" label="razón social o titular" /></dd>
        <dt>CIF / NIF</dt>
        <dd><Company field="taxId" label="CIF o NIF" /></dd>
        <dt>Domicilio</dt>
        <dd><Company field="address" label="domicilio" /></dd>
        <dt>Datos registrales</dt>
        <dd><Company field="registry" label="inscripción en el Registro Mercantil, si aplica" /></dd>
        <dt>Contacto</dt>
        <dd><Company field="email" label="correo corporativo" /></dd>
      </dl>

      <h2>Objeto</h2>
      <p>Esta web presenta los servicios de ciberseguridad de StateX y permite solicitar una conversación o una evaluación inicial. Usarla implica aceptar este aviso legal.</p>

      <h2>Uso de la web</h2>
      <p>Te comprometes a usar la web de forma lícita y a no intentar dañarla, alterarla ni acceder a partes no públicas. Si encuentras una vulnerabilidad en esta web, escríbenos al correo de contacto; agradecemos los avisos responsables.</p>

      <h2>Contenido y ejemplos</h2>
      <p>Los dominios, direcciones IP y hallazgos que aparecen en la web son ilustrativos (por ejemplo, <code>ejemplo.com</code> o rangos de documentación como <code>203.0.113.0/24</code>). No corresponden a clientes ni a sistemas reales.</p>
      <p>El contenido es informativo y no constituye un servicio ni un asesoramiento. Cada evaluación se realiza solo con autorización escrita y un alcance acordado.</p>

      <h2>Propiedad intelectual</h2>
      <p>Los textos, el diseño, el logotipo y el código de esta web pertenecen a su titular o se usan con licencia. No se permite reproducirlos con fines comerciales sin autorización.</p>

      <h2>Responsabilidad</h2>
      <p>Cuidamos que la información sea correcta y esté actualizada, pero no garantizamos que la web esté libre de errores ni disponible en todo momento. No respondemos del contenido de webs externas enlazadas.</p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso se rige por la legislación española. <Pending>[Pendiente: confirmar jurisdicción con asesoría legal]</Pending></p>
    </LegalPage>
  );
}
