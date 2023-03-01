/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
