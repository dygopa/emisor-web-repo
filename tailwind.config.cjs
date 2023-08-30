/** @type {import('tailwindcss').Config} */
require('dotenv').config()

module.exports = {
  content: [
    './index.html',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        "primary": process.env.VITE_PRIMARY_COLOR_APP,
        "secondary": process.env.VITE_SECONDARY_COLOR_APP
      }
    },
  },
  plugins: [],
}
