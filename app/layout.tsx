import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import { profile } from "@/lib/data/resume";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.tagline}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
