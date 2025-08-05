/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['"Orbitron"', 'sans-serif'],
        'rajdhani': ['"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: 0.7,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
}