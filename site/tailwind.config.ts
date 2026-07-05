import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef5ff',
          100: '#d9e9ff',
          200: '#bcd6ff',
          300: '#8ebbff',
          400: '#5a96ff',
          500: '#2f6fe8',
          600: '#1a52d0',
          700: '#1540a8',
          800: '#163588',
          900: '#172f6f',
          950: '#111e47',
        },
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50:  '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50:  '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50:  '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.25rem,4vw,3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h1': ['clamp(1.875rem,3vw,2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'h2': ['clamp(1.375rem,2vw,1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.25rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '1120px',
        'prose': '72ch',
      },
      boxShadow: {
        'card': '0 1px 4px 0 rgba(15,23,42,0.06), 0 4px 16px 0 rgba(15,23,42,0.06)',
        'card-hover': '0 4px 12px 0 rgba(15,23,42,0.1), 0 12px 40px 0 rgba(15,23,42,0.1)',
        'inset-brand': 'inset 0 0 0 2px #2f6fe8',
      },
    },
  },
  plugins: [],
};

export default config;
