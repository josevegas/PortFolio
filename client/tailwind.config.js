/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6EE7B7',
          DEFAULT: '#10B981', 
          dark: '#059669',
        },
        secondary: {
          light: '#3B82F6',
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          text: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
