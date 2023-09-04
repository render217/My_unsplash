/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'UbuntuMono':['Ubuntu Mono','sans-serif'],
        'NotoSansJP':['Noto Sans JP','sans-serif'],
        'Poppins':['Poppins','sans-serif']
      },
      colors:{
        cbgmain:"#FAFAFB"
      }
    },
  },
  plugins: [],
}