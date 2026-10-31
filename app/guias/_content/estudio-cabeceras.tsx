import Link from "next/link";
import { focus, muted } from "../../_site/ui";
import { Section, prose } from "./shared";

// Estudio propio (2026-10-31): análisis pasivo de 381 webs de una muestra de OpenStreetMap.
// Cifras de research/estudio-agencias/resumen.md; los resultados por web no se publican.

const results = [
  { label: "Responde por HTTPS", all: 96, agency: 96, it: 96 },
  { label: "Redirige de HTTP a HTTPS", all: 88, agency: 87, it: 89 },
  { label: "Certificado TLS con error", all: 4, agency: 5, it: 4 },
  { label: "HSTS (sobre las que usan HTTPS)", all: 30, agency: 24, it: 34 },
  { label: "Content-Security-Policy", all: 21, agency: 19, it: 23 },
  { label: "CSP estricta (sin unsafe-inline ni unsafe-eval)", all: 11, agency: 14, it: 10 },
  { label: "Protección contra clickjacking", all: 29, agency: 20, it: 34 },
  { label: "X-Content-Type-Options: nosniff", all: 27, agency: 20, it: 31 },
  { label: "Referrer-Policy", all: 20, agency: 16, it: 23 },
  { label: "Permissions-Policy", all: 17, agency: 14, it: 18 },
  { label: "Revela versión de servidor o framework", all: 29, agency: 29, it: 29 },
  { label: "Cookies sin atributo Secure (sobre HTTPS)", all: 13, agency: 11, it: 15 },
  { label: "Publica security.txt válido", all: 3, agency: 1, it: 4 },
  { label: "Usa WordPress", all: 51, agency: 61, it: 44 },
  { label: "Muestra la versión de WordPress (sobre las que lo usan)", all: 58, agency: 57, it: 58 },
];

const distribution = [198, 60, 35, 23, 11, 25, 29]; // webs con 0…6 cabeceras clave
const total = 381;

const cell = "py-3 pr-6 text-right tabular-nums";

export function HeadersStudy() {
  return (
    <>
      <div className={prose}>
        <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.6] text-(--h-ivory)">
          Hemos revisado las cabeceras de seguridad de 381 webs de agencias y empresas digitales en España. El HTTPS ya es la norma. Casi todo lo demás, no: <strong>una de cada dos webs no tiene ninguna</strong> de las seis cabeceras básicas que analizamos.
        </p>

        <Section id="g-est-resumen" title="En 30 segundos">
          <ul>
            <li><strong>El 52 % no tiene ninguna</strong> de las seis cabeceras clave. En las agencias, el 57 %.</li>
            <li><strong>Solo el 8 % las tiene todas.</strong> En las agencias, el 5 %.</li>
            <li>El 96 % usa HTTPS, pero solo el 30 % obliga al navegador a usarlo siempre (HSTS) y solo el 21 % define una política de contenido (CSP).</li>
            <li>El 61 % de las agencias usa WordPress, y más de la mitad de esas webs muestra qué versión usa.</li>
            <li>Solo el 3 % publica un contacto para avisar de fallos de seguridad (<code>security.txt</code>).</li>
          </ul>
          <p>Ninguna de estas ausencias es, por sí sola, una vulnerabilidad. Son capas de protección gratuitas que reducen el impacto de un fallo cuando aparece. Que falten casi todas a la vez indica que la seguridad no forma parte del proceso de entrega.</p>
        </Section>

        <Section id="g-est-agencias" title="Por qué importa a una agencia">
          <p>Una agencia suele entregar y mantener muchas webs con la misma base y la misma configuración de servidor. Lo que falta en su propia web suele faltar también en las de sus clientes. Y cuando un cliente pasa una revisión de seguridad, por exigencia de un cliente grande, de un seguro o de la normativa, la pregunta llega a la agencia.</p>
          <p>La buena noticia: casi todo lo que mide este estudio se corrige en la configuración del servidor o del CDN, en minutos, y se aplica a todas las webs a la vez.</p>
        </Section>

        <Section id="g-est-resultados" title="Resultados">
          <p>Porcentaje de webs que cumplen cada indicador.</p>
        </Section>
      </div>

      <div className="mt-6 max-w-[68rem] overflow-x-auto" role="region" aria-label="Resultados por indicador" tabIndex={0}>
        <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
          <thead>
            <tr className={`text-[13px] ${muted}`}>
              <th scope="col" className="py-3 pr-6 font-normal">Indicador</th>
              <th scope="col" className="py-3 pr-6 text-right font-normal">Todas (381)</th>
              <th scope="col" className="py-3 pr-6 text-right font-normal">Agencias (148)</th>
              <th scope="col" className="py-3 pr-6 text-right font-normal">IT (233)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.label} className="border-t border-(--h-line)">
                <th scope="row" className="py-3 pr-6 font-normal leading-[1.45]">{r.label}</th>
                <td className={`${cell} font-medium`}>{r.all} %</td>
                <td className={cell}>{r.agency} %</td>
                <td className={cell}>{r.it} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-10 ${prose}`}>
        <p>Cuántas de las seis cabeceras clave (HSTS, CSP, clickjacking, nosniff, Referrer-Policy y Permissions-Policy) tiene cada web:</p>
      </div>

      <div className="mt-4 max-w-[68rem] overflow-x-auto" role="region" aria-label="Webs según el número de cabeceras clave" tabIndex={0}>
        <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
          <thead>
            <tr className={`text-[13px] ${muted}`}>
              <th scope="col" className="py-3 pr-6 font-normal">Cabeceras clave</th>
              {distribution.map((_, n) => <th key={n} scope="col" className="py-3 pr-6 text-right font-normal">{n}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-(--h-line)">
              <th scope="row" className="py-3 pr-6 font-normal">Webs</th>
              {distribution.map((c, n) => <td key={n} className={cell}>{c}</td>)}
            </tr>
            <tr className="border-t border-(--h-line)">
              <th scope="row" className="py-3 pr-6 font-normal">Porcentaje</th>
              {distribution.map((c, n) => <td key={n} className={`${cell} font-medium`}>{Math.round((100 * c) / total)} %</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`mt-4 ${prose}`}>
        <p>La mediana es <strong>0 de 6</strong>. Las webs se reparten en dos grupos: la mayoría no tiene casi nada y una minoría (15 %) tiene cinco o seis. Lo habitual es que alguien lo configure todo de una vez o que no se configure nada.</p>

        <Section id="g-est-significado" title="Qué significa cada indicador">
          <ul>
            <li><strong>HSTS:</strong> obliga al navegador a usar HTTPS siempre, aunque alguien escriba <code>http://</code>. Sin él, la primera visita puede interceptarse en una red insegura.</li>
            <li><strong>Content-Security-Policy:</strong> define desde dónde puede cargar scripts la web. Si alguien consigue inyectar código (XSS), una CSP bien hecha impide que se ejecute.</li>
            <li><strong>Protección contra clickjacking</strong> (<code>X-Frame-Options</code> o <code>frame-ancestors</code>): impide que otra web cargue la tuya en un marco invisible para engañar al usuario.</li>
            <li><strong>nosniff:</strong> evita que el navegador interprete un archivo como si fuera de otro tipo.</li>
            <li><strong>Referrer-Policy:</strong> controla qué parte de la URL se envía a otras webs al salir.</li>
            <li><strong>Permissions-Policy:</strong> limita el acceso a la cámara, el micrófono o la geolocalización.</li>
            <li><strong>Versión expuesta:</strong> anunciar la versión del servidor, de PHP o de WordPress le dice a un atacante qué fallos conocidos probar.</li>
            <li><strong>security.txt:</strong> un fichero estándar con el contacto para avisar de un fallo. Sin él, quien encuentra algo no sabe a quién escribir.</li>
          </ul>
        </Section>

        <Section id="g-est-correcciones" title="Cinco correcciones de bajo coste">
          <ol>
            <li>Añadir las seis cabeceras en el servidor o el CDN. Una vez por servidor, para todas las webs.</li>
            <li>Activar HSTS cuando el HTTPS ya funciona en todo el dominio.</li>
            <li>Ocultar las versiones del servidor, de PHP y de WordPress.</li>
            <li>Empezar la CSP en modo informe (<code>Content-Security-Policy-Report-Only</code>) para no romper nada, y endurecerla después.</li>
            <li>Publicar <code>/.well-known/security.txt</code> con un email de contacto.</li>
          </ol>
        </Section>

        <Section id="g-est-metodo" title="Metodología y limitaciones">
          <ul>
            <li><strong>Muestra:</strong> 453 entradas de OpenStreetMap en España con web propia y etiqueta de agencia de publicidad, marketing o diseño gráfico (&ldquo;agencias&rdquo;) o de empresa IT (&ldquo;IT&rdquo;), consultadas el 31 de octubre de 2026. Sin duplicados ni redes sociales quedan 437 dominios. Se excluyen 56: sin DNS (19), sin respuesta (25), <code>robots.txt</code> que prohíbe todo acceso (11) e IP privada (1). Quedan 381 webs.</li>
            <li><strong>Qué hicimos:</strong> por cada web, una visita a la página de inicio por HTTPS y otra por HTTP, y la lectura de <code>robots.txt</code> y <code>security.txt</code>. Es lo mismo que ve cualquier navegador. No enviamos formularios, no probamos rutas, no escaneamos puertos ni intentamos acceder a nada.</li>
            <li><strong>Qué no mide:</strong> solo la página de inicio y solo señales públicas. No dice si una web es vulnerable: una web sin estas cabeceras puede estar bien mantenida, y una con todas puede tener fallos graves en su código.</li>
            <li><strong>Limitaciones:</strong> la muestra es la que hay en OpenStreetMap, no un censo ni una muestra aleatoria, y está sesgada hacia empresas con presencia física registrada en el mapa. Las cifras son orientativas.</li>
            <li><strong>Privacidad:</strong> no recogemos datos personales ni publicamos resultados por web. No nombramos a ninguna empresa.</li>
          </ul>
          <p className="text-[14px]">Datos de la muestra: © colaboradores de OpenStreetMap, disponibles bajo licencia ODbL.</p>
        </Section>

        <Section id="g-est-siguiente" title="Si eres una agencia">
          <p>Si quieres saber cómo están las webs de tus clientes, el <Link href="/#contacto" className={focus}>pack para agencias</Link> revisa la exposición externa y la web pública de cinco de ellas: un informe por web, uno resumen para la agencia y, si lo prefieres, con tu marca. Como las webs son de tus clientes, la autorización la firma cada cliente.</p>
        </Section>
      </div>
    </>
  );
}
