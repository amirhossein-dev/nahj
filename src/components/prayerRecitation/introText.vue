<template>
  <div class="intro-container p-6 bg-surface text-text rounded-lg">
    <p v-if="language == 'fa'" v-for="(line, idx) in lines" :key="idx" class="mb-4 leading-relaxed">
      {{ line }}
    </p>
    <div v-else>
      <p v-for="(line, idx) in englishLines" :key="idx" class="mb-4 leading-relaxed">
        {{ line }}
      </p>
    </div>
    <q-btn color="purple" @click="$emit('startPrayer')">{{ $t('startPrayer') }}</q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

const settingStore = useSettingsStore()
const { language } = storeToRefs(settingStore)
const lines = [
  `براء بن عازب می‌گوید:`,
  `روزی نزد علی (ع) رفتم و گفتم یا امیر المومنین به حق خدای متعال از تو درخواست می‌کنم بزرگ‌ترین چیزی را که پیامبر صلی‌الله علیه و آله تو را به آن مخصوص گردانیده (و به کس دیگر نفرموده) از میان مطالبی که خدای متعال جبرئیل را بدان فرستاده و جبرئیل هم پیامبر را مخصوص به آن کرده، مرا به آن مخصوص گردانی.
`,
  `براء عرض کرد قسم به خدا که این را برای حاجت دنیوی نخواهم خواند حضرت فرمود خوب گفتی پیامبر صلی‌الله علیه و آله هم به من این‌چنین توصیه فرمودند البته به من دستور دادند که در امور سخت این را بخوانم.
شش آیه اول سوره حدید و سه آیه آخر سوره حشر `
]
const englishLines = [
  `
Al-Bara' ibn 'Azib says:`,
  `One day I went to Ali (a.s.) and said, "O Commander of the Faithful, I ask you by the right of Allah Almighty to make me the most important thing that the Prophet (peace and blessings of Allah be upon him and his family) has made you special for (and has not told anyone else) from among the matters that Allah Almighty sent Gabriel to and Gabriel made the Prophet special for.`,
  ,
  `Bara said, "I swear by God that I will not recite this for worldly needs." The Imam said, "You have said it well. The Prophet (peace and blessings of Allah be upon him and his family) also advised me to do the same. Of course, he ordered me to recite this in difficult matters. The first six verses of Surah Hadid and the last three verses of Surah Hashr."`
]
const startingPrayerToggle = ref(false)
</script>

<style scoped>
.intro-container {
  /* مشابه طرح مرجع شما */
  border: 2px solid var(--color-primary);
  /* background-color: var(--color-primary); */
  background-size: cover;
}
</style>
