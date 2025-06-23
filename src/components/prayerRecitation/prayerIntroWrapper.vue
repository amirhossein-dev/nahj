<template>
  <div :dir="direction" class="mt-4">
    <q-btn color="primary" v-if="!startingPrayerToggle" @click="startingPrayerToggle = true">{{ $t('startPrayer') }}</q-btn>
    <div v-else>
      <IntroText v-if="!started" @startPrayer="started = true" />
      <PrayerRecitation v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IntroText from './introText.vue'
import PrayerRecitation from './prayerRecitation.vue'
import { useSettingsStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

const settingStore = useSettingsStore()
const { direction } = storeToRefs(settingStore)

const started = ref(false)
const startingPrayerToggle = ref(false)
</script>
