# Competidores y referentes: cómo se presentan las firmas de ciberseguridad

Fecha de consulta: **2026-10-24** (todas las URLs). Método: WebFetch/WebSearch y, cuando el fetch fallaba, descarga directa del HTML. Algunas webs renderizan formularios con JavaScript; en esos casos, que no se vean campos no significa que no existan.

Leyenda: **V** = Verificado en la fuente citada. **I** = Interpretación propia. "No encontrado" = no aparece en lo consultado, no que no exista.

---

## 1. NCC Group (UK, grande)

Fuentes: https://www.nccgroup.com/ · https://www.nccgroup.com/contact-us/ (la URL de pentesting `/penetration-testing/` devolvió 404)

**V**
- **Servicios:** cinco pilares: Incident Response, Technical Assurance (pentest, pentest continuo, AppSec, cloud, hardware/embedded, criptografía, blockchain), Managed Services (MXDR, gestión de vulnerabilidades, ASM, bug bounty/VDP), Consulting & Implementation y Threat Intelligence (Online Exposure Monitoring, Digital Footprint Review).
- **Home, en orden:** hero ("People powered, tech-enabled cyber resilience" + "Get in touch") → banner EU CRA → tarjetas de actualidad → panel "Under attack? Call our 24/7 Incident Response Hotline now" → franja "Verified. Accredited. Certified. Trusted." → NCSC Industry 100 → "over 25 years", "over 2,000 colleagues" → capacidades (5 tarjetas) → insights → casos de clientes con logos (TikTok, Vodafone, TfL…) → partners → CTA de cierre "It's a new era of cyber risk. Defy it with NCC Group."
- **Confianza:** acreditaciones (CREST, CBEST, CHECK, Cyber Essentials Plus, TISAX, UKAS…), logos, testimonios con nombre e informes propios (Threat Intelligence Reports, Global Cyber Policy Radar).
- **CTAs:** "Get in touch", "Read more", "Read the case study".
- **Captación:** la página de contacto está organizada por motivo (ventas, prensa, inversores, empleo…) y lleva a subpáginas. Ofrece teléfonos por región y una línea de incidentes 24/7 por región. No se encontró ningún email.
- **Tono:** corporativo y tranquilizador.

**I** — Es la plantilla de una firma grande: amplitud de catálogo y prueba social masiva. La metodología no aparece en la home. Para StateX no se puede replicar y tampoco conviene.

## 2. Mandiant (Google Cloud, grande)

Fuentes: https://cloud.google.com/security/consulting/mandiant-services (mandiant.com redirige con un 301) · https://cloud.google.com/security/resources/m-trends

**V**
- **Servicios:** respuesta a incidentes (preparación, respuesta técnica y gestión de crisis), Retainer ("2-hour response times"), comunicación de crisis, compromise assessment, tabletop, cyber defense assessment, red team, revisión de arquitectura cloud, pentest, integración de Google SecOps, CTI y seguridad de IA. También tiene formación (Mandiant Academy, ThreatSpace).
- **Estructura:** banda superior "Get help now for a security breach or possible incident" → H1 "Mandiant Cybersecurity Consulting" → bloques H2 por problema ("Tackle breaches confidently", "Test and strengthen your security program with real-world attacks"…) → red de partners (despachos, aseguradoras, negociadores) → "Trusted by leading organizations" (vídeos de clientes) → reconocimiento de analistas (IDC MarketScape, Forrester Wave) → recursos (M-Trends 2026, podcasts, blog).
- **Confianza:** experiencia de "frontline" ("over two decades"). M-Trends 2026 dice basarse en "over 500k hours of incident investigations in 2025".
- **CTAs:** "Talk to an expert", "Explore all services", "Read the report", "Take the assessment", "Download our services overview".
- **Captación:** formulario en `/security/contact/mandiant-consulting` (no se pudieron leer los campos) y enlace de incidentes en la cabecera.
- **Tono:** de consultora estratégica, orientado a negocio y consejo.

**I** — La credibilidad viene de datos propios agregados (M-Trends). Una firma pequeña puede imitar el formato (un informe periódico con método explícito) a escala mínima.

## 3. Trail of Bits (EE. UU., boutique técnica)

Fuentes: https://www.trailofbits.com/ · https://www.trailofbits.com/services/ · https://www.trailofbits.com/contact/ · https://github.com/trailofbits/publications

**V**
- **Servicios:** AI/ML Security, Blockchain, Cryptography, Application Security, Software Assurance y Security Engineering, entre otros (siete tarjetas en /services/).
- **Home:** H1 "Solving Difficult Security Problems" → contadores "992 Publications · 660 Audits · 200+ Open-source repos · Since 2012" → pieza destacada firmada ("How we made Trail of Bits AI-Native (so far)", Dan Guido) → servicios. Tiene buscador global ("Search everything").
- **Servicios:** H1 "We fix the software behind the bug." Promociona un **informe de ejemplo** ("Walk the report", "Anatomy of a report", PDF de 64 páginas). Frases de método: "a team sized to your threat model rather than a fixed template"; "the fix that retires the whole bug class". Herramientas citadas: Slither, Echidna y Medusa. No describe fases de engagement ni retest.
- **Confianza:** repo público `publications` con papers, charlas, comentarios públicos y **Security Reviews** con fecha, esfuerzo y PDF por cliente. También ofrece open source, firmas personales y política de divulgación.
- **CTAs:** "Start a conversation", "Explore the work", "Read the blog", "Get in Touch".
- **Captación:** "Tell us about your hardest security problems" / "Tell us about the software you need secured". Para comunicaciones seguras ofrece SendSafely o PGP. No se ven email ni calendario, y los campos del formulario no se pudieron leer.
- **Tono:** sobrio, técnico y con criterio propio.

**I** — La prueba es el propio trabajo: los informes son el portfolio. El informe de ejemplo como pieza de conversión encaja de lleno con el objetivo secundario de StateX.

## 4. Bishop Fox (EE. UU., ofensiva, mediana-grande)

Fuentes: https://bishopfox.com/ · https://bishopfox.com/contact · https://bishopfox.com/get-started

**V**
- **Servicios:** pentest (AI/LLM, apps, mobile, revisión de código, cloud, hardware, red), Continuous Security Testing (descubrimiento y testing de superficie de ataque, amenazas emergentes), Red Team & Readiness y la plataforma Cosmos.
- **Home:** "20+ Years. Zero Complacency." → "SECURITY IS IN OUR DNA" → cifras (1.8K+ clientes, NPS 72, "70% of the Fortune 10") → 3 servicios con lema ("See What Hackers See") → muro de logos "Trusted by Industry Leaders." → Labs (Sliver, AIMap) → "Are you ready?"
- **CTAs:** "Get Started", "Learn More", "Browse Tools", "View Customer Stories".
- **Captación:** contact@bishopfox.com y teléfonos (EE. UU. y Londres). "Get Started" no muestra campos en el HTML (el formulario se carga con JS) y no hay calendario visible.
- **Tono:** enérgico, de marketing, con frases cortas y rotundas.

**I** — El open source ofensivo (Sliver) le da credibilidad entre técnicos, pero la home se apoya sobre todo en cifras y logos, que StateX no tiene.

## 5. Cure53 (Berlín, boutique técnica)

Fuente: https://cure53.de/

**V**
- **Servicios:** análisis de seguridad y consejo de arquitectura ("Security advice is often most valuable before a single line of code is written"), pentest y auditoría de código (caja negra o blanca), y auditorías de infraestructura, plataforma y criptografía.
- **Método explicado:** testing manual, contacto estrecho con el equipo de desarrollo y fallos críticos normalmente corregidos antes de que llegue el informe. Ofrece informes breves sin "pie charts no one wants to see" y transferencia de conocimiento.
- **Confianza:** desde 2007, "several hundreds of penetration tests". **Informes públicos por año (2020–2026)**, publicados solo cuando el cliente lo pide (p. ej. Mullvad VPN 06.2024, Coinbase cb-mpc 12.2024, Forward Email 09.2026). Herramientas: DOMPurify, HTML5 Security Cheatsheet, HTTLeaks. Papers, charlas, **PGP por cada miembro**, seguro de responsabilidad declarado y "No cookies, No trackers, No ads."
- **Clientes:** no hay muro de logos. Aparecen solo en los títulos de los informes.
- **CTAs:** "Contact us" (ancla).
- **Captación:** **sin formulario**. hello@cure53.de, teléfono, dirección postal, PGP/S-MIME.
- **Tono:** directo, técnico y algo irónico, sin marketing.

**I** — Es el referente más útil para StateX: web casi austera, con credibilidad basada en trabajo público, transparencia y coherencia (sin trackers). Que no haya formulario funciona porque su público es técnico; para un CTO de una mediana conviene un formulario breve.

## 6. SEC Consult (Austria/Alemania, Atos)

Fuentes: https://sec-consult.com/ · https://sec-consult.com/contact/ · https://sec-consult.com/vulnerability-lab/

**V**
- **Servicios:** Compliance (NIS2, DORA, CRA), Security Testing (web, pentest, mobile, cloud, infraestructura, SAP, IoT, red team), Procesos (ISM, OT, SDLC seguro, formación) e Incident Response (SEC Defence).
- **Home:** bloque "Incident? / Breached?" + "Report an incident" → hero "A reliable partner for long-term cybersecurity" (caso Beyond Gravity) → 3 tarjetas (cita con expertos locales, víctima de ataque, últimas advisories) → "Concerned about your cyber security status?" → **Latest Advisories** (3, sep–oct 2026) → blog de investigación → pie con certificaciones (ISO 27001, CREST) y Atos.
- **Vulnerability Lab:** "an official CNA (CVE Numbering Authority)". Política de divulgación responsable, listado paginado ("Page 1 of 32") con filtros por año de 2003 a 2026, email de investigación con PGP.
- **Formulario:** nombre*, apellidos*, email*, teléfono, empresa, cargo, país* (desplegable), mensaje*, casilla opcional de newsletter y botón "Send". Avisa de que guarda la IP y la hora. El banner de cookies incluye Matomo y Google Ads.
- **CTAs:** "Contact us", "Contact us now!", "Report an incident".
- **Tono:** profesional y sereno.

**I** — Pone las advisories fechadas en la home como prueba viva de actividad, algo replicable a pequeña escala. Usa normativas como puerta de entrada, sin presentarlas como certificación propia.

## 7. IOActive (EE. UU., research-led)

Fuentes: https://ioactive.com/ · https://www.ioactive.com/contact/

**V**
- **Servicios:** Full Stack Security Assessments, SDL, Red/Purple Team, AI/ML Security, Silicon Security, Supply Chain, Advisory, Training, OCP S.A.F.E. y OSINT Threat Simulation.
- **Home:** hero "Human-led / agent-accelerated" → feed de blog y eventos → "25+ Years. Billions Protected. The Most Trusted Research-Led Security Firm on the Planet." → "Why Organizations Trust IOActive" (7 puntos) → **línea temporal de investigación 2007–2025** (AMD Sinkclose, Tesla, Boeing 787) → 6 servicios + PDF resumen → premios → "Accreditations" (encabezado sin contenido en lo extraído).
- **CTAs:** "LEARN MORE", "Let's talk", "SERVICES AT A GLANCE", "CONTACT US".
- **Captación:** no hay formulario en la página. Ofrece **"Schedule Meeting" (reserva vía Outlook)**, "Request Lab Tour", emails por función (info@, security@, press@), Signal y WhatsApp. Los teléfonos que devolvió la extracción parecen números de marcador (p. ej. "123-4567"), así que no se dan por verificados. Tiene oficinas, entre ellas un laboratorio de hardware en Madrid.
- **Tono:** muy afirmativo, con superlativos.

**I** — Contar la investigación como línea temporal es potente y barato. El calendario directo reduce fricción. Los superlativos ("on the Planet") son lo contrario de lo que debe hacer StateX.

## 8. Orange Cyberdefense (Francia, grande)

Fuentes: https://www.orangecyberdefense.com/ y `/es/`, `/uk/` (todas devolvieron **HTTP 403** al fetch automatizado) · resultados de búsqueda sobre https://orangecyberdefense.com/uk/contact y https://www.orangecyberdefense.com/uk/security-navigator · prensa: https://www.elespanol.com/invertia/empresas/tecnologia/20260513/masorange-lanza-filial-ciberdefensa-orange-espana-objetivo-captar-mercado-local/1003744244027_0.html

**V (indirecto: fragmentos de búsqueda, no la página renderizada)**
- La web tiene un selector de país ("Select your country") con sitios por país.
- Publica el informe anual **Security Navigator 2026** (EN/FR), que trata IA generativa, criptografía post-cuántica, extorsión y gestión de vulnerabilidades.
- Pentest: infraestructura, apps y APIs, red, wireless, mobile, IoT/OT, red/purple team y auditorías físicas o de ingeniería social. Cita CREST, NCSC CIR, CHECK, Cyber Essentials Plus e ISO 27001.
- Contacto: hotline de incidentes 24/7/365 por país. Avisa de que los clientes con retainer tienen prioridad ("we cannot guarantee it will be possible to assist you unless you have a retainer contract").
- España: filial lanzada en mayo de 2026 con MasOrange, centrada en MDR/DynamicSOC (prensa).

**No verificado:** estructura de la home, CTAs exactos y campos de formulario, porque la web bloquea el acceso automatizado.

**I** — Es un competidor de volumen centrado en MDR/SOC. Su llegada a España en 2026 hace más visible el ruido de "SOC gestionado" en el mercado local, y StateX se diferencia por no ser eso.

---

## Boutiques europeas y españolas

### 9. Doyensec (San Marino/EE. UU., boutique AppSec)
Fuentes: https://doyensec.com/ · https://doyensec.com/research.html

**V:** foco en web/APIs, mobile, GraphQL, Electron, cloud, LLM e IoT. Hero "Build with Security". Método: revisión manual de código, testing dinámico, "bug discovery is just the first step" y mirada ofensiva con perspectiva blue team. Herramientas: Electronegativity, InQL, Burp-Rest-API. Dedica el 25 % del tiempo a investigación propia ("Research is one of our founding principles"). CTA único: "WORK WITH US". Contacto: info@doyensec.com. La página de research mostraba contadores a 0 ("whoops, no article was found"), probablemente un fallo de carga.
**I:** demuestra que una boutique pequeña puede definirse por un nicho técnico (Electron/GraphQL) y por herramientas propias.

### 10. Tarlogic (Madrid)
Fuente: https://www.tarlogic.com/

**V:** ofensiva, red team (BlackArrow), cyber intelligence (menciona TIBER-EU, NIS2 y DORA), MDR y reducción de superficie de ataque. Hero "Cybersecurity experts". Cifras: 150 profesionales, 300 clientes, 790K activos auditados. Reconocimiento del FT y proyectos con financiación pública (ICEX/FEDER, NextGenerationEU). Muro de **partners tecnológicos** (Tenable, CrowdStrike…) en lugar de clientes. CTA repetido "Contact" / "Contact us now". contact@tarlogic.com y teléfono. Banner de cookies.
**I:** es el competidor español directo en ofensiva. Usa los logos de partners como sustituto de los de clientes, un recurso que StateX no debería imitar porque se lee como reventa.

### 11. Securízame (Madrid)
Fuentes: https://www.securizame.com/ · https://www.securizame.com/contacto/

**V:** forense y peritaje, auditorías y pentesting ("Mejor que lo hagamos nosotros antes que alguien sin contrato"), formación y herramientas propias (Wintriage, Lintriage). Credibilidad **personal del fundador** (ponente y cofundador de Security By Default, con las certificaciones CISA/CISSP indicadas con sus años de vigencia, 2010–2014 y 2008–2014). Formulario: nombre*, teléfono*, email*, país*, asunto*, mensaje* y aceptación de términos. Email con PGP y teléfono. Cookies de terceros "con fines estadísticos".
**I:** es el modelo de firma ligada a la reputación de una persona. Indicar el periodo de vigencia de las certificaciones es honesto y aplicable a StateX si algún día las muestra.

*No consultado con éxito:* Zerolynx (HTTP 429 repetido) e Hispasec (página renderizada con JS, sin texto).

---

## Patrones comunes

1. **Hero de una línea y CTA genérico:** "Get in touch", "Contact us", "Get Started". Casi nadie dice qué ocurre después de pulsar.
2. **Incidentes primero** en las grandes (NCC, Mandiant, SEC Consult, Orange): banda o panel de urgencia con hotline 24/7.
3. **Confianza por volumen:** años en el mercado ("20+", "25+"), cifras, logos, acreditaciones (CREST/ISO) y analistas (Gartner, Forrester, IDC).
4. **Confianza por trabajo publicado:** advisories fechadas (SEC Consult), informes públicos (Cure53, Trail of Bits), herramientas open source (todos los técnicos) y la línea temporal de investigación (IOActive).
5. **Metodología apenas explicada en la home.** Ninguna de las consultadas detalla fases ni entregables en la página principal. Cure53 y Trail of Bits lo insinúan con frases, no con un proceso.
6. **Formularios de B2B estándar:** nombre, email, empresa, cargo, país y mensaje. Se piden pocos datos de alcance. Calendario directo solo en IOActive.
7. **Canales seguros:** PGP, S/MIME, SendSafely o Signal en las boutiques técnicas, a menudo ausentes en las grandes.
8. **Normativa como gancho** (NIS2, DORA, CRA) en las europeas.

## Qué hacen mejor las boutiques técnicas (Trail of Bits, Cure53) frente a las grandes

- **Enseñan el trabajo en lugar de describirlo:** informes reales fechados, con alcance y esfuerzo. Eso sustituye a logos y testimonios.
- **Convierten el entregable en marketing:** el informe de ejemplo navegable de ToB ("Walk the report"), el informe "sin gráficos de tarta" de Cure53.
- **Tienen opinión técnica explícita:** "the fix that retires the whole bug class" o "advice before a single line of code". Es un punto de vista, no un catálogo.
- **Coherencia entre lo que dicen y lo que hacen:** Cure53 no usa cookies ni trackers y ofrece PGP por persona. La web en sí es una prueba de criterio.
- **Autoría visible:** artículos firmados y equipo con nombre, frente a la voz corporativa anónima.
- **Menos catálogo, más foco:** pocas áreas descritas con precisión, frente a 30+ servicios en cinco pilares.

## Oportunidades de diferenciación para StateX (sin clientes, testimonios ni certificaciones)

1. **Informe de ejemplo publicado desde el día 1.** Un informe completo sobre `ejemplo.com` con rangos de documentación (`192.0.2.0/24`, `203.0.113.0/24`) y hallazgos marcados como ilustrativos. Es la conversión secundaria y la mejor prueba disponible. Ninguna española consultada lo ofrece.
2. **Método con entregables por fase en la home.** Alcance → Descubrimiento → Verificación → Priorización → Reducción, y en cada fase qué recibe el cliente, cuándo y quién interviene. Esto cubre el hueco del patrón 5.
3. **CTA que dice exactamente qué pasa.** Por ejemplo, "Solicitar evaluación inicial: 30 min, sin compromiso, respuesta en X días hábiles" `[POR CONFIRMAR: plazos]`, frente a los "Get in touch" genéricos.
4. **Formulario de alcance, no de lead.** Pocos campos que ayudan al cliente a pensar: dominios u apps en alcance, ventana de pruebas y quién autoriza. Opcionalmente, calendario directo (el modelo de IOActive) y email con PGP (el de Cure53).
5. **Coherencia verificable de la propia web.** Sin cookies, sin trackers, cabeceras de seguridad, `security.txt` y política de divulgación publicada. Invitar a comprobarlo ("Revisa nuestras cabeceras") es una prueba que no necesita certificado.
6. **Notas de investigación fechadas y firmadas.** Pocas pero reales, empezando por el archivo InfoStateX 2012–2018 contado como línea temporal honesta (formato IOActive, sin superlativos).
7. **"Hoy vs Visión" explícito.** Separar lo que StateX hace hoy de lo que está en roadmap (monitorización continua). Ningún competidor consultado distingue capacidades actuales de futuras, y esa honestidad diferencia.
8. **Español y contexto UE/España.** Explicar NIS2, DORA y ENS como contexto para medianas y scaleups ("qué te afecta y qué no"), sin presentarlos como certificación. Las boutiques técnicas de referencia escriben en inglés para un público global.
9. **IA asistida con límites declarados.** Explicar qué hace la IA (triage, correlación) y qué verifica siempre una persona. IOActive ("Human-led / agent-accelerated") y ToB lo usan como mensaje; StateX puede ser más concreta y prudente.
10. **Placeholders honestos en lugar de huecos rellenados.** `[Pendiente: caso real]` en la zona de casos, y nada de muros de partners para simular escala (el contraejemplo de Tarlogic).
