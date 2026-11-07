import { issueContactToken } from "../../_site/contactToken";

// Emite el token de tiempo firmado del formulario de contacto. El navegador lo pide al montar el
// formulario y lo reenvía en el envío; así el instante no lo controla el cliente.
// force-dynamic + no-store: cada petición obtiene un token nuevo y no se cachea en el CDN.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  const token = issueContactToken();
  const headers = { "Cache-Control": "no-store" };
  if (!token) return Response.json({ token: null }, { status: 503, headers });
  return Response.json({ token }, { headers });
}
