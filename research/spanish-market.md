# StateX — Mercado español de servicios de ciberseguridad

Fecha de la investigación: 2026-10-24. Documento interno. No es asesoramiento legal ni financiero.

**Cómo leerlo**
- Cada cifra lleva fuente y fecha. Si la fuente es secundaria (prensa, blog de un proveedor), se indica.
- `[NO VERIFICADO]` = dato que solo aparece en una fuente secundaria o que no se ha podido contrastar con la fuente oficial.
- `[ESTIMACIÓN INTERNA]` = cálculo propio de StateX a partir de supuestos explícitos. No es un dato de mercado.
- Normativas (NIS2, ENS, DORA, CRA) se citan **solo como contexto comercial**. StateX no está certificada en ninguna de ellas.

---

## 1. Resumen ejecutivo

1. El mercado existe y crece, pero las cifras de tamaño dependen mucho de la metodología: entre **~2.500 M€** (DBK/Informa, 2024) y **~6.351 M€** (INCIBE–CONETIC, datos 2024). Dos tercios de la facturación son servicios (DBK). No son comparables entre sí.
2. La demanda latente es alta: INCIBE-CERT gestionó **122.223 incidentes en 2025 (+26 %)** y notificó **237.028 sistemas vulnerables** de forma proactiva (INCIBE, 09/02/2026). La exposición externa es, por tanto, un problema real y medible.
3. **NIS2 no está transpuesta en España** a fecha de hoy. El anteproyecto es de enero de 2025; las Cortes se disolvieron el 6/10/2026 (elecciones el 29/11/2026). No cabe esperar ley antes de 2027 `[ESTIMACIÓN INTERNA]`. Aun así, la presión llega por la **cadena de suministro** de clientes europeos y de sectores regulados.
4. **No hay ayudas públicas abiertas** que financien una auditoría de StateX hoy: Kit Digital y Kit Consulting tienen el plazo de solicitud cerrado y no hay nueva convocatoria publicada (verificado en fuentes secundarias a oct. 2026; confirmar en sede de Red.es).
5. Segmentos: las **pymes generalistas** son numerosas pero con poco presupuesto y poca madurez; las **agencias y empresas que desarrollan apps web** son un canal y un nicho técnico defendible (Next.js/React/APIs); la **mediana empresa y las scaleups** tienen más presupuesto y presión regulatoria, pero exigen referencias que StateX aún no tiene.
6. Recomendación: **entrada por nicho técnico (apps web modernas y APIs) a través de empresas de producto y agencias**, con la mediana empresa como objetivo del paquete Advanced. Evitar competir en "auditoría WordPress" como línea principal: está comoditizada.

---

## 2. Tamaño y madurez del mercado

### 2.1 Oferta (industria de ciberseguridad en España)

| Indicador | Valor | Fuente y fecha | Notas |
|---|---|---|---|
| Facturación del sector | 6.351 M€ (4,65 % de ingresos TIC) | Estudio INCIBE–CONETIC, 2025 (datos 2024), vía [España Digital](https://espanadigital.gob.es/actualidad/la-ciberseguridad-se-consolida-como-motor-tecnologico-en-espana-segun-el-estudio-sobre) y [Forbes](https://forbes.es/?p=892644) | Encuesta a 517 empresas sobre un universo que incluye agentes digitalizadores del PRTR. Universo amplio; probablemente sobreestima el "core" de ciberseguridad. |
| Empleo | 164.761 personas | Ídem | Ídem |
| Número de empresas | 3.431; 45 % microempresas, 8 % autónomos, 5 % grandes | Ídem | Mercado muy fragmentado: competencia de muchos actores pequeños. |
| Mercado (otra metodología) | ~2.500 M€ en 2024, +14,2 % interanual; dos tercios servicios | Observatorio Sectorial DBK (Informa), vía [El Derecho](https://elderecho.com/la-facturacion-en-ciberseguridad-en-espana-crece-un-142-en-2024) | Cifra más conservadora. Usar esta como referencia prudente. |
| ONTSI | Sin dato 2024–2025 localizado | — | `[PENDIENTE: revisar publicaciones ONTSI]` |

Lectura: el segmento relevante para StateX (servicios técnicos ofensivos/auditoría para empresas) es una fracción de esas cifras que **no se ha encontrado desglosada** en fuentes públicas. No se debe citar el total del mercado como "mercado direccionable".

### 2.2 Demanda (empresas potenciales clientes)

| Tramo (asalariados) | Empresas | Fuente y fecha |
|---|---|---|
| Microempresas (1–9) | 1.136.098 | [IPYME, Cifras PyME, junio 2026](https://ipyme.org/Publicaciones/Cifras%20PYME/CifrasPyme_junio_2026.pdf) |
| Pequeñas (10–49) | 181.740 (+2,76 % anual) | Ídem |
| Medianas (50–249) | 29.565 (+2,56 % anual) | Ídem |
| Total PYME (0–249) | 2.961.584 | Ídem |

`[ESTIMACIÓN INTERNA]` El universo que "puede pagar" una auditoría de 3.000–15.000 € está concentrado en medianas (≈30.000) y en una parte de las pequeñas con negocio digital (sin dato público del tamaño de esa parte). Las agencias digitales y software factories no tienen un censo público localizado; `[PENDIENTE: CNAE 62 en DIRCE/INE]`.

### 2.3 Madurez

| Indicador | Valor | Fuente |
|---|---|---|
| Empresas UE (≥10 empl.) con al menos una medida de seguridad TIC | 92,76 % (2024) | [Eurostat, ICT security in enterprises](https://ec.europa.eu/eurostat/statistics-explained/index.php/ICT_security_in_enterprises) |
| Empresas UE con documentación de seguridad TIC | 35,5 %; revisada en últimos 12 meses: 21,8 % (2024) | Ídem |
| Empresas UE que conciencian al personal | 60,0 % (2024) | [Eurostat news, 11/02/2025](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250211-1) |
| Empresas UE con algún incidente TIC con consecuencias | 21,5 % (año de referencia 2023) | Eurostat (ídem) |
| Dato específico de España | No extraído | `[PENDIENTE: tabla isoc_cisce_ra / isoc_cisce_ic, fila ES]` |
| Presupuesto: % del presupuesto TI destinado a ciberseguridad | El 57 % de las empresas destina entre el 1 % y el 10 % | Hiscox Informe de Ciberpreparación 2024, vía [DCD](https://www.datacenterdynamics.com/es/noticias/57-de-las-empresas-destinan-apenas-1-y-10-del-presupuesto-de-ti-para-ciberseguridad/) `[fuente secundaria]` |

Lectura: casi todas las empresas tienen "algo" (antivirus, contraseñas), pero solo una de cada cinco revisa su política anualmente. El hueco no es de herramientas, es de **verificación y priorización**: justo el método de StateX.

---

## 3. Problemas habituales de estos clientes (con fuentes)

### 3.1 Incidentes y exposición en España

- **122.223 incidentes** gestionados por INCIBE-CERT en 2025, +26 % vs. 2024; 55.411 de malware (392 ransomware); 45.445 de fraude online (25.133 phishing); 3.849 de acceso o sustracción no autorizada de datos; **237.028 sistemas vulnerables** detectados y notificados; 401 incidentes en operadores esenciales/importantes. Fuente: [INCIBE, nota de prensa 09/02/2026](https://www.incibe.es/incibe/sala-de-prensa/incibe-detecto-mas-de-122000-incidentes-de-ciberseguridad-en-2025).
- Reparto ciudadanía/empresas 2025: no publicado en la nota. Último dato: **2024, 31.540 incidentes (32,4 %) afectaron a empresas** de 97.348. Fuente: [INCIBE, balance 2024](https://www.incibe.es/incibe/sala-de-prensa/incibe-presenta-su-balance-de-ciberseguridad-2024-con-mas-de-97000-incidentes).
- Coste: el ataque más costoso se acerca a 100.000 € para el 81 % de las organizaciones españolas encuestadas (Hiscox 2024, vía [DCD](https://www.datacenterdynamics.com/es/noticias/57-de-las-empresas-destinan-apenas-1-y-10-del-presupuesto-de-ti-para-ciberseguridad/)) `[fuente secundaria; muestra de empresas con cierto tamaño, no representativa de micropymes]`. En 2022, empresas de 10–49 empleados: 23.374 € de coste medio (Hiscox vía [Forbes](https://forbes.es/ultima-hora/348283/el-coste-de-los-ciberataques-para-las-empresas-espanolas-aumenta-un-43-en-2022-segun-hiscox/)) `[dato antiguo]`.

### 3.2 Vector de entrada (Europa)

- ENISA Threat Landscape 2025 (≈4.900 incidentes, jul. 2024–jun. 2025): **phishing ≈60 %** del acceso inicial y **explotación de vulnerabilidades ≈21 %**; los atacantes explotan fallos recién publicados "en días". Fuente: [ENISA TL 2025](https://www.enisa.europa.eu/sites/default/files/2026-01/ENISA%20Threat%20Landscape%202025_v1.2.pdf); porcentajes vía [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/phishing-dominates-euwide/) `[porcentajes no contrastados en el PDF; existe una v1.3 de sept. 2026]`.

### 3.3 Problemas típicos del stack que propone el brief

| Stack | Hecho publicado | Fuente |
|---|---|---|
| WordPress | 11.334 vulnerabilidades nuevas en el ecosistema en 2025 (+42 %); 91 % en plugins, 9 % en temas; solo 6 en el core (todas de baja gravedad); 36 % consideradas amenaza real | [Patchstack, State of WordPress Security in 2026](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) |
| React / Next.js | **React2Shell (CVE-2025-55182)**, CVSS 10, RCE sin autenticación en React Server Components; una app `create-next-app` por defecto era vulnerable; explotación oportunista desde el 4/12/2025; en el catálogo KEV de CISA | [INCIBE-CERT](https://www.incibe.es/index.php/en/incibe-cert/publications/cybersecurity-highlights/exploitation-react2shell-vulnerability-cve-2025-55182), [VulnCheck](https://www.vulncheck.com/blog/cve-2025-55182-react-nextjs), [JFrog](https://research.jfrog.com/post/react2shell/) |
| Next.js | **CVE-2025-29927** (marzo 2025): bypass de autorización en middleware mediante la cabecera `x-middleware-subrequest`; afecta a apps que basan el control de acceso solo en middleware | Aviso de seguridad de Next.js/Vercel y NVD `[citado de conocimiento previo; enlazar el advisory oficial antes de usarlo externamente]` |
| APIs | Autorización a nivel de objeto (BOLA) y de función siguen encabezando el OWASP API Security Top 10 (edición 2023) | OWASP API Security Top 10 2023 |
| Infraestructura web | Servicios expuestos sin parchear: los 237.028 sistemas vulnerables notificados por INCIBE | INCIBE 2026 (arriba) |

Casos de empresas españolas concretas: `[PENDIENTE: recopilar incidentes publicados en España con fuente primaria antes de usarlos en ventas]`. No se citan nombres sin verificar.

### 3.4 Problemas que el cliente verbaliza (hipótesis para validar en entrevistas)

`[NO VERIFICADO — hipótesis de discovery]`
- Agencias: "el cliente final nos pide un informe de seguridad antes de pagar la entrega"; "mantenemos 40 WordPress y no sabemos cuál está en riesgo".
- Empresas de producto/scaleups: "un cliente enterprise nos ha mandado un cuestionario de seguridad"; "necesitamos un pentest para una due diligence o una licitación".
- Mediana empresa: "nuestro cliente regulado (banca, energía) nos exige evidencias por NIS2/DORA"; "no sabemos qué tenemos expuesto en internet".

---

## 4. Contexto regulatorio (solo contexto; estado a 2026-10-24)

### 4.1 NIS2 (Directiva (UE) 2022/2555)

- Plazo de transposición: 17/10/2024. España no cumplió.
- **Anteproyecto de Ley de Coordinación y Gobernanza de la Ciberseguridad** aprobado en primera vuelta por el Consejo de Ministros el **14/01/2025**. Fuentes: [Legiscope](https://www.legiscope.com/blog/nis2-espana-transposicion.html), [Ángel Ortega Castro](https://angelortegacastro.com/ley-coordinacion-gobernanza-ciberseguridad-nis2-estado-boe/).
- Dictamen motivado de la Comisión: mayo 2025; segunda advertencia fechada 19/05/2026 ([Moncloa.com, 01/06/2026](https://www.moncloa.com/2026/06/01/bruselas-exige-directiva-ciberseguridad-espana-3381035/)).
- **Remisión al TJUE** de España (junto a Francia, Irlanda y Países Bajos) el **08/07/2026**: [Hard2bit](https://hard2bit.com/blog/nis2-espana-tjue-transposicion-que-hacer-sin-ley/), anticipado por Politico vía [Freevacy](https://www.freevacy.com/news/politico/european-commission-to-take-france-and-spain-to-court-over-nis2-delays/7448). `[NO VERIFICADO en comunicado oficial de la Comisión]`.
- **Disolución de las Cortes**: Real Decreto 806/2026 (BOE 06/10/2026), elecciones el **29/11/2026**, constitución de las nuevas Cortes el 23/12/2026 ([Diario de León](https://www.diariodeleon.es/nacional/261006/2099432/boe-publica-rd-disolucion-cortes-convocatoria-electoral-29-noviembre.html)). Según varias fuentes, el texto **no llegó a remitirse como proyecto de ley** al Congreso ([Factorial](https://factorial.es/blog/?p=182614), [MobileWorldLive](https://www.mobileworldlive.com/spanish/las-elecciones-espanolas-del-29-n-dejan-en-el-cajon-las-leyes-de-ia-menores-y-deepfakes)) `[NO VERIFICADO en congreso.es]`.
- Contradicción: un handbook de ISMS Forum la da por transpuesta; las demás fuentes no. Prevalece "no transpuesta" hasta ver BOE.
- `[ESTIMACIÓN INTERNA]` Sin ley nacional antes de 2027. Implicación comercial: **no vender "cumplimiento NIS2"**. Sí es legítimo decir que NIS2 empuja a las entidades afectadas a exigir controles a sus proveedores, y que eso ya ocurre por contratos con clientes de otros Estados miembros que sí transpusieron.

### 4.2 ENS (Real Decreto 311/2022)

- Aplica a las administraciones públicas y a **entidades privadas que prestan servicios o soluciones al sector público** ([Andersen](https://es.andersen.com/en/blog/2022/05/05/el-nuevo-esquema-nacional-de-seguridad-aplicacion-a-las-empresas-del-sector-privado/)); los pliegos deben incluir requisitos de conformidad (art. 2.3), con declaración o certificación según categoría ([Gobierto](https://contratos.gobierto.es/preguntas/53immzze)).
- Plazo de adecuación: 04/05/2024 ([Fieldfisher](https://www.fieldfisher.com/es-es/insights/updates-on-spanish-ens-for-public-procurement-new-pce-for-the-health-sector)) `[confirmar en disposición transitoria del RD]`. Auditoría bienal en categorías media y alta; certificación por entidades acreditadas por ENAC.
- Implicación: agencias y software factories que licitan con la Administración necesitan evidencias técnicas. StateX puede aportar pruebas técnicas como **insumo** para su proceso de conformidad, nunca como certificación ENS.

### 4.3 DORA (Reglamento (UE) 2022/2554)

- Aplicable desde el **17/01/2025** en todo el sector financiero de la UE (reglamento: no requiere transposición). Incluye gestión del riesgo TIC de terceros y pruebas de resiliencia (TLPT para entidades seleccionadas).
- Implicación: los proveedores TIC de entidades financieras (fintech, software para banca/seguros) reciben cláusulas contractuales y cuestionarios. Oportunidad indirecta para el paquete Advanced. Los TLPT bajo TIBER-EU quedan fuera del alcance realista de StateX.

### 4.4 Cyber Resilience Act (Reglamento (UE) 2024/2847)

- Obligaciones de notificación de vulnerabilidades explotadas desde el **11/09/2026**; aplicación general el **11/12/2027** `[citado de conocimiento previo; verificar]`. Afecta a fabricantes de productos con elementos digitales; el SaaS puro queda en general fuera salvo procesamiento remoto ligado a un producto.
- Implicación: empresas que venden software instalable o dispositivos necesitarán procesos de gestión de vulnerabilidades. Línea futura, no prioritaria.

---

## 5. Ayudas públicas

| Programa | ¿Cubre ciberseguridad? | Estado a 2026-10-24 | Fuente |
|---|---|---|---|
| **Kit Digital** (Red.es, NextGenEU) | Sí, pero como **producto**: categoría Ciberseguridad 125 €/dispositivo (antivirus/EDR, etc.) y "Ciberseguridad gestionada" 200 €/dispositivo (segmentos II–III) | Plazo de solicitud **cerrado** (31/10, probablemente 2025); >880.000 ayudas concedidas | [Holded](https://www.holded.com/es/blog/kit-digital), [Xataka](https://www.xataka.com/n/te-han-concedido-ayuda-kit-digital-esta-hoja-ruta-que-tienes-que-seguir) `[año de cierre no verificado en Red.es]` |
| **Kit Consulting** (Red.es) | Sí: servicios "Ciberseguridad básica" (plan + adaptación SGSI a ISO 27001/ENS), "avanzada" y "preparación para certificación"; **6.000 € por servicio**, mínimo **100 h** por acuerdo; bonos de 12.000/18.000/24.000 € por tamaño (10–249 empl.) | Solicitudes **cerradas el 31/03/2025**; última ampliación de formalización de acuerdos hasta 31/05/2026. **Sin nueva convocatoria publicada** a 14/10/2026. La Orden TDF/38/2026 permitiría reinvertir remanentes | [La Moncloa 2024](https://lamoncloa.gob.es/serviciosdeprensa/notasprensa/transformacion-digital-y-funcion-publica/paginas/2024/kit-consulting-pymes-y-empresas.aspx), [Summum](https://summummarketing.es/kit-consulting/), [Promentconsulting 24/08/2026](https://promentconsulting.com/2026/08/24/kit-consulting-2026-nueva-convocatoria-fondos-remanentes/), [AECIM](https://acelerapyme-aecim.com/actualizacion-del-kit-consulting-nuevos-plazos-para-formalizar-acuerdos-de-asesoramiento-digital/) `[fuentes secundarias; confirmar en sede.red.gob.es]` |
| INCIBE (servicios gratuitos) | Línea 017, avisos de sistemas vulnerables, guías "Protege tu empresa" | Activo | [INCIBE](https://www.incibe.es/incibe/sala-de-prensa/incibe-detecto-mas-de-122000-incidentes-de-ciberseguridad-en-2025) |
| Ayudas autonómicas (p. ej. bonos de ciberseguridad regionales) | Variable | `[PENDIENTE: revisar Comunidad de Madrid, Cataluña (ACCIÓ), País Vasco (SPRI), Valencia (IVACE)]` | — |

Lectura:
- Hoy **no se puede usar una ayuda como argumento de venta**. Si Kit Consulting reabre, solo sirve si StateX se adhiere como asesor digital y adapta el servicio al formato (100 h, plan + SGSI), que no es su producto natural (técnico, no GRC). Recomendación: vigilar, no depender.
- Kit Digital ha generado un efecto secundario: muchas pymes creen que "ya tienen ciberseguridad" porque recibieron un antivirus subvencionado `[NO VERIFICADO — hipótesis]`.
- INCIBE ofrece gratis la parte básica (concienciación, avisos). StateX no debe vender lo que INCIBE regala; debe vender **verificación técnica de su caso concreto**.

---

## 6. Criterios de contratación (cómo compran)

`[Basado en prácticas habituales del sector y guías de compra de proveedores; validar en entrevistas]`

| Criterio | Pyme / agencia | Empresa de producto / scaleup | Mediana empresa |
|---|---|---|---|
| Disparador | Incidente, petición de un cliente, renovación de web | Cuestionario de cliente enterprise, due diligence, ronda, lanzamiento | Exigencia de cliente regulado, auditoría, licitación ENS, consejo |
| Decisor | Gerente / CEO de agencia | CTO / Head of Engineering | CISO, responsable IT, a veces compras |
| Ticket asumible | Bajo (cientos a pocos miles de €) | 4.000–15.000 € por pentest | 8.000–30.000 €; contratos marco |
| Qué pide | Precio cerrado, rapidez, informe entendible | Informe aceptable por terceros, retest incluido, metodología (OWASP WSTG/ASVS) | Referencias, seguro de RC profesional, NDA, metodología, experiencia del equipo, a veces certificaciones personales (OSCP, OSWE) |
| Bloqueo típico | "No tengo presupuesto" | "¿Os conoce algún cliente nuestro?" | "No estáis en nuestra lista de proveedores homologados" |

Requisitos transversales que StateX debe tener antes de vender pruebas activas:
- **Autorización escrita** del titular de los sistemas, alcance cerrado (dominios, IPs, entornos), **reglas de intervención** (ventanas, técnicas excluidas, contacto de emergencia) y autorización de terceros cuando el activo está en un hosting/cloud ajeno.
- NDA y acuerdo de tratamiento de datos (RGPD) si se accede a datos personales.
- Seguro de responsabilidad civil profesional que cubra servicios de ciberseguridad `[PENDIENTE: contratar]`.
- Informe de ejemplo (conversión secundaria de la web) `[PENDIENTE: crear con datos ilustrativos]`.

---

## 7. Competencia en España

Perfiles según fuentes públicas; varias comparativas son de los propios proveedores (sesgo).

| Tipo | Actores (ejemplos) | Fuerza | Debilidad / hueco para StateX | Fuente |
|---|---|---|---|---|
| Boutiques de pentesting y auditoría técnica | Tarlogic (2011, Galicia/Madrid), Zerolynx (Madrid; pentesting web/CMS, OWASP), Hard2bit, A3Sec | Marca, equipo, referencias, ENS/ISO en algunos casos | Ticket mínimo alto; poco foco en equipos de desarrollo pequeños | [Hard2bit comparativa 2026](https://hard2bit.com/blog/empresas-ciberseguridad-espana-seguridad-tecnica-grc-comparativa-2026/), [DeepStrike](https://deepstrike.io/blog/penetration-testing-companies-spain-2025), [ensun](https://ensun.io/search/pen-testing/spain) |
| Grandes integradores / MSSP | Entelgy Innotec, S21sec (Thales), Telefónica Tech, S2 Grupo, consultoras Big Four | Cuentas grandes, SOC 24/7, homologaciones | Caros y lentos para mediana empresa; poco interés en tickets <20 k€ | DeepStrike (arriba); resto `[NO VERIFICADO en esta investigación]` |
| Redes de hackers / bug bounty / PTaaS | Secur0 (>500 hackers éticos), Intigriti, YesWeHack, HackerOne | Escala, modelo por hallazgo | Requiere madurez para gestionar programas; precio anual (Intigriti mediana ≈44.000 $/año según Vendr) | [El Referente](https://elreferente.es/?p=188186), [Vendr](https://www.vendr.com/marketplace/intigriti) |
| Proveedores UE con precios publicados | Securitum (PL), Vaadata (FR), 7ASecurity (IE) | Transparencia de precio, remoto | Idioma, cercanía, contexto español | Ver `services-pricing.md` |
| Auditoría WordPress / mantenimiento | Escáneres automáticos (Auditsec: auditoría por 49 €), freelancers (Fiverr, Workana), hostings especializados | Precio muy bajo, automatizado | Superficial; no verifica explotabilidad ni prioriza | [hunted.space/Auditsec](https://hunted.space/product/auditsec); hostings `[NO VERIFICADO]` |
| Herramientas de EASM / escaneo | Plataformas SaaS de superficie de ataque | Continuidad, dashboards | Mucho ruido, poca verificación manual | `[PENDIENTE: mapear actores y precios]` |
| Gratis | INCIBE (avisos, 017), CCN-CERT | Coste cero | Genérico, no hace pruebas sobre tu aplicación | INCIBE |

Posición defendible para StateX `[ESTIMACIÓN INTERNA]`: **"seguridad para equipos que construyen aplicaciones web modernas"** — verificación manual + priorización, lenguaje de desarrollador (PRs, configuración de Next.js, cabeceras, autenticación de APIs), precio cerrado y retest incluido. Ni boutique "enterprise" ni escáner barato.

---

## 8. Evaluación honesta de los dos segmentos

### 8.1 Posicionamiento documentado: mediana empresa y scaleups (CTO/CISO/IT)

- **A favor:** ≈29.565 medianas (IPYME 06/2026); ticket viable (6.000–15.000 €); presión de cadena de suministro (NIS2 indirecta, DORA, ENS en licitación); interlocutor técnico que valora el método.
- **En contra:** compran a quien conocen; piden referencias, seguro, a veces certificaciones de equipo o empresa que StateX no tiene (y no debe inventar); ciclos de venta de 1–3 meses `[NO VERIFICADO]`; competencia directa con boutiques consolidadas.
- **Veredicto:** buen destino, mal punto de partida sin 3–5 casos reales.

### 8.2 Nuevo brief: pymes, agencias digitales y empresas que desarrollan apps web

| Sub-segmento | Atractivo | Riesgo | Veredicto |
|---|---|---|---|
| **Pyme generalista** (tienda, despacho, industria pequeña) | Muchísimas (181.740 pequeñas) | Poco presupuesto; sin ayudas abiertas; necesita más un MSP/IT que un pentest; venta 1 a 1 cara | **No priorizar.** Solo vía agencias. |
| **Agencias digitales** | Canal multiplicador (una agencia = decenas de webs); dolor real (WordPress: 11.334 vulnerabilidades en 2025) | Márgenes bajos; tienden a querer lo más barato; riesgo de convertirse en "mantenimiento WordPress" | **Sí como canal/partner**, con oferta marca blanca o co-firmada y precio por lote. |
| **Empresas de producto / software factories con Next.js, React, APIs** | Nicho técnico donde StateX tiene ventaja (ingeniería de software + seguridad); incidentes recientes muy visibles (React2Shell, CVE-2025-29927); disparadores claros (cliente enterprise, due diligence) | Exige calidad técnica alta desde el primer informe | **Prioridad 1.** Puente natural hacia scaleups. |

### 8.3 Recomendación de foco (aplicable sin más preguntas)

1. **Beachhead (0–12 meses):** empresas que desarrollan aplicaciones web y APIs (scaleups tempranas, software factories, SaaS B2B pequeños) + agencias como canal. Coincide con "scaleups" del posicionamiento y con "empresas que desarrollan apps web" del brief.
2. **Expansión:** mediana empresa con exposición externa (paquete Advanced + Private Advisory) cuando haya casos reales.
3. **Mensaje:** exposición externa y aplicaciones web, no "ciberseguridad integral". WordPress como capítulo dentro del Essential, no como marca de servicio.
4. **No prometer:** monitorización continua (roadmap), cumplimiento NIS2/ENS/DORA, respuesta a incidentes 24/7.

---

## 9. Oportunidades reales (con su base)

| Oportunidad | Base verificada | Acción |
|---|---|---|
| Revisión de apps Next.js/React tras React2Shell y CVE-2025-29927 | CVEs críticos con explotación real (INCIBE-CERT, VulnCheck) | Checklist técnica pública + oferta "revisión de configuración Next.js" dentro de Essential |
| Agencias con carteras WordPress | Patchstack 2025: 91 % de vulnerabilidades en plugins | Paquete por lote (p. ej. 10 sitios) con priorización; partner, no subcontrata anónima |
| Cuestionarios de seguridad de clientes enterprise / DORA | DORA aplicable desde 17/01/2025 | Advanced con informe ejecutivo apto para terceros + carta de retest |
| Licitaciones con ENS | RD 311/2022 art. 2.3 | Pruebas técnicas como evidencia de apoyo (no certificación) |
| Mediana empresa que "no sabe qué expone" | 237.028 sistemas vulnerables notificados por INCIBE en 2025 | Essential = descubrimiento + verificación de superficie externa |
| Kit Consulting si reabre | Orden TDF/38/2026 (remanentes) `[NO VERIFICADO]` | Vigilar sede de Red.es; decidir adhesión solo si encaja el formato |

---

## 10. Pendientes de verificación

- Estado oficial de NIS2 en congreso.es / BOE y comunicado de la Comisión del 08/07/2026.
- Fila España de Eurostat (isoc_cisce_ra, isoc_cisce_ic).
- Datos ONTSI 2024–2025 sobre ciberseguridad en empresas.
- Año exacto de cierre de Kit Digital y estado de Kit Consulting en sede de Red.es.
- Censo de agencias digitales / CNAE 62 (INE-DIRCE).
- Casos de incidentes en empresas españolas con fuente primaria.
- Ayudas autonómicas vigentes.
- Advisory oficial de CVE-2025-29927 y fechas del CRA.
