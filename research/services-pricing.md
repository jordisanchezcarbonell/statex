# StateX — Paquetes de servicio y precios orientativos

Fecha: 2026-10-24. **Documento interno.**

> **Los precios de este documento son hipótesis internas para validar con clientes. NO son precios para publicar** en la web, en propuestas ni en redes. Ningún importe incluye IVA. Las referencias de mercado se citan con fuente; los cálculos propios se marcan `[ESTIMACIÓN INTERNA]`.

> **Condición previa a cualquier prueba de seguridad:** autorización escrita del titular de los sistemas (y del proveedor de hosting/cloud cuando aplique), alcance acordado y firmado (dominios, IPs, entornos, cuentas de prueba), y reglas de intervención (ventanas horarias, técnicas excluidas —p. ej. DoS, ingeniería social—, tratamiento de datos, contacto de emergencia y criterio de parada). Sin estos tres documentos no se ejecuta ninguna prueba activa. El acceso no autorizado a sistemas es delito en España (art. 197 bis del Código Penal).

Contexto de mercado y segmentos: ver `research/spanish-market.md`.

---

## 1. Referencias públicas de precio

| Referencia | Qué publica | Fuente y fecha | Fiabilidad |
|---|---|---|---|
| Securitum (Polonia, UE) | **640–890 €/día-persona** en tiempo y materiales; **3.500–14.000 €** a precio cerrado por proyecto (1–4 semanas, una aplicación/área) | [securitum.com/pricing](https://securitum.com/pricing), consultado 24/10/2026 | Alta (tarifa propia publicada) |
| Kolonell (Francia) | Pentest dirigido a 1 app (OWASP Top 10): **5.000–12.000 €**, 1–2 semanas. Auditoría completa (pentest + código + configuración): **15.000–35.000 €**, 2–5 semanas. Auditoría cloud: 6.000–15.000 €. Suscripción continua: **1.500–5.000 €/mes**. Retest: **30–50 %** del precio inicial | [Kolonell, 31/08/2026](https://kolonell.com/en/blog/web-application-security-audit-pricing-2026) | Media (estimaciones de mercado de un proveedor, mercado francés) |
| 7ASecurity (Irlanda) | ~**5.000 €** = comprobaciones básicas (app sin login, red externa); **15.000–30.000 €** = pentest manual de app de negocio (1–2 semanas de pruebas); 20.000 € ≈ 2–3 semanas; >50.000 € grandes alcances; retest gratuito | [7ASecurity, abril 2026](https://7asecurity.com/blog/2026/04/the-2026-guide-to-penetration-testing-pricing-and-scoping/) | Media (guía de un proveedor) |
| Vaadata (Francia) | Pentests a precio cerrado entre 1.200–6.500 € o 2.000–30.000 € según caso | Snippet de búsqueda de vaadata.com (página no accesible, 404) | **Baja** `[NO VERIFICADO]` |
| DeepStrike (guía para España) | Una prueba pequeña de app web "desde unos pocos miles de euros"; evaluación externa básica ~5.000 $ | [DeepStrike 2025](https://deepstrike.io/blog/penetration-testing-services-spain), [pricing](https://deepstrike.io/es/pricing/penetration-testing-pricing) | Media-baja |
| Auditsec (WordPress, automatizado) | Escaneo gratis; "auditoría completa" **49 €** (informe en 5–10 min) | [hunted.space/Auditsec](https://hunted.space/product/auditsec) | Alta, pero es otro producto (automático) |
| Intigriti (bug bounty / PTaaS) | Mediana de compra **44.000 $/año** (rango 37.000–57.500 $, 6 compras) | [Vendr](https://www.vendr.com/marketplace/intigriti) | Media (muestra muy pequeña) |
| Freelance IT España | Ciberseguridad/cloud **90–150 €/h**; seguridad ofensiva **≥140 €/h** (≈720–1.200 €/día a 8 h, cálculo propio) | [Jobrise 2026](https://jobrise.io/es/blog/tarifas-freelance-developer-espana-2026/), [Pillitteri](https://pasqualepillitteri.it/es/news/456/tarifas-freelance-ict-italia) | Baja (contenido SEO, sin encuesta primaria) |
| Salario pentester España (empleado) | 41.550 €/año (Indeed); 54.300 €/año (Jobicy, jul. 2026) | [Indeed](https://es.indeed.com/career/pentester/salaries), [Jobicy](https://jobicy.com/salaries/es/penetration-tester) | Media |
| Kit Consulting (Red.es) | **6.000 €** por servicio de ciberseguridad, mínimo **100 h** → ≈60 €/h implícitos | [Clientify](https://clientify.com/soluciones/kit-consulting-subvencion), [Extremadura Avante](https://extremaduraavante.es/wp-content/uploads/2024/10/F_PROGRAMA-KIT-CONSULTING.pdf) | Media. **Convocatoria cerrada** (solicitudes hasta 31/03/2025; sin nueva a 14/10/2026). Precio subvencionado orientado a GRC/SGSI, no a pentest |
| Licitación pública | La Rioja 2025 (pentest automatizado): precio = 54/100 puntos; Junta de Andalucía calcula por perfiles (Instrucción 1/2023 ADA) | [TED 276604-2025](https://ted.europa.eu/es/notice/276604-2025/pdf) | Sin tarifas extraídas `[PENDIENTE: revisar Instrucción 1/2023]` |

**Lectura:** el mercado europeo de pentest web a precio cerrado se mueve entre **~3.500 € (alcance pequeño) y ~15.000 € (app de negocio estándar)**; por encima de 15.000 € entran auditorías completas con código o apps complejas. La tarifa día-persona publicada más fiable es **640–890 €**.

---

## 2. Base de coste y tarifa interna `[ESTIMACIÓN INTERNA]`

| Supuesto | Valor | Razonamiento |
|---|---|---|
| Coste salarial de referencia | 41.550–54.300 €/año | Indeed / Jobicy |
| Coste empresa (×1,31 por Seguridad Social) | ≈54.400–71.100 €/año | Cotización empresarial ≈31 % `[aproximación]` |
| Días facturables/año | 120–140 | ≈215 laborables × 55–65 % de utilización (venta, I+D, formación, StateX Lab) |
| Coste por día facturable | ≈390–590 € | 54.400/140 – 71.100/120 |
| Gastos generales (seguro RC, licencias, herramientas, infraestructura de pruebas, legal) | +20–25 % | — |
| **Coste total por día facturable** | **≈470–740 €** | — |
| **Tarifa interna propuesta** | **750 €/día** (Essential), **850 €/día** (Advanced), **≈800 €/día equivalente** (Advisory) | Dentro del rango Securitum (640–890 €) y por debajo del freelance senior (720–1.200 €). Margen bruto ≈15–40 % según perfil |

Notas:
- Con fundadores sin salario de mercado el coste real es menor, pero **no se debe fijar precio sobre coste cero**: el precio tiene que sostener un equipo.
- No competir con escáneres de 49 € ni con la tarifa subvencionada de Kit Consulting (≈60 €/h): son otros productos.

---

## 3. Paquete Essential — Evaluación inicial de exposición

**Cliente objetivo:** empresas que desarrollan apps web (scaleups tempranas, SaaS B2B, software factories) y agencias digitales con cartera de clientes; mediana empresa que no sabe qué expone. Interlocutor: CTO, responsable IT, gerente de agencia.

**Problemas que resuelve**
- "No sabemos qué tenemos expuesto en internet" (subdominios olvidados, entornos de staging, paneles de administración).
- "Un cliente nos pide evidencias de seguridad y no tenemos nada."
- "Usamos Next.js/React o WordPress y no sabemos si nos afectan los fallos recientes" (React2Shell, CVE-2025-29927, plugins de WordPress).

**Alcance (incluido)**
- Fase Alcance: reunión de 45 min, inventario declarado, firma de autorización y reglas de intervención.
- Descubrimiento de la superficie externa de **hasta 3 dominios raíz** (ejemplo: `ejemplo.com`) y **un rango /28** de IPs declaradas: DNS, subdominios, certificados, servicios expuestos, tecnologías.
- Verificación no destructiva: versiones vulnerables con CVE conocidos, configuración TLS, cabeceras de seguridad, CORS, cookies, exposición de ficheros sensibles (`.git`, `.env`, backups), paneles accesibles, correo (SPF, DKIM, DMARC).
- Revisión ligera de **una aplicación principal sin autenticar** (Next.js/React o WordPress): configuración, versión de framework/plugins, endpoints públicos y API sin autenticación.
- Priorización por explotabilidad e impacto de negocio.

**Exclusiones**
- Pruebas autenticadas, lógica de negocio, revisión de código, pruebas internas, ingeniería social, DoS, red team.
- Corrección de vulnerabilidades (se recomienda, no se ejecuta).
- Monitorización continua (roadmap; no es capacidad actual).
- Certificación o declaración de cumplimiento (NIS2, ENS, ISO 27001, DORA).

**Entregables**
- Informe ejecutivo (1–2 páginas, para dirección no técnica).
- Informe técnico: inventario de activos expuestos, hallazgos verificados con evidencia, gravedad, pasos de reproducción y recomendación.
- Plan de reducción priorizado (30/60/90 días).
- Sesión de presentación de 60 min con el equipo técnico.

**Tiempo estimado:** 3–5 días-persona; 1–2 semanas naturales desde la firma del alcance.

**Precio orientativo** `[ESTIMACIÓN INTERNA — no publicar]`

| Variante | Cálculo | Rango |
|---|---|---|
| Estándar | 3–5 días × 750 € = 2.250–3.750 € | **2.500–4.000 €** |
| Agencias: lote de hasta 10 webs WordPress (solo superficie y configuración) | ≈0,4 día/web + 1 día de consolidación = 5 días × 750 € | **3.500–4.500 € por lote** (≈350–450 €/web) |

Coherencia con mercado: por debajo del "básico" de 7ASecurity (~5.000 €) y del mínimo de Securitum (3.500 €) para pentest; muy por encima de escáneres automáticos (49 €) porque incluye verificación manual y priorización.

**Riesgos de ejecución**
- Inventario incompleto del cliente → descubrimiento de activos que **no están autorizados**: no se prueban hasta ampliar la autorización por escrito.
- Activos en hosting compartido o de terceros: necesitar permiso del proveedor.
- Alcance que crece ("ya que estáis, mirad el login") → convertir en Advanced, no regalar días.
- Falsos positivos de herramientas → cada hallazgo del informe debe estar verificado manualmente.
- Riesgo de comoditización si se percibe como "escaneo".

**Propuesta de valor:** en dos semanas sabes qué expones en internet, qué es explotable de verdad y qué corregir primero. Precio cerrado.

**CTA:** **Solicitar evaluación inicial**

---

## 4. Paquete Advanced — Auditoría técnica en profundidad

**Cliente objetivo:** empresas de producto y scaleups con una aplicación web/API en producción; mediana empresa con aplicaciones expuestas; proveedores de sector financiero (DORA) o de la Administración (ENS) que necesitan evidencias técnicas. Interlocutor: CTO, CISO, Head of Engineering.

**Problemas que resuelve**
- Cuestionario de seguridad o requisito contractual de un cliente enterprise/regulado.
- Due diligence, ronda o lanzamiento de una versión mayor.
- Dudas sobre autorización en APIs (BOLA/IDOR), gestión de sesiones, multi-tenant, server actions/route handlers en Next.js.

**Alcance (incluido)**
- Todo el Essential sobre los activos de la aplicación.
- Pentest **autenticado** de **una aplicación web + su API** (referencia: hasta ~50 endpoints y 2 roles de usuario), siguiendo OWASP WSTG y OWASP API Security Top 10; verificación contra ASVS nivel 1–2 en los controles aplicables.
- Pruebas de autenticación, autorización horizontal/vertical, aislamiento entre clientes, validación de entrada, SSRF, subida de ficheros, lógica de negocio acordada.
- Revisión de configuración de la infraestructura web: framework (Next.js: middleware, `headers()`, exposición de variables de entorno, server actions), CDN/WAF, almacenamiento de objetos, cabeceras, gestión de secretos visible desde fuera.
- **Un retest** de los hallazgos críticos y altos en los 60 días siguientes.
- Opcional (presupuesto aparte): revisión de código focalizada (autenticación, autorización, manejo de datos sensibles), +3–5 días.

**Exclusiones**
- Pruebas de denegación de servicio, ingeniería social, acceso físico, red team, TLPT bajo DORA/TIBER-EU.
- Apps móviles, infraestructura interna/Active Directory (presupuesto aparte o fuera de catálogo).
- Pruebas en producción sin ventana acordada; datos reales sin acuerdo de tratamiento.
- Certificaciones o declaraciones de conformidad.

**Entregables**
- Informe ejecutivo apto para compartir con terceros (cliente, inversor, auditor).
- Informe técnico con evidencias, CVSS/gravedad, impacto, reproducción y corrección específica para el stack.
- Plan de reducción priorizado y sesión de 90 min con desarrollo.
- Carta de retest con estado de cada hallazgo tras la corrección.

**Tiempo estimado:** 8–14 días-persona (preparación 1; pruebas 5–9; configuración 1–2; informe 1,5; presentación 0,5; retest 1). 3–5 semanas naturales incluyendo el retest.

**Precio orientativo** `[ESTIMACIÓN INTERNA — no publicar]`

| Variante | Cálculo | Rango |
|---|---|---|
| Estándar (1 app + API, 2 roles) | 8–14 días × 850 € = 6.800–11.900 € | **7.000–12.000 €** |
| Compleja (multi-tenant, >2 roles, >50 endpoints) | 15–18 días × 850 € | **12.500–15.500 €** |
| Revisión de código opcional | 3–5 días × 850 € | **+2.500–4.250 €** |
| Retest adicional (fuera de los 60 días) | 30–40 % del precio, en línea con Kolonell (30–50 %) | — |

Coherencia con mercado: equivalente al rango de Kolonell para pentest dirigido (5.000–12.000 €) y a Securitum (3.500–14.000 €); por debajo de 7ASecurity (15.000–30.000 €) y de auditorías completas (15.000–35.000 €). Precio de entrada razonable para una firma sin referencias; subir al acumular casos.

**Riesgos de ejecución**
- Entornos de prueba inexistentes → pruebas en producción con riesgo de impacto: exigir staging o ventana y copia de seguridad confirmada.
- Cuentas de prueba tardías → retrasos; el calendario empieza al recibirlas.
- Hallazgo crítico en curso (p. ej. RCE) → notificación inmediata al contacto de emergencia, según reglas de intervención.
- Sobre-promesa: el informe **no certifica** que la app sea "segura"; documenta lo probado, en el tiempo dado.
- Dependencia de 1–2 personas clave: capacidad limitada a ~1–2 Advanced simultáneos `[ESTIMACIÓN INTERNA]`.
- Responsabilidad civil: necesario seguro de RC profesional antes del primer Advanced.

**Propuesta de valor:** una auditoría que tu equipo puede corregir y tu cliente puede leer: pruebas manuales sobre tu aplicación real, correcciones para tu stack y retest incluido.

**CTA:** **Solicitar propuesta de auditoría**

---

## 5. Paquete Private Advisory — Acompañamiento continuado

**Cliente objetivo:** clientes que ya hicieron un Essential o un Advanced (requisito de entrada); equipos de desarrollo de 5–50 personas sin perfil de seguridad propio; agencias que quieren un "responsable de seguridad" externo para sus proyectos.

**Problemas que resuelve**
- "Corregimos lo del informe, pero cada sprint introduce cosas nuevas."
- "No tenemos a nadie a quien preguntar antes de lanzar una funcionalidad sensible."
- "Nos llegan cuestionarios de seguridad y no sabemos responderlos."

**Alcance (incluido, según nivel)**
- Bolsa mensual de días de consultoría (ver tabla), con canal asíncrono acordado y una sesión quincenal.
- Revisión de diseño y modelado de amenazas de funcionalidades nuevas (autenticación, pagos, multi-tenant, IA).
- Revisión de PRs y configuración con impacto de seguridad (Next.js/React, APIs, cabeceras, CI/CD, gestión de secretos).
- **Re-verificación trimestral** de la superficie externa (descubrimiento + verificación como en Essential, sobre el alcance autorizado). Es una revisión periódica, **no** monitorización continua.
- Apoyo para responder cuestionarios de seguridad de clientes (contenido técnico; sin firmar declaraciones de cumplimiento).
- Mini-retest de correcciones dentro de la bolsa de días.
- Formación breve para desarrolladores (1–2 h por trimestre).

**Exclusiones**
- Respuesta a incidentes 24/7 o SOC; disponibilidad fuera de horario.
- Monitorización continua automatizada (roadmap).
- Rol formal de CISO con responsabilidad legal, DPO o delegado ENS.
- Desarrollo de las correcciones (posible como servicio aparte de ingeniería de software).

**Entregables**
- Informe mensual breve: trabajo realizado, decisiones, riesgos abiertos.
- Informe trimestral de superficie externa con cambios respecto al anterior.
- Registro de riesgos y plan de reducción actualizado.

**Tiempo estimado:** compromiso mínimo de 6 meses; arranque en 1 semana.

**Precio orientativo** `[ESTIMACIÓN INTERNA — no publicar]`

| Nivel | Cálculo | Rango |
|---|---|---|
| Base | 2 días/mes × 800 € = 1.600 € + re-verificación trimestral prorrateada (≈1 día/trimestre ≈ 280 €/mes) | **1.800–2.200 €/mes** |
| Ampliado | 4 días/mes × 800 € = 3.200 € + re-verificación prorrateada | **3.200–3.700 €/mes** |
| Agencias (por cartera) | 2–3 días/mes compartidos entre proyectos | **2.000–2.800 €/mes** |

Días no consumidos: no acumulables más de un mes (proteger capacidad). Coherencia con mercado: dentro del rango de suscripción continua de Kolonell (1.500–5.000 €/mes) y muy por debajo de programas de bug bounty (≈44.000 $/año de mediana en Intigriti).

**Riesgos de ejecución**
- Deriva del alcance hacia "CISO a tiempo completo" o soporte urgente: limitar por contrato.
- Expectativa de "vigilancia permanente": dejar por escrito que la verificación es trimestral.
- Cada re-verificación activa necesita autorización vigente y alcance actualizado (nuevos dominios = nueva autorización).
- Concentración de ingresos en pocos clientes; riesgo de baja tras el periodo mínimo si no se demuestra valor mensual.
- Independencia: no auditar en Advanced algo que StateX diseñó en Advisory sin declararlo.

**Propuesta de valor:** un equipo de seguridad que conoce tu aplicación y revisa lo que cambia, sin contratar un perfil a tiempo completo.

**CTA:** **Hablar con el equipo**

---

## 6. Resumen de paquetes `[ESTIMACIÓN INTERNA — no publicar]`

| Paquete | Días-persona | Tarifa supuesta | Rango propuesto (sin IVA) | Plazo |
|---|---|---|---|---|
| Essential | 3–5 | 750 €/día | **2.500–4.000 €** (lote agencias 3.500–4.500 €) | 1–2 semanas |
| Advanced | 8–14 (complejo 15–18) | 850 €/día | **7.000–12.000 €** (complejo 12.500–15.500 €) | 3–5 semanas |
| Private Advisory | 2–4/mes | ≈800 €/día | **1.800–3.700 €/mes**, mínimo 6 meses | Continuo |

Ruta comercial prevista: Essential → Advanced (sobre lo que el Essential prioriza) → Advisory. Descuento sugerido: el importe del Essential se descuenta del Advanced si se contrata en 60 días `[hipótesis a validar]`.

---

## 7. Validación antes de fijar precios

1. 8–10 conversaciones de discovery (CTO de scaleup, gerente de agencia, responsable IT de mediana empresa): disposición a pagar y disparadores.
2. 2–3 proyectos piloto con precio reducido documentado a cambio de permiso para usar el caso de forma anonimizada (**sin publicarlo hasta tener permiso escrito**: `[Pendiente: caso real]`).
3. Medir días reales por paquete y recalcular la tarifa.
4. Plantillas legales listas: autorización de pruebas, reglas de intervención, NDA, acuerdo de tratamiento de datos, condiciones de retest; seguro de RC profesional contratado.
5. Revisar si Kit Consulting reabre (sede de Red.es) antes de diseñar cualquier variante subvencionable.

---

## 8. Precios de lanzamiento publicados (2026-10-25)

Los fundadores piden ser competitivos por ser una firma pequeña. Estos precios **sustituyen a los rangos del §6** en la web. Sin IVA. Se publica un precio "desde" y la propuesta final es siempre cerrada.

**Tarifa de lanzamiento: ≈600 €/día-persona.**
- Está justo por debajo del mínimo europeo publicado más fiable (Securitum, 640–890 €) y del freelance senior en España (720–1.200 €).
- Cubre el coste total por día del §2 en su tramo bajo, lo que es viable porque los fundadores no cobran sueldo de mercado al principio.
- No se compite con escáneres automáticos (49 €) ni con la gama más baja de PentestingTeam:
  - PentestingTeam publica "desde" 1.140 € (web), 760 € (API) y 450 € (superficie externa), según el documento `competencia-y-seo-2026-10-25.md`.
  - StateX se diferencia por verificar a mano, entender el stack y ayudar a corregir. Por eso queda por encima de ese suelo y muy por debajo de las boutiques europeas (3.500–15.000 €).

| Servicio | Alcance mínimo del "desde" | Días | Precio publicado |
|---|---|---|---|
| Evaluación inicial (puerta de entrada) | Superficie externa de hasta 2 dominios + revisión sin autenticar de la aplicación principal, informe breve y sesión de 45 min | 1,5 | **900 € precio cerrado** |
| Evaluación de exposición externa | Hasta 3 dominios raíz y un rango /28, hallazgos verificados, plan de reducción y sesión | 2,5 | **desde 1.500 €** |
| Auditoría de seguridad web y APIs | 1 aplicación + API (hasta ~30 endpoints, 2 roles), informe ejecutivo y técnico, sesión y **un retest de críticos/altos en 60 días** | 5 | **desde 2.900 €** |
| Ingeniería de software segura | Diagnóstico técnico de arquitectura, autenticación, CI/CD y dependencias + plan de mejoras | 3 | **desde 1.800 €** (acompañamiento posterior a ≈600 €/día o bolsa mensual) |

**Reglas:**
- Lo que supere el alcance mínimo se presupuesta por días a la tarifa de lanzamiento.
- Si el cliente contrata la auditoría en los 60 días siguientes, se le descuenta el importe de la evaluación inicial.
- Revisar la tarifa al cerrar 3–5 proyectos (días reales frente a estimados) y subirla al acumular casos.
- Lote para agencias (varias webs): pendiente de decidir; no se publica todavía.
