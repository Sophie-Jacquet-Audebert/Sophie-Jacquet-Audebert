/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#eaeee4',
          200: '#d4ddc8',
          300: '#b4c4a0',
          400: '#8fa67a',
          500: '#6d8a58',
          600: '#556e44',
          700: '#435738',
          800: '#37462f',
          900: '#2e3b28',
        },
        stone: {
          warm: '#f5f0eb',
        },
        cream: '#faf7f4',
        taupe: {
          100: '#f0ebe4',
          200: '#e0d8cf',
          300: '#c8bdb0',
          400: '#a89080',
          500: '#8b7060',
          600: '#7a5f50',
        },
        charcoal: '#3a3530',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
}
