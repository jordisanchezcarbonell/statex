# Borrador para StateX — no publicado

**Corregir la integración del modelo no basta para conseguir una reparación.**

En el laboratorio ficticio de StateX probamos una actualización ya indicada: pasar una dependencia Node.js vulnerable de cross-spawn 7.0.3 a 7.0.5. Un plan determinista consiguió generar el parche y superar las pruebas funcionales. Esa comparación valida el camino del ejecutor; no cuenta como reparación hecha por IA.

Después ejecutamos dos pilotos locales con Qwen2.5-Coder-1.5B-Instruct cuantizado, los mismos pesos, prompt, semilla 42 y límites. El modelo solo recibía los documentos autorizados y proponía acciones JSON. Un ejecutor separado podía aplicarlas; npm calculaba el lockfile; las pruebas independientes y el controlador quedaban fuera de su alcance de escritura.

El primer piloto fue rechazado porque el CLI añadió un marcador a stdout. Al analizarlo encontramos además un plan incompleto. Corregimos exclusivamente ese encuadre y ejecutamos un único piloto nuevo: volvió a producir exactamente la misma respuesta, proponiendo leer y cambiar package.json, pero omitiendo el lockfile, instalación, validación y exportación.

El validador rechazó el lote completo. No ejecutamos sus acciones, no completamos su plan y no usamos un respaldo determinista. Resultado: cero parches de IA aceptados en ambos pilotos. La generación tardó 26,27 y 27,60 segundos respectivamente, incluyendo carga y tracing. Dos ensayos con la misma semilla no permiten estimar una tasa general de éxito.

También conservamos un resultado incómodo pero necesario: la observación de seguridad es inconclusa. Aunque el observador estuvo adjunto antes de ejecutar el runtime y no detectó interrupciones, todavía hay huecos al interpretar mmap, hilos y descriptores compartidos, además de operaciones de Node/npm. Que un secreto ficticio no aparezca en la salida no demuestra que no se haya leído. Tampoco trasladamos a este runtime las conclusiones de un perfil estático más limitado.

Lo observado es una prueba acotada de propuestas de herramientas para una actualización conocida. No demuestra descubrimiento autónomo de vulnerabilidades, reparación autónoma ni confidencialidad. Todos los datos y secretos fueron ficticios, la inferencia fue local y no hubo despliegue ni publicación automática. Conservamos ambos resultados, el control determinista y sus evidencias para revisión.

Nota editorial: este archivo es un borrador local. Antes de cualquier publicación deberá revisarse su contenido y decidir qué artefactos compartir; no se ha realizado esa publicación.
