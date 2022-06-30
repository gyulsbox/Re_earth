/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {},
  },
  darkMode: "media",
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};
