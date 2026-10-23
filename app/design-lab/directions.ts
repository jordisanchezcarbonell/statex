export type Direction = {
  slug: string;
  letter: string;
  name: string;
  intent: string;
  memorable: string;
  fonts: { family: string; role: string }[];
  palette: { name: string; hex: string }[];
  references: { name: string; url: string; takeaway: string }[];
  motion: string;
};

// Nombres internos de trabajo. La marca visible en todas las propuestas es solo StateX.
export const DIRECTIONS: Direction[] = [
  {
    slug: "a",
    letter: "A",
    name: "Premium Cybersecurity",
    intent: "Minimalismo de startup internacional: mucho aire, tipografía grande y una visualización elegante de la superficie de ataque.",
    memorable: "Un mapa orbital de activos expuestos, fino y silencioso, que gira muy despacio.",
    fonts: [{ family: "Instrument Sans", role: "Titulares (ancho 75–100) y texto" }],
    palette: [
      { name: "Porcelana", hex: "#F6F7F9" },
      { name: "Tinta", hex: "#0C1424" },
      { name: "Azul StateX", hex: "#2F5BFF" },
      { name: "Pizarra", hex: "#5A6478" },
      { name: "Línea", hex: "#DDE1E8" },
    ],
    references: [
      { name: "Wiz", url: "https://www.wiz.io/", takeaway: "Fondo claro amplio y un único acento azul." },
      { name: "Horizon3.ai", url: "https://horizon3.ai/", takeaway: "Minimalismo claro con un recurso técnico abstracto." },
    ],
    motion: "Rotación lenta de órbitas y aparición escalonada del hero.",
  },
  {
    slug: "b",
    letter: "B",
    name: "Dark Technical",
    intent: "Oscuro, profesional y técnico, sin neón: isolíneas generativas y anotaciones precisas.",
    memorable: "Un relieve de isolíneas que reacciona al cursor y marca hallazgos como cotas.",
    fonts: [
      { family: "IBM Plex Sans", role: "Titulares y texto" },
      { family: "IBM Plex Mono", role: "Anotaciones técnicas" },
    ],
    palette: [
      { name: "Grafito", hex: "#0E1217" },
      { name: "Carbón", hex: "#161B22" },
      { name: "Hueso", hex: "#E6E8EB" },
      { name: "Acero", hex: "#8B95A3" },
      { name: "Ion", hex: "#7C8CFF" },
      { name: "Hallazgo", hex: "#FFB020" },
    ],
    references: [
      { name: "Protex (plantilla Webflow)", url: "https://webflow.com/templates/html/protex-website-template", takeaway: "Líneas luminosas sobre oscuro, pero sin verde neón." },
      { name: "Horizon3.ai", url: "https://horizon3.ai/", takeaway: "Isolíneas como textura técnica." },
      { name: "Huntress", url: "https://www.huntress.com/", takeaway: "Contraste fuerte; tomado como contraejemplo de tono." },
    ],
    motion: "Isolíneas con desplazamiento sutil según el cursor; aparición de cotas.",
  },
  {
    slug: "c",
    letter: "C",
    name: "Creative Security Studio",
    intent: "Editorial y experimental: un estudio independiente que piensa en seguridad. Composición asimétrica.",
    memorable: "Titulares impresos a dos tintas con registro desplazado, como una publicación en risografía.",
    fonts: [
      { family: "Instrument Serif", role: "Titulares" },
      { family: "Hanken Grotesk", role: "Texto y navegación" },
    ],
    palette: [
      { name: "Papel", hex: "#E6E7E2" },
      { name: "Tinta", hex: "#161616" },
      { name: "Riso azul", hex: "#0067B1" },
      { name: "Riso rosa", hex: "#F0408F" },
      { name: "Gris", hex: "#5A5D58" },
    ],
    references: [
      { name: "Behance — cybersecurity branding", url: "https://www.behance.net/search/projects/cybersecurity%20branding", takeaway: "Más libertad gráfica que en las plantillas." },
      { name: "Pentera", url: "https://pentera.io/", takeaway: "La tipografía como imagen principal." },
    ],
    motion: "Desplazamiento del registro de tinta al pasar el cursor por los titulares.",
  },
  {
    slug: "d",
    letter: "D",
    name: "Cybersecurity SaaS",
    intent: "Claridad de producto B2B: proceso, capacidades y entregables explicados como un producto.",
    memorable: "Una vista previa del informe real que recibe el cliente, navegable por pestañas.",
    fonts: [
      { family: "Geist", role: "Titulares y texto" },
      { family: "Geist Mono", role: "Datos del informe" },
    ],
    palette: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Tinta", hex: "#111827" },
      { name: "Esmeralda", hex: "#0E8A62" },
      { name: "Menta", hex: "#E8F5EE" },
      { name: "Gris", hex: "#64748B" },
      { name: "Ámbar", hex: "#B45309" },
    ],
    references: [
      { name: "Detectify", url: "https://detectify.com/", takeaway: "Producto visible en el hero y CTA único." },
      { name: "Pentera", url: "https://pentera.io/", takeaway: "Resultados operativos antes que funcionalidades." },
      { name: "Wiz", url: "https://www.wiz.io/", takeaway: "Jerarquía y navegación muy claras." },
    ],
    motion: "Transiciones entre pestañas de servicios con indicador animado.",
  },
  {
    slug: "e",
    letter: "E",
    name: "Neo Brutalism",
    intent: "Atrevido y tipográfico, con bloques planos y bordes gruesos, pero ordenado y creíble.",
    memorable: "Bloques de color con sombra dura que se 'pulsan' al interactuar y un titular gigante.",
    fonts: [
      { family: "Bricolage Grotesque", role: "Titulares (opsz 96) y texto" },
      { family: "DM Mono", role: "Etiquetas puntuales" },
    ],
    palette: [
      { name: "Hormigón", hex: "#EDEDE8" },
      { name: "Negro", hex: "#000000" },
      { name: "Lila", hex: "#C4B5FD" },
      { name: "Menta", hex: "#86EFAC" },
      { name: "Cobalto", hex: "#2E4BFF" },
    ],
    references: [
      { name: "Detectify", url: "https://detectify.com/", takeaway: "Sombras duras y formas planas." },
      { name: "Pentera", url: "https://pentera.io/", takeaway: "Palabra gigante y color plano como identidad." },
    ],
    motion: "Botones y bloques que se desplazan sobre su sombra al pulsar.",
  },
  {
    slug: "f",
    letter: "F",
    name: "Futuristic Minimal",
    intent: "Limpio y futurista: profundidad por capas translúcidas y gráficos técnicos sutiles.",
    memorable: "Una esfera de alambre que rota con el scroll y señala puntos expuestos.",
    fonts: [
      { family: "Unbounded", role: "Titulares (peso ligero)" },
      { family: "Manrope", role: "Texto" },
    ],
    palette: [
      { name: "Plata", hex: "#EEF1F5" },
      { name: "Noche", hex: "#0B1530" },
      { name: "Plasma", hex: "#5B5BFF" },
      { name: "Cian", hex: "#0891B2" },
      { name: "Bruma", hex: "#5F6B82" },
    ],
    references: [
      { name: "Horizon3.ai", url: "https://horizon3.ai/", takeaway: "Degradado suave y profundidad." },
      { name: "Protex (plantilla Webflow)", url: "https://webflow.com/templates/html/protex-website-template", takeaway: "Líneas de luz como gráfico técnico." },
      { name: "Wiz", url: "https://www.wiz.io/", takeaway: "Ilustración lineal en lugar de 3D genérico." },
    ],
    motion: "Esfera ligada al scroll, capas con paralaje suave.",
  },
];
