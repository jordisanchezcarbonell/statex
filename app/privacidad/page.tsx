import type { Metadata } from "next";
import { Company, LegalPage } from "../_legal/LegalPage";
import { Pending } from "../_site/ui";

export const metadata: Metadata = { title: "Política de privacidad" };

// Información del art. 13 RGPD para el formulario de contacto. Borrador: revisar antes de publicar.
export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated="25 de octubre de 2026">
      <p>Esta web solo recoge datos personales cuando nos escribes a través del formulario de contacto o por correo. No usa analítica, publicidad ni seguimiento.</p>

      <h2>Responsable del tratamiento</h2>
      <dl>
        <dt>Responsable</dt>
        <dd><Company field="legalName" label="nombre y apellidos del titular" /> (nombre comercial: StateX)</dd>
        <dt>NIF</dt>
        <dd><Company field="taxId" label="NIF" /></dd>
        <dt>Domicilio</dt>
        <dd><Company field="address" label="domicilio" /></dd>
        <dt>Contacto</dt>
        <dd><Company field="email" label="correo corporativo" /></dd>
      </dl>

      <h2>Qué datos tratamos</h2>
      <p>Los que nos das en el formulario: nombre, empresa, email de trabajo, cargo (opcional), el tipo de consulta y tu mensaje. No pidas ni envíes por este medio credenciales, datos de clientes ni detalles de vulnerabilidades sin acordar antes un canal seguro.</p>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Responder a tu solicitud.</li>
        <li>Si nos lo pides, preparar una propuesta o una evaluación inicial.</li>
      </ul>
      <p>No los usamos para enviarte comunicaciones comerciales ni para crear perfiles.</p>

      <h2>Base legal</h2>
      <p>La aplicación de medidas precontractuales a petición tuya, es decir, responder a tu solicitud y, si lo pides, preparar una propuesta (art. 6.1.b RGPD). La casilla del formulario recoge además tu consentimiento expreso para ese uso (art. 6.1.a RGPD), que puedes retirar cuando quieras.</p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>El tiempo necesario para atender tu solicitud. Si no llega a haber relación comercial, los borramos como máximo <strong>12 meses</strong> después de nuestra última comunicación. Si nos contratas, los conservamos mientras dure la relación y, después, durante los plazos que exige la ley para la documentación contable y fiscal; pasado ese tiempo, los eliminamos.</p>

      <h2>Quién más accede</h2>
      <p>No cedemos tus datos a terceros. Para que la web funcione usamos proveedores que los tratan por cuenta nuestra (encargados del tratamiento):</p>
      <ul>
        <li>Vercel, alojamiento de la web.</li>
        <li>Resend, envío del formulario por correo electrónico.</li>
        <li><Pending>[Pendiente: proveedor del buzón de correo corporativo]</Pending></li>
      </ul>
      <p>Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, con las garantías que exige el RGPD. <Pending>[Por confirmar: garantías de transferencia de cada proveedor]</Pending></p>

      <h2>Tus derechos</h2>
      <p>Puedes pedir acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos escribiendo a <Company field="email" label="correo corporativo" />. Si crees que no los hemos tratado bien, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener noreferrer">aepd.es</a>).</p>

      <h2>Registros técnicos</h2>
      <p>Como cualquier servidor web, el alojamiento registra datos técnicos de las visitas (por ejemplo, la dirección IP) para el funcionamiento y la seguridad del servicio. No los usamos para identificarte.</p>
    </LegalPage>
  );
}
