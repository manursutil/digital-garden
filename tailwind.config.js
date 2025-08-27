/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            p: {
              "margin-top": "1.25em",
              "margin-bottom": "1.25em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
