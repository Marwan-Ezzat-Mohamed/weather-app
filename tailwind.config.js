/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary)",
        },
      },
      textColor: {
        primary: {
          DEFAULT: "var(--color-text-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-text-secondary)",
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
  darkMode: "class",
};
