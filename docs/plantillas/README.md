# Plantillas de entregables

Las plantillas editables son internas y viven en `docs/`, fuera de `app/` y `public/`. La web solo publica ejemplos ficticios generados a partir de ellas (ver el final).

| Archivo | Para qué |
|---|---|
| `informe-auditoria.html` | Informe de cada auditoría o evaluación: portada, resumen ejecutivo, alcance y autorización, metodología, hallazgos, plan de corrección, retest, limitaciones y criterios de severidad |
| `resumen-agencia.html` | Resumen de una página para la dirección de una agencia (pack de 5 webs). Acompaña a los informes individuales |

## Cómo usarlas

1. **Copia la plantilla por proyecto, fuera del repositorio** si va a contener datos reales de un cliente, por ejemplo en una carpeta cifrada. Este repositorio está conectado a Vercel y a GitHub: aquí no deben entrar informes de clientes.
2. **Elige la marca:**
   - **StateX:** deja los valores por defecto.
   - **Marca blanca (agencia):**
     - En el bloque `:root` del `<style>`, cambia `--accent` por el color de la agencia.
     - En los elementos con `data-brand`, sustituye "StateX" por el nombre o por `<img src="logo.png" alt="Agencia">`. El logo tiene que estar en la misma carpeta que el HTML.
     - En "Preparado por", pon la agencia o "[Agencia], con StateX", lo que se haya acordado.
     - La línea "Elaborado técnicamente por StateX" está oculta por defecto. Quita la clase `hidden` si la agencia quiere mencionarnos.
3. **Rellena todo lo que va entre `[corchetes]`.** Los hallazgos de ejemplo (`SX-01`…, `ejemplo.com`) son ficticios: bórralos.
4. **Repite el bloque `<article class="finding">`** para cada hallazgo, en orden de severidad.
5. **Exporta a PDF:** ábrelo en Chrome, Imprimir, "Guardar como PDF", tamaño A4, márgenes "Ninguno" y "Gráficos de fondo" activado. Revisa los saltos de página.

## Reglas para el contenido

- Cada hallazgo debe estar **verificado a mano** y tener evidencia reproducible.
- **Enmascara secretos y datos personales** en las evidencias: tokens recortados, NIF enmascarados, sin contraseñas.
- El informe **no certifica** nada (ni ISO 27001, ni ENS, ni NIS2): la sección de limitaciones lo dice y no se debe quitar.
- Indica la **IP de origen** de las pruebas y la **referencia de la autorización** firmada.
- Versión 1.0 al entregar; 1.1 tras el retest, con el estado de cada hallazgo.

## Ejemplos públicos

La web publica una versión rellena con datos ficticios, que sirve como informe de ejemplo:
- `public/informe-de-ejemplo.html` y `public/informe-de-ejemplo.pdf`
- `public/resumen-agencia-de-ejemplo.html` y `public/resumen-agencia-de-ejemplo.pdf`

Se generan a partir de estas plantillas. Si cambias una plantilla, regenera los ejemplos:

```sh
python3 scripts/muestras-informe.py .
cd public && for f in informe-de-ejemplo resumen-agencia-de-ejemplo; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
    --print-to-pdf="$PWD/$f.pdf" "file://$PWD/$f.html"; done
```

El script falla si queda algún `[hueco]` sin rellenar en la versión pública.
