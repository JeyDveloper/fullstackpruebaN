/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#00249c',
        'blue-light': '#40cee4',
        'red': '#c6007e',
        'pink': '#e280be',
        'gray': '#c5c5c5',
        'white': '#fff',
        'black': '#000'
      },
    },
  },
  plugins: [],
}
