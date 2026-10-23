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
  pros: string[];
  cons: string[];
};

// Nombres internos de trabajo; la marca visible es siempre StateX.
// Referencias: solo las consultadas y documentadas en docs/design-research.md.
export const DIRECTIONS: Direction[] = [
  {
    slug: "a",
    letter: "A",
    name: "Venture Capital Ready",
    intent: "Startup respaldable por inversores: minimalismo premium, tipografía de alto impacto y un sistema gráfico reconocible.",
    memorable: "Una X monumental hecha de una matriz de celdas: al pasar el cursor, algunas se giran y revelan activos expuestos.",
    fonts: [{ family: "Hanken Grotesk", role: "Titulares 700–800 muy ajustados y texto" }],
    palette: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Tinta", hex: "#0C0D10" },
      { name: "Gris", hex: "#5F646D" },
      { name: "Línea", hex: "#E4E6EA" },
      { name: "Turquesa profundo", hex: "#00796B" },
      { name: "Turquesa sobre tinta", hex: "#4FB3A5" },
    ],
    references: [
      { name: "Linear", url: "https://linear.app/", takeaway: "Contención y precisión tipográfica." },
      { name: "InspoSec (Seed)", url: "https://insposec.com/", takeaway: "Webs de startups Seed: claridad antes que efectos." },
    ],
    motion: "Matriz de celdas que reacciona al cursor; entrada orquestada del titular.",
    pros: ["Se lee como startup seria en segundos: una tipografía, un acento, mucho aire.", "Sistema muy coherente: la X de celdas genera logotipo, iconos, línea temporal y deck.", "La interacción del hero cuenta el servicio (revelar lo expuesto) en lugar de decorar."],
    cons: ["Territorio visual (blanco, negro y un acento) muy transitado en B2B.", "El titular largo a tamaño monumental alarga el hero.", "El efecto principal depende del cursor; en móvil se reduce a un recorrido automático."],
  },
  {
    slug: "b",
    letter: "B",
    name: "Cybersecurity Product",
    intent: "Lenguaje de empresa de producto: el problema y la solución explicados con visualizaciones de la superficie de ataque.",
    memorable: "Un grafo conceptual de la superficie de ataque: al seleccionar un activo se dibuja el camino desde internet hasta él.",
    fonts: [
      { family: "DM Sans", role: "Titulares y texto" },
      { family: "DM Mono", role: "Datos de las visualizaciones" },
    ],
    palette: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Niebla", hex: "#F2F4F8" },
      { name: "Marino", hex: "#0B1533" },
      { name: "Azul cielo", hex: "#3D8BFF" },
      { name: "Azul tinta", hex: "#1A5BD0" },
      { name: "Amarillo señal", hex: "#FFC933" },
    ],
    references: [
      { name: "Wiz", url: "https://www.wiz.io/", takeaway: "Claridad de producto y acento único." },
      { name: "Detectify", url: "https://detectify.com/", takeaway: "Superficie de ataque como protagonista." },
      { name: "Tines", url: "https://www.tines.com/", takeaway: "Interfaz viva dentro del hero." },
    ],
    motion: "Grafo interactivo, caminos que se dibujan, problema y solución con transición por scroll.",
    pros: ["Explica qué hace StateX al instante con un grafo interactivo y accesible.", "Lenguaje creíble para CTO y CISO acostumbrados a productos de seguridad.", "El paso de problema a enfoque se ve, no solo se lee."],
    cons: ["Es la más cercana al código visual de Wiz o Detectify: menos distintiva.", "Riesgo de que parezca un producto SaaS que todavía no existe.", "El recorrido por scroll alarga mucho la página en escritorio."],
  },
  {
    slug: "c",
    letter: "C",
    name: "Category Creator",
    intent: "Identidad propia y extensible, al estilo de Tines o Island: paleta original y piezas gráficas modulares derivadas de la X.",
    memorable: "Piezas modulares (cuartos de círculo y cuadrados) que se recombinan para formar la X y un pictograma distinto en cada sección.",
    fonts: [
      { family: "Bricolage Grotesque", role: "Titulares con personalidad (opsz 96)" },
      { family: "Hanken Grotesk", role: "Texto" },
    ],
    palette: [
      { name: "Papel frío", hex: "#F1F3EF" },
      { name: "Tinta", hex: "#17161C" },
      { name: "Salvia", hex: "#A9CBB6" },
      { name: "Albaricoque", hex: "#F3A877" },
      { name: "Lila", hex: "#C3B2F2" },
      { name: "Petróleo", hex: "#14524F" },
    ],
    references: [
      { name: "Tines por Todd Wilson", url: "https://toddwilson.studio/work/tines", takeaway: "Paleta propia y sistema gráfico extensible." },
      { name: "Island por Ramotion", url: "https://www.ramotion.com/island/", takeaway: "Concepto de marca claro aplicado a todo." },
      { name: "Chainguard por Bluetext", url: "https://bluetext.com/work/chainguard/", takeaway: "Elemento propio con carácter dentro de la seguridad." },
    ],
    motion: "Ensamblaje de la X al cargar y piezas que se recomponen en el pictograma de cada sección al hacer scroll.",
    pros: ["La identidad más propia y extensible: cuatro piezas generan logotipo, pictogramas, stand y deck.", "Paleta original, sin parecido con el sector.", "El movimiento cuenta una historia de desorden a orden."],
    cons: ["El tono puede resultar demasiado lúdico para un CISO conservador.", "La X de cuartos de círculo puede leerse como flor o hélice en tamaños pequeños.", "Exige disciplina para que cada nueva pieza respete el sistema."],
  },
  {
    slug: "d",
    letter: "D",
    name: "Dark Premium Security",
    intent: "Oscuro y sofisticado, con sensación de ingeniería avanzada: el método se ve trabajar.",
    memorable: "Globo ASCII renderizado en tiempo real y una terminal que narra el proceso mientras haces scroll.",
    fonts: [
      { family: "Geist", role: "Titulares y texto" },
      { family: "JetBrains Mono", role: "Terminal, figuras y datos" },
    ],
    palette: [
      { name: "Fondo", hex: "#0B0C0E" },
      { name: "Superficie", hex: "#141619" },
      { name: "Texto", hex: "#E8E6E3" },
      { name: "Secundario", hex: "#8A8F98" },
      { name: "Ámbar fósforo", hex: "#FFB000" },
    ],
    references: [
      { name: "Oxide Computer", url: "https://oxide.computer/", takeaway: "Terminal y pies de figura técnicos." },
      { name: "Guardbase (Behance)", url: "https://www.behance.net/gallery/246301339/GUARDBASE-BRANDING-WEBSITE-AI-Security-Startup", takeaway: "Imagen ASCII/dither y retícula con marcas de esquina." },
      { name: "Linear", url: "https://linear.app/", takeaway: "Tipografía tensa en dos tonos." },
    ],
    motion: "Globo ASCII interactivo, sección fijada con terminal que escribe al hacer scroll.",
    pros: ["Transmite ingeniería avanzada sin neón ni clichés.", "El globo ASCII y la terminal son memorables y muestran el método.", "Vocabulario gráfico coherente (FIG., marcas de esquina, listados) aplicable a informes y GitHub."],
    cons: ["Densidad técnica alta: puede intimidar a un directivo no técnico.", "La sección fijada del enfoque exige mucho scroll y pantallas altas.", "El modo oscuro con ámbar es elegante pero menos diferenciado en el sector."],
  },
  {
    slug: "e",
    letter: "E",
    name: "Neo Brutalism",
    intent: "Atrevido y tipográfico, con bloques planos y bordes gruesos, pero ordenado y creíble. Recuperado de la primera ronda.",
    memorable: "Bloques de color con sombra dura que se pulsan al interactuar y un titular gigante.",
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
    pros: ["La dirección más reconocible: bloques que se pulsan y titular gigante.", "La gramática sólido/discontinuo separa con honestidad lo que existe de lo que es visión.", "Piezas sencillas de construir y mantener, con buen contraste."],
    cons: ["Su tono juguetón puede restar seriedad ante un CISO o un comité de dirección.", "Página larga y densa: el ritmo de bordes gruesos se repite.", "Muchas sombras duras pueden verse recargadas en pantallas pequeñas."],
  },
  {
    slug: "f",
    letter: "F",
    name: "Future Security",
    intent: "La propuesta más experimental: un shader propio como identidad y una lente que revela la superficie expuesta.",
    memorable: "Hero con ondas de interferencia en WebGL que reaccionan al cursor, y una lente que descubre la capa del atacante.",
    fonts: [{ family: "Inter Tight", role: "Titulares (tracking negativo) y texto" }],
    palette: [
      { name: "Nieve", hex: "#F7F8FB" },
      { name: "Tinta", hex: "#0A0F1F" },
      { name: "Cobalto", hex: "#2C4BFF" },
      { name: "Violeta", hex: "#7A5CFF" },
      { name: "Hielo", hex: "#BFE6FF" },
      { name: "Lavanda", hex: "#B9A8FF" },
    ],
    references: [
      { name: "Horizon3.ai", url: "https://horizon3.ai/", takeaway: "Isolíneas como textura técnica." },
      { name: "Beacon Security (vía InspoSec, Seed)", url: "https://insposec.com/", takeaway: "Una startup Seed puede permitirse una dirección artística sorprendente." },
      { name: "Chainguard", url: "https://www.chainguard.dev/", takeaway: "Marca propia fuerte en seguridad." },
    ],
    motion: "Shader WebGL interactivo, lente que revela la capa del atacante, fondo que cambia de estado (señal, caos, orden) con el scroll.",
    pros: ["El momento más espectacular: shader propio y lente que revela la capa del atacante.", "El fondo cambia de estado con el contenido (señal, caos, orden).", "Muy memorable para inversores y eventos."],
    cons: ["Coste de GPU en equipos modestos; sin medir en dispositivos reales.", "La más experimental: riesgo de que el efecto eclipse el mensaje.", "Más difícil de trasladar fielmente a documentos estáticos."],
  },
  {
    slug: "g",
    letter: "G",
    name: "Editorial Tech / Underground",
    intent: "Recupera la personalidad de InfoStateX y DoubleReboot: editorial, expresivo, con guiños sutiles a la terminal.",
    memorable: "Texto que aparece al retirarse barras de censura y un archivo de investigación tratado como una publicación.",
    fonts: [
      { family: "Instrument Serif", role: "Titulares enormes" },
      { family: "IBM Plex Mono", role: "Metadatos, terminal y fichas" },
      { family: "IBM Plex Sans", role: "Texto" },
    ],
    palette: [
      { name: "Papel frío", hex: "#E9EAE6" },
      { name: "Tinta", hex: "#111111" },
      { name: "Rojo señal", hex: "#D7261E" },
      { name: "Gris archivo", hex: "#575A54" },
      { name: "Blanco ficha", hex: "#F7F7F4" },
    ],
    references: [
      { name: "InfoStateX", url: "https://infostatex.blogspot.com/", takeaway: "La voz y el archivo originales de la marca." },
      { name: "DoubleReboot", url: "https://doublereboot.blogspot.com/", takeaway: "Tutoriales y cultura de herramientas." },
      { name: "Material Security", url: "https://material.security/", takeaway: "Tipografía grande sobre retícula." },
    ],
    motion: "Barras de censura que se retiran, fichas apiladas con el scroll, cursor de terminal.",
    pros: ["Usa el archivo real de InfoStateX y DoubleReboot como argumento de credibilidad.", "Personalidad editorial única entre las webs de ciberseguridad.", "Los guiños de terminal informan (hoy frente a visión como código comentado)."],
    cons: ["Puede leerse como poco corporativo para empresas medianas conservadoras.", "Titulares serif enormes alargan la página, sobre todo en móvil.", "Depende del peso que quieras dar al pasado bloguero en el pitch."],
  },
];
