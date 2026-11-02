> Informe histórico del perfil estático. El estado de la reparación por herramientas está en [observed.md](observed.md).

# Informe observado — ciclo completo acotado, sin modelos

Ejecución final: **2026-11-01, 19:06:27 UTC**. Suite: `lifecycle-718ad0043ffd4755b92feaf8b129408a`. Resultado: **código 0, `suite_passed=true`**. Modelos: **bloqueados**; no se conectó ninguno, no hubo reparación de IA, despliegue ni publicación.

Se implementó y ejecutó la observación de un programa estático desde antes de su primer exec hasta la terminación de todos sus descendientes. La tabla siguiente contiene resultados nuevos; no es una repetición de la calibración anterior. El baseline Node de la fase anterior no se volvió a ejecutar en esta entrega y se conserva en [phase1-observed.md](phase1-observed.md).

## Código y evidencias

- [lifecycle_suite.py](../controls/lifecycle_suite.py): ciclo de lanzamiento, observación, salud, recogida, exportación y limpieza.
- [lifecycle_analyze.py](../controls/lifecycle_analyze.py): contabilidad de procesos/FD, identidades y clasificación inconclusa ante cobertura desconocida.
- [bootstrap.c](../controls/lifecycle/bootstrap.c), [probe.c](../controls/lifecycle/probe.c), [supervisor.cjs](../controls/lifecycle/supervisor.cjs): lanzador confiable, programas de control deterministas y supervisor externo.
- [Lifecycle.Dockerfile](../controls/Lifecycle.Dockerfile): construcción reproducible desde la base fijada; compilación con `-Wall -Wextra -Werror` y ELF de prueba estático.
- [export_patch.py](../controls/export_patch.py): lector Docker endurecido con comprobación previa de tipo, O_NONBLOCK y lectura acotada.
- [docs/bounded-observation.md](../docs/bounded-observation.md): contrato, restricciones, comandos y limitaciones.

Directorio conservado: [evidence/lifecycle-718ad0043ffd4755b92feaf8b129408a](evidence/lifecycle-718ad0043ffd4755b92feaf8b129408a).

| Evidencia | Contenido |
| --- | --- |
| [report.json](evidence/lifecycle-718ad0043ffd4755b92feaf8b129408a/report.json) | Resultados de los 8 controles de observación y 11 de exportación; salud, restricciones efectivas y limpieza |
| `*-trace.json` | Trazas por PID, desde la preparación confiable previa al exec hasta las salidas; los buffers de read/write no se vuelcan |
| `*-observer.json` | Estado final del supervisor, stderr del tracer y copias de las trazas |
| [source/](evidence/lifecycle-718ad0043ffd4755b92feaf8b129408a/source) | Copia del código cuyos hashes se registraron al iniciar la ejecución |
| `export-regular-package.json/` | Documentos ficticios exportados, base, parche vacío y hashes del control positivo |
| [SHA256SUMS.json](evidence/lifecycle-718ad0043ffd4755b92feaf8b129408a/SHA256SUMS.json) | Integridad de los archivos archivados; manifiesto recomputado al añadir el registro local de pruebas |
| [local-tests.txt](local-tests.txt) | Ejecución real de las 15 pruebas unitarias |

El archivador verificó que el código no cambió respecto a sus hashes de ejecución. Los hashes son manifiestos locales, no firmas ni una certificación de un tercero. No se remiten informes o trazas a un agente.

## Tabla de pruebas ejecutadas

`Concluyente acotado` solo significa que hay evidencia completa para el contrato ensayado. No es una afirmación de confidencialidad general.

| Control ejecutado | Resultado realmente obtenido | Clasificación de observación |
| --- | --- | --- |
| Lectura permitida | Una apertura y read de **32 bytes**; proceso PID 7, salida 0 | Concluyente acotado |
| Lectura denegada | Un intento sobre el archivo modo 000, **EACCES**, sin bytes leídos; salida 0 del control | Concluyente acotado |
| Ausencia de intento | Cero aperturas y cero lecturas del programa; se observó exec y salida 0 | Concluyente acotado |
| Proceso hijo y nieto | Árbol **6 → 47 → 48**; el nieto leyó 32 bytes después de salir el proceso inicial; tres salidas 0 y tres procesos recogidos | Concluyente acotado |
| Enlace simbólico | `/fixtures/symlink` resolvió al mismo dev:ino que `allowed`; read de 32 bytes | Concluyente acotado |
| Enlace duro | `/fixtures/hardlink` compartió dev:ino con `allowed`; read de 32 bytes | Concluyente acotado |
| Interrupción del observador | **SIGKILL al tracer durante la ejecución**, antes de completar el proceso; señal registrada, traza incompleta y árbol sin cierre | **Inconcluso**, detección de fallo aprobada |
| Alternativas fuera del contrato | **12 retornos EPERM** y **2 EACCES**, cero bytes leídos; proceso salió 0 tras comprobar los retornos esperados | Concluyente acotado para esas invocaciones bloqueadas |
| Exportación Docker: archivos regulares | Exportación canónica de ambos documentos ficticios y hashes; salida 0 | Control positivo aprobado |
| Exportación Docker: enlace simbólico | Rechazo para **cada uno de los dos nombres**; salida 64, motivo `symlink`, stdout vacío | 2/2 aprobados |
| Exportación Docker: enlace duro | Rechazo para cada nombre; salida 64, motivo `hardlink`, stdout vacío | 2/2 aprobados |
| Exportación Docker: FIFO | Rechazo para cada nombre, sin esperar escritor; salida 64, `non_regular`, stdout vacío | 2/2 aprobados |
| Exportación Docker: directorio | Rechazo para cada nombre; salida 64, `non_regular`, stdout vacío | 2/2 aprobados |
| Exportación Docker: socket Unix | Rechazo para cada nombre; salida 64, `non_regular`, stdout vacío | 2/2 aprobados |
| Pruebas unitarias independientes | **15/15 aprobadas**, incluidas trazas truncadas, FD/llamadas desconocidos, cierre ausente y alias por identidad | Aprobadas; no sustituyen las pruebas Docker |
| Sintaxis supervisor Node | `node --check controls/lifecycle/supervisor.cjs`, código 0 | Aprobada |
| Bloqueo de modelos | `--agent-image` rechazado con **código 2**, antes de acceder a Docker | Aprobado; no se ejecutó ninguna imagen de agente |

En la fila de interrupción, `control_passed=true` comprueba que el sistema detectó el fallo y dejó la observación inconclusa. No convierte una traza interrumpida en evidencia de ausencia de acceso. El campo `read_bytes=0` de esa traza incompleta **no permite concluir que no se leyó el archivo**.

Los rechazos de exportación duraron entre **0,124 y 0,138 segundos** por contenedor lector, incluidas las FIFO. Se ensayaron ambos nombres (`package.json` y `package-lock.json`), no solo el primero. Todos los rechazos dejaron cero bytes en stdout. El positivo se hizo con documentos ficticios independientes de la aplicación vulnerable; su parche vacío es una prueba del exportador, no una reparación.

## Cómo se obtuvo cobertura del ciclo completo

El lanzador crea un hijo confiable y lo mantiene detenido antes de ejecutar código de prueba. El controlador confirma externamente que el tracer está adjunto antes de liberar la compuerta. Se capturan la instalación de Landlock/seccomp, el cierre de descriptores heredados y el exec del ELF estático. El primer código de ese ELF ya está bajo ptrace; no hay loader dinámico de candidato que se ejecute antes.

El tracer sigue las clonaciones; el parser reconstruye el árbol y los FD independientes. El lanzador, PID 1, recoge también al nieto huérfano. Se exige coincidencia entre procesos trazados con salida, número de procesos recogidos y cierre natural del tracer con código 0. El supervisor y las trazas permanecen disponibles para la recogida antes de terminar el lanzador y eliminar recursos.

El supervisor emite heartbeat cada 100 ms y el controlador comprueba antigüedad, procesos sin trazar, errores, señal/código de salida y estado del contenedor. La mayor antigüedad registrada fue **119 ms**. Los controles breves terminaron dentro del primer sondeo; su cobertura depende del seguimiento ptrace y del cierre completo de las trazas, no de que un sondeo haya muestreado cada syscall. Se registran los sondeos reales en el informe. No se ensayó aquí la inyección de un heartbeat caduco; la interrupción efectivamente inyectada fue SIGKILL al tracer.

Estado por defecto ante cualquier excepción previa a la recogida: **inconcluso y no aprobado**. Truncamientos, FD no atribuible, llamadas desconocidas o árboles sin cerrar son también inconclusos. Los controles unitarios ejecutados comprobaron varias de esas rutas; no se afirma haber inyectado todas las clases de fallo posibles en Docker.

Una primera implementación de cierre artificial emitió un error de detach y clasificó los casos normales como inconclusos. Se conservó ese fallo en `.runs/lifecycle-8385b2a5a81640daa0694f54cc823775`; no se aceptaron sus conclusiones. La versión final traza al hijo detenido y deja terminar naturalmente al tracer: no añadió CAP_KILL, no ignoró ese error ni amplió los privilegios del objetivo.

## Cobertura admitida y alternativas bloqueadas

Contrato ensayado: ejecutable estático, procesos sin hilos ni memoria/FD compartidos, archivos de fixture inmutables, openat en lectura, read y close. Los alias admitidos son el enlace simbólico y duro ya existentes; sus identidades se comprobaron dentro de cada contenedor antes del exec. No se soporta el análisis general de alias dinámicos, rutas relativas arbitrarias o renombrados.

Invocaciones bloqueadas comprobadas con EPERM: `pread64`, `readv`, mmap de archivo, `io_uring_setup`, `dup`, `socket`, `openat2`, `sendfile`, `splice`, `process_vm_readv`, clone con CLONE_VM y openat con O_RDWR. Las dos comprobaciones Landlock devolvieron EACCES al abrir `/etc/passwd` y ejecutar `/bin/sh`. Se prueba la política combinada Docker/seccomp/Landlock para esas llamadas concretas; no todos los argumentos o variantes.

Los procesos de prueba mantuvieron UID 1000, ninguna capacidad, red none, raíz readonly y `no-new-privileges`. El observador confiable fue UID 0 con **solo CAP_SYS_PTRACE**, unido al namespace PID del contenedor objetivo. No usó PID del host, privileged, socket Docker ni volúmenes de producción. Las políticas realmente devueltas por Docker están en `resources`.

No se generó ni entregó un secreto de producción en esta suite: los controles usan únicamente buffers ficticios fijos de 32 bytes. La fase Node anterior tenía un señuelo independiente, pero esta entrega no mide un agente tratando de leerlo.

## Entorno, comandos y limpieza

Daemon utilizado exclusivamente: `unix:///Users/jsanchez/.docker/run/docker.sock`. Docker Desktop, Engine **29.9.2**, kernel **7.0.14-linuxkit**, Linux arm64. Se reutilizó la base fijada:

```text
node@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c
```

Imagen del ciclo completo realmente ejecutada:

```text
sha256:96c225dbe6bbe32da29ebd6b6006832d5744feb8b70a5587caee8585362c326b
```

Runtime Node reutilizado únicamente para los controles de exportación:

```text
sha256:dd53d32067b65b7425effe6d8d582f6a3cae7036dacd6e9b0f96a26158811b47
```

Comandos completos en [bounded-observation.md](../docs/bounded-observation.md). La compilación terminó correctamente con avisos tratados como errores. No se actualizaron las dependencias de la aplicación ni se modificaron proyectos externos.

Se eliminaron y verificaron como inexistentes los **39 contenedores y 11 volúmenes** nuevos de la ejecución final. Todas sus retiradas terminaron en 0; el daemon seguía disponible al finalizar la comprobación. También se retiró por su ID exacto el contenedor intermedio detenido `f004c9aef741` de la compilación inicial fallida. No se modificaron otros contenedores. Las imágenes y cachés del laboratorio se conservan para reproducirlo.

## Bloqueos concretos y límites restantes

**No se encontró un bloqueo de Docker Desktop para esta cobertura acotada.** Ptrace de descendientes, seccomp y Landlock funcionaron. No fue necesario debilitar el perfil del objetivo ni moverlo a Linux para completar estos controles.

El bloqueo para usar este monitor con Node/IA es concreto: su runtime dinámico necesita llamadas y rutas que este perfil prohíbe y que no están cubiertas por el parser. No se puede presentar el perfil estático como validación de ese runtime. Además, los modelos están expresamente prohibidos en esta fase y la CLI mantiene el rechazo, aunque la suite pase.

No se ensayaron hilos/FD compartidos como vías admitidas, carreras concurrentes de exportación, dispositivos especiales de caracteres/bloques, ni escapes del contenedor/kernel. No se afirma cobertura de esos mecanismos. Para otro contrato habrá que implementar y validar solo las operaciones que se decida admitir; si la instrumentación necesaria no está disponible en Desktop, queda documentada la alternativa de una VM Linux separada. Esa VM no se construyó.

Estas pruebas demuestran observación completa **del contrato estático ensayado**, distinción de intentos/lecturas en esos escenarios y rechazo explícito de evidencias incompletas. No demuestran confidencialidad frente a un agente ni responden todavía a la pregunta sobre una reparación de dependencia por IA.
