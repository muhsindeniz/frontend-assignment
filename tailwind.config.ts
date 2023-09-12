import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kalam: ["Kalam", "sans-serif"],
      },
      height: {
        "app-layout": "calc(100vh - 128px)",
      },
      maxHeight: {
        "screen-layout": "calc(100vh - 160px)",
      },
      colors: {
        primary: {
          lightest: "#E3F2FD",
          light: "#64B5F6",
          DEFAULT: "#2196F3",
          dark: "#1976D2",
        },
        success: {
          lightest: "#E8F5E9",
          light: "#81C784",
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
        },
        neutral: {
          lightest: "#FAFAFA",
          light: "#E0E0E0",
          DEFAULT: "#F2F2F2",
          dark: "#424242",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
