<template>
  <button class="btn btn-primary" @click="toggle" :aria-label="themeStore.theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'">
    <span v-if="themeStore.theme === 'dark'">🌙 Dark</span>
    <span v-else>☀️ Light</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()

function toggle() {
  themeStore.toggleTheme()
}
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}
</style>
