# Pendientes internos (no se publican)

Lista viva de datos y decisiones que faltan. La web pública **no** muestra placeholders: si un dato
vale `null` en `app/_site/content.ts`, simplemente no aparece. Las páginas legales sí enseñan
`[Pendiente]` porque son borradores que no deben publicarse así.

Actualizado: 2026-10-25.

## Bloquean el lanzamiento

| Pendiente | Dónde se rellena | Efecto mientras falte |
|---|---|---|
| Buzón real del formulario (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` con dominio verificado) | Variables de entorno en Vercel (ver `.env.example`) | El formulario dice "todavía no está activo" y no envía nada |
| Correo corporativo | `company.email` en `app/_site/content.ts` | No aparece en el pie; las páginas legales muestran [Pendiente] |
| Titular persona física (nombre, NIF, domicilio en Barcelona): decidir cuál de los dos hermanos es el titular hasta crear sociedad | `company` en `app/_site/content.ts` (`kind: "persona-fisica"`) | Aviso legal y privacidad incompletos (obligatorio LSSI art. 10 y RGPD art. 13). No se muestra en la home, solo en las páginas legales |
| Revisión de una gestoría o un abogado de las páginas legales (ya adaptadas a persona física, fuero en Barcelona y conservación de 12 meses) | `app/aviso-legal`, `app/privacidad`, `app/cookies` | Borradores razonables, no revisados por un profesional |
| Alta como autónomo del titular antes de la primera factura, y revisar las cláusulas de exclusividad o no competencia de los contratos laborales actuales (sobre todo si el empleador presta servicios de seguridad) | Fuera de la web | Riesgo laboral y fiscal |
| Garantías de transferencia internacional de Resend (o elegir un proveedor de envío en la UE) | `app/privacidad/page.tsx` | [Por confirmar] visible en privacidad |
| Dominio definitivo | `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap y Open Graph apuntan a statex-two.vercel.app |
| Activar indexación | `SITE_INDEXABLE=true` (solo con aprobación expresa) | `noindex` global y `robots.txt` con `Disallow: /` |

## Mejoran la credibilidad

- **Bios de los fundadores**: redactadas a partir de LinkedIn (2026-10-25). Revisar redacción. Decisiones abiertas:
  - ¿Nombrar empleadores (actuales o anteriores)? Hoy no se nombran por posibles conflictos con contratos vigentes.
  - CEH de Albert (emitida 10/2016): no se muestra hasta confirmar que está vigente (requiere renovación).
  - Titulaciones universitarias marcadas "en curso" en LinkedIn: no se mencionan.
  - Autoría de InfoStateX: confirmada: InfoStateX es de Albert y DoubleReboot de Jordi; ya en Trayectoria.
- **Primeras publicaciones de investigación** (2–3 notas fechadas y firmadas). Cuando existan, crear `/investigacion` y enlazarla desde la sección Trayectoria.
- **Informe de ejemplo completo en PDF** (sobre `ejemplo.com` y rangos de documentación). Conversión secundaria.
- **`/.well-known/security.txt`** y política de divulgación: necesitan el correo corporativo.
- **Clave PGP** o canal seguro para enviar detalles sensibles.

## Comerciales

- **Precios publicados, por debajo de PentestingTeam** (2026-10-25, `research/services-pricing.md` §9): evaluación inicial 290 €, exposición desde 390 €, API desde 690 €, web desde 990 €, ingeniería segura desde 790 € (sin IVA). Revisar tras 3–5 proyectos.
- **Compromisos publicados y confirmados** (2026-10-25): propuesta en 48 h laborables, aviso el mismo día ante hallazgos críticos, retest de críticos y altos durante 6 meses y NDA a petición.
- **Pack para agencias publicado**: 5 webs por 1.290 €, web adicional a 240 €, marca blanca opcional (`services-pricing.md` §10). Preparad una plantilla de informe con la marca de la agencia.
- **Seguro de responsabilidad civil profesional** y plantillas de autorización, reglas de intervención, NDA y acuerdo de encargo de tratamiento.

## Técnicos

- **Límite de envíos global del formulario.** El actual es en memoria por instancia (orientativo en serverless). Uno global requiere un almacén (Upstash, Vercel KV…): dependencia y servicio externo a aprobar.
- **Lint.** El proyecto no tiene ESLint configurado; añadirlo es una dependencia nueva (no hecho).
- **Más guías**: "Qué incluye una auditoría de seguridad de APIs" y "Cómo preparar tu web antes de una auditoría". Cada una solo con contenido real (`guides` en `app/_site/content.ts`).
- **Medición sin trackers**: contar envíos del formulario en servidor si se quiere medir conversión.
