# Despliegue de prueba en Cloudflare Workers

Rama `cloudflare-workers` (2026-10-30). Prueba de **solo la web corporativa** en el plan gratuito de Workers con el adaptador OpenNext (`@opennextjs/cloudflare`). **No sustituye a Vercel**, no hay dominio propio ni cambios de DNS: solo el subdominio `statex.<cuenta>.workers.dev`. Desplegar requiere aprobación expresa.

## Qué se publica

Home, `/servicios/*`, `/guias/*`, páginas legales, `robots.txt` (`Disallow: /`), `sitemap.xml` (vacío), imagen OG y los informes de ejemplo de `public/`. Todo con `noindex` mientras `SITE_INDEXABLE` no sea `true`.

**No se publica** nada interno: `npm run cf:build` (`scripts/cf-build.mjs`) aparta `app/demo`, `app/preview` y `app/design-lab` durante el build y las restaura al terminar, así que ni su HTML ni su código (el comprobador de exposición incluido) llegan al Worker. Además, `proxy.ts` responde 404 a esas rutas en Workers. No ejecutar `cf:build` con `npm run dev` abierto.

**Formulario de contacto:** no se muestra mientras `CONTACT_FORM_ENABLED` no sea `true`. En su lugar, la sección de contacto dice que aún no está activo y enseña `company.email` solo si tiene valor (hoy es `null`, así que no hay alternativa). La Server Action responde "not-configured" sin procesar nada si falta la marca o las variables de Resend: nunca hay mensaje de éxito sin correo enviado.

## Archivos

- `wrangler.jsonc`: Worker `statex` en workers.dev, sin `routes` ni zona; flags `nodejs_compat` y `global_fetch_strictly_public`; `DEPLOY_TARGET=cloudflare` como marca explícita del runtime; `preview_urls` desactivado.
- `open-next.config.ts`: caché incremental de solo lectura sobre los assets (todo se genera en build, sin ISR): no hacen falta R2 ni KV.
- `app/_site/runtime.ts`: `onCloudflare()` (user agent del runtime o `DEPLOY_TARGET`) y `contactFormEnabled()`.
- `scripts/cf-build.mjs` y `scripts/cf-check-env.mjs`: build sin rutas internas y comprobación de secretos (ver Variables).
- `public/_headers`: `nosniff`, `Referrer-Policy` y `X-Frame-Options` para los assets estáticos, que no pasan por `next.config.ts`; caché inmutable para `/_next/static/*`.

## Variables

**OpenNext incrusta en el código del Worker el contenido de `.env`, `.env.production` y `.env.local`.** Por eso, al construir para Workers no debe haber secretos en esos archivos: `cf:build` falla si encuentra alguna variable que no sea `NEXT_PUBLIC_*`, `SITE_INDEXABLE` o `CONTACT_FORM_ENABLED`.

Las de build se exportan en la shell:

```bash
export NEXT_PUBLIC_SITE_URL=https://statex.<cuenta>.workers.dev   # canonical y Open Graph
export SITE_INDEXABLE=false
```

Sin `NEXT_PUBLIC_SITE_URL`, canonical y Open Graph apuntan a la URL de Vercel de reserva.

Resend no está configurado: no hay secretos que subir para la prueba. Cuando lo esté, `RESEND_API_KEY`, `CONTACT_TO` y `CONTACT_FROM` irán con `npx wrangler secret put <NOMBRE>`, y `CONTACT_FORM_ENABLED=true` tanto exportada al construir como en el Worker. `PREVIEW_USER` y `PREVIEW_PASSWORD` no aplican: las rutas internas no se despliegan. En local, los secretos van en `.dev.vars` (ignorado por git).

## Diferencias con Vercel

- **IP del cliente.** En Workers solo `cf-connecting-ip` es fiable; `app/actions/contact.ts` la usa cuando detecta el runtime.
- **Límite de envíos del formulario.** En memoria y por isolate: más débil que en Vercel. Para producción haría falta Rate Limiting de Cloudflare o un Durable Object.
- **Middleware.** OpenNext marca el middleware de Node.js como experimental. Probado en local: 404 en las rutas internas.
- **HSTS.** `next.config.ts` no la fija; `.dev` está en la lista de precarga HSTS, así que workers.dev siempre va por HTTPS.
- **Observability** activada: Cloudflare guarda URLs de petición y `console.error` (sin datos personales). Revisar retención y muestreo si se pasa a producción.

## Verificación (2026-10-30, local con `cf:preview`)

`typecheck` y `npm audit` limpios; `cf:build` sin errores ni secretos en el bundle (y falla si se añade uno a `.env.local`, probado). 200 en la home, las 3 páginas de servicio, las 3 guías, las legales, `robots.txt`, `sitemap.xml`, la imagen OG y el PDF de ejemplo; 404 en `/demo/*`, `/preview/*` y `/design-lab/*`. Cabeceras de seguridad presentes, `noindex` en la home y ningún `<form>` en la página. `npm run build` (Vercel) sigue incluyendo las rutas internas. Revisión del agente `security-reviewer` aplicada.

Pendiente tras el primer despliegue: comprobar lo mismo contra la URL real y que `/cdn-cgi/_next_cache/...` no sea accesible desde fuera (Cloudflare reserva `/cdn-cgi/` en el borde; en local no se emula).
