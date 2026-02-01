import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-text)',
      },
      boxShadow: {
        neo: '4px 4px 0 var(--shadow-color)',
        'neo-sm': '2px 2px 0 var(--shadow-color)',
      },
      borderWidth: {
        neo: '3px',
      },
    },
  },
  plugins: [],
}

export default config
