<template>
  <header class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
    <div>
      <h1 class="text-lg font-bold">
        {{ $t('appTitle') }}
      </h1>
    </div>
    <div class="flex items-center space-x-4">
      <!-- <div v-if="auth.isAuthenticated" class="flex items-center space-x-2">
        <span>{{ auth.userName }}</span>
        <button @click="auth.logout" class="text-red-500 hover:underline">{{ $t('logout') }}</button>
      </div>
      <div v-else>
        <button @click="loginDemo" class="text-blue-600 hover:underline">{{ $t('login') }}</button>
      </div> -->

      <select v-model="settings.language" @change="changeLanguage" class="border rounded px-2 py-1">
        <option value="fa" class="">{{ $t('language') }}</option>
        <option value="en" class="">{{ $t('notSelctedLanguage') }}</option>
      </select>

      <ThemeToggler />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSettingsStore, useAuthStore } from '@/stores/appConfig'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggler from '../buttons/themeToggler/themeToggler.vue'

const settings = useSettingsStore()
const auth = useAuthStore()
const { locale } = useI18n()

// هماهنگی تغییر زبان در store و i18n
watch(
  () => settings.language,
  (newLang) => {
    locale.value = newLang
  }
)

// نمونه لاگین دمو
// function loginDemo() {
//   auth.login('امیرحسین')
// }

// تغییر زبان از select
function changeLanguage(event: Event) {
  const target = event.target as HTMLSelectElement
  settings.setLanguage(target.value)
}
</script>
