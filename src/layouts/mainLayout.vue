<template>
  <q-layout view="lHh Lpr lFf" :dir="direction">
    <q-header elevated>
      <HeaderBar />
    </q-header>
    <q-page-container class="theme-surface p-4 min-h-screen">
      <PrayerIntroWrapper />
    </q-page-container>

    <BottomNav />
    <router-view />
  </q-layout>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/headerBar/headerBar.vue'
import BottomNav from '@/components/bottomNav/bottomNav.vue'
import { useThemeStore } from '@/stores/themeStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/appConfig'

const settingStore = useSettingsStore()
const { direction } = storeToRefs(settingStore)

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
