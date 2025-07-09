import { defineStore } from 'pinia'

// Settings Store
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'fa', // default language
    theme: 'light', // light | darkو
    direction: 'rtl' // right2left | left2right
  }),
  actions: {
    setLanguage(lang: string) {
      this.language = lang
      if (this.language === 'fa') {
        this.direction = 'rtl'
      } else {
        this.direction = 'ltr'
      }
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
})

// Auth Store (simple demo)
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userName: ''
  }),
  actions: {
    login(name: string) {
      this.isAuthenticated = true
      this.userName = name
    },
    logout() {
      this.isAuthenticated = false
      this.userName = ''
    }
  }
})
