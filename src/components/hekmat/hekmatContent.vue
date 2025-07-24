<template>
  <q-spinner-ios size="3em" color="blue-grey" v-if="!hekmat" />
  <div class="hekmat-container" v-else>
    <div class="hekmat-title mt-10">حکمت {{ hekmat.id }}</div>

    <div class="hekmat-body theme-surface" :style="{ fontFamily: uiStore.currentFont }">
      <div v-for="(block, index) in hekmat.blocks" :key="index" class="hekmat-block q-mb-md">
        <span class="hekmat-number">{{ block.index }}</span>
        <transition name="fade" mode="out-in">
          <div :key="userPreferences.mode">
            <div class="flex items-center justify-start mb-2">
              <span v-if="userPreferences.mode === 'farsi'" class="text-bold">{{ block.farsiTitle }}</span>
            </div>

            <!-- حالت combined -->
            <template v-if="userPreferences.mode === 'combined'">
              <span
                :class="{
                  'neon-glow dark:neon-glow-dark': block.id === currentBlockId && currentLanguage === 'arabic'
                }"
                >{{ block.arabic }}</span
              >
              <br />
              <span
                :class="{
                  'neon-glow dark:neon-glow-dark': block.id === currentBlockId && currentLanguage === 'farsi'
                }"
                >{{ block.farsi }}</span
              >
            </template>

            <!-- حالت farsi -->
            <span
              v-else-if="userPreferences.mode === 'farsi'"
              :class="{
                'neon-glow dark:neon-glow-dark': block.id === currentBlockId
              }"
              >{{ block.farsi }}</span
            >

            <!-- حالت arabic -->
            <span
              v-else-if="userPreferences.mode === 'arabic'"
              :class="{
                'neon-glow dark:neon-glow-dark': block.id === currentBlockId
              }"
              >{{ block.arabic }}</span
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserPreferences } from '@/stores/audioSettingsStore'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
import { useUIStore } from '@/stores/uiStore'
import { watch, computed } from 'vue'
const uiStore = useUIStore()
const userPreferences = useUserPreferences()
const audioPlayerStore = useAudioPlayerStore()
const currentBlockId = computed(() => audioPlayerStore.currentBlockId)
const currentLanguage = computed(() => audioPlayerStore.currentLanguage)
const props = defineProps({
  hekmat: {
    type: Object,
    default: null
  }
})

watch(
  () => ({
    hekmat: props.hekmat,
    mode: userPreferences.mode
  }),
  ({ hekmat, mode }) => {
    if (hekmat?.blocks?.length) {
      const audioList = audioPlayerStore.getAudioSequence(hekmat.blocks, mode)
      audioPlayerStore.setPlaylist(audioList, hekmat.blocks)
    }
  },
  { immediate: true, deep: false }
)
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
}

.hekmat-body {
  border-radius: 8px;
  padding: 0 1rem;
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
