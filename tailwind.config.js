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
    },
  },
  plugins: [require("tailwindcss-radix")()],
};
