import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref<Theme>('light')

  function applyTheme(themeValue: Theme) {
    const root = document.documentElement
    if (themeValue === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    applyTheme(theme.value)
  }

  function initTheme() {
    const stored = localStorage.getItem('theme') as Theme | null
    theme.value = stored ?? 'light'
    applyTheme(theme.value)
  }

  return {
    theme,
    toggleTheme,
    initTheme
  }
})
