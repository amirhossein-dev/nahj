const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // یا 'media' اگر ترجیح می‌دی بر اساس سیستم
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        danger: 'var(--color-danger)'
      }
    }
  },
  plugins: []
}
