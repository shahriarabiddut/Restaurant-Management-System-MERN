/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "rancho": ["Rancho", "cursive"],
        "barlow": ["Barlow Condensed", "serif"],
        "inter": ["Inter", "serif"],
        "cinzel": ["Cinzel", "serif"],
      },
      colors:{
        'primer':'#d1a054',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

