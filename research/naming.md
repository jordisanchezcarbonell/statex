# StateX — Auditoría de nombre

Fecha: 2026-10-24. Comprobaciones hechas desde terminal (`dig`, `whois`, `curl`, RDAP) y con búsqueda web. Este documento **no es asesoramiento jurídico**; la parte de marcas registradas queda pendiente de una consulta manual (ver §4).

## 1. La marca está decidida: StateX

Un brief nuevo pide 10 nombres alternativos. No se proponen. La decisión del proyecto (`CLAUDE.md`) es que la marca es únicamente **StateX**, por continuidad verificada:

- **InfoStateX** (infostatex.blogspot.com), cabecera "State X". Archivo 2012–2018, con al menos 1.380 entradas solo entre 2014 y 2018.
- **DoubleReboot** (doublereboot.blogspot.com), con la firma "Un proyecto de: State X". Entradas de 2013 y 2016.

Fuente: `docs/design-research.md`, ronda 3. Cambiar de nombre rompería la única prueba de trayectoria que StateX puede enseñar sin inventarse nada: más de seis años de publicaciones técnicas en seguridad con ese nombre.

## 2. StateX como nombre

**Pronunciación**
- Español: "estéit-ex" o "estáte-equis". La doble lectura de la X ("ex" o "equis") hay que fijarla. Recomendación: **"steit-ex"** en todos los idiomas y decirlo así siempre (vídeo, llamadas, pódcast).
- Inglés: "state-ex" /steɪt ɛks/, sin ambigüedad.
- Escritura: ya conviven tres formas, "State X" (blog), "StateX" (marca) y "Statex" (lo que escribe la gente). Se recomienda **StateX** en texto y, en los dominios, tratar todo como `statex`.

**Connotaciones**
- *State* / "estado": el estado de un sistema y su postura de seguridad (*security posture*, *state of exposure*). Encaja con "comprender y reducir riesgos".
- *State machine*: guiño de ingeniería, creíble para un CTO.
- Riesgo: *state* también significa "Estado", es decir, gobierno. En inglés "State X" puede leerse como "Estado X" o como algo gubernamental o de *nation-state actor*. Es leve, pero conviene no usar imágenes institucionales ni de defensa.
- La "X" suena a variable o incógnita (bien) y también a X/Twitter y al genérico "-X" de muchas marcas tech (más débil para distinguirse).

**Riesgos de confusión** (detalle en §3)
- **Statex** inmobiliaria en Madrid (statex.es). Mismo mercado geográfico y otro sector.
- **Statex Produktions- und Vertriebs GmbH** (Bremen), textiles conductores/antiestáticos, que ahora opera como Shieldex. Otro sector.
- Nombres parecidos en seguridad: Staex (IoT, Alemania), SecureState, Finite State. Nada idéntico.
- En el software ya existe "statex" como paquete (librería Elixir de máquinas de estado en hex.pm, estilo LaTeX en CTAN). Son ruido en buscadores, no conflicto comercial.

## 3. Verificación

### Dominios

| Dominio | Estado observado (2026-10-24) | Evidencia |
|---|---|---|
| statex.com | **Registrado** desde 2022-05-20 (GoDaddy), caduca 2027-05-20. Aparcado y **a la venta**: `/lander` redirige a forsale.godaddy.com. Precio no visible (403). | RDAP rdap.org; NS ns1/ns2.afternic.com; `curl` |
| statex.es | **Registrado y en uso**: web de *Statex*, agencia inmobiliaria online de Madrid ("startup inmobiliaria", fundada en 2023). | `curl`/WebFetch de statex.es; NS dns-parking.com. WHOIS de nic.es sin respuesta (timeout) |
| statex.io | **Registrado** desde 2021-08-05 (Namecheap), caduca 2027-08-05. Página de aparcamiento de Namecheap con enlaces a subastas. No se sabe si está a la venta. | `whois.nic.io`; `curl` |
| statex.eu | **Registrado** (registrador NETIM, titular no publicado). Redirige a **Sedo: a la venta**. | `whois.eu`; cabecera `Location` hacia sedo.com |
| statex.security | **No registrado**: "DOMAIN NOT FOUND" en el registro; sin DNS. | `whois.nic.security`; RDAP 404 |
| statex.dev | **No registrado**: el RDAP del registro (Google) responde "statex.dev not found"; sin DNS. | pubapi.registry.google/rdap |

Nota: que un dominio no esté registrado se infiere del WHOIS/RDAP del registro. La disponibilidad real y el precio (.security es un TLD *premium* y caro) solo se confirman en un registrador en el momento de la compra.

### Empresas con el mismo nombre (WebSearch, 2026-10-24)

- **Statex (Madrid)**: inmobiliaria, statex.es. Es el conflicto más relevante por ser España, usar "startup" y ser el primer resultado para "statex" en España. No es del sector tecnológico ni de seguridad.
- **Statex Produktions- und Vertriebs GmbH (Bremen)**: textiles técnicos, unas 50 personas, rebautizada comercialmente como Shieldex. Fuentes: chemanager-online.com, technical-textiles.textiletechnology.net.
- **STATEX OOD (Plovdiv, Bulgaria)**: hilatura y fibras textiles, desde 1999 (Kompass).
- **EE. UU.**: marca STATEX, Reg. n.º 0390823 (1941), clase 1 (negro de carbono industrial), registrada y renovada según trademarks.justia.com. Titular no visible.
- En búsquedas generales **no se ha encontrado** ninguna empresa de ciberseguridad o software llamada StateX/Statex/State X.

### Marcas registradas: NO verificado automáticamente

EUIPO eSearch, OEPM, WIPO Global Brand Database y TMview son aplicaciones JavaScript que no se pueden consultar desde aquí, y la búsqueda web no encontró registros "STATEX" en la UE. **Que no aparezca no significa que no exista.** Hay que comprobarlo a mano buscando "STATEX" y "STATE X" (idénticas y parecidas) en las clases de Niza **9** (software), **42** (servicios de seguridad informática y SaaS) y **45**, además de la **35**:

- EUIPO eSearch plus: https://euipo.europa.eu/eSearch/
- TMview (UE y oficinas nacionales a la vez): https://www.tmdn.org/tmview/
- OEPM Localizador de marcas: https://consultas2.oepm.es/LocalizadorWeb/
- WIPO Global Brand Database: https://branddb.wipo.int/
- USPTO (si se apunta a EE. UU.): https://tmsearch.uspto.gov/

**Tampoco se ha verificado:** el titular de statex.com, statex.io y statex.eu; los precios de venta; el WHOIS de statex.es; los registros mercantiles (BORME/Registro Mercantil) de una posible sociedad "Statex" en España; ni las cuentas en redes (@statex en LinkedIn, X o GitHub).

## 4. Valoración y recomendaciones (manteniendo StateX)

No aparece ningún conflicto serio en tecnología ni en seguridad. Hay dos problemas prácticos: **no queda libre ningún dominio corto clásico** (.com, .es, .io y .eu están ocupados) y **en España hay una Statex inmobiliaria** con su web en statex.es.

1. **Antes de nada, la consulta de marcas** (§3) en las clases 9, 42 y 45. Si está limpia, plantearse **solicitar la marca de la UE "STATEX"** en las clases 42 y 9 (vía EUIPO; tasa base de 850 € por la primera clase en solicitud online, a confirmar en euipo.europa.eu).
2. **Dominio con sufijo de sector**, por ejemplo `statexsecurity.com`, `statex-security.com`, `statexsec.com` o `statexlabs.com` (no comprobados; hay que verificarlos en un registrador). El nombre de marca sigue siendo StateX y "Security" funciona como descriptor, no como submarca.
3. **Proteger `statex.dev` y `statex.security`**, ambos sin registrar. `.security` refuerza el sector, pero suele ser caro: hay que valorar el precio. No se recomienda que `.dev` sea el dominio principal (sugiere herramienta para desarrolladores).
4. **statex.eu y statex.com están a la venta.** Pedir precio en Sedo y GoDaddy/Afternic sin comprometerse. Si es razonable, `statex.eu` encaja con el foco España/UE.
5. **Descriptor fijo** en firma y metadatos: "StateX · Ciberseguridad" o "StateX Security", para separarse de la inmobiliaria en buscadores y en conversaciones.
6. **Fijar la escritura (StateX) y la pronunciación** en una guía corta de marca.

Ninguna de estas acciones implica comprar ni registrar nada sin aprobación.

---

## Apéndice — Solo si se decidiera cambiar de marca

No es la recomendación actual. Si en algún momento apareciera un conflicto de marca bloqueante, cualquier alternativa debería cumplir:

- Mantener el vínculo con el archivo 2012–2018 (por ejemplo, "antes InfoStateX / State X"), o el cambio borra la trayectoria.
- Una sola pronunciación en español e inglés, y fácil de deletrear por teléfono.
- Dominio .com o .eu disponible a precio razonable, y libre en las clases de Niza 9, 42 y 45 en la UE y España.
- Sin clichés del sector (shield, lock, cyber-, sec- como prefijo, guardian) ni connotaciones militares o gubernamentales.
- Corto (2–3 sílabas), sin guiones ni números.

## Fuentes (consultadas 2026-10-24)

- RDAP statex.com: https://rdap.org/domain/statex.com
- RDAP statex.dev: https://pubapi.registry.google/rdap/domain/statex.dev
- WHOIS: whois.nic.io (statex.io), whois.eu (statex.eu), whois.nic.security (statex.security)
- https://statex.es (inmobiliaria Statex, Madrid)
- https://chemanager-online.com/de/firmen/statex-produktions-und-vertriebs-gmbh/
- https://technical-textiles.textiletechnology.net/news/rebranding-as-shieldex-209727
- https://ch.kompass.com/c/statex/bgc32777046/
- https://trademarks.justia.com/714/43/statex-71443022.html
- https://readme.hex.pm/statex/0.1.0 · https://www.ctan.org/ctan-ann/pkg/statex
- `docs/design-research.md` (origen InfoStateX / DoubleReboot)
