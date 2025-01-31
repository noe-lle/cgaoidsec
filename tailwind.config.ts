import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pcg: {
          orange: "#FF6B1D",
          blue: "#003875"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config