import { defineStore } from 'pinia'

export const useUserPreferences = defineStore('userPreferences', {
  state: () => ({
    mode: 'combined' // 'farsi' | 'arabic' | 'combined'
  }),
  actions: {
    setMode(newMode: string) {
      this.mode = newMode
    },
    toggleMode() {
      const modes = ['farsi', 'arabic', 'combined']
      const currentIndex = modes.indexOf(this.mode)
      this.mode = modes[(currentIndex + 1) % modes.length]
    }
  }
})
