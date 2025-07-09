<!-- <template>
  <div class="hekmat-header bg-gray-100 dark:bg-gray-800 q-pa-md">
    <h2 class="text-h5 text-center text-primary"></h2>
  </div>
</template> -->

<template>
  <header :class="headerClass">
    <button class="btn-back" @click="onBack">←</button>
    <div class="title">{{ $t('wisdom') }}</div>
    <button class="btn-share" @click="onShare">📤</button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { theme } = storeToRefs(settings)

const headerClass = computed(() => ({
  'glass-header': true,
  'dark-header': theme.value === 'dark',
  'light-header': theme.value === 'light'
}))

function onBack() {
  window.history.back()
}
function onShare() {
  // منطق اشتراک‌گذاری
}
</script>

<style scoped>
.glass-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  backdrop-filter: blur(10px);
  background-color: var(--bg-accent-transparent); /* variable شفاف */
  z-index: 10;
  transition:
    background-color 0.3s,
    padding 0.3s;
}

.light-header {
  color: var(--text-primary);
}

.dark-header {
  color: var(--text-on-dark);
}

.btn-back,
.btn-share {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: inherit;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
