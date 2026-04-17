/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tech + African tone color system
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef7ff',
          100: '#fce7ff',
          200: '#f8ceff',
          300: '#f2a5ff',
          400: '#ea6dff',
          500: '#dd35ff',
          600: '#c514ff',
          700: '#a30bef',
          800: '#8609c7',
          900: '#6b0a9e',
        },
        earth: {
          50: '#fdf8f3',
          100: '#f9e9d8',
          200: '#f2d4b4',
          300: '#e8b687',
          400: '#da9258',
          500: '#c97632',
          600: '#ad5f2a',
          700: '#8e4d24',
          800: '#733f20',
          900: '#5e341b',
        }
      }
    },
  },
  plugins: [],
}
