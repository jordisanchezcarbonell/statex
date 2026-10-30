// Despliegue de prueba en Cloudflare Workers (docs/cloudflare-workers.md). Dos señales, cualquiera basta:
// el user agent del runtime y la variable DEPLOY_TARGET de wrangler.jsonc. Se evalúa en cada llamada
// porque en Workers process.env se rellena por petición.
export const onCloudflare = () =>
  (typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") || process.env.DEPLOY_TARGET === "cloudflare";

// El formulario solo se muestra si el envío está configurado (Resend). La home lo lee al construir;
// la Server Action vuelve a leerlo, junto con la clave, en cada envío.
export const contactFormEnabled = () => process.env.CONTACT_FORM_ENABLED === "true";
