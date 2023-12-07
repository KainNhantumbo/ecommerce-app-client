import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Space Grotesk', 'serif']
      },
      screens: {
        mobile: '420px',
        'mobile-x': '480px'
      },
      colors: {
        transparent: 'var(--transparent)',
        error: 'var(--error)',
        font: 'var(--font)',
        black: 'var(--black)',
        white: 'var(--white)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        foreground: 'var(--foreground)',
        background: 'var(--background)'
      }
    }
  },
  plugins: []
};
export default config;
