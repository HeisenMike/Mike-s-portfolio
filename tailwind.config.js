/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"SuisseIntl"', '"Verdana"', 'sans-serif'],
        body: ['"SuisseIntl"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"SuisseIntl"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#ffffff',
        'text-primary': '#1a1a1a',
        'text-secondary': '#4a4a4a',
      }
    },
  },
  plugins: [],
}
