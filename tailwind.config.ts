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
        /* ── NeoPeds brand tokens ── */
        'np-primary':        '#3E8A95',
        'np-primary-h':      '#2F6F79',
        'np-primary-press':  '#245862',
        'np-primary-soft':   '#D9ECEE',
        'np-secondary':      '#21335E',
        'np-secondary-h':    '#182547',
        'np-tertiary':       '#7CB3B9',
        'np-tertiary-soft':  '#E6F1F2',

        /* Teal scale */
        'np-teal-50':  '#F1F8F9',
        'np-teal-100': '#D9ECEE',
        'np-teal-200': '#B3D9DD',
        'np-teal-300': '#7CB3B9',
        'np-teal-500': '#3E8A95',
        'np-teal-600': '#2F6F79',
        'np-teal-700': '#245862',

        /* Navy scale */
        'np-navy-50':  '#F2F4F9',
        'np-navy-100': '#DCE2EE',
        'np-navy-600': '#21335E',
        'np-navy-700': '#182547',
        'np-navy-800': '#111B36',

        /* Surfaces */
        'np-canvas':         '#E8EEF8',
        'np-canvas-soft':    '#F1F4FB',
        'np-surface':        '#FFFFFF',
        'np-surface-sunken': '#F4F7FB',

        /* Text */
        'np-fg-1': '#182547',
        'np-fg-2': '#334155',
        'np-fg-3': '#64748B',
        'np-fg-4': '#94A3B8',

        /* Borders */
        'np-border':        '#E2E8F0',
        'np-border-strong': '#CBD5E1',

        /* Semantic */
        'np-success':      '#15803D',
        'np-success-soft': '#DCFCE7',
        'np-danger':       '#DC2626',
        'np-danger-soft':  '#FEE2E2',
        'np-gold':         '#F5A623',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
