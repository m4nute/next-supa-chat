import { type Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        topbar: "#262930",
        input: "#23242C",
        message: "#1785F7",
        dialogInput: "#4f4f4f",
        dialogButton: "#1f1f1f",
        searchBar: "#333333",
        rootBg: "#363742",
      },
    },
  },
  plugins: [],
} satisfies Config
