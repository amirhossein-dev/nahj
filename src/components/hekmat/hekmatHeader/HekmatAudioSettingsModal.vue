<template>
  <div class="bg-[--color-surface] rounded-t-xl p-4 w-full pb-3">
    <!-- هندلر بالا -->
    <div class="flex justify-center mb-3">
      <div class="w-12 h-1.5 bg-gray-500 rounded-full my-2"></div>
    </div>

    <!-- نام قاری -->
    <div class="text-center text-base font-medium mb-2">
      {{ narratorName }}
    </div>

    <!-- کنترل‌های پخش -->
    <div class="flex items-center justify-center gap-5 my-4">
      <q-btn flat round @click="seekBackward"><IconPlayerTrackPrevFilled size="30" /></q-btn>
      <q-btn flat round @click="togglePlayPause"><IconPlayerPlayFilled size="40" /></q-btn>
      <q-btn flat round @click="seekForward"><IconPlayerTrackNextFilled size="30" /></q-btn>
    </div>

    <!-- نوار پیشرفت -->
    <div class="px-4 mb-2">
      <div class="flex flex-row gap-2 items-center audio-modal-util text-xs text-[--color-text] mb-1">
        <div class="pb-1">
          <span>{{ currentTime }}</span>
        </div>
        <div class="w-full">
          <q-slider class="p-0" v-model="progress" color="primary" track-size="4px" />
        </div>
        <div class="pb-1">
          <span>{{ duration }}</span>
        </div>
      </div>
    </div>

    <!-- تنظیمات سرعت و تایمر -->
    <div class="flex justify-between items-center px-4 mt-2 text-sm pt-3">
      <!-- سرعت پخش -->
      <!-- <div class="cursor-pointer">{{  }}x</div> -->
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
      <!-- <div @click="showTimerMenu = true" class="cursor-pointer text-bold text-lg">
      
      </div> -->

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

    <!-- منو انتخاب سرعت پخش -->
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled, IconPlayerPlayFilled } from '@tabler/icons-vue'

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const narratorName = 'متن عربی نهج البلاغه محمد شالچیان'
const narratorNamefarsi = 'ترجمه ی گویای دشتی رضا هدایت فر '

const progress = ref(13)
const currentTime = '00:13'
const duration = '03:21'

const playbackSpeed = ref(1)
const speeds = [0.5, 0.75, 1, 1.5, 1.75, 2]
const showSpeedMenu = ref(false)

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

const seekBackward = () => {
  // کاهش زمان
}
const seekForward = () => {
  // افزایش زمان
}
const togglePlayPause = () => {
  // pause / resume
}
const setPlaybackSpeed = (val) => {
  playbackSpeed.value = val
  showSpeedMenu.value = false
}
const setTimer = (option) => {
  if (option.value == 0) {
    timerIndicator.value = false
  } else {
    timerIndicator.value = option.label
  }
  // تایمر تنظیم شود
}
</script>
<style scpoed>
.audio-modal-util {
  flex-wrap: nowrap;
}
</style>
