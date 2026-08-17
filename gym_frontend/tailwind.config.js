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
        tg: {
          bg: 'var(--tg-theme-bg-color, #0b0f19)',
          text: 'var(--tg-theme-text-color, #f8fafc)',
          hint: 'var(--tg-theme-hint-color, #94a3b8)',
          link: 'var(--tg-theme-link-color, #38bdf8)',
          btn: 'var(--tg-theme-button-color, #2563eb)',
          btnText: 'var(--tg-theme-button-text-color, #ffffff)',
          secondary: 'var(--tg-theme-secondary-bg-color, #151e33)',
          section: 'var(--tg-theme-section-bg-color, #1e293b)',
          header: 'var(--tg-theme-header-bg-color, #0b0f19)',
          accent: 'var(--tg-theme-accent-text-color, #38bdf8)',
        },
        gym: {
          dark: '#0a0e1a',
          card: '#121829',
          border: '#1e2942',
          fire: '#ff5722',
          fireGlow: '#ff9800',
          electric: '#00f0ff',
          neonGreen: '#10b981',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-fire': '0 0 25px -5px rgba(255, 87, 34, 0.5)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.5)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.5)',
        'glow-gold': '0 0 30px -5px rgba(245, 158, 11, 0.6)',
        'glow-btn': '0 4px 20px -2px rgba(37, 99, 235, 0.4)',
      },
      animation: {
        'flame-dance': 'flameDance 1.5s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        flameDance: {
          '0%': { transform: 'scale(1) rotate(-3deg)' },
          '50%': { transform: 'scale(1.12) rotate(4deg)' },
          '100%': { transform: 'scale(1.05) rotate(-2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
