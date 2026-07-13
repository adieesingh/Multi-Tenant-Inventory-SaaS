import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12141C",
          50: "#F4F5F7",
          100: "#E6E7EB",
          200: "#CDD0D9",
          300: "#A7ACBA",
          400: "#767C8F",
          500: "#565C6E",
          600: "#3D4152",
          700: "#292C38",
          800: "#1B1D26",
        },
        surface: {
          50: "#FAFAFB",
          100: "#F2F3F5",
        },
        line: "#E5E7EB",
        accent: {
          50: "#EEF2FF",
          200: "#C7D2FE",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3",
        },
        success: {
          50: "#F0FDF4",
          200: "#BBF7D0",
          500: "#16A34A",
          600: "#15803D",
          700: "#166534",
        },
        warn: {
          50: "#FFFBEB",
          200: "#FDE68A",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        danger: {
          50: "#FEF2F2",
          200: "#FECACA",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
