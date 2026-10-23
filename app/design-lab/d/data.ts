// Datos propios de las figuras y la terminal de Concept D. Todo es ilustrativo: dominio reservado
// ejemplo.com y rangos de documentación (RFC 5737). No describe ningún cliente, herramienta ni producto.

export type LogLine = readonly [key: string, value: string];

/** Un bloque de registro por paso de content.approach.steps, en el mismo orden. */
export const APPROACH_LOGS: readonly (readonly LogLine[])[] = [
  [
    ["objetivo", "ejemplo.com"],
    ["rangos", "203.0.113.0/24, 198.51.100.0/24"],
    ["fuera", "terceros sin autorización propia"],
    ["autorización", "firmada por el cliente"],
  ],
  [
    ["subdominios", "www, api, staging, mail"],
    ["servicios", "203.0.113.14 vpn, 198.51.100.7 ssh"],
    ["nuevo", "staging.ejemplo.com (no inventariado)"],
  ],
  [
    ["revisando", "staging.ejemplo.com"],
    ["resultado", "panel de administración expuesto"],
    ["estado", "confirmado manualmente"],
    ["descartado", "api.ejemplo.com (falso positivo)"],
  ],
  [
    ["alto", "staging.ejemplo.com, 203.0.113.14"],
    ["medio", "api.ejemplo.com, mail.ejemplo.com"],
    ["bajo", "www.ejemplo.com, 198.51.100.7"],
  ],
  [
    ["entrega", "plan de remediación priorizado"],
    ["sesión", "revisión con el equipo técnico"],
    ["estado", "corrección en curso"],
  ],
];

export const KEY_WIDTH = 14;

// Posición de cada sampleAsset sobre el globo (grados), mismo orden que content.sampleAssets.
export const TARGET_COORDS: readonly (readonly [lat: number, lon: number])[] = [
  [24, -28],
  [38, 34],
  [-8, 8],
  [-34, -62],
  [8, 102],
  [46, 168],
];

/** Radio del anillo de cada solución en el esquema de capas (viewBox 400). Mismo id que content.solutions. */
export const SOLUTION_RINGS: Record<string, number> = {
  easm: 176,
  appsec: 132,
  va: 90,
  engineering: 48,
};
