<template>
  <div class="theme-surface rounded-t-xl p-4 w-full pb-3">
    <!-- هندلر بالا -->
    <div class="flex justify-center mb-1">
      <div class="w-12 h-1.5 bg-gray-500 rounded-full my-2"></div>
    </div>

    <div class="flex justify-between items-center mb-3 border border-stone-800 py-2 px-5 rounded-xl">
      <q-btn color="secondary" label="انتخاب زبان">
        <q-menu auto-close>
          <q-list class="theme-surface">
            <q-separator />
            <q-item clickable @click="userPreferences.setMode('arabic')">
              <q-item-section>عربی</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="userPreferences.setMode('farsi')">
              <q-item-section>فارسی</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="userPreferences.setMode('combined')">
              <q-item-section>عربی و فارسی</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <div class="flex flex-col gap-1">
        <div class="text-center text-base font-medium mb-2">
          {{ narratorName }}
        </div>
        <div class="text-center text-base font-medium mb-2">
          {{ narratorNamefarsi }}
        </div>
      </div>
    </div>

    <!-- کنترل‌های پخش -->
    <div class="flex items-center justify-center gap-5 my-4">
      <q-btn flat round @click="seekBackward"><IconPlayerTrackPrevFilled size="30" /></q-btn>
      <q-btn flat round @click="togglePlayPause">
        <IconPlayerPauseFilled size="30" v-if="audioStore.isPlaying" />
        <IconPlayerPlayFilled size="30" v-else />
      </q-btn>
      <q-btn flat round @click="seekForward"><IconPlayerTrackNextFilled size="30" /></q-btn>
    </div>

    <!-- نوار پیشرفت -->
    <div class="px-4 mb-2">
      <div class="flex flex-row gap-2 items-center audio-modal-util text-xs text-[--color-text] mb-1">
        <div class="pb- flex flex-col">
          <span>{{ formatTime(currentTime) }}</span>
        </div>
        <div class="w-full">
          <q-slider class="p-0" v-model="currentTime" :min="0" :max="duration" @change="onSeek" color="primary" track-size="4px" />
        </div>
        <div class="pb-1">
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <!-- تنظیمات سرعت و تایمر -->
    <div class="flex justify-between items-center px-4 mt-2 text-sm pt-3">
      <!-- سرعت پخش -->
      <q-btn flat no-caps class="text-[--color-text]">
        <p class="text-bold text-lg">{{ playbackSpeed }}X</p>
        <q-menu auto-close anchor="top left">
          <q-list>
            <q-item v-for="s in speeds" :key="s" clickable @click="playbackSpeed = s" class="theme-surface">
              <q-item-section class="">{{ s }}x</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <!-- تایمر -->

      <q-btn flat no-caps class="text-[--color-text]">
        <p class="text-bold text-lg" dir="rtl" v-if="timerIndicator">{{ timerIndicator }}</p>
        <p class="text-bold text-lg" v-else>⏱</p>
        <q-menu auto-close>
          <q-list class="theme-surface">
            <q-item v-for="t in timerOptions" :key="t.label" clickable @click="setTimer(t)">
              <q-item-section>{{ t.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled, IconPlayerPlayFilled, IconPlayerPauseFilled } from '@tabler/icons-vue'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
import { useUserPreferences } from '@/stores/audioSettingsStore'

const userPreferences = useUserPreferences()

const audioStore = useAudioPlayerStore()
const { currentTime, duration, isPlaying } = storeToRefs(audioStore)
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const narratorName = 'متن عربی نهج البلاغه محمد شالچیان'
const narratorNamefarsi = 'ترجمه ی گویای دشتی رضا هدایت فر '

const progress = ref(0)
const playbackSpeed = ref(1)
const speeds = [0.5, 0.75, 1, 1.5, 1.75, 2]
// const durationFormatted = computed(() => formatTime(duration.value))
const timerOptions = [
  { label: 'خاموش', value: 0 },
  { label: '۵ دقیقه', value: 5 },
  { label: '۱۰ دقیقه', value: 10 },
  { label: '۱۵ دقیقه', value: 15 },
  { label: '۳۰ دقیقه', value: 30 },
  { label: '۱ ساعت', value: 60 },
  { label: '۲ ساعت', value: 120 }
]
const timerIndicator = ref(false)
// const currentTime = ref(audioStore.currentTime)
// const duration = ref(audioStore.duration)
const audio = ref()
const audioSrc = ref('/audio/farsi/F-1.mp3')
// const isPlaying = ref(false)
onMounted(() => {
  audio.value = new Audio(audioSrc.value)

  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value?.duration ?? 0
  })

  audio.value.addEventListener('timeupdate', () => {
    progress.value = audio.value?.currentTime ?? 0
    currentTime.value = formatTime(progress.value)
  })

  audio.value.addEventListener('ended', () => {
    isPlaying.value = false
  })
})
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  watch(
    () => props.modelValue,
    (val) => {
      if (!val) {
        audioStore.pause() // یا stop() اگر بخواهی به اول برگردد
      }
    }
  )
})
watch(playbackSpeed, (val) => {
  audioStore.setSpeed(val)
})

const seekForward = () => {
  if (audioStore.audio) {
    audioStore.audio.currentTime += 5
  }
}

const seekBackward = () => {
  if (audioStore.audio) {
    audioStore.audio.currentTime -= 5
  }
}

const setTimer = (option) => {
  // همان قبلی فقط در کنارش اگر option.value != 0 بود یک تایمر ست کنیم که audioStore.stop() کند.
}

const onSeek = (val) => {
  if (!isFinite(val)) return
  audioStore.seek(val)
}
const togglePlayPause = () => {
  audioStore.toggle()
}
</script>
<style scpoed>
.audio-modal-util {
  flex-wrap: nowrap;
}
</style>
