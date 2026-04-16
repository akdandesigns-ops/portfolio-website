import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        border: "var(--border)",
        overlay: "var(--overlay)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        brother: ["var(--font-brother)", "'Bebas Neue'", "sans-serif"],
        impact: ["Impact", "Haettenschweiler", "'Arial Narrow Bold'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
