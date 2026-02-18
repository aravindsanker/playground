import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Madras Drip brand palette — pulled from logo
        drip: {
          black: '#0A0A0A',
          card: '#141414',
          border: '#2A2A2A',
          yellow: '#F5C518',
          'yellow-dim': '#C9A110',
          white: '#FFFFFF',
          muted: '#888888',
          'muted-light': '#555555',
        },
      },
      fontFamily: {
        // Retro condensed — the "MADRAS" energy
        display: ['var(--font-bebas)', 'Impact', 'Arial Narrow', 'sans-serif'],
        // Modern sans — the "drip" energy
        body: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'heart-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'heart-pop': 'heart-pop 0.3s ease',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
