<template>
  <header class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
    <div>
      <h1 class="text-lg font-bold text-text-dark dark:text-text-light">
        {{ $t('appTitle') }}
      </h1>
    </div>
    <div class="flex space-x-4 gap-4">
      <select v-model="settings.language" @change="changeLanguage" class="text-text-dark rounded">
        <option value="fa" class="text-[--color-text-light] dark:text-text-light">{{ $t('language') }}</option>
        <option value="en" class="text-[--color-text-light] dark:text-text-light">{{ $t('notSelectedLanguage') }}</option>
      </select>

      <ThemeToggler class="margin-helper" />
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
<style>
.margin-helper {
  margin: 0 !important;
}
</style>
