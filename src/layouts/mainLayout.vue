<template>
  <div>
    <HeaderBar />
    <div class="bg-background-light text-text-dark dark:bg-background-dark dark:text-text-light p-4">
      <h1 class="text-primary text-2xl underline">سلام دنیا</h1>
      <button class="bg-accent text-white px-4 py-2 rounded mt-4">شروع</button>
    </div>
    <div class="test">this is a test</div>
    <button class="btn-red">Red Button</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded">Native Tailwind</button>
    <div class="bg-blue-500 text-white p-4">Hello Tailwind</div>

    <router-view />
    <!-- <BottomNav /> -->
  </div>
</template>

<script setup lang="ts">
import BottomNav from '@/components/bottomNav/bottomNav.vue'
import HeaderBar from '@/components/headerBar/headerBar.vue'
import { useSettingsStore } from '@/stores/appConfig'
import { watch } from 'vue'

const settings = useSettingsStore()

// Watch theme and apply 'dark' class to <html> dynamically
watch(
  () => settings.theme,
  (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true }
)
</script>
