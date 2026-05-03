/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F2F2D8",
          dark: "#E8E8C4",
          darker: "#D8D8B0",
        },
        burgundy: {
          DEFAULT: "#37090B",
          mid: "#5a1215",
          light: "#7d1a1e",
          muted: "#9e2428",
        },
        gold: {
          DEFAULT: "#C4922A",
          light: "#D4A84A",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ["Syne", "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
