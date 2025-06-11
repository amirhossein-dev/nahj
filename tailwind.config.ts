import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // blue-500
        accent: '#10B981', // emerald-500
        background: {
          light: '#F9FAFB',
          dark: '#1F2937'
        },
        text: {
          light: '#F3F4F6',
          dark: '#1F2937'
        }
      }
    }
  },
  plugins: []
}

export default config
