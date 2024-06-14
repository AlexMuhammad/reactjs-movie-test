/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "bnv-regular": ['Regular'],
        "bnv-medium": ['Medium'],
        "bnv-bold": ['Bold'],
        "bnv-light": ['Light']
      }
    },
  },
  plugins: [],
}

