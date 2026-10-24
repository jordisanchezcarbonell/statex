import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

export const serif = Newsreader({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--i-serif", display: "swap" });
export const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--i-sans", display: "swap" });
export const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--i-mono", display: "swap" });
export const fontVars = `${serif.variable} ${sans.variable} ${mono.variable}`;
