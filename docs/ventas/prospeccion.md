# StateX — Guía de prospección y plantillas de correo

Objetivo: conseguir las primeras conversaciones con empresas y llevarlas a la web (sección **Ofertas** y formulario de contacto del Concept E).

## 1. Antes de escribir: lo que permite la ley en España

> No es asesoramiento legal. Antes de lanzar campañas, consúltalo con un abogado especializado en protección de datos.

- **LSSI, artículo 21:** prohíbe enviar comunicaciones comerciales por email (o medio electrónico equivalente) que **no hayan sido solicitadas o autorizadas expresamente** por el destinatario. Aplica también a empresas y a direcciones genéricas (info@, contacto@). La AEPD sanciona estos envíos.
- **Excepción:** si ya existe una **relación contractual previa** con esa persona o empresa y le ofreces servicios similares, dándole siempre la opción de darse de baja.
- **RGPD:** cualquier dato de contacto que guardes (nombre, email, empresa) necesita una base legal, una finalidad clara y la posibilidad de ejercer derechos (acceso, supresión…).
- **Siempre:** identifícate (StateX y quién escribe), explica por qué contactas y ofrece una forma sencilla de no recibir más mensajes.

**Conclusión práctica:** nada de listas compradas ni envíos masivos en frío. Prioriza canales con consentimiento o relación previa:

| Canal | Por qué funciona |
|---|---|
| Presentaciones de tu red (warm intro) | La otra persona acepta el contacto; tasa de respuesta mucho mayor |
| Eventos, meetups y charlas de seguridad | Contacto en persona y permiso para seguir hablando |
| LinkedIn: contenido y conversación (no spam) | Atrae a quien ya está interesado; aplica igualmente el criterio de no enviar publicidad no solicitada |
| Antiguos clientes o colaboradores | Excepción de relación previa |
| Contenido técnico (StateX Lab) con suscripción | Construye una lista con consentimiento explícito |

## 2. Plantillas

Sustituye lo que va entre corchetes. Mantén los mensajes cortos: una idea, una petición.

### A. Tras una presentación de un contacto común

**Asunto:** [Nombre del contacto] nos ha presentado: seguridad de la superficie expuesta de [Empresa]

> Hola [Nombre]:
>
> [Contacto común] me comentó que en [Empresa] estáis [contexto: lanzando una nueva aplicación / creciendo en cloud / preparando una auditoría].
>
> En StateX ayudamos a empresas a descubrir lo que exponen en internet, verificar qué es explotable de verdad y entregar un plan de corrección priorizado para el equipo técnico.
>
> ¿Te encaja una llamada de 20 minutos la semana que viene para ver si tiene sentido una evaluación inicial? Aquí tienes cómo trabajamos: [enlace a la web]#ofertas
>
> Un saludo,
> [Tu nombre] · StateX

### B. Seguimiento tras un evento

**Asunto:** Lo que hablamos en [evento]

> Hola [Nombre]:
>
> Encantado de conocerte en [evento]. Te escribo porque comentaste [problema concreto que mencionó].
>
> Es justo el tipo de cosas que revisamos en la **evaluación inicial de exposición**: inventario de lo expuesto, verificación de los hallazgos de mayor riesgo y una sesión de resultados con tu equipo.
>
> Si te interesa, puedes pedirla directamente aquí: [enlace]#ofertas. O responde a este correo y lo concretamos.
>
> Un saludo,
> [Tu nombre] · StateX

### C. A un antiguo cliente o colaborador (relación previa)

**Asunto:** Algo nuevo en lo que te puedo ayudar

> Hola [Nombre]:
>
> Después de [proyecto anterior], he puesto en marcha StateX, centrada en ciberseguridad: evaluación de la superficie expuesta, auditorías de aplicaciones web y revisión de arquitectura.
>
> Si en [Empresa] tenéis algo que os preocupe en este terreno, estaré encantado de echarle un vistazo: [enlace]#ofertas
>
> Si prefieres no recibir este tipo de mensajes, dímelo y no volveré a escribirte sobre ello.
>
> Un saludo,
> [Tu nombre]

### D. Respuesta a una solicitud del formulario

**Asunto:** Tu solicitud de [oferta] en StateX

> Hola [Nombre]:
>
> Gracias por escribirnos. Para preparar una propuesta cerrada necesito:
>
> 1. Los dominios o aplicaciones que quieres incluir.
> 2. Una persona de contacto técnica.
> 3. Cualquier restricción de horario o de sistemas que no debamos tocar.
>
> Con eso te envío el alcance y la autorización para firmar. Ninguna prueba empieza sin ese documento firmado.
>
> Un saludo,
> [Tu nombre] · StateX

## 3. Qué falta para empezar a vender

- [ ] Dominio propio y email profesional (p. ej. hola@[dominio]).
- [ ] Conectar el formulario: crear cuenta en Resend, verificar el dominio y configurar `RESEND_API_KEY`, `CONTACT_TO` y `CONTACT_FROM` (ver `.env.example`).
- [ ] Política de privacidad y aviso legal (datos de la empresa).
- [ ] Precios o rangos orientativos de las tres ofertas.
- [ ] Modelo de documento de alcance y autorización (revisado por un abogado).
- [ ] Un informe de ejemplo anonimizado para enseñar en las reuniones.
