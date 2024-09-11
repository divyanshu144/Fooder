/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        'custom-rgba': 'rgba(2, 6, 12, 0.05)',
      },
      spacing: {
        'custom-margin': 'calc(10% + 52px)', 
      },
      colors: {
        'custom-orange': '#ff5200',
      },
    },
  },
  plugins: [],
}