import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('uiStore', () => {
  const showFooter = ref(true)

  function setShowFooter(value: boolean) {
    showFooter.value = value
  }

  return { showFooter, setShowFooter }
})
