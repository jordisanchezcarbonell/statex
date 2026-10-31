# La seguridad que no se ve: cabeceras de seguridad en 381 webs de agencias y empresas digitales en España

> **Borrador para revisión (2026-10-31).** No publicar hasta revisarlo. Cifras de `resumen.md`, generadas con
> `escanear.mjs` y `agregar.mjs`. Los resultados por web no se publican ni se comparten.

## En 30 segundos

- **Una de cada dos webs (52 %) no tiene ninguna** de las seis cabeceras de seguridad básicas que analizamos.
  En las agencias, el 57 %.
- **Solo el 8 % las tiene todas.** En las agencias, el 5 %.
- **El HTTPS ya está resuelto** (96 %). Lo que falta es todo lo que va encima: solo el 30 % obliga al
  navegador a usar siempre HTTPS (HSTS) y solo el 21 % define una política de contenido (CSP).
- **El 61 % de las agencias usa WordPress**, y más de la mitad de esas webs muestra públicamente qué versión usa.
- **Solo el 3 % publica un contacto para avisar de fallos de seguridad** (`security.txt`).

Ninguna de estas ausencias es, por sí sola, una vulnerabilidad. Son capas de protección gratuitas que
reducen el impacto de un fallo cuando aparece. Que falten casi todas a la vez indica que la seguridad
no forma parte del proceso de entrega.

## Por qué importa a una agencia

Una agencia entrega y mantiene decenas de webs con la misma plantilla y la misma configuración de
servidor. Lo que falta en su propia web suele faltar también en las de sus clientes. Y cuando un
cliente pasa una revisión de seguridad (por exigencia de un cliente grande, de un seguro o de la
normativa), la pregunta llega a la agencia.

La buena noticia: casi todo lo que mide este estudio se corrige en la configuración del servidor o
del CDN, en minutos, y se aplica a todas las webs a la vez.

## Resultados

Porcentaje de webs que cumplen cada indicador.

| Indicador | Todas (381) | Agencias (148) | IT (233) |
|---|---:|---:|---:|
| Responde por HTTPS | 96 % | 96 % | 96 % |
| Redirige de HTTP a HTTPS | 88 % | 87 % | 89 % |
| Certificado TLS con error | 4 % | 5 % | 4 % |
| HSTS (sobre las que usan HTTPS) | 30 % | 24 % | 34 % |
| Content-Security-Policy | 21 % | 19 % | 23 % |
| · CSP estricta (sin `unsafe-inline`/`unsafe-eval`) | 11 % | 14 % | 10 % |
| Protección contra clickjacking | 29 % | 20 % | 34 % |
| `X-Content-Type-Options: nosniff` | 27 % | 20 % | 31 % |
| Referrer-Policy | 20 % | 16 % | 23 % |
| Permissions-Policy | 17 % | 14 % | 18 % |
| Revela versión de servidor o framework | 29 % | 29 % | 29 % |
| Cookies sin atributo `Secure` (sobre HTTPS) | 13 % | 11 % | 15 % |
| Publica `security.txt` válido | 3 % | 1 % | 4 % |
| Usa WordPress | 51 % | 61 % | 44 % |
| · Muestra la versión de WordPress | 58 % | 57 % | 58 % |

Cuántas de las seis cabeceras clave tiene cada web (HSTS, CSP, clickjacking, nosniff, Referrer-Policy,
Permissions-Policy):

| Cabeceras | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Webs | 198 | 60 | 35 | 23 | 11 | 25 | 29 |
| % | 52 % | 16 % | 9 % | 6 % | 3 % | 7 % | 8 % |

La mediana es **0 de 6**. Las webs se reparten en dos grupos: la mayoría no tiene casi nada y una
minoría (15 %) tiene cinco o seis. Lo habitual es que alguien lo configure todo de una vez o que no se
configure nada.

## Qué significa cada indicador

- **HSTS:** obliga al navegador a usar HTTPS siempre, incluso si alguien escribe `http://`. Sin él, la
  primera visita puede ser interceptada en una red insegura.
- **Content-Security-Policy (CSP):** define desde dónde puede cargar scripts la web. Si alguien consigue
  inyectar código (XSS), una CSP bien hecha impide que se ejecute.
- **Protección contra clickjacking** (`X-Frame-Options` o `frame-ancestors`): impide que otra web cargue
  la tuya dentro de un marco invisible para engañar al usuario.
- **nosniff:** evita que el navegador interprete un archivo como si fuera de otro tipo.
- **Referrer-Policy:** controla qué parte de la URL se envía a otras webs al salir.
- **Permissions-Policy:** limita el acceso a cámara, micrófono o geolocalización.
- **Versión expuesta:** anunciar `Apache/2.4.x`, `PHP/7.x` o la versión de WordPress facilita a un atacante
  saber qué fallos conocidos probar.
- **security.txt:** un fichero estándar con el contacto para avisar de un fallo. Sin él, quien encuentra
  algo no sabe a quién escribir.

## Cinco correcciones de bajo coste

1. Añadir las seis cabeceras en el servidor o el CDN (Nginx, Apache, Cloudflare, Vercel). Una vez por
   servidor, para todas las webs.
2. Activar HSTS cuando el HTTPS ya funciona en todo el dominio.
3. Ocultar las versiones de servidor, PHP y WordPress.
4. Empezar la CSP en modo informe (`Content-Security-Policy-Report-Only`) para no romper nada, y endurecerla después.
5. Publicar `/.well-known/security.txt` con un email de contacto.

## Metodología

- **Muestra:** 453 entradas de OpenStreetMap en España con web propia y etiqueta de agencia de
  publicidad, marketing o diseño gráfico ("agencias") o de empresa IT ("IT"), consultadas el 2026-10-31.
  Tras quitar duplicados y redes sociales quedan 437 dominios. Se excluyen 56: sin DNS (19), sin respuesta
  (25), `robots.txt` que prohíbe todo acceso (11) e IP privada (1). Quedan **381 webs analizadas**.
- **Qué se hace:** por cada web, una visita a la página de inicio por HTTPS y otra por HTTP, la lectura de
  `robots.txt` y la de `/.well-known/security.txt`. Es lo mismo que ve cualquier navegador. No se envían
  formularios, no se prueban rutas, no se escanean puertos ni se intenta acceder a nada. Las peticiones
  se identifican como `StateX-estudio/1.0` con un enlace a nuestra web.
- **Qué no mide:** solo la página de inicio y solo cabeceras y señales públicas. No dice si una web es
  vulnerable: una web sin estas cabeceras puede estar bien mantenida, y una con todas puede tener fallos
  graves en su código.
- **Limitaciones:** la muestra es la que hay en OpenStreetMap, no un censo ni una muestra aleatoria. Está
  sesgada hacia empresas con presencia física registrada en el mapa y no representa a todo el sector.
  Las cifras son orientativas.
- **Privacidad:** no se recogen datos personales. Los resultados por dominio se guardan en privado y solo
  se publican cifras agregadas. No se nombra a ninguna empresa.
- **Reproducible:** el código del análisis está en `research/estudio-agencias/`.

Datos de la muestra: © colaboradores de OpenStreetMap, disponibles bajo licencia ODbL.

---

**¿Quieres saber cómo está tu web?** [Pendiente de decidir: enlace al comprobador público o a la evaluación inicial.]
