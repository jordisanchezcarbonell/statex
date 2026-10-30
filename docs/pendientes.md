# Pendientes internos (no se publican)

Lista viva de datos y decisiones que faltan. La web pública **no** muestra placeholders: si un dato
vale `null` en `app/_site/content.ts`, simplemente no aparece. Las páginas legales sí enseñan
`[Pendiente]` porque son borradores que no deben publicarse así.

Actualizado: 2026-10-26.

## Bloquean el lanzamiento

| Pendiente | Dónde se rellena | Efecto mientras falte |
|---|---|---|
| Buzón real del formulario (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` con dominio verificado) y después `CONTACT_FORM_ENABLED=true` | Variables de entorno en Vercel o secretos del Worker (ver `.env.example` y `docs/cloudflare-workers.md`) | No se muestra el formulario: la sección de contacto dice que aún no está activo (y da `company.email` si existe) |
| Correo corporativo | `company.email` en `app/_site/content.ts` | No aparece en el pie; las páginas legales muestran [Pendiente] |
| Titular persona física (nombre, NIF, domicilio en Barcelona): decidir cuál de los dos hermanos es el titular hasta crear sociedad | `company` en `app/_site/content.ts` (`kind: "persona-fisica"`) | Aviso legal y privacidad incompletos (obligatorio LSSI art. 10 y RGPD art. 13). No se muestra en la home, solo en las páginas legales |
| Revisión de una gestoría o un abogado de las páginas legales (ya adaptadas a persona física, fuero en Barcelona y conservación de 12 meses) | `app/aviso-legal`, `app/privacidad`, `app/cookies` | Borradores razonables, no revisados por un profesional |
| Alta como autónomo del titular antes de la primera factura, y revisar las cláusulas de exclusividad o no competencia de los contratos laborales actuales (sobre todo si el empleador presta servicios de seguridad) | Fuera de la web | Riesgo laboral y fiscal |
| Garantías de transferencia internacional de Resend (o elegir un proveedor de envío en la UE) | `app/privacidad/page.tsx` | [Por confirmar] visible en privacidad |
| Dominio definitivo | `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap y Open Graph apuntan a statex-two.vercel.app |
| Activar indexación | `SITE_INDEXABLE=true` (solo con aprobación expresa) | `noindex` global y `robots.txt` con `Disallow: /` |

## Marca (2026-10-26)

- **Elegir identidad** tras ver `/preview/statex`, `/preview/noxen` y `/preview/vantis` (recomendación: StateX; ver `docs/identidades-2026-10-26.md`).
- **Registrar `statexsecurity.com`**: el whois del 2026-10-26 indica que no está registrado aunque `.env.example` lo da como elegido.
- **Búsqueda formal de marcas** en EUIPO y OEPM (clases 9, 42, 35, 45): no se pudo consultar automáticamente.
- Previews públicas en Vercel (noindex) por decisión del 2026-10-26: Noxen y Vantis quedan visibles para quien tenga el enlace. Para cerrarlas, definir `PREVIEW_USER` y `PREVIEW_PASSWORD`.
- Evolución comercial integrada en `/` en la rama local `evolucion-home` (2026-10-26). Falta aprobarla, fusionarla en `main` y publicarla.

## Mejoran la credibilidad

- **Bios de los fundadores**: redactadas a partir de LinkedIn (2026-10-25). Revisar redacción. Decisiones abiertas:
  - ¿Nombrar empleadores (actuales o anteriores)? Hoy no se nombran por posibles conflictos con contratos vigentes.
  - CEH de Albert (emitida 10/2016): no se muestra hasta confirmar que está vigente (requiere renovación).
  - Titulaciones universitarias marcadas "en curso" en LinkedIn: no se mencionan.
  - Autoría de InfoStateX: confirmada: InfoStateX es de Albert y DoubleReboot de Jordi; ya en Trayectoria.
- **Primeras publicaciones de investigación** (2–3 notas fechadas y firmadas). Cuando existan, crear `/investigacion` y enlazarla desde la sección Trayectoria.
- **Informe de ejemplo publicado** (2026-10-25): `/informe-de-ejemplo.html` y PDF, y resumen de agencia de ejemplo. Generados desde `docs/plantillas` con `scripts/muestras-informe.py`.
- **`/.well-known/security.txt`**: ruta lista (`app/.well-known/security.txt/route.ts`, RFC 9116); se publica sola al rellenar `company.email` (hasta entonces, 404). Falta la **política de divulgación** (página propia) para añadir el campo `Policy`.
- **Clave PGP** o canal seguro para enviar detalles sensibles.

## Comerciales

- **Precios publicados, por debajo de PentestingTeam** (2026-10-25, `research/services-pricing.md` §9): evaluación inicial 290 €, exposición desde 390 €, API desde 690 €, web desde 990 €, ingeniería segura desde 790 € (sin IVA). Revisar tras 3–5 proyectos.
- **Compromisos publicados y confirmados** (2026-10-25): propuesta en 48 h laborables, aviso el mismo día ante hallazgos críticos, retest de críticos y altos durante 6 meses y NDA a petición.
- **Pack para agencias publicado**: 5 webs por 1.290 €, web adicional a 240 €, marca blanca opcional (`services-pricing.md` §10). Plantillas listas en `docs/plantillas/` (informe con marca blanca y resumen de agencia).
- **Seguro de responsabilidad civil profesional** y plantillas de autorización, reglas de intervención, NDA y acuerdo de encargo de tratamiento.

## Técnicos

- **Límite de envíos global del formulario.** El actual es en memoria por instancia (orientativo en serverless). Uno global requiere un almacén (Upstash, Vercel KV…): dependencia y servicio externo a aprobar.
- **Lint.** El proyecto no tiene ESLint configurado; añadirlo es una dependencia nueva (no hecho).
- **Guías publicadas** (2026-10-25): auditoría web, auditoría de APIs y cómo preparar la web. Siguientes candidatas, solo con contenido real: exposición externa explicada para no técnicos, seguridad en Next.js.
- **Medición sin trackers**: contar envíos del formulario en servidor si se quiere medir conversión.

## Servicio con agentes de IA (diseño 2026-10-26)

- **Diseño del servicio** en `docs/servicio-agentes-vulnerabilidades-2026-10-26.md` (interno, no publicar): pipeline de agentes para ampliar la cobertura de la evaluación, con revisión humana y autorización firmada como puerta. Para que exista de verdad: validarlo en un objetivo propio/laboratorio, elegir herramientas y aislamiento, plantillas legales que contemplen agentes de IA, seguro RC profesional y medir falsos positivos/negativos.
- **Demo interna del pipeline** en `/demo/agentes` (noindex, no en sitemap): muestra el flujo de 5 etapas con los hallazgos reales de auditar la propia web (2026-10-26). Para enseñar en reuniones; no es capacidad anunciada en la web pública. Scaffold de agentes ejecutable: pendiente (hoy el pipeline se ejecuta con el agente `security-reviewer`).
- **Comprobador pasivo de exposición** en `/demo/exposicion` (interno, noindex): pega una URL y lee en una petición las cabeceras de seguridad públicas (CSP, HSTS, clickjacking, nosniff, referrer, tecnología, security.txt). No prueba vulnerabilidades. Revisado por security-reviewer: anti-SSRF con IP fijada en la conexión (cierra DNS rebinding), rechazo de IPs privadas/reservadas e IPv6 especiales, redirecciones revalidadas, timeout global. **Desactivado por defecto**: solo funciona si `/demo` está protegido con `PREVIEW_USER`/`PREVIEW_PASSWORD` (evita quedar como proxy anónimo). Para una herramienta pública de captación haría falta un rate limit real (Vercel WAF o Upstash/KV) en vez del actual en memoria.
