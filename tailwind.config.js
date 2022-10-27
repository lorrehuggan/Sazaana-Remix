/** @type {import('tailwindcss').Config} */
let plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        hanuman: ["Hanuman", ...defaultTheme.fontFamily.sans],
        display: ["Hind Vadodara", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "base-100": "#16161D",
        "base-200": "#2A2A37",
        "light-200": "#DCD7BA",
        "light-100": "#C8C093",
        "primary-100": "#DCA561",
        "primary-200": "#FF9E3B",
        "secondary-100": "#7FB4CA",
        "secondary-200": "#A3D4D5",
        "accent-100": "#E82424",
        "accent-200": "#C34043",
        sakuraPink: "#D27E99",
        katanaGray: "#717C7C",
        winterRed: "#43242B",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
};
