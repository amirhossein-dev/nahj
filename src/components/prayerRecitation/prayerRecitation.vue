<template>
  <div class="flex flex-row justify-end">
    <q-btn round @click="$emit('prayerFinished')">
      <q-tooltip>
        {{ $t('return') }}
      </q-tooltip>
      <IconArrowLeft
    /></q-btn>
  </div>
  <div class="q-pa-md">
    <div class="q-gutter-md column items-center">
      <div
        v-for="verse in verses"
        :key="verse.index"
        :data-verse="verse.index"
        :class="[
          'verse-line light:text-[--color-text-light]',
          {
            highlight: verse.index === currentVerseIndex
          }
        ]"
        :ref="verse.index === currentVerseIndex ? 'highlightedVerse' : null"
      >
        {{ verse.text }}
      </div>
    </div>
  </div>
  <q-footer class="glass-footer fixed bottom-0 left-0 right-0 z-50" v-if="!uiStore.showFooter">
    <q-slider v-model="currentTime" :max="duration" @change="seekTo" class="px-3 pt-2" color="primary" label-always :label-value="Math.floor(currentTime)" />
    <audio ref="audioRef" :src="audioSrc" preload="auto" @ended="handleEnded"></audio>
    <div class="row q-gutter-sm justify-center">
      <q-btn round color="primary" @click="togglePlay()" v-if="!isPlaying"><IconPlayerPlay /></q-btn>
      <q-btn round color="primary" @click="togglePlay()" v-else><IconPlayerPause /></q-btn>
    </div>
  </q-footer>
</template>

<script setup>
import { ref, watchEffect, nextTick, defineEmits } from 'vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { useUIStore } from '@/stores/uiStore'
import { IconPlayerPlay, IconPlayerPause, IconArrowLeft } from '@tabler/icons-vue'
const uiStore = useUIStore()
const audioSrc = ref('/audio/startingPrayer.mp3')
const verses = [
  { index: 1, start: 0, end: 5, text: ' بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', sura: 'hadid' },
  { index: 2, start: 5, end: 12, text: 'سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ ﴿١﴾', sura: 'hadid' },
  { index: 3, start: 12, end: 22, text: ' لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ ۖ يُحْيِي وَيُمِيتُ ۖ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿٢﴾', sura: 'hadid' },
  { index: 4, start: 22, end: 31, text: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ ۖ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ ﴿٣﴾', sura: 'hadid' },
  {
    index: 5,
    start: 32,
    end: 63,
    text: '   هُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۚ يَعْلَمُ مَا يَلِجُ فِي الْأَرْضِ وَمَا يَخْرُجُ مِنْهَا وَمَا يَنْزِلُ مِنَ السَّمَاءِ وَمَا يَعْرُجُ فِيهَا ۖ وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ ﴿٤﴾',
    sura: 'hadid'
  },
  { index: 6, start: 64, end: 72, text: ' لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ ﴿٥﴾', sura: 'hadid' },
  { index: 7, start: 73, end: 82, text: '  يُولِجُ اللَّيْلَ فِي النَّهَارِ وَيُولِجُ النَّهَارَ فِي اللَّيْلِ ۚ وَهُوَ عَلِيمٌ بِذَاتِ الصُّدُورِ ﴿٦﴾', sura: 'hadid', isEndOfFirstSura: true },

  {
    index: 8,
    start: 83,
    end: 95,
    text: '  هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ ﴿٢٢﴾',
    sura: 'hashr',
    isStartOfSecondSura: true
  },
  {
    index: 9,
    start: 96,
    end: 114,
    text: ' هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ ﴿٢٣﴾ ',
    sura: 'hashr'
  },
  {
    index: 10,
    start: 115,
    end: 133,
    text: '  هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ يُسَبِّـحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ ﴿٢٤﴾',
    sura: 'hashr'
  }
]
const { audioRef, isPlaying, currentTime, duration, currentVerseIndex, togglePlay, seekTo } = useAudioPlayer(audioSrc, verses)

const emit = defineEmits(['prayerFinished'])
const props = defineProps(['onPrayerFinished'])

function handleEnded() {
  isPlaying.value = false
  emit('prayerFinished')
}

watchEffect(() => {
  if (!audioRef.value) return

  const time = audioRef.value.currentTime || 0
  const verse = verses.find((v) => time >= v.start && time < v.end)
  const newIndex = verse ? verse.index : null

  if (newIndex !== currentVerseIndex.value) {
    currentVerseIndex.value = newIndex

    nextTick(() => {
      const el = document.querySelector(`[data-verse="${newIndex}"]`)
      if (el) {
        // Remove pulse if already exists to allow restart
        el.classList.remove('pulse')
        void el.offsetWidth // trigger reflow
        el.classList.add('pulse')

        el.scrollIntoView({ behavior: 'smooth', block: 'center' })

        setTimeout(() => {
          el.classList.remove('pulse')
        }, 1500)
      }
    })
  }
})
</script>

<style scoped>
:root {
  color-scheme: light dark;
}

.verse-line {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  color: var(--color-text-light, #1b2438);
}

:root.dark .verse-line {
  color: var(--color-text, #ffffff);
}

.highlight {
  background-color: var(--color-surface, rgba(255, 255, 255, 0.2));
  border-radius: 0.6rem;
  backdrop-filter: blur(0.3rem);
  padding: 0.5rem 0.75rem;
  font-weight: bold;
  color: var(--color-text, #ffffff);
  box-shadow: 0 0 0.75rem var(--color-text-light, rgba(13, 148, 136, 2));
  transition: all 0.4s ease;
}

:root:not(.dark) .highlight {
  background-color: rgba(0, 0, 0, 0.215);
  color: var(--color-text-light, #1b2438);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.pulse {
  animation: pulseHighlight 1.5s ease-in-out;
}

@keyframes pulseHighlight {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 var(--color-primary, rgba(13, 148, 136, 0.2));
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 12px var(--color-primary, rgba(13, 148, 136, 0.35));
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 var(--color-primary, rgba(13, 148, 136, 0.2));
  }
}

.glass-footer {
  background-color: var(--color-surface, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(6px);
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.3);
  color: var(--color-text, #ffffff);
}
</style>
