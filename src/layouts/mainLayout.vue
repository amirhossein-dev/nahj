<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <HeaderBar />
    </q-header>
    <q-page-container class="theme-surface p-4 min-h-screen">
      <div class="flex flex-col w-full justify-center items-center">
        <h1 class="text-primary text-center pb-4 text-2xl underline">نهج البلاغه V1.0.0</h1>
        <button class="btn btn-primary mb-2">{{ $t('start') }}</button>
        <button class="btn btn-secondary">قرائت اغازین</button>
        <button class="btn btn-danger">{{ $t('start') }}</button>
      </div>
    </q-page-container>
    <div class="bg-bg text-text p-4 rounded shadow">
      <h2 class="text-primary">عنوان</h2>
      <p class="text-accent">متن نمونه</p>
    </div>

    <BottomNav />
    <router-view />
  </q-layout>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/headerBar/headerBar.vue'
import BottomNav from '@/components/bottomNav/bottomNav.vue'
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
