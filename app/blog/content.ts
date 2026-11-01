// Editorial copy only. Never import the experimental workspace or evidence into public routes.
export const localAiPost = {
  slug: "ia-local-actualizar-dependencia",
  title: "Probamos una IA local para actualizar una dependencia: por qué rechazamos su propuesta",
  description: "Dos pilotos locales, un control determinista y ningún parche de IA: qué aprendimos al validar una propuesta antes de permitir sus efectos.",
  author: "Jordi Sánchez",
  date: "2026-11-01",
  dateLabel: "1 de noviembre de 2026",
  path: "/blog/ia-local-actualizar-dependencia",
};

export const technicalSources = [
  { label: "GitHub Advisory Database: CVE-2024-21538 y versiones de cross-spawn afectadas y reparadas", url: "https://github.com/advisories/GHSA-3xgq-45jj-v275" },
  { label: "Qwen: repositorio oficial de pesos GGUF, revisión utilizada", url: "https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/tree/f86cb2c1fa58255f8052cc32aeede1b7482d4361" },
  { label: "llama.cpp: código del CLI en la revisión utilizada, incluido el marcador de fin", url: "https://github.com/ggml-org/llama.cpp/blob/74d4f5b041ad837153b0e90fc864b8290e01d8d5/examples/main/main.cpp#L939-L958" },
  { label: "npm: contrato de instalación reproducible de npm ci", url: "https://docs.npmjs.com/cli/v11/commands/npm-ci/" },
];
