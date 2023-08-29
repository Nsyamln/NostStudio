/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      transparent:'transparent',
      current:'currentColor',
      'col1':'#2D2727',
      'col2':'#F9F5EB',
      'col3':'#D8D8D8',
      'col4':'#393942',
      'white':'#FFFFFF',
      'black':'#000000',
      'panacotta':'#DD9D7C',
      'gray-900':'#212121',
      'gray-100':'#F5F5F5',
      'gray-800':'#424242',
    }
  },
  plugins: [],
}

