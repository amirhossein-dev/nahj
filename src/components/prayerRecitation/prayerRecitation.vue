<template>
  <div class="recitation-container p-4">
    <audio ref="player" :src="starterPrayerSrc" @timeupdate="onTimeUpdate" controls />
    <div class="verses mt-4 text-lg flex flex-col">
      <span
        v-for="verse in verses"
        :key="verse.index"
        class="pr-2"
        :class="{ highlight: currentTime >= verse.start && currentTime < verse.end, 'mb-8 border-b border-dashed border-gray-300 pb-4': verse.isEndOfFirstSura, 'mt-8': verse.isStartOfSecondSura }"
      >
        {{ verse.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import starterPrayer from '@/assets/audios/startingPrayer.mp3'
const starterPrayerSrc = starterPrayer
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
  { index: 6, start: 73, end: 82, text: '  يُولِجُ اللَّيْلَ فِي النَّهَارِ وَيُولِجُ النَّهَارَ فِي اللَّيْلِ ۚ وَهُوَ عَلِيمٌ بِذَاتِ الصُّدُورِ ﴿٦﴾', sura: 'hadid', isEndOfFirstSura: true },

  {
    index: 6,
    start: 83,
    end: 95,
    text: '  هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ ﴿٢٢﴾',
    sura: 'hashr',
    isStartOfSecondSura: true
  },
  {
    index: 6,
    start: 96,
    end: 114,
    text: ' هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ ﴿٢٣﴾ ',
    sura: 'hashr'
  },
  {
    index: 6,
    start: 115,
    end: 133,
    text: '  هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ يُسَبِّـحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ ﴿٢٤﴾',
    sura: 'hashr'
  }
]

const currentTime = ref(0)
const onTimeUpdate = () => {
  currentTime.value = player.value.currentTime
}
const player = ref(null)
</script>

<style scoped>
.highlight {
  background-color: var(--color-accent);
  color: var(--color-bg);
}
</style>
