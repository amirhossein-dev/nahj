<template>
  <div>
    <HeaderBar />
    <div class="theme-surface p-4">
      <h1 class="text-primary text-2xl underline">سلام دنیا</h1>
      <button class="btn btn-secondary">شروع</button>
      <button class="btn btn-primary">شروع</button>
      <button class="btn btn-danger">شروع</button>
    </div>
    <div class="bg-bg text-text p-4 rounded shadow">
      <h2 class="text-primary">عنوان</h2>
      <p class="text-accent">متن نمونه</p>
    </div>

    <!-- <BottomNav /> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/headerBar/headerBar.vue'
// import BottomNav from '@/components/bottomNav/bottomNav.vue'
import { useThemeStore } from '@/stores/themeStore'
import { watch } from 'vue'

const themeStore = useThemeStore()

// واچ برای اعمال کلاس dark به html در زمان تغییر تم
watch(
  () => themeStore.theme,
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
