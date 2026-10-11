import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

// Bold display sans for headlines — big, heavy, tight leading.
export const fontDisplay = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
