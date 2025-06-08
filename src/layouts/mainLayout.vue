<template>
  <div class="dark">
    <HeaderBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import { useSettingsStore } from '@/store'
import { watch } from 'vue'

const settings = useSettingsStore()

// Watch theme and apply 'dark' class to <html> dynamically
watch(() => settings.theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

</script>
