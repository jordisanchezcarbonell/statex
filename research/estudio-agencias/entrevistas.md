# Entrevistas con agencias: guion y registro

Segunda parte del estudio: **cómo gestionan las agencias la seguridad de las webs que entregan y mantienen.**
Objetivo doble: publicar conclusiones anónimas (contenido real) y saber si existe un problema por el que
pagarían (validación de producto). Meta: 10–15 entrevistas de 20 minutos.

## Reglas

- **Es una entrevista, no una venta.** No se habla de precios ni de servicios salvo que la otra persona lo pida.
- **Anónimo.** En el informe no aparecen ni la agencia ni la persona. Se dice al principio.
- **Grabar solo con permiso explícito.** Si no, notas a mano.
- **No se revisa ninguna web durante la llamada.** Si al final quieren el resumen de las cabeceras de *su*
  web, se ofrece y se hace después (análisis pasivo, solo de su web, nunca de las de sus clientes).
- **Escuchar más que hablar.** Preguntar por hechos pasados ("la última vez que…"), no por opiniones sobre el futuro
  ("¿pagaríais por…?"), que casi siempre responden que sí por cortesía.
- Los datos personales (nombre, email) se guardan solo para el seguimiento, fuera del repositorio, y se borran si
  la persona lo pide.

## Guion (20 minutos)

**Apertura (2 min)**
> Gracias por tu tiempo. Estamos preparando la segunda parte de un estudio sobre seguridad web en agencias.
> La primera analizó 381 webs; ahora queremos entender cómo lo vivís por dentro. Es anónimo: no saldrá tu nombre
> ni el de la agencia. ¿Te importa si tomo notas? [¿Y si lo grabo, solo para no perder detalles?]

**Contexto (3 min)**
1. ¿Cuántas personas sois y qué tipo de proyectos hacéis?
2. ¿Cuántas webs mantenéis ahora mismo, más o menos? ¿Con qué tecnología (WordPress, a medida, Shopify…)?
3. ¿Quién se encarga del mantenimiento: vosotros, el cliente, un tercero?

**Cómo lo hacen hoy (5 min)**
4. Cuando entregáis una web, ¿qué hacéis en cuanto a seguridad? ¿Hay una lista o depende de quién la haga?
5. ¿Dónde están alojadas (hosting compartido, servidor propio, Vercel/Cloudflare…)? ¿Quién configura el servidor?
6. ¿Cómo os enteráis de que hay que actualizar un plugin o de que algo está mal?

**Problemas reales (6 min)**
7. ¿Os ha pasado alguna vez un incidente en una web de un cliente (hackeo, spam, malware, caída)?
   ¿Qué pasó? ¿Cuánto tiempo os llevó? ¿Quién lo pagó?
8. ¿Algún cliente os ha pedido algo de seguridad: un informe, un cuestionario, cumplir algo (RGPD, NIS2, un cliente grande)?
   ¿Qué hicisteis?
9. ¿Qué parte de todo esto os quita más tiempo o más tranquilidad?

**Gasto y herramientas (2 min)**
10. ¿Pagáis hoy por algo relacionado (plugin de seguridad, mantenimiento, copias, un proveedor)? ¿Cuánto, aproximadamente?
11. ¿Lo repercutís al cliente? ¿Cómo lo llamáis en el presupuesto?

**Cierre (2 min)**
12. Si pudieras resolver una sola cosa de todo esto, ¿cuál sería?
13. ¿Conoces a otra agencia que debería participar? (pedir presentación)
> Te enviaremos el informe antes de publicarlo. Y si te sirve, te mando un resumen de las cabeceras de seguridad
> de vuestra web, sin compromiso. ¿Te lo envío?

## Qué apuntar después de cada entrevista (registro)

Guardar en una hoja fuera del repositorio (con datos personales mínimos):

| Campo | Ejemplo |
|---|---|
| Fecha | 2026-11-12 |
| Agencia (código, no nombre, para el informe) | A07 |
| Tamaño / nº de webs mantenidas | 8 personas / ~40 webs |
| Tecnología principal | WordPress + hosting compartido |
| Quién mantiene | La agencia, con contrato mensual |
| Incidente en los últimos 2 años | Sí: malware en 3 webs, 2 días de trabajo |
| Petición de seguridad de un cliente | Sí: cuestionario de un cliente grande |
| Gasto actual en seguridad | Plugin premium, ~100 €/año por web |
| Dolor principal (sus palabras) | "No sabemos cómo están las webs hasta que algo falla" |
| Señal de socio de diseño | Alta / media / baja |
| Pidió presentación o resumen | Sí / no |
| Siguiente paso | Enviar resumen de cabeceras el lunes |

## Señales de que puede ser un socio de diseño

- Mantiene muchas webs (20 o más) y lo cobra al cliente.
- Ha tenido incidentes recientes o peticiones de seguridad de clientes.
- Ya gasta dinero en esto y no está contenta con la solución.
- Pregunta por sí misma "¿y vosotros qué hacéis?".

A estas agencias, y solo a ellas, se les puede proponer después el pack con descuento a cambio de opinión.

## Análisis al llegar a 10 entrevistas

- ¿Cuántas han tenido un incidente? ¿Cuántas han recibido peticiones de seguridad de clientes?
- ¿Qué dolor se repite con las mismas palabras? (es el mensaje para la web)
- ¿Cuánto gastan hoy? (es la referencia de precio)
- ¿Cuántas encajan como socio de diseño?

Las conclusiones agregadas y anónimas forman el informe de la segunda parte (`/investigacion`).

## Correo de seguimiento (el mismo día)

> **Asunto:** Gracias por la entrevista
>
> Hola [nombre]:
>
> Gracias por tu tiempo hoy, nos ha ayudado mucho. Cuando tengamos las conclusiones te enviaremos el informe antes de publicarlo.
>
> [Si lo pidió:] Te adjunto el resumen de las cabeceras de seguridad de vuestra web, con lo que se puede corregir rápido.
>
> [Si ofreció presentación:] Y gracias por ofrecerte a presentarnos a [agencia]; aquí tienes un texto corto por si te es más fácil reenviarlo: […]
>
> Un saludo,
> Jordi
