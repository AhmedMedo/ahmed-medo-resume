import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

// Characterful display face for headlines. Kept to 600-700: the heavier
// weights crowd letterforms and tire the eye.
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Neutral, small-size-friendly face for all body copy.
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Mono accents for tags, dates, and labels.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
