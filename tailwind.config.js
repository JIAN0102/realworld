/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro", sans-serif'],
      serif: ['"Source Serif Pro", sans-serif'],
      titillium: ['"Titillium Web", sans-serif'],
    },
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
