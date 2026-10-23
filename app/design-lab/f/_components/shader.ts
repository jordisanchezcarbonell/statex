// Shader del campo de interferencia (WebGL1, un triángulo a pantalla completa).
// Tres estados que conviven en el mismo lienzo y se separan por las fronteras de sección,
// pasadas como uniforms en función del scroll:
//   señal  (hero)      — el campo original: tres fuentes, una sigue al cursor.
//   caos   (#problema) — fondo tinta, cuatro fuentes con deformación: la vista del atacante.
//   orden  (#enfoque)  — ondas paralelas y regulares: el proceso.
// Dentro del hero, una lente (u_lens) muestra la capa del atacante bajo el cursor.

export const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export const FRAG_BODY = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_src0;
uniform vec4 u_mask;   // bloque de texto del hero: x, y (abajo-izq), ancho, alto en px de dispositivo
uniform float u_dpr;
uniform vec3 u_lens;   // centro (px de dispositivo, origen abajo) y radio
uniform vec2 u_bound;  // y del borde superior de #problema y de #enfoque (px de dispositivo, origen abajo)
uniform float u_scroll; // progreso 0..1 del escenario

const vec3 NIEVE   = vec3(0.969, 0.973, 0.984);
const vec3 HIELO   = vec3(0.749, 0.902, 1.000);
const vec3 COBALTO = vec3(0.173, 0.294, 1.000);
const vec3 VIOLETA = vec3(0.478, 0.361, 1.000);
const vec3 TINTA   = vec3(0.039, 0.059, 0.122);
const vec3 LAVANDA = vec3(0.725, 0.659, 1.000);

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 ramp(float x) {
  x = clamp(x, 0.0, 1.0);
  if (x < 0.34) return mix(NIEVE, HIELO, x / 0.34);
  if (x < 0.70) return mix(HIELO, COBALTO, (x - 0.34) / 0.36);
  return mix(COBALTO, VIOLETA, (x - 0.70) / 0.30);
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float contour(float v, float width) {
  float d = abs(fract(v + 0.5) - 0.5);
  float w = max(FW(v), 1e-4);
  float l = 1.0 - smoothstep(w * (width - 0.6), w * (width + 0.6), d);
  return l * (1.0 - smoothstep(0.22, 0.55, w));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / u_res;
  vec2 p = (frag - 0.5 * u_res) / u_res.y;
  float aspect = u_res.x / u_res.y;
  float t = u_time;
  float k = 34.0;

  // ── Regiones: fronteras de sección con un frente ondulado vivo.
  float F = 64.0 * u_dpr;
  float wob = 14.0 * u_dpr * sin(frag.x / (150.0 * u_dpr) + t * 0.6)
            + 6.0 * u_dpr * sin(frag.x / (47.0 * u_dpr) - t * 0.9);
  float y = frag.y + wob;
  float w1 = 1.0 - smoothstep(u_bound.x - F, u_bound.x + F, y);
  float w2 = 1.0 - smoothstep(u_bound.y - F, u_bound.y + F, y);
  float rH = 1.0 - w1;
  float rC = clamp(w1 - w2, 0.0, 1.0);
  float rO = w2;

  // ── Señal (hero): el campo original.
  vec2 s0 = u_src0;
  vec2 s1 = vec2(0.30 * aspect * cos(t * 0.061) + 0.12 * aspect, 0.24 * sin(t * 0.083) + 0.10);
  vec2 s2 = vec2(-0.32 * aspect + 0.10 * sin(t * 0.047), 0.28 * cos(t * 0.057) - 0.05);
  float d0 = length(p - s0);
  float f = 1.00 * cos(d0 * k * 1.06 - t * 1.10)
          + 0.95 * cos(length(p - s1) * k        - t * 0.85)
          + 0.80 * cos(length(p - s2) * k * 0.94 - t * 0.70);
  float fn = f / 2.75;

  // ── Caos (#problema): más fuentes, más rápidas, espacio deformado.
  vec2 q = p + 0.06 * vec2(sin(p.y * 9.0 + t * 0.7), cos(p.x * 8.0 - t * 0.6));
  vec2 c1 = vec2(0.42 * aspect * sin(t * 0.13), 0.30 * cos(t * 0.17));
  vec2 c2 = vec2(-0.38 * aspect * cos(t * 0.11 + 1.0), 0.34 * sin(t * 0.19 + 2.0));
  vec2 c3 = vec2(0.10 * aspect * sin(t * 0.23 + 4.0), -0.40 * cos(t * 0.07));
  vec2 c4 = vec2(-0.20 * aspect + 0.15 * sin(t * 0.29), 0.45 * cos(t * 0.05 + 3.0));
  float fc = 1.00 * cos(length(q - c1) * k * 1.30 - t * 1.70)
           + 0.90 * cos(length(q - c2) * k * 1.65 - t * 1.30)
           + 0.85 * cos(length(q - c3) * k * 1.05 - t * 2.10)
           + 0.70 * cos(length(q - c4) * k * 2.00 - t * 1.10);
  fc *= 2.75 / 3.45;

  // ── Orden (#enfoque): bandas paralelas regulares; la inclinación sigue al scroll.
  float tilt = 0.10 + 0.16 * u_scroll;
  float vo = (p.y + tilt * p.x + 0.03 * sin(p.x * 2.2 + t * 0.25)) * 15.0 - t * 0.08;

  // ── Lente: solo en el hero y nunca bajo el bloque de texto.
  vec2 mc = u_mask.xy + 0.5 * u_mask.zw;
  float sd = sdBox(frag - mc, 0.5 * u_mask.zw);
  float m = u_mask.z > 0.0 ? smoothstep(-40.0 * u_dpr, 140.0 * u_dpr, sd) : 1.0;
  float ld = length(frag - u_lens.xy);
  float lr = u_lens.z;
  float L = (1.0 - smoothstep(lr - 1.5 * u_dpr, lr + 1.5 * u_dpr, ld)) * m * rH * step(1.0, lr);
  float ring = (1.0 - smoothstep(0.0, 1.4 * u_dpr, abs(ld - lr))) * m * rH * step(1.0, lr);

  // Valor de contorno mezclado por región: el frente entre secciones es una costura viva.
  float vh = f * 2.4 * (1.0 + 0.85 * L);
  float v = vh * rH + fc * 2.4 * rC + vo * rO;
  float fine = contour(v, 0.9);
  float major = contour(v * 0.25, 1.25);
  float lines = max(fine * 0.55, major);

  // Color señal (idéntico al concepto original).
  float ys = fract(t * 0.045) * 1.3 - 0.15;
  float bd = (uv.y - ys) * 7.0;
  float band = exp(-bd * bd);
  float hd = (uv.y - ys) * u_res.y / (1.2 * u_dpr);
  float hair = exp(-hd * hd);
  float intensity = mix(0.10, 1.0, m) * (0.80 + 0.35 * exp(-d0 * 3.2));
  float glow = 0.55 + 0.75 * band;
  float hue = 0.42 + 0.30 * (fn * 0.5 + 0.5) + 0.28 * uv.x;
  vec3 bgH = mix(NIEVE, HIELO, 0.16 * m * smoothstep(0.2, 1.0, fn * 0.5 + 0.5 + 0.25 * uv.x));
  vec3 colH = mix(bgH, ramp(hue), clamp(lines * intensity * glow, 0.0, 1.0));
  colH = mix(colH, COBALTO, 0.10 * hair * m);

  // Capa del atacante dentro de la lente.
  vec3 lineA = mix(HIELO, LAVANDA, 0.5 + 0.5 * fn);
  vec3 bgA = TINTA + VIOLETA * 0.07 * (1.0 - smoothstep(0.0, 1.0, ld / max(lr, 1.0)));
  vec3 colL = mix(bgA, lineA, clamp(lines * 0.95, 0.0, 1.0));
  vec3 colHero = mix(colH, colL, L);
  colHero = mix(colHero, HIELO, ring * 0.9);

  // Caos: líneas limitadas al 34 % para que el texto blanco conserve AA.
  vec3 lineC = mix(HIELO, LAVANDA, 0.5 + 0.5 * (fc / 2.75));
  vec3 colC = mix(TINTA + VIOLETA * 0.05 * uv.x, lineC, clamp(lines * 0.34, 0.0, 1.0));

  // Orden: líneas limitadas al 26 % para texto tinta y gris.
  vec3 lineO = mix(COBALTO, VIOLETA, uv.x * 0.5);
  vec3 colO = mix(NIEVE, lineO, clamp(lines * 0.26, 0.0, 1.0));

  vec3 col = colHero * rH + colC * rC + colO * rO;
  col += (hash(frag + fract(t) * 91.7) - 0.5) * 0.030;
  gl_FragColor = vec4(col, 1.0);
}
`;
