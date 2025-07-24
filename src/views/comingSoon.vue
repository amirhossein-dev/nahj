<template>
  <div class="coming-soon-page">
    <h1>🚧 این بخش به زودی پیاده‌سازی می‌شود!</h1>
    <p>در حال حاضر این قسمت آماده نیست. لطفاً بعداً دوباره مراجعه کنید.</p>
    <q-btn push :loading="toggleSpinner" @click="delayedNav" color="primary">
      <template v-slot:loading>
        <q-spinner-ios />
      </template>
      بازگشت به صفحه ی اصلی</q-btn
    >
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const toggleSpinner = ref(false)
function delayedNav() {
  toggleSpinner.value = true
  setTimeout(() => {
    router.push('/')
    toggleSpinner.value = false
  }, 1000)
}
</script>

<style scoped>
.coming-soon-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family);
  text-align: center;
  padding: 1rem;
  color: var(--color-primary);
}
.coming-soon-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.coming-soon-page p {
  font-size: 1.2rem;
  color: var(--q-color-dark);
}
</style>
