<template>
  <div class="audio-player fixed bottom-[60px] left-0 right-0 z-20" :class="{ scrolled: isScrolled }">
    <div class="player-inner bg-stone-400 dark:bg-stone-900">
      <div class="nav-group bg-stone-500 dark:bg-stone-800">
        <q-btn flat round class="nav-left" @click="prevHekmat">
          <IconChevronLeft class="icon text-white dark:text-text-dark" />
        </q-btn>
        <div class="hekmat-label">حکمت ۳۱</div>
        <q-btn flat round class="nav-right text-white dark:text-text-dark" @click="nextHekmat">
          <IconChevronRight class="icon" />
        </q-btn>
      </div>
      <div class="player-button bg-stone-500 dark:bg-stone-800">
        <q-btn flat round @click="togglePlay"><IconPlayerPauseFilled v-if="audioPlayerStore.isPlaying" /> <IconPlayerPlayFilled size="30" v-else /> </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPlayerPlayFilled, IconChevronLeft, IconChevronRight, IconPlayerPauseFilled } from '@tabler/icons-vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
const audioPlayerStore = useAudioPlayerStore()
defineProps<{
  isScrolled: boolean
}>()
const $q = useQuasar()
const mainContent = ref()

const togglePlay = () => {
  audioPlayerStore.toggle()
}

const prevHekmat = () => {
  $q.notify({ message: 'رفتن به حکمت قبل', color: 'info' })
}

const nextHekmat = () => {
  $q.notify({ message: 'رفتن به حکمت بعد', color: 'info' })
}
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 5.25rem;
  left: 0;
  right: 0;
  z-index: 10;
  transition: bottom 0.1s ease;
}

.player-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.nav-group {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.1rem 1rem;
  border-radius: 999px;
  transition:
    background-color 0.4s ease,
    opacity 0.4s ease;
}

.audio-player.scrolled .nav-group {
  background-color: transparent;
}
.audio-player.scrolled .nav-group {
  transform: scale(0.92);
  background-color: transparent;
  transition:
    background-color 0.4s ease,
    transform 0.4s ease;
}

.hekmat-label {
  font-size: 0.875rem;
  color: white;
  z-index: 1;
  transition:
    transform 0.4s ease,
    opacity 0.3s ease;
}

.nav-left,
.nav-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.4s ease;
}

.nav-left {
  left: 0.5rem;
}

.nav-right {
  right: 0.5rem;
}

.player-button {
  flex-shrink: 0;
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: 999px;
}

/* حالت بعد از اسکرول */
.audio-player.scrolled .nav-left {
  opacity: 0;
  transform: translate(-100%, -50%);
  pointer-events: none;
}

.audio-player.scrolled .nav-right {
  opacity: 0;
  transform: translate(100%, -50%);
  pointer-events: none;
}

.audio-player.scrolled .hekmat-label {
  transform: scale(1.05);
}

.audio-player.scrolled .hekmat-label {
  transform: scale(0.9);
  opacity: 0.85;
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}
.audio-player.scrolled .player-button {
  transform: scale(0.9);
  opacity: 0.85;
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}
.audio-player.scrolled .player-inner {
  padding-top: 0.3rem; /* کمترش می‌کنیم */
  padding-bottom: 0.3rem;
  transition:
    padding 0.4s ease,
    transform 0.4s ease;
}
.audio-player.scrolled {
  bottom: 0;
  transition: bottom 0.3s ease;
}
</style>
