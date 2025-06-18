<template>
  <div dir="rtl">
    <IntroText v-if="!started" @startPrayer="started = true" />
    <PrayerRecitation v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IntroText from './introText.vue'
import PrayerRecitation from './prayerRecitation.vue'

const started = ref(false)
</script>
