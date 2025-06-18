<template>
  <div class="intro-container p-6 bg-surface text-text rounded-lg">
    <p v-for="(line, idx) in lines" :key="idx" class="mb-4 leading-relaxed">
      {{ line }}
    </p>
    <q-btn color="purple" label="شروع قرائت" @click="$emit('startPrayer')" />
    <q-btn label="Click me" color="primary" @click="doSomething" />
  </div>
</template>

<script setup>
const lines = [
  `براء بن عازب می‌گوید:`,
  `روزی نزد علی (ع) رفتم و گفتم یا امیر المومنین به حق خدای متعال از تو درخواست می‌کنم بزرگ‌ترین چیزی را که پیامبر صلی‌الله علیه و آله تو را به آن مخصوص گردانیده (و به کس دیگر نفرموده) از میان مطالبی که خدای متعال جبرئیل را بدان فرستاده و جبرئیل هم پیامبر را مخصوص به آن کرده، مرا به آن مخصوص گردانی.
`,
  `براء عرض کرد قسم به خدا که این را برای حاجت دنیوی نخواهم خواند حضرت فرمود خوب گفتی پیامبر صلی‌الله علیه و آله هم به من این‌چنین توصیه فرمودند البته به من دستور دادند که در امور سخت این را بخوانم.
شش آیه اول سوره حدید و سه آیه آخر سوره حشر `
]
</script>

<style scoped>
.intro-container {
  /* مشابه طرح مرجع شما */
  border: 2px solid var(--color-primary);
  /* background-color: var(--color-primary); */
  background-size: cover;
}
</style>
