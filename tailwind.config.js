/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainGray: "#7a7c80",
        mediumGray: "#303030",
        midGray: "#191919",
        darkGray: "#101010",
        tekhelet: "#6140c2",
      },
    },
  },
  plugins: [],
};
