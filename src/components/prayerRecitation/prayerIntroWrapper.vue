<template>
  <div :dir="direction" class="mt-4">
    <q-btn color="primary" v-if="!startingPrayerToggle" @click="startingPrayerToggle = true">{{ $t('startPrayer') }}</q-btn>
    <div v-else>
      <IntroText v-if="!started" @startPrayer="started = true" />
      <PrayerRecitation v-else @prayerFinished="onPrayerFinished" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IntroText from './introText.vue'
import PrayerRecitation from './prayerRecitation.vue'
import { useSettingsStore } from '@/stores/appConfig'
import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

const uiStore = useUIStore()
const settingStore = useSettingsStore()
const { direction } = storeToRefs(settingStore)

const started = ref(false)
const startingPrayerToggle = ref(false)

function onPrayerFinished() {
  uiStore.showFooter = true
  startingPrayerToggle.value = false
  started.value = false
}
</script>
