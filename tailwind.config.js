const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // whitelist Quasar classes
  safelist: ['q-btn', 'q-btn--flat', 'q-btn--outline', 'text-primary' /* ... */],

  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        bg: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        danger: 'var(--color-danger)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',

        'background-light': '#fefefe',
        'background-dark': '#121212',
        'text-light': '#ffffff',
        'text-dark': '#1a1a1a'
      }
    }
  },
  plugins: []
}
