import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('uiStore', () => {
  const showFooter = ref(true)
  const currentFont = ref('Vazir')

  function setShowFooter(value: boolean) {
    showFooter.value = value
  }

  function setFont(fontName: string) {
    currentFont.value = fontName
  }

  return { showFooter, currentFont, setShowFooter, setFont }
})
