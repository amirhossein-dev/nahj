// src/store/index.ts
import { defineStore } from 'pinia'

// Settings Store
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'fa',   // default language
    theme: 'light',  // light | dark
  }),
  actions: {
    setLanguage(lang: string) {
      this.language = lang
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
    userName: '',
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
