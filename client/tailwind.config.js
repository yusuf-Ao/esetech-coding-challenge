/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
extend: {
        screens: {
          'max-lg': '1115px',
          // => @media (min-width: 640px) { ... }
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          roboto: ["Roboto", "sans-serif"],
        },
        colors: {
          "primary": '#072F75',
          "primary-light": '#51A9FF',
          "gray-light": '#7B7B7B',
          "body": '#B3E6FC10',
          "body-dark": '#B3E6FC60',
        }
      },
      },
  plugins: [],
}

