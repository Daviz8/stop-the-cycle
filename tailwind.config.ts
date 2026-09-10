
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#217A4B',
          navy: '#172546',
          gold: '#D4A024',
          mint: '#E9F4F1',
          cream: '#F9F2ED',
        },
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};