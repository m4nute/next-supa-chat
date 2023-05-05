import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        topbar: "#262930",
        input: "#1c1c1c",
        message: "#292929",
        dialogInput: "#4f4f4f",
        dialogButton: "#1f1f1f",
        searchBar: "#333333",
        rootBg: "#0C0E12",
      },
    },
  },
  plugins: [],
} satisfies Config;
