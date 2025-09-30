/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fdf9f4',
          100: '#faf0e8',
          200: '#f4ddc5',
          300: '#edc49c',
          400: '#e4a569',
          500: '#dd8d41',
          600: '#cf7735',
          700: '#ac5f2e',
          800: '#894d2a',
          900: '#6f4026',
        },
        cherry: {
          50: '#fef7f7',
          100: '#fdecec',
          200: '#fad5d5',
          300: '#f6b3b3',
          400: '#f08080',
          500: '#e74c4c',
          600: '#d63333',
          700: '#b42727',
          800: '#952323',
          900: '#7c2323',
        },
        sand: {
          50: '#fefbf7',
          100: '#fdf5ed',
          200: '#fae8d1',
          300: '#f6d4a9',
          400: '#f0b975',
          500: '#ea9f48',
          600: '#dc8731',
          700: '#b76c28',
          800: '#935527',
          900: '#774723',
        }
      },
      fontFamily: {
        'noto-jp': ['Noto Sans JP', 'sans-serif'],
        'zen-kaku': ['Zen Kaku Gothic New', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}