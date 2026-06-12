import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wc-green':    '#22D45F',   // bright lime — primary accent
        'wc-gold':     '#F5A623',   // gold — points / trophy
        'wc-red':      '#FF3D5C',   // live / danger
        'wc-dark':     '#071A09',   // pitch dark base
        'wc-surface':  '#0D2410',   // card surface
        'wc-elevated': '#163519',   // elevated card
      },
      animation: {
        'float':     'float 3s ease-in-out infinite',
        'shimmer':   'shimmer 3s linear infinite',
        'slide-up':  'slide-up 0.35s ease-out forwards',
        'fade-in':   'fade-in 0.3s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':  { from: { opacity: '0' }, to: { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
export default config;
