import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SCWO green palette
        g: {
          9: '#0a2e1e',
          8: '#0f4c35',
          7: '#145a3f',
          6: '#1a6e4d',
          1: '#e8f0eb',
        },
        // SCWO gold/amber palette
        a: {
          u: '#b08612',
          5: '#d4a017',
          4: '#e6b833',
          1: '#faf2dc',
        },
        // SCWO neutrals
        cream:  '#faf7f0',
        paper:  '#f5f1e8',
        ink:    '#1a1a1a',
        soft:   '#4a4a4a',
        line:   '#d9d3c4',

        // Keep legacy primary/accent for any components not yet migrated
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },

      fontFamily: {
        sans:  ['Manrope', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },

      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '4px',
        xl: '4px',
        '2xl': '6px',
      },

      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'ticker':     'tickerMove 30s linear infinite',
        'blink':      'blink 2s infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        tickerMove: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },

      boxShadow: {
        soft: '0 1px 2px rgba(10,46,30,.04), 0 8px 24px rgba(10,46,30,.06)',
        card: '0 2px 4px rgba(10,46,30,.06), 0 24px 48px -12px rgba(10,46,30,.12)',
        'card-hover': '0 4px 8px rgba(10,46,30,.08), 0 32px 64px -16px rgba(10,46,30,.18)',
      },

      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 80% 20%, rgba(212,160,23,.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20,90,63,.4) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
};

export default config;