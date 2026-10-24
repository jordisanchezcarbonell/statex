# Benchmark de marcas premium para StateX ("quiet luxury" aplicado a ciberseguridad)

Fecha de consulta de todas las fuentes: **2026-10-24**, salvo que se indique otra.
Método: descarga de webs oficiales con WebFetch (extracción de texto/HTML a markdown, **sin render visual ni CSS**) y búsqueda de casos de estudio y prensa de diseño. Consecuencias del método:

- No se pudieron ver colores, tamaños, espaciados ni animaciones reales. Lo que se dice de eso viene de fuentes citadas o es **Interpretación**.
- Las webs que bloquearon la descarga o se renderizan solo con JavaScript se indican como tales. No se describe lo que contienen.
- Se intentó una descarga directa con `curl` para leer CSS (nombres de `font-family`) y el entorno la bloqueó. Ningún nombre de fuente sale del CSS.

Leyenda: **V** = Verificado (visto en la página o en una fuente citada). **I** = Interpretación.

## Estado de carga de las webs oficiales

| Marca | URL probada | Resultado |
|---|---|---|
| Porsche | porsche.com/international/ | Cargó |
| Ferrari | ferrari.com/en-EN, /en-US, /en-EN/magazine, /en-EN/corporate | **Contenido vacío** (renderizado por JS); no se pudo leer |
| Aston Martin | astonmartin.com/en | Cargó |
| Polestar | polestar.com/es/ | Cargó |
| Massimo Dutti | massimodutti.com/es/, /es/en | **HTTP 403** (bloqueado) |
| Loro Piana | loropiana.com/en/, /es/ | **Timeout** a los 60 s (dos intentos) |
| Brunello Cucinelli | brunellocucinelli.com/en | Cargó (sitio corporativo/filosofía) |
| COS | cos.com/en-es/, /en-gb/, /es-es/ | **HTTP 403** (bloqueado) |
| Apple | apple.com/es/ | Cargó |
| Bang & Olufsen | bang-olufsen.com/en/es | Cargó |
| Leica | leica-camera.com/en-int | Cargó parcialmente (sobre todo el menú; el cuerpo no se extrajo) |

---

## 1. Porsche

Fuentes: https://www.porsche.com/international/ · https://designsystem.porsche.com/v4/must-know/typography/

**V**
- Tipografía: el Porsche Design System dice que **Porsche Next** es la "global brand typeface", con pesos `normal`, `semibold` y `bold`. Cubre los alfabetos latino, griego, cirílico, árabe y vietnamita. Para CJK usa fuentes del sistema para no aumentar el peso de la página.
- Titulares: casi siempre el **nombre del modelo terminado en punto** ("Panamera 4.", "911 Targa 4 GTS.", "Porsche Experience."). Un único claim en frase completa invita a configurar el coche.
- CTAs: dos verbos, repetidos de forma sistemática: "Discover more" y "Explore".
- Estructura: hero, tres promociones de modelo (una con imagen en movimiento), aviso de consumo, configurador, rejilla de seis modelos y bloque "Discover".
- Descripciones de modelo factuales, de una línea (p. ej. el 911 descrito como deportivo icónico de motor trasero).
- Fotografía, según los textos alternativos: coche en contexto real (carretera, edificio moderno, montaña, boutique) y a menudo con una persona al lado. Los colores de pintura aparecen con su nombre (Carmine Red, Provence, Frozen Blue Metallic).

**I**
- El punto final convierte un nombre en una afirmación. Es seguridad tranquila: no hacen falta adjetivos.
- La calidad se transmite con consistencia: dos CTAs, un solo patrón de titular y una sola tipografía con tres pesos.
- La exclusividad viene del nombre propio de cada cosa (de un color, de un modelo) y del configurador, que hace sentir que el producto se hace a medida.

## 2. Ferrari

Fuentes: ferrari.com (vacía para WebFetch) · https://opendesigner.io/design-systems/ferrari · https://www.shadcn.io/design/ferrari/raw

**V**
- La web oficial **no pudo leerse**: las cuatro URL devolvieron contenido vacío. No se describe nada de ella.
- No se encontró una fuente oficial sobre su tipografía ni sobre la agencia de su web. Hay sitios de terceros que reconstruyen el sistema por ingeniería inversa y mencionan "FerrariSans", un "Body-Font" en mayúsculas con tracking amplio, el rojo `#da291c` y la alternancia de secciones oscuras cinematográficas con paneles blancos editoriales. **No son fuentes autorizadas.** Este documento no da por hecho ningún nombre de fuente de Ferrari.

**I**
- No se aporta interpretación sobre la web porque no se ha visto. Si interesa, se puede revisar a mano en el navegador.

## 3. Aston Martin

Fuentes: https://www.astonmartin.com/en · https://www.mediapost.com/publications/article/375831/aston-martin-intros-new-logo-brand-positioning.html · https://robbreport.com.sg/aston-martin-just-redesigned-its-iconic-winged-logo-for-the-first-time-in-two-decades/ (Design Week sobre el mismo tema devolvió 403)

**V**
- Rebrand de **julio de 2022**. El posicionamiento "Intensity. Driven." sustituye a "Beautiful is". Las alas se redibujaron con **Peter Saville**, que lo describió como evolución, no reinvención. Landor & Fitch hizo la estrategia y Superunion la expresión creativa. Las alas se fabrican a mano en el Jewellery Quarter de Birmingham.
- Patrón de titular en la web: un **tagline corto en mayúsculas terminado en "DRIVEN."** ("MASTERY. DRIVEN.", "ICON. DRIVEN.") sobre el nombre del modelo en title case.
- CTAs: "Explore", "Configure", "Build", "Enquire". En la barra superior solo hay dos acciones: "Configure" y "Enquire".
- La navegación es un mega-menú muy extenso (modelos por familia, Experiences, Owners, Our World, Corporate con inversores).
- Muchos textos alternativos son genéricos ("Hero Banner"). Los nombres de archivo indican renders de estudio en variantes claro/oscuro y fotos de pilotos de F1.
- El texto de la portada se apoya en la competición (citas de pilotos).

**I**
- Usa un sistema verbal de dos palabras que se repite en toda la web: es memorable, pero se acerca al eslogan publicitario.
- La exclusividad viene de la artesanía física (alas hechas a mano) y del acceso, con "Enquire" en lugar de "Comprar".
- Contraejemplo de quiet luxury: menú denso, mayúsculas, retórica de competición.

## 4. Polestar

Fuentes: https://www.polestar.com/es/ · https://www.polestar.com/global/news/journal-1/ · https://lineto.com/bespoke/polestar

**V**
- Tipografía: **Unica77**, adaptada por Lineto (espaciado y kerning más ajustados, retoques por letra y versiones en griego, cirílico, árabe y hebreo). Es una sola fuente para todos los canales, incluido el logotipo. Helvetica se descartó por "demasiado genérica". La propia marca dice que lo habitual es usar **un tamaño y un peso**.
- Paleta: monocroma (blanco y negro Polestar con grises intermedios). Los acentos se usan con moderación y el dorado se reserva a materiales físicos, nunca a la web.
- Principios: Pure / Progressive / Performance. El "Polestar Lock-up" convierte la información legal de origen en un elemento de marca.
- Web en España: comercial y directa (precio "Desde 41 900€", ofertas, "Reservar test drive", "Ver stock"), con muchas notas legales de financiación. Los encabezados de sección son frases cortas en sentence case, como el bloque de sostenibilidad sobre ser transparentes con los hechos.
- Fotografía, según los textos alternativos: vistas laterales de coche blanco y un bodegón de papel (ciudad, aerogeneradores) para hablar de carga y sostenibilidad.

**I**
- Es la referencia más útil de sistema para StateX. Muestra que la reducción (una fuente, monocromo, un solo acento) puede servir a una marca técnica y joven sin que parezca de moda.
- Convertir lo legal en marca es directamente aplicable: alcances, autorizaciones y metadatos de un informe pueden ser parte del diseño.
- Lo que no conviene tomar es la capa comercial de la web española (ofertas, precios, urgencia).

## 5. Massimo Dutti

Fuentes: massimodutti.com (403) · https://www.reasonwhy.es/actualidad/massimo-dutti-renueva-imagen-reforzar-posicionamiento-moda-premium · https://fashionunited.com/news/business/new-look-massimo-dutti-presents-new-logo/2024032159005 · https://www.creativebloq.com/news/massimo-dutti-logo · https://designcompass.org/en/2024/04/01/massimodutti-rebrand

**V**
- La web oficial **bloqueó la descarga (403)** en dos URL. No se describe.
- Rebrand de **marzo de 2024**. Un logotipo de "tipografía depurada" sustituye al logo caligráfico usado desde 1985, con el objetivo declarado de acercarse a un "lujo contemporáneo y silencioso". Se aplicó primero en la web y las redes, y llega a las tiendas de forma progresiva.
- Recepción: Creative Bloq describe una serif alta y limpia y recoge críticas en redes ("cheap", "nasty"). Design Compass critica la gran separación entre las dos palabras, que hace que parezcan dos marcas.

**I**
- Es una advertencia útil: anunciar "quiet luxury" y reducir el logo no basta. Si el gesto se percibe como tendencia y no como identidad propia, el público lo castiga.
- Es el riesgo exacto de StateX: adoptar una estética de moda sin una razón propia.

## 6. Loro Piana

Fuentes: loropiana.com (timeout) · https://archive.unit9.com/project/loro-piana-case-study/ (publicado el 2014-09-02) · https://www.purseblog.com/buzz-worthy/is-loro-piana-not-quiet-anymore/

**V**
- La web oficial **no cargó** (timeout en dos intentos). No se describe su estado actual.
- Caso de UNIT9 (2014, histórico): el objetivo no era vender. Era hablar a un **pequeño grupo de clientes top** "sin democratizar la marca". La fotografía se limitaba al producto, y modelos y escenarios se sustituían por ilustración y stop-motion que reflejaban la artesanía. Incluía un modo concierge (el dependiente registra al cliente en tienda y le envía piezas) y otro de autoservicio.
- Purseblog señala que la marca ha introducido recientemente un logo más visible tras años de casi anonimato. Esto no se ha verificado en otras fuentes.

**I**
- La exclusividad viene de **restringir y servir a pocos**: hablar al cliente top, ofrecer trato de concierge y enseñar el detalle del material.
- Para StateX, el equivalente es el trato directo con un responsable técnico identificado, no un embudo de captación.

## 7. Brunello Cucinelli

Fuente: https://www.brunellocucinelli.com/en

**V**
- El dominio principal es un **sitio de filosofía, no una tienda**. Tiene título "Philosophy, History, Company & Solomeo" y un menú **numerado del 1 al 12** con temas como "Humanistic Capitalism and Human Sustainability", "Technology, Humanism and Artificial Intelligence", "The Universal Library of Solomeo" o "Thoughts on the Contemporary World".
- El hero es una **cita de Kant** sobre la belleza y el bien moral. Le siguen bloques breves (AI, Creations, Online Boutique AI, Investor Relations), cada uno con un subtítulo de una línea.
- CTAs en mayúsculas: "EXPLORE", "DISCOVER MORE", "ONLINE BOUTIQUE". La tienda se enlaza como destino secundario.
- Las imágenes de sección tienen el `alt` vacío. Los nombres de archivo apuntan a un busto de Kant y a temas clásicos.
- Idiomas: inglés, italiano, chino y japonés.

**I**
- La calidad se transmite con un **punto de vista** antes que con el producto: la marca vende una ética.
- El menú numerado sí funciona aquí, porque es un índice de lectura.
- Aplicado a StateX, una posición pública y razonada sobre cómo entiende el riesgo puede pesar más que una lista de servicios. Hay que dosificarla: en ciberseguridad el registro filosófico puede sonar pretencioso.

## 8. COS

Fuentes: cos.com (403) · https://madegooddesigns.com/?p=51232 (secundaria, poco fiable)

**V**
- La web oficial **bloqueó la descarga (403)** en tres URL. No se describe.
- No se encontró ningún caso de estudio fiable sobre su identidad o su web. Un blog de identificación de fuentes dice que el logotipo es lettering sans a medida sin especificación pública. No se toma como hecho.

**I**
- Sin interpretación: no hay material verificado suficiente.

## 9. Apple

Fuentes: https://www.apple.com/es/ · https://developer.apple.com/fonts/

**V**
- Tipografía, según Apple Developer: **SF Pro** es la fuente de sistema, con 9 pesos, tamaños ópticos variables y 4 anchos. **New York** es la serif compañera y **SF Mono** la monoespaciada. Apple destaca el tracking dinámico y los tamaños ópticos. La licencia limita el uso a maquetas de interfaz para plataformas Apple, así que **no se puede usar en la web de StateX**. La página de fuentes no confirma qué fuente sirve apple.com.
- Patrón de la portada: **nombre de producto + tagline muy corto** ("iPhone 18 Pro" / "Mucho Pro."; "MacBook Air" / una frase sobre el chip M5).
- CTAs en pareja fija: "Más información" y "Comprar".
- Estructura: un bloque por producto, uno detrás de otro, y después Trade In, un carrusel de series y el footer con avisos legales y de energía.
- Tono: breve, seguro y algo lúdico, con tuteo. Las notas al pie son formales y regulatorias.

**I**
- Apple es la referencia de **jerarquía de dos niveles y par de CTAs constante**: cada bloque responde a qué es y qué hago ahora.
- La calidad está en la disciplina del sistema más que en el adorno. Las afirmaciones llevan nota al pie, y eso es transferible a StateX: decir menos y respaldar lo que se dice.

## 10. Bang & Olufsen

Fuentes: https://www.bang-olufsen.com/en/es · https://snask.com/case/bang-olufsen-creative-concept/ · https://frontify.com/en/resources/blog/rebrand-from-functional-experiential/ (no habla de B&O pese a aparecer en la búsqueda)

**V**
- El hero tiene tres palabras con punto ("Form. Function. Feeling."). Los encabezados son frases cortas. El texto habla de experiencia y de materiales, por ejemplo un altavoz descrito por tonos de piedras y minerales, más que de especificaciones.
- Hay un **control de pausa** en el hero, lo que indica medios en movimiento que se pueden pausar. Los precios se muestran sin rodeos en la lista de más vendidos (de 1.000 € a 4.200 €).
- Textos alternativos descriptivos y de estilo de vida, por ejemplo un altavoz en un salón con una persona en el sofá.
- Snask (caso): B&O estaba "muy técnica, fría y sin emociones". El concepto "ray of light" pasó de escenarios de galería a escenas cotidianas e imperfectas (cama sin hacer, peladuras de naranja).

**I**
- Es la lección más relevante para StateX: una marca técnica que se sentía fría se humanizó **sin perder precisión**.
- StateX puede compensar el frío técnico con lenguaje claro y con personas reales identificables, sin recurrir a la iconografía de "hacker".

## 11. Leica

Fuentes: https://leica-camera.com/en-int (extracción parcial, sobre todo navegación) · https://leicasocietyinternational.org/blog/63np0dtk9f1hu6as2pb38htacv1fwf · https://madegooddesigns.com/leica-brand-guidelines/ (secundaria)

**V**
- En la parte extraída, la navegación tiene cuatro entradas de primer nivel: Products / Experience Leica / Company / Service. Experience incluye Galleries, Akademie, Leica Heritage y Leica Welt (Wetzlar).
- Textos de servicio con frases cortas y directas sobre cuentas, prueba de cámaras y ayuda al cliente.
- Las miniaturas del menú, según sus textos alternativos, muestran fotografía de autor (arquitectura en blanco y negro, fotografía de calle), cámaras vintage y la fachada de una tienda con el logo rojo.
- Identidad: el punto rojo con el script blanco "Leica" se cita como logo corporativo desde 1999. Las fuentes **no coinciden** ni en la tipografía (lettering a medida, "LG 1050", "Corporate S" según un foro) ni en el rojo exacto. **No se da ningún nombre como hecho.**

**I**
- La autoridad de Leica viene de **la obra que permite hacer** (galerías, academia) más que de la cámara en sí.
- Para StateX, el equivalente es la investigación publicada y los ejemplos de informe: el trabajo como prueba.
- El rojo único y escaso es un recurso de marca muy reconocible, pero hay que evitar que el acento de StateX recuerde al de Leica, Ferrari o Porsche.

---

## Tabla comparativa

| Marca | Lectura | Tipografía (V) | Recurso clave | Utilidad para StateX |
|---|---|---|---|---|
| Porsche | V | Porsche Next, 3 pesos | Nombre + punto; 2 CTAs fijos | Alta (sistema verbal) |
| Ferrari | No legible | Sin confirmar | — | Nula (sin datos) |
| Aston Martin | V | Sin confirmar | Tagline "X. DRIVEN.", artesanía | Baja (contraejemplo) |
| Polestar | V | Unica77 a medida, 1 tamaño/1 peso | Monocromo, origen como marca | **Muy alta** |
| Massimo Dutti | 403 | Serif "depurada" (prensa) | Rebrand quiet luxury criticado | Advertencia |
| Loro Piana | Timeout | — | Pocos clientes, concierge (2014) | Media (modelo de servicio) |
| Brunello Cucinelli | V | Sin confirmar | Filosofía antes que producto | Media (punto de vista) |
| COS | 403 | — | — | Nula (sin datos) |
| Apple | V | SF Pro / New York / SF Mono (no licenciable) | Dos niveles + par de CTAs, notas al pie | Alta (jerarquía, respaldo) |
| Bang & Olufsen | V | Sin confirmar | Pasar de lo técnico y frío a lo cálido | Alta (tono) |
| Leica | Parcial | Fuentes en conflicto | La obra como prueba, acento único | Alta (investigación como credencial) |

## Principios transferibles a StateX

1. **Un sistema tipográfico mínimo.** *Tomar:* una familia (o sans + mono), pocos tamaños y pocos pesos, al estilo de Polestar y Porsche. *No tomar:* fuentes propietarias ni SF Pro, que no tiene licencia web. Usar fuentes libres de `next/font`.
2. **Titulares-afirmación cortos.** *Tomar:* nombre + punto, frase corta y verbo claro ("Superficie expuesta. Verificada."). *No tomar:* taglines publicitarios en serie ("X. DRIVEN.") ni mayúsculas gritonas.
3. **Dos niveles de jerarquía por bloque y un par de CTAs constante** ("Solicitar evaluación" / "Ver método"), como Apple y Porsche. *No tomar:* el mega-menú de Aston Martin.
4. **Monocromo y un solo acento**, como Polestar. *No tomar:* rojos que recuerden a Ferrari, Leica o Porsche, ni dorados.
5. **Lo legal y técnico como parte de la marca**, como el lock-up de origen de Polestar. *Tomar:* alcance, autorización, fecha y versión en los ejemplos de informe, con datos ilustrativos (`ejemplo.com`, `192.0.2.0/24`). *No tomar:* sellos o certificados decorativos.
6. **La obra como credencial**, como Leica. *Tomar:* investigación publicada (el archivo InfoStateX desde 2012) y un informe de ejemplo. *No tomar:* galerías aspiracionales ni lifestyle.
7. **Afirmación con respaldo**, como las notas al pie de Apple. *Tomar:* cada promesa con su método o su límite ("Hoy" frente a "Visión"). *No tomar:* cifras de impacto sin fuente.
8. **Frío técnico con calidez humana**, como B&O. *Tomar:* personas reales, voz en primera persona del plural y lenguaje claro. *No tomar:* escenas domésticas ni fotografía de estilo de vida.
9. **Exclusividad por acceso y trato, no por precio**, como Loro Piana y el "Enquire" de Aston Martin. *Tomar:* conversación directa con quien hace el trabajo y alcance acotado. *No tomar:* listas de espera falsas ni "solo para unos pocos".
10. **Un punto de vista propio**, como Brunello Cucinelli. *Tomar:* una tesis breve sobre el riesgo de exposición externa. *No tomar:* citas de filósofos ni tono grandilocuente.
11. **Fotografía de producto: no aplicable.** StateX no tiene un objeto físico. *Sustituir* por artefactos reales del trabajo: fragmentos de informe, diagramas de alcance y tipografía monoespaciada con datos ilustrativos.
12. **Motion mínimo y que se pueda pausar**, como el control de pausa de B&O. *Tomar:* transiciones discretas, respetando `prefers-reduced-motion`. *No tomar:* vídeo de fondo cinematográfico ni scroll-jacking.

## Riesgos

- **Parecer marca de moda y no de seguridad.** Serif de editorial de moda, mucho aire sin contenido y titulares vagos llevan a un "lookbook", no a una consultora. Contrapeso: densidad técnica visible (método, entregables, ejemplos) por debajo del hero.
- **"Quiet luxury" como etiqueta de tendencia.** Massimo Dutti muestra que anunciarlo y simplificar el logo puede leerse como algo genérico o barato. Hace falta una razón propia, como precisión, verificación y trazabilidad, no una moda.
- **Lujo que excluye al comprador real.** Un CTO o CISO de una empresa mediana necesita entender en 10 segundos qué se hace y cuánto cuesta empezar. Demasiado misterio reduce la conversión.
- **Prestigio prestado.** El tono de marcas centenarias no encaja con una firma en fase inicial y puede sugerir una escala que no existe. Hay que mantener la honestidad: firma de servicios, monitorización continua en el roadmap.
- **Colisión de identidad.** Un rojo único, el punto final como firma o una sans grotesca neutra pueden recordar a Ferrari, Leica, Porsche o Polestar. Conviene elegir un acento y unos recursos verbales propios.
- **Fuentes no licenciables.** SF Pro y las fuentes propietarias de automoción no se pueden usar.
- **Datos incompletos de este benchmark.** Ferrari, Massimo Dutti, COS y Loro Piana no pudieron leerse, y nada se vio renderizado. Antes de decidir sobre motion o color, revisarlas a mano en el navegador.
