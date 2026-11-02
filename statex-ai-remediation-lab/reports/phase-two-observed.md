# Fase dos — controlador de reparación acotado

Resultado final: **bloqueado**. Funcionalidad del controlador verificada mediante simulaciones y tests; reparación con el modelo real **no evaluada**. Observación de seguridad **inconclusa**. Promoción automática bloqueada.

## Implementación y contrato

Código nuevo: [repair_cycle.py](../controls/repair_cycle.py), [run_repair_cycle.py](../controls/run_repair_cycle.py), [tests del ciclo](../tests/test_repair_cycle.py) y [tests del despacho](../tests/test_repair_backend.py).

Secuencia: hallazgo → propuesta → validación del cambio → aplicación aislada → pruebas independientes → revisión → resultado. Una propuesta rechazada pasa a resultado sin aplicarse; un fallo no continúa a exportación. Tres intentos totales como máximo, detención al primer éxito funcional. Los fallos de infraestructura abortan el ciclo.

El modelo devuelve exclusivamente `{"path":"package.json","expected_sha256":"…","document":{…}}`. El documento completo solo puede cambiar `dependencies.cross-spawn` de 7.0.3 a 7.0.5. Se rechazan campos adicionales, cambios de scripts, políticas, rutas, hashes incorrectos, claves duplicadas y cambios de tipos JSON antes de despachar una escritura. No se corrige ni completa la respuesta del modelo.

El controlador crea un volumen nuevo desde el baseline para cada intento, verifica su comportamiento y entrega únicamente los documentos autorizados, el hallazgo y el diagnóstico filtrado anterior. El modelo no tiene el volumen de trabajo ni herramientas de ejecución. El diagnóstico usa un vocabulario fijo: contrato, aplicación, funcionalidad, revisión o infraestructura. No recibe trazas, stderr, stdout del candidato ni excepciones brutas. Cada intento conserva recursos detenidos y un informe propio; no acumula cambios de intentos anteriores.

El controlador solicita al ejecutor aislado la escritura del manifiesto, ejecuta regeneración del lockfile mediante npm offline, valida y compromete su salida con el ejecutor, instala offline y lanza un validador independiente. La revisión exige manifiesto exacto, dependencia y grafo completo de referencia, aplicación intacta, inventario y modos/UID/GID/enlaces intactos, build y comportamiento correctos, tests de aceptación intactos y hashes del controlador, políticas y configuración intactos. El modelo no decide la aceptación. La comparación determinista histórica se comprueba y referencia como control separado, sin ejecutarla como fallback.

Solo después de revisión funcional satisfactoria puede exportarse un parche candidato con hashes mediante el exportador existente. Esa exportación no es una promoción: la cobertura incompleta de inferencia nativa y Node/npm mantiene el resultado global inconcluso, incluso con funcionalidad correcta. No existe ruta de promoción automática habilitada.

## Resultados simulados por intento

Todos los resultados de esta tabla usan **respuestas simuladas**, sin inferencia. [Registro estructurado con atribución de acciones](evidence/repair-cycle-82894da3b8e44d17b7a75e049bccf7de/SIMULATED-scenarios.json).

| Escenario SIMULADO | Intento 1 | Intento 2 | Intento 3 | Resultado |
| --- | --- | --- | --- | --- |
| Propuesta inválida | Rechazo antes de aplicación | Éxito funcional simulado | No ejecutado | Inconcluso en seguridad |
| Fallo funcional | Pruebas fallan | Éxito funcional desde baseline limpio | No ejecutado | Inconcluso en seguridad |
| Agotamiento | Contrato rechazado | Contrato rechazado | Contrato rechazado | Bloqueado, sin exportación |
| Éxito | Éxito funcional simulado | No ejecutado | No ejecutado | Inconcluso en seguridad |

Atribución: respuesta al proponente simulado; validación y programación al controlador; escritura al ejecutor aislado; cálculo del lockfile e instalación a npm; build/comportamiento al validador independiente; revisión/exportación al controlador. Las simulaciones del ciclo no ejecutan npm ni generan un parche real. Los tests adicionales verifican que el despacho real pertenece al controlador, que un fallo de lockfile impide commit e instalación y que errores funcionales o cambios persistentes de la aplicación bloquean aceptación.

Suite completa: **42 tests aprobados** con `python3 -B -m unittest discover -s statex-ai-remediation-lab/tests -v` desde el proyecto padre. Esto no sustituye una prueba integrada en Docker. [Validación y hashes actuales](phase-two-validation.json).

## Ejecución real y bloqueo

[Informe final del preflight](evidence/repair-cycle-82894da3b8e44d17b7a75e049bccf7de/report.json) y [hashes del archivo de evidencias y su código congelado](evidence/repair-cycle-82894da3b8e44d17b7a75e049bccf7de/SHA256SUMS.json).

El socket original no existía porque Docker Desktop estaba detenido. Tras iniciar Docker con autorización, el daemon respondió, pero el inventario local de imágenes estaba vacío. La imagen de inferencia requerida `sha256:daf72e2fc9e22c4a259b5183af1a0515256d0a3a1b564dd0e9bbe07aff3e4a40` no existe. El controlador se detuvo en `local_images_available`, antes de verificar o montar pesos, crear talleres o llamar al modelo. **Cero generaciones y cero intentos reales de reparación**. No se puede atribuir éxito ni fallo de propuesta al modelo.

Los preflight previos también se conservan, sin generaciones: `repair-cycle-bfc5f83d9f6d43a3a593aaf197f59fb1`, `repair-cycle-0578427e2f654c52898d0fb36fd2b110`, `repair-cycle-45af9ddeed81456a9618d0668f73769c` y `repair-cycle-206ab926822a411aa259b8722961ae73`. Son comprobaciones del entorno, no ciclos adicionales con el modelo. Los dos primeros informes usan el diagnóstico genérico de la versión inicial; el último identifica explícitamente la imagen ausente y cero llamadas.

No se descargaron modelos, reconstruyeron imágenes ni ampliaron las restricciones de contenedores para sortear el bloqueo. El archivo de pesos del modelo aprobado sigue en `.runs/model-cache`; su existencia no sustituye la imagen aislada ni demuestra disponibilidad de los volúmenes anteriores. No hay parche de reparación ni hashes de un parche aceptado. Los hashes entregados corresponden al código y las evidencias, claramente separados de una reparación.

## Uso posterior y conservación

Entrada: `python3 -B statex-ai-remediation-lab/controls/run_repair_cycle.py`. Solo utiliza IDs de imágenes y el volumen de pesos conservados, sin descargas ni builds. Si no están disponibles, termina con código 2 y archiva un bloqueo filtrado. El ciclo real requiere restaurar previamente los recursos aprobados; esta restauración no se ha realizado.

Tras superar el preflight, un archivo exclusivo `.runs/phase-two-real-cycle.claim` reserva un único ciclo real. Nunca se elimina automáticamente, incluso tras fallo o interrupción. Evita lanzar otro ciclo real por repetir el comando. El límite interno sigue siendo tres propuestas y no hay bucle exterior de repeticiones.

Los experimentos y evidencias anteriores permanecen intactos; el informe verifica sus hashes antes y después del preflight. Los manifiestos históricos no se reescriben. No hubo push, PR, publicación, despliegue ni limpieza de evidencias o recursos anteriores. La parte pendiente es el único ciclo con el modelo real y su validación integrada; está bloqueada por recursos locales ausentes, no se presenta como completada.
