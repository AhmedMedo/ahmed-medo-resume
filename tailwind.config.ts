import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Violet Ink + Peach". Contrast vs canvas: fg 16.3:1, fg-muted 8.0:1,
        // accent 7.1:1, accent-bright 10.4:1, spark 11.4:1.
        // accent-strong is for filled buttons only (white text, 5.7:1) —
        // never use it as text on canvas.
        canvas: "#0F0D1A",
        surface: "#171428",
        line: "#2A2640",
        fg: {
          DEFAULT: "#EDEBF7",
          muted: "#A9A4C4",
        },
        accent: {
          DEFAULT: "#A78BFA",
          bright: "#C4B5FD",
          strong: "#7C3AED",
        },
        spark: "#FDBA74",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
