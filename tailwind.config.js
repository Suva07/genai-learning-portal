/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#060D1A', 2: '#0A1628', card: '#0D1F38', hover: '#112544' },
        gold: { DEFAULT: '#E8A020', light: '#F5C842', dim: 'rgba(232,160,32,0.15)' },
        text: { DEFAULT: '#E8E4DC', muted: '#6B7E99', subtle: '#8A9BB0' },
        border: { DEFAULT: 'rgba(255,255,255,0.07)', hover: 'rgba(255,255,255,0.14)' },
        m1: '#00B4D8', m2: '#F77F00', m3: '#9B5DE5', m4: '#E8A020',
        m5: '#2EC4B6', m6: '#E05A4E',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

