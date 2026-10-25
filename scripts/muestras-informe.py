# Genera los ejemplos públicos (public/informe-de-ejemplo.html y public/resumen-agencia-de-ejemplo.html)
# a partir de las plantillas internas de docs/plantillas, con datos ficticios y sin las notas internas.
# Uso: python3 scripts/muestras-informe.py .  (y después los PDF: ver docs/plantillas/README.md)
import re, sys
root = sys.argv[1]
BANNER = '''<div class="sample-bar"><span>Informe de ejemplo con datos ficticios. Ni la empresa, ni el dominio, ni los hallazgos son reales.</span> <a href="/">Volver a StateX</a></div>
<style>.sample-bar{position:sticky;top:0;z-index:10;display:flex;flex-wrap:wrap;gap:4mm;justify-content:center;padding:3mm 5mm;background:#0B0D10;color:#F2F0EA;font:9.5pt/1.4 Inter,-apple-system,"Segoe UI",sans-serif}.sample-bar a{color:#F2F0EA}@media print{.sample-bar{display:none}}</style>
'''
def common(s):
    s = re.sub(r"<!--.*?-->", "", s, flags=re.S)          # fuera instrucciones internas
    s = s.replace("<body>\n", "<body>\n" + BANNER, 1)
    return s

def finish(s, path):
    s = re.sub(r"\[(\d)\]", r"\1", s)
    s = s.replace("[—]", "—")
    s = re.sub(r"\[Ejemplo: ([^\]]*)\]", r"\1", s)
    s = re.sub(r"\[([^\[\]]*)\]", r"\1", s)               # resto: quitar corchetes
    left = re.findall(r"\[[^\]]*\]", re.sub(r"<style>.*?</style>", "", s, flags=re.S))
    assert not left, (path, left)
    s = re.sub(r"\n{3,}", "\n\n", s)
    open(path, "w").write(s)

# ── Informe ──
s = common(open(f"{root}/docs/plantillas/informe-auditoria.html").read())
R = {
 "<title>Informe de auditoría de seguridad — [Cliente]</title>": "<title>Informe de ejemplo · StateX</title>",
 "[Corregir SX-01 y SX-02 antes de [fecha / lanzamiento].]": "Corregir SX-01 y SX-02 antes del próximo lanzamiento.",
 "Inmediato (antes de [fecha])": "Inmediato (antes del próximo lanzamiento)",
 "[Cliente]": "Ejemplo SaaS (ficticio)",
 "[Nombre del cliente]": "Ejemplo SaaS (ficticio)",
 "[web o correo]": "Informe de ejemplo con datos ficticios",
 "[1.0] · [25 de octubre de 2026]": "1.0 · 20 de octubre de 2026",
 "[del 3 al 7 de noviembre de 2026]": "del 13 al 17 de octubre de 2026",
 "[Nombre y cargo del destinatario]": "Dirección técnica de Ejemplo SaaS",
 "[25/10/2026]": "20/10/2026",
 "[Iniciales]": "AS · JS",
 "[2–3 frases sin jerga: qué podría pasar, a quién afectaría (clientes, datos, ingresos) y con qué probabilidad.]":
   "Un usuario registrado como cliente podría descargar facturas con datos fiscales de otras empresas y darse permisos de administrador en su equipo. Es fácil de explotar y afectaría a la confianza de todos los clientes; por eso recomendamos corregirlo antes del próximo lanzamiento.",
 "[Controles que funcionan correctamente: no todo el informe son problemas.]":
   "El inicio de sesión, la gestión de sesiones y el cifrado en tránsito están bien resueltos. No se han encontrado inyecciones ni secretos expuestos en el código del navegador.",
 "[Firmada por Nombre, cargo, titular de los sistemas, el DD/MM/AAAA. Referencia: AUT-AAAA-NN.]": "Firmada por la dirección técnica de Ejemplo SaaS, titular de los sistemas, el 10/10/2026. Referencia: AUT-2026-00 (ejemplo).",
 "[Días y horario acordados.]": "Del 13 al 17 de octubre de 2026, de 9:00 a 19:00.",
 "[Técnico y de urgencias.]": "Responsable técnico y teléfono de urgencias del cliente (ocultos en este ejemplo).",
 "[IP desde la que se hicieron las pruebas, para que el cliente pueda cotejar sus registros.]": "198.51.100.23 (rango de documentación, ejemplo).",
 "[Opcional: vector y puntuación CVSS v3.1 o v4.0]": "CVSS v3.1 6,5 · AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
 "[Resultado del retest]": "Resultado del retest (pendiente)",
 "[Corregido / Parcial / Abierto]": "Pendiente",
 "Los hallazgos SX-01 a SX-04 son un EJEMPLO FICTICIO. Sustitúyelos por los reales.": "Todos los hallazgos de este documento son ficticios.",
 '    <p class="credit hidden">Elaborado técnicamente por StateX.</p>\n': "",
}
for a, b in R.items():
    assert a in s, a; s = s.replace(a, b)
finish(s, f"{root}/public/informe-de-ejemplo.html")

# ── Resumen de agencia ──
s = common(open(f"{root}/docs/plantillas/resumen-agencia.html").read())
R = {
 "<title>Resumen de cartera — [Agencia]</title>": "<title>Resumen de agencia de ejemplo · StateX</title>",
 "[Nombre de la agencia]": "Agencia de ejemplo (ficticia)",
 "[del 3 al 7 de noviembre de 2026]": "del 13 al 17 de octubre de 2026",
 "[web o correo]": "Resumen de ejemplo con datos ficticios",
 "[Problemas que se repiten en varias webs y que la agencia puede corregir una vez en su forma de trabajar. Ejemplo: misma plantilla de servidor sin cabeceras de seguridad; plugins sin política de actualización.]":
   "Tres de las cinco webs comparten la misma plantilla de servidor sin cabeceras de seguridad, y en dos los plugins no tienen una política de actualización. Corregirlo en la forma de trabajar de la agencia evita que vuelva a aparecer en los próximos proyectos.",
}
for a, b in R.items():
    assert a in s, a; s = s.replace(a, b)
finish(s, f"{root}/public/resumen-agencia-de-ejemplo.html")
print("ok")
