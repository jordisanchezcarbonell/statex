import { company, site } from "../../_site/content";

// security.txt (RFC 9116): dónde avisarnos si alguien encuentra un fallo en esta web.
// Solo se publica cuando existe el correo de contacto (company.email); mientras tanto, 404.
export const dynamic = "force-static";

export function GET() {
  if (!company.email) return new Response("Not found", { status: 404 });
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // se renueva en cada despliegue
  const body = [
    `Contact: mailto:${company.email}`,
    `Expires: ${expires}`,
    "Preferred-Languages: es, en",
    `Canonical: ${site.url}/.well-known/security.txt`,
    // Policy: se añadirá cuando exista la política de divulgación (docs/pendientes.md)
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
