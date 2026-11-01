# LinkedIn — borrador, no publicado

Probamos una IA local para una actualización de dependencia ya indicada. Rechazamos su propuesta antes de que modificara archivos.

El primer piloto reveló dos problemas distintos: un defecto en nuestro adaptador stdout y un plan incompleto. Corregimos el encuadre y ejecutamos un único segundo piloto con los mismos pesos, prompt y semilla 42. Produjo exactamente la misma respuesta incompleta.

Resultado: cero acciones del modelo ejecutadas y ningún parche de IA. El control determinista sí superó la aceptación, pero no lo atribuimos al modelo ni lo usamos como respaldo.

La observación de seguridad sigue inconclusa. No demostramos confidencialidad ni reparación autónoma, y dos pilotos con la misma semilla no miden una tasa de éxito ni la capacidad general del modelo.

La decisión práctica: validar una propuesta antes de permitir sus efectos y mantener la aceptación fuera del alcance del agente.

Jordi Sánchez · StateX

---

Enlace editorial previsto: `/blog/ia-local-actualizar-dependencia`. Añadir la URL pública definitiva solo después de aprobar y realizar la publicación. Este texto no se ha enviado a LinkedIn.
