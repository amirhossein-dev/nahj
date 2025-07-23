<template>
  <q-spinner-ios size="3em" color="blue-grey" v-if="!hekmat" />
  <div class="hekmat-container" v-else>
    <div class="hekmat-title">حکمت {{ hekmat.id }}</div>
    <div class="hekmat-mode-buttons">
      <q-btn-group flat>
        <q-btn label="فارسی" :outline="userPreferences.mode !== 'farsi'" @click="userPreferences.setMode('farsi')" />
        <q-btn label="عربی" :outline="userPreferences.mode !== 'arabic'" @click="userPreferences.setMode('arabic')" />
        <q-btn label="ترکیبی" :outline="userPreferences.mode !== 'combined'" @click="userPreferences.setMode('combined')" />
      </q-btn-group>
    </div>
    <div class="hekmat-body" :style="{ fontFamily: uiStore.currentFont }">
      <div v-for="(block, index) in hekmat.blocks" :key="index" class="hekmat-block q-mb-md">
        <span class="hekmat-number">{{ block.index }}</span>

        <transition name="fade" mode="out-in">
          <div :key="userPreferences.mode">
            <span v-if="userPreferences.mode === 'farsi'">{{ block.farsi }}</span>
            <span v-else-if="userPreferences.mode === 'arabic'">{{ block.arabic }}</span>
            <div v-else>
              <div>{{ block.arabic }}</div>
              <div class="text-grey-7 q-mt-xs">{{ block.farsi }}</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserPreferences } from '@/stores/audioSettingsStore'
import { useUIStore } from '@/stores/uiStore'
const uiStore = useUIStore()
const userPreferences = useUserPreferences()
const props = defineProps({
  hekmat: {
    type: Object,
    default: null
  }
})
</script>
<style scoped>
.text-arabic {
  font-family: 'Noto Naskh Arabic', serif;
  font-size: 1.2rem;
  line-height: 2.2;
  direction: rtl;
}

.text-farsi {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1.1rem;
  line-height: 2;
  direction: rtl;
}

.hekmat-block {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 12px;
  direction: rtl;
}
.hekmat-container {
  padding: 1.5rem 1rem;
  line-height: 2.2rem;
  font-size: 1.2rem;
  font-family: 'Vazirmatn', serif; /* یا فونت عربی متناسب دیگر */
}

.hekmat-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hekmat-body {
  border-radius: 8px;
  padding: 1rem;
  white-space: pre-line;
}

.hekmat-number {
  font-size: 1rem;
  margin-left: 0.5rem;
  opacity: 0.6;
  display: inline-block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
