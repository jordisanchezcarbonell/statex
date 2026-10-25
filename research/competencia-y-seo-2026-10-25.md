# Competencia española y SEO para StateX

Fecha de consulta: **2026-10-25** (todas las URLs). Complementa `cybersecurity-competitors.md` (24-10), sin repetir lo que ya cubre.
Método: lectura de páginas públicas con curl, WebFetch y, cuando la web bloqueaba el acceso automatizado, el navegador. No se hizo ningún escaneo ni prueba técnica.
Leyenda: **V** = verificado en la URL citada. **I** = inferencia propia. Los precios, cifras y nombres de clientes que aparecen son **los que publica cada firma**. No los he contrastado.

---

## 1. S21sec (obligatorio)

Fuentes: https://www.s21sec.com/es/ · https://www.thalesgroup.com/en/cybersecurity/cybersecurity-services · https://www.thalesgroup.com/es/news-centre/press-releases/thales-cierra-la-adquisicion-de-los-lideres-en-ciberseguridad-s21sec-y

- **V** — `s21sec.com` tiene un muro anti-bot (devuelve HTTP 247 y un challenge JS, también en archive.org). En el navegador, **`/es/` redirige a "Cybersecurity services | Thales Group"**, en inglés. La marca S21sec ya no tiene web propia de servicios.
- **V** — Thales completó la compra de S21sec y Excellium en octubre de 2022. El comunicado de prensa habla de unos 400 empleados en 9 centros de España y Portugal.
- **V (página de Thales)** — Hero: "Cybersecurity services", con foco en infraestructura crítica. Cifras: "148" países, "8" SOC, "400" clientes. Tres líneas de servicio: consultoría, detección y respuesta, e integración. Contenidos de IA, PQC y sectores (aerolíneas, utilities, finanzas…). CTAs: "Explore our solutions catalog" y "Contact us". Hay un banner de cookies de terceros (YouTube).
- **No verificado:** si mantiene un servicio de pentesting web con página propia en España. La única referencia encontrada es una copia antigua de terceros.
- **I** — S21sec ya no compite por el mismo comprador que StateX. Se ha convertido en un MSSP corporativo para infraestructura crítica, con mensaje global en inglés. Lo que deja en el mercado es una **marca histórica española que ya no habla a la pyme tecnológica**.

## 2. Firmas españolas de seguridad ofensiva y AppSec

### 2.1 Zerolynx (Madrid) — https://zerolynx.com/ · https://zerolynx.com/pages/alcance
- **V — Propuesta:** H1 "La Élite de la Ciberseguridad". Ayudan a "anticiparse a los riesgos… y tomar el control de su ciberresiliencia".
- **V — Servicios:** Offensive y Defensive Security, Application Security, GRC, Forensics e "IA aplicada a Ciberseguridad". También tienen formación (TrainIA) y herramientas de autodiagnóstico gratuitas.
- **V — Credibilidad:** "8 años innovando" (desde 2018), "mejor empresa de Seguridad TIC de España y top 10 de Europa", "más de 50 profesionales", ISO 27001, PYME Innovadora, blog técnico Flu-Project, libros, y un fundador que se presenta ligado a Informática 64. Destacan la IA "soberana": modelos propios sin enviar datos a APIs públicas.
- **V — Conversión:** "Hablemos", "Probar gratis" (autodiagnóstico), "Enviar alcance" ("Respuesta en 24h", "sin formularios infinitos"). La página `/pages/alcance` ofrece tres vías: pack estándar, servicio a medida (**firmar un NDA antes de enviar el alcance**) o RFP. Tiene 13 fichas de alcance: Pentest Web, API, Código Fuente, DevSecOps, entre otras. Ecommerce con carrito ("Gestionar presupuesto") y un programa de distribuidores. Usa Google Tag Manager.
- **V — Visual:** web Shopify con mucho contenido, banners por bloques y PDF "Security Portfolio 2026".
- **I — Diferenciación:** es un "portfolio 360°" con canal de distribución y productización (packs y carrito). El NDA previo al alcance es una buena idea. El tono superlativo ("Élite") es justo lo que StateX debe evitar.

### 2.2 Internet Security Auditors (Barcelona y Madrid) — https://www.isecauditors.com/ · https://www.isecauditors.com/auditoria-de-aplicacion-web
- **V — Propuesta:** "proveedor global de servicios de ciberseguridad". La home tiene H1 por línea (Auditoría, Consultoría, Seguridad Gestionada, Ciberinteligencia). Dirección en E-08030 Barcelona y E-28043 Madrid.
- **V — Servicios:** catálogo muy amplio. Incluye páginas propias para Auditoría de Aplicación Web, **Auditoría de API**, Aplicación Móvil y Código Fuente, además de PCI (DSS, PIN, 3DS…), ISO 27001/42001, ENS, NIS2, CRA, DORA y formación oficial (ISC2, OffSec, ISACA).
- **V — Credibilidad:** "Trofeo a la Empresa" de la revista Red Seguridad, certificación ENS, sección de **Advisories** y muchos testimonios con nombre y cargo (CISO, CFO, CEO).
- **V — Página de servicio web:** H1 "Auditoría de Aplicación Web". Describe fases (estudio, análisis, diseño de pruebas, ejecución) y un enfoque de caja negra ("en ningún momento se audita el código fuente"). Algunos ejemplos están anticuados (Applets, ActiveX).
- **V — Formulario:** nombre*, apellidos*, teléfono*, email corporativo*, empresa*, país* (desplegable de unos 250 países), comunidad autónoma, aceptación de privacidad*, newsletter opcional y reCAPTCHA v3. Usa GTM y HubSpot.
- **I** — Es el incumbente de Barcelona en PCI y cumplimiento. Su copy técnico envejecido y su formulario pesado son el contraste para StateX: copy actual sobre APIs, SPA y auth moderna, y un formulario corto.

### 2.3 PentestingTeam (marca de Legitec) — https://pentestingteam.com/ · https://pentestingteam.com/pentesting/barcelona
- **V — Propuesta:** H1 "Empresa de ciberseguridad y pentesting". Frase central: "Auditamos a mano, no con un escáner… te entregamos el camino exacto para cerrarla, con la evidencia".
- **V — Servicios con precio "Desde":** web 1.140 €, APIs 760 €, superficie externa 450 €, móvil 1.140 €, infraestructura interna 1.520 €. Cada ficha cita su marco (OWASP WSTG, API Top 10, MASTG).
- **V — Método publicado:** "Seis pasos. Sin desviaciones." Kick-Off (30 min), Plan firmado, Auditoría, Informe técnico, Presentación a dirección y **Retest hasta 6 meses**. Incluye una tabla "La mayoría del mercado vs nosotros" de 8 filas y un bloque de normativa (ISO 27001 A.8.8/A.8.29, ENS, NIS2, DORA, PCI 11.4, RGPD art. 32) con FAQ.
- **V — Credibilidad:** "300 auditorías", "120 empresas" y "4,9 · +60 reseñas verificadas en Google", aunque **las reseñas son de la ficha de Legitec**, como ellos mismos indican. Muestran logos de acreditaciones del equipo.
- **V — Conversión:** "Solicitar auditoría" y "alcance y presupuesto cerrado en menos de 24 horas". Ofrecen videollamada, email y teléfono (+34 968…, prefijo de Murcia). Formulario: nombre*, empresa, email*, servicio (desplegable) y "Cuéntanos qué quieres proteger*", con placeholder "Web, API, red interna, cumplimiento NIS2…".
- **V — SEO local:** `/pentesting/barcelona` es una **landing por ciudad generada con plantilla**. H1 "Pentesting en Barcelona" y FAQ sobre Tarragona y Girona. El copy tiene costuras de la plantilla, por ejemplo "tu empresa de la tecnología y las startups".
- **I** — Es **el competidor más parecido a lo que StateX quería decir**: manual frente a escáner, proceso con entregables, retest, normativa como contexto y CTA concreto. Esos mensajes ya no bastan para diferenciarse. Su punto débil es la amplitud (de M365 a Active Directory) y el localismo artificial.

### 2.4 Hard2bit (Madrid, con páginas para Barcelona) — https://hard2bit.com/servicios/pentesting-barcelona/ · https://hard2bit.com/servicios/auditoria-seguridad-api/
- **V** (vía navegador; curl y WebFetch devuelven 403) — H1 "Pentesting en Barcelona: auditoría técnica con criterio regulatorio". CTAs "Solicitar propuesta", "Solicitar valoración" y "Llamar al 910…" (número de Madrid). Muestra la insignia "Certificación ENS categoría ALTA". Tiene bloques sectoriales **en catalán** (e-commerce i retail).
- **V (fragmento de búsqueda)** — La página de API cubre OWASP API Top 10 (2023), ASVS y CVSS 4.0, BOLA/BFLA, JWT/OAuth/mTLS y "lógica de negocio". Publica una guía "¿Cuánto cuesta un pentesting en España?" (2026), que posiciona bien.
- **I** — Combina normativa, sectores y ciudad. Es fuerte en SEO con contenido largo y guías de precio. Su "criterio regulatorio" apunta al responsable de cumplimiento, no al CTO de un SaaS.

### 2.5 Barcelona, firmas no boutique (referencia breve)
- **A2SECURE** (https://www.a2secure.com/, Barcelona y Madrid) — **V:** "Where people make cyber" y "pure player de ciberseguridad" para sectores regulados. Ofrece MSSP/SOC 24/7, GRC y pentesting dentro de "Threat Intelligence & Exposure Management". Credibilidad: Gartner Market Guide, casos de éxito y whitepapers. CTA "Calcula tu nivel de ciberseguridad". Usa GTM y HubSpot.
- **Ackcent** (https://ackcent.com/) — **V:** H1 "Facing the unpredictable", con "Resilient MDR" como producto principal y Exposure, Advisory y Training. Muestra ENS Alta, ISO 27001, Gartner, "97% Loyalty" y unos 11 testimonios con nombre. CTAs "Get an Assessment" y "Start now". Usa Cookiebot, GTM y HubSpot. **I:** se sitúa en Barcelona por los testimonios de empresas catalanas, pero no lo verifiqué en una dirección.
- **Hispasec** (https://hispasec.com/en/home) — **V:** H1 "History & Passion for Cybersecurity", "over 25 years", con Audits, SOC y AI Solutions y una sección "Community" (una-al-día). Abre en inglés por defecto. Usa Cookiebot y GTM.
- **Descartadas:** Dreamlab (suiza, Berna, con negocio de auditoría en LatAm fusionado con SEK en 2025, sin foco en España), Tarlogic (sin novedades relevantes respecto al 24-10) y DeepStrike (su landing de Barcelona aparece en buscadores, pero la URL devolvió 404 al fetch). Según un fragmento de búsqueda **no verificado**, la landing de DeepStrike apunta a SaaS de Barcelona y dice que la auditoría suele llegar por una ronda de inversión, un cliente corporativo o una pasarela de pago.

### Patrones observados (I, salvo indicación)
1. **Todas las consultadas cargan GTM o HubSpot (V)**, salvo PentestingTeam, donde no detecté estos scripts. Una web de seguridad sin trackers sigue siendo rara.
2. La credibilidad viene de **cifras, sellos (ENS/ISO), premios, Gartner y testimonios**. Nadie publica un **informe de ejemplo** ni un **hallazgo ilustrativo** completo.
3. "Manual, no escáner", el retest y "respuesta en 24 h" se están convirtiendo en **lo mínimo esperable** en el segmento pyme (PentestingTeam, Zerolynx).
4. Nadie se dirige al **CTO de un SaaS o al responsable técnico de una agencia** con su propio lenguaje (multi-tenant, roles, CI/CD, due diligence de clientes enterprise). Se habla al CISO o al responsable de cumplimiento.
5. Ninguna ofrece **ingeniería**: ayudar a corregir, PR de fix o revisión del arreglo. Todo termina en el informe y el retest.

---

## 3. SEO: qué aparece en cada búsqueda

**Limitación:** la herramienta de búsqueda no está geolocalizada en España, así que los resultados **no son un SERP real de Google.es**. Indican tipos de página, no posiciones. **No hay datos de volumen de búsqueda.** No dispongo de Keyword Planner, Semrush ni Search Console, y no se ha inventado ninguna cifra.

| Búsqueda | Qué aparece | Intención dominante |
|---|---|---|
| auditoría de seguridad web | Guías largas de hosting y vendors (Hostinger, SentinelOne, Seahawk, Arsys), TFM académicos y una página OWASP de Crowe | **Informativa / DIY** ("cómo hacer"). Para vender hace falta una página de servicio que capte al lector que ve que no puede hacerlo solo |
| auditoría de seguridad de APIs | Glosarios de vendors (Akamai, SentinelOne), TFM de la UCM y **una página de servicio española (Hard2bit)** | Mixta, entre definir y contratar. **Poca competencia de servicio en español** (I) |
| consultoría de ciberseguridad (España) | Prensa sectorial, artículos de mercado y blogs de proveedores | Informativa o corporativa, de término amplio y ambiguo. **Poco útil** para StateX (I) |
| seguridad de aplicaciones web | Productos (WAF/CDN de Rackspace y Fastly, IAST/RASP de Hdiv) y blogs | Informativa o de producto. Busca **herramientas**, no consultoría |
| pentesting web (España) | Rankings y listicles (DeepStrike), empleo y formación (Indeed, KeepCoding, INCIBE), guía de precios (Hard2bit) y licitaciones TED | Mezcla de carrera, comparación y precio. La guía de precios es la página comercial que mejor capta (I) |
| revisión de seguridad de aplicaciones | Documentación en inglés (AWS Well-Architected, glosarios) y casi nada español | Término **poco usado en España** en sentido comercial (I). Útil como sinónimo dentro de la página, no como slug |
| auditoría de seguridad web Barcelona | Mucho ruido (FC Barcelona, TFG de la UOC/UAB, directorios mercantiles) y landing de DeepStrike | La variante local **apenas tiene páginas de servicio fuertes** (I) |
| pentesting Barcelona / API Barcelona | **Landings por ciudad**: Hard2bit, PentestingTeam, BCNSoluciona, DeepStrike, Keliam, y el directorio "7 mejores empresas de ciberseguridad en Barcelona" (zonaseguridad.es) | **Transaccional local**. Compiten landings con plantilla y directorios |
| consultoría ciberseguridad Barcelona | Ofertas de empleo (EY, InfoJobs), MSP locales, S2 Grupo y registros mercantiles | Ambigua, muy contaminada por empleo |

**I — Conclusiones SEO**
- La palabra **"pentesting"** tiene intención comercial. **"Auditoría de seguridad web"** es sobre todo informativa. **"Seguridad de aplicaciones web"** va a producto. Conviene titular con "Auditoría/Pentesting" y explicar "seguridad de aplicaciones" en el cuerpo.
- **APIs en español es el hueco más claro:** pocas páginas de servicio dedicadas y la mayoría son glosarios en inglés traducidos.
- La página que mejor capta tráfico comercial es la **guía de precio o alcance** ("cuánto cuesta / qué incluye"). StateX puede publicar una sin dar cifras inventadas, explicando de qué depende el alcance.
- Para lo local, mejor **una sola página de Barcelona con contenido real** (presencial, horario, ecosistema 22@/startups) que landings por ciudad con plantilla, que ya están saturadas.

---

## 4. Oportunidades de diferenciación para StateX

1. **Hablar al CTO de un SaaS, no al CISO de una corporación.** Usar su lenguaje: multi-tenant y aislamiento entre clientes, roles y permisos (BOLA/IDOR), OAuth/JWT, CI/CD, entornos de preproducción. Ningún competidor consultado lo hace como mensaje principal.
2. **Detonantes de compra explícitos.** "Te lo pide un cliente enterprise", "due diligence de una ronda", "cuestionario de seguridad de un comprador", "vas a integrar pagos". Para cada uno, explicar qué entregar (informe completo frente a carta resumen compartible sin detalles explotables).
3. **Corregir, no solo encontrar.** Es el diferencial real del perfil de ingeniería: propuesta de fix, revisión del PR de corrección y verificación. Ningún competidor ofrece más que retest. Es el ángulo "ingeniería de software segura" que nadie ocupa.
4. **Línea específica para agencias digitales.** Revisión antes de entregar la web o la app al cliente, informe con marca blanca o compartible y acuerdo marco por proyecto. Zerolynx tiene distribuidores, pero no un producto pensado para agencias.
5. **Informe de ejemplo público y hallazgo ilustrativo completo** (sobre `ejemplo.com`, con rangos `192.0.2.0/24` y `203.0.113.0/24`). Sigue sin hacerlo nadie en España (ya figuraba en el documento del 24-10). Ahora es más necesario, porque "manual, no escáner" ya lo dice todo el mundo.
6. **Web sin trackers, como prueba.** Frente a GTM/HubSpot/Cookiebot en casi todas, sin cookies de terceros, con `security.txt`, cabeceras y política de divulgación. Decirlo en una línea y que se pueda comprobar.
7. **Formulario de alcance mínimo y NDA opcional desde el inicio.** Tomar la idea del NDA de Zerolynx y la brevedad de PentestingTeam, sin teléfono obligatorio ni lista de 250 países (el contraejemplo de ISecAuditors). Campos: URL/app/API en alcance, tipo de autenticación, entorno disponible y fecha límite.
8. **APIs como especialidad visible**, con página propia y contenido en español (REST/GraphQL, autorización por objeto, rate limiting, webhooks). Es el hueco SEO más claro.
9. **Barcelona de verdad, no por plantilla.** Reuniones presenciales, catalán si aplica `[POR CONFIRMAR]` y conocimiento del ecosistema local de startups. Una sola página, sin "tu empresa de la tecnología y las startups".
10. **Tono sin superlativos.** Frente a "La Élite", "Where people make cyber" o "Security in the cyberspace", nombrar el entregable y el plazo. Encaja con la dirección H.

## 5. Títulos y slugs recomendados (tres páginas de servicio)

| Página | Title (≤60) | H1 | Slug |
|---|---|---|---|
| Web apps | Pentesting de aplicaciones web · StateX | Auditoría de seguridad de tu aplicación web | `/servicios/pentesting-aplicaciones-web` |
| APIs | Auditoría de seguridad de APIs REST y GraphQL · StateX | Auditoría de seguridad de APIs | `/servicios/auditoria-seguridad-api` |
| Exposición externa | Auditoría de exposición externa · StateX | Qué ve un atacante de tu empresa desde Internet | `/servicios/auditoria-exposicion-externa` |

Notas (I):
- En la página web usar "seguridad de aplicaciones web" y "revisión de seguridad" como sinónimos en el cuerpo y en la meta description, no en el slug.
- Añadir una FAQ con "¿De qué depende el precio?" sin dar cifras hasta que estén decididas.
- Barcelona: si se crea, una sola página `/barcelona` (title "Pentesting y seguridad de aplicaciones en Barcelona · StateX") que enlace a las tres anteriores, en lugar de duplicarlas por ciudad.
- Siguiente pieza de contenido con más probabilidad de captar tráfico: `/guias/que-incluye-una-auditoria-de-seguridad-web`, sobre alcance, plazos y entregables, sin precios inventados.

### Fuentes adicionales consultadas (2026-10-25)
https://zonaseguridad.es/barcelona/ciberseguridad/ · https://www.bcnsoluciona.com/auditoria-seguridad-web-app/ · https://www.keliam.com/auditoria-seguridad-pentesting/ · https://hard2bit.com/blog/cuanto-cuesta-un-pentesting-en-espana/ · https://deepstrike.io/blog/penetration-testing-companies-spain-2025 · https://www.akamai.com/es/glossary/what-is-an-api-security-audit · https://www.hostinger.com/co/tutoriales/?p=47341 · https://dreamlab.net/ (no se leyó el contenido de BCNSoluciona ni de Keliam, solo el título y el fragmento de búsqueda)
