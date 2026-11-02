# Observación del ciclo completo con cobertura acotada

La implementación nueva es `controls/lifecycle_suite.py`, `controls/lifecycle_analyze.py` y los archivos de `controls/lifecycle/`. No depende de las compuertas de la antigua calibración Node. Se ejecutó en Docker Desktop local, Linux arm64, con todos los modelos bloqueados.

## Contrato de cobertura

El objetivo es un ELF estático, sin runtime dinámico ni hilos. Las operaciones de lectura admitidas y ensayadas son `openat(O_RDONLY)`, `read`, `close`, sobre archivos de un fixture inmutable. Los procesos pueden crear descendientes con `clone(..., SIGCHLD)` sin compartir memoria ni tabla de descriptores. Se admite su terminación y se comprueba que todos han salido. Esta política está deliberadamente separada del runtime Node: **no permite ejecutar la aplicación Node ni un modelo**.

La cobertura de alias se limita a enlaces simbólicos y duros ya presentes en el fixture. Antes de liberar el objetivo, el observador obtiene `dev:ino`, tipo y tamaño dentro del filesystem de **ese** contenedor. La misma identidad agrupa el nombre original y los dos alias. El filesystem de la imagen es readonly; no se admite creación o mutación de alias durante la prueba. No se afirma resolución general de rutas relativas o cambios de nombres: una apertura exitosa que el mapa no reconoce hace la ejecución inconclusa.

## Ciclo observado

1. El lanzador confiable, UID 1000 y sin capacidades, crea un hijo que se detiene con SIGSTOP **antes de ejecutar el programa de prueba**. El lanzador es parte de la base de confianza; no se atribuye su arranque a código no confiable.
2. En otro contenedor, un supervisor root con solo CAP_SYS_PTRACE arranca `strace -ff`. Comparte únicamente el namespace PID del objetivo. Conserva seccomp Docker, red none y raíz readonly; no recibe el socket Docker ni montajes del host.
3. El controlador comprueba desde fuera el `TracerPid` del hijo detenido y el heartbeat del supervisor. Solo entonces libera la compuerta del lanzador. El hijo instala Landlock y seccomp, cierra todos los FD >=3 y ejecuta `/lab/probe` con entorno vacío. El ELF estático evita ejecutar un loader o código de bibliotecas antes del primer código de prueba trazado.
4. `strace -f` sigue los nuevos descendientes. Se guardan logs separados por PID y las llamadas `read/write` se representan en formato raw: puntero, longitud y retorno, sin sus buffers.
5. El controlador comprueba heartbeat de hasta 2 segundos de antigüedad, estado del supervisor, resultado del tracer y procesos UID 1000 sin trazar. Los procesos de prueba no pueden escribir las evidencias root privadas. La herencia de seccomp impide que alteren las compuertas mediante nuevas escrituras a archivos.
6. El lanzador, PID 1 del contenedor, adopta y recoge a los huérfanos. Expone `complete` solo después de `waitpid(-1)` con ECHILD. El tracer termina **naturalmente**, con código 0, después de salir todos sus tracees. El controlador exige tanto ese cierre como los registros de terminación del árbol y el número de procesos recogidos. El código 0 del tracer por sí solo no basta.
7. Tras recoger las trazas y validar el árbol, se permite terminar al lanzador. Sus recursos se eliminan y se comprueba la ausencia de sus IDs exactos con el daemon todavía disponible.

Esta secuencia captura el `execve` inicial y los descendientes desde su creación hasta su salida, dentro del contrato admitido. No usa una declaración del proceso de prueba como evidencia de ausencia de lectura.

La semántica de seguimiento e herencia se basa en [strace](https://man7.org/linux/man-pages/man1/strace.1.html), [seccomp](https://man7.org/linux/man-pages/man2/seccomp.2.html) y las operaciones de [prctl](https://man7.org/linux/man-pages/man2/prctl.2.html). El funcionamiento concreto se verificó en las trazas de esta ejecución; otras arquitecturas no se han ejecutado.

## Restricciones comprobadas

Antes del exec se instala Landlock: lectura solo en `/fixtures` y lectura/ejecución del ELF fijo `/lab/probe`. Las rutas de control y `/proc` quedan fuera de los permisos del proceso de prueba. No se entregan descriptores de archivos de producción. Seccomp añade una lista estrecha de llamadas permitidas y devuelve EPERM para las demás. Permite `openat` solo en lectura; limita los bits de flags de clone a SIGCHLD y rechaza la variante ensayada con CLONE_VM. El analizador exige además la representación exacta de clone admitida y declara inconclusas otras variantes.

Se invocaron y bloquearon estas alternativas: `pread64`, `readv`, `mmap` de archivo, `io_uring_setup`, `dup`, `socket`, `openat2`, `sendfile`, `splice`, `process_vm_readv`, clone con memoria compartida y apertura O_RDWR. Se obtuvo EPERM en las 12 invocaciones. Además, Landlock devolvió EACCES para abrir `/etc/passwd` y ejecutar `/bin/sh`. Estas comprobaciones validan las invocaciones registradas y la política combinada Docker/seccomp/Landlock; no prueban todos los argumentos, variantes o mecanismos existentes.

Los permisos y filtros se instalan en código confiable antes del exec y se heredan al crear los descendientes. El control padre–hijo–nieto valida el seguimiento del nieto incluso tras salir el proceso inicial. No se han ejecutado programas con hilos, FD compartidos/transferidos ni memoria mapeada como vía admitida.

## Criterio de resultado

`conclusive_bounded` significa que la traza es completa según este contrato, el árbol y los FD se atribuyeron y se cumplieron las comprobaciones de cierre. **No significa «confidencialidad demostrada» ni «sin vulnerabilidades».**

Cualquier caso no reconocido es `inconclusive`: fallo o interrupción del tracer, heartbeat caduco, pérdida de conexión al supervisor, llamada desconocida, lectura sin identidad atribuida, clonación fuera del contrato, salida ausente, falta de cierre del lanzador, registros truncados o procesos trazados sin atribuir. Si el controlador falla antes de poder recoger evidencia, el control conserva por defecto estado inconcluso y no aprobado. Los límites de tamaño/tiempo producen fallo, no una conclusión de ausencia de acceso.

En el control de interrupción se envía SIGKILL **solo al tracer de esa ejecución**, mientras el programa está en `clock_nanosleep` y antes de su terminación. El supervisor registra la señal; el evaluador declara inconcluso el acceso. `control_passed=true` en esta fila significa que se detectó correctamente el fallo: no convierte la observación interrumpida en concluyente.

El parser conserva FD por proceso y los copia al crear hijos. Las llamadas no completadas se reconstruyen únicamente si tienen un registro resumed correspondiente; la falta de cierre causa inconclusión. Se rechazan trazas sin salto de línea final, demasiado grandes y con procesos sin atribución. Los controles sintéticos de parser verifican también llamadas desconocidas, FD desconocidos y salidas ausentes.

## Exportación Docker

La suite ensaya el lector **real** `export_patch.SNAPSHOT_JS` en contenedores nuevos con volumen de trabajo en solo lectura. Un inicializador confiable crea los documentos y, por separado para cada nombre exportable, sustituye uno por enlace simbólico, enlace duro, FIFO, directorio o socket Unix. El lector comprueba lstat antes de abrir, usa O_NOFOLLOW/O_NONBLOCK, compara identidad y metadatos con fstat y lee como máximo 256 KiB + 1 byte. No ejecuta código del volumen.

Los diez controles de rechazo terminaron en 64, con stdout vacío y motivo controlado. Un control positivo con dos archivos regulares exportó documentos canónicos y hashes. Las FIFO fueron rechazadas sin esperar un escritor. No se ensayó una carrera de mutación concurrente ni dispositivos de caracteres/bloques; no se afirma que estos controles prueben todas las carreras de filesystem. El flujo de exportación exige detener a todos los escritores antes de montar la copia en solo lectura.

## Reproducción

Desde la raíz `statex-ai-remediation-lab`, con el daemon local y configuración vacía descritos en README:

```sh
docker --host unix:///Users/jsanchez/.docker/run/docker.sock --config .runs/docker-client build --force-rm --build-arg BASE=node@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c -f controls/Lifecycle.Dockerfile -t statex-lab-lifecycle .
docker --host unix:///Users/jsanchez/.docker/run/docker.sock --config .runs/docker-client image inspect statex-lab-lifecycle --format '{{.Id}}'
```

El ID realmente ejecutado fue `sha256:96c225dbe6bbe32da29ebd6b6006832d5744feb8b70a5587caee8585362c326b`. Si una reconstrucción obtiene otro ID, usar el realmente obtenido y registrar sus versiones. La resolución de paquetes de compilación/strace no está fijada a un snapshot Debian; la reproducción exacta de capas requiere conservar la imagen local. No se publicaron imágenes.

```sh
python3 -B controls/lifecycle_suite.py --image sha256:96c225dbe6bbe32da29ebd6b6006832d5744feb8b70a5587caee8585362c326b --runtime-image sha256:dd53d32067b65b7425effe6d8d582f6a3cae7036dacd6e9b0f96a26158811b47 --socket /Users/jsanchez/.docker/run/docker.sock
python3 -B -m unittest discover -s tests -v
node --check controls/lifecycle/supervisor.cjs
# Sustituir por el ID de ejecución recién impreso:
python3 -B controls/archive_lifecycle.py lifecycle-ID
```

El archivador comprueba hashes y copia el código exacto de la ejecución a `source/`. Se niega a archivar como éxito una suite fallida o cuyo código haya cambiado. Los informes se guardan fuera de la copia de trabajo; no se remiten a un agente ni se publican.

## Límites restantes

No se encontró un bloqueo de Docker Desktop para este contrato: ptrace, seccomp y Landlock funcionaron. El bloqueo concreto para evaluar una reparación Node/IA es **la incompatibilidad de ese runtime con esta lista de llamadas y rutas**, además de la prohibición expresa de conectar modelos en esta fase. Mantener ese bloqueo: no presentar este perfil como un monitor de Node/IA y no abrir permisos automáticamente.

Para ampliar el contrato, añadir primero las operaciones necesarias, su contabilidad y controles específicos. Si eso requiere observación de kernel no disponible en Desktop, usar la VM Linux separada descrita en README. No es necesario construir un monitor universal. Las pruebas de esta entrega no cubren escapes de contenedor/kernel, modificación maliciosa del runtime, mecanismos fuera del contrato ni contenidos reales de producción.
