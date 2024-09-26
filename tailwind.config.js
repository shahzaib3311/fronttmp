/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/*.js",
    "./src/Routes/*.js",
    "./src/pages/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ['Abril Fatface', 'sans-serif'],
        economica: ['Economica', 'sans-serif'],
      },
      backgroundImage: {
        "small-girl": 'url(https://img.freepik.com/premium-photo/sexy-young-fashion-model-woman-fashionable-clothes-with-hoodie-stands-room-with-bright-neon-lights-modern-trendy-girl-posing-studio-with-pink-red-color-fashion-ladies-creative-concept_338491-9620.jpg)',
        "big-girl": 'url(https://img.freepik.com/premium-photo/fashionable-pretty-young-woman-fashion-model-sportswear-is-enjoying-dance-room-with-multi-colored-light-stylish-beautiful-sexy-girl-dancing-indoors-with-bright-pink-neon-flickering_338491-8667.jpg)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
}
