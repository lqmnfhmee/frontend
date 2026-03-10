import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🌎 Base */
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",

        /* 🪟 Surfaces */
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",

        /* 🎨 Brand */
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",

        /* 🏢 Enterprise Theme */
        "brand-darkBg": "#0B1426",
        "brand-darkMain": "#0F1B33",
        "brand-darkCard": "#13213D",
        "brand-darkBorder": "#1E2E50",
        "brand-darkHover": "#1C2C4D",
        "brand-primary": "#2F80ED",
        "brand-secondary": "#3F5BD9",
        "brand-highlight": "#FFC107",

        /* 📊 Status */
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;