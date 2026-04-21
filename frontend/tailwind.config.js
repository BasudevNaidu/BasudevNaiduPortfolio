/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e9edff',
          200: '#cdd5ff',
          300: '#a5b1ff',
          400: '#7d8aff',
          500: '#5b66ff',
          600: '#4048e8',
          700: '#3036b8',
          800: '#262b8e',
          900: '#1c206b',
        },
        accent: {
          pink: '#ff6ad5',
          peach: '#ffb37c',
          mint: '#7ce0c2',
          sky: '#7cc6ff',
          lemon: '#ffe27c',
        },
      },
      animation: {
        blob: 'blob 18s infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        gradient: 'gradient 8s ease infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        spinSlow: 'spin 18s linear infinite',
        marquee: 'marquee 30s linear infinite',
        bounceSlow: 'bounceSlow 4s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.95)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceSlow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(91,102,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,102,255,0.08) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(245,247,255,1) 75%)',
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(64,72,232,0.25)',
        glow: '0 0 40px rgba(91,102,255,0.35)',
      },
    },
  },
  plugins: [],
}
