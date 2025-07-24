<template>
  <transition name="slide-fade" @after-leave="onAfterLeave">
    <div v-if="visible" class="splash-screen bg-white flex flex-col gap-4">
      <img src="@/assets/logo.png" alt="Nahj al-Balagha Logo" class="logo" />
      <div class="flex flex-col items-center text-blue-600">
        <span class="text-xl">نهج ابلاغه</span>
        <span class="text-xl">v 1.0.0</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// فقط اگر قبلاً دیده نشده بود، نمایش بده
const visible = ref(false)

function onAfterLeave() {
  localStorage.setItem('splash-shown', 'true')
}

onMounted(() => {
  const alreadyShown = localStorage.getItem('splash-shown') === 'true'
  if (!alreadyShown) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 1200) // نمایش ۱.۲ ثانیه‌ای
  }
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.logo {
  max-width: 150px;
  max-height: 150px;
}

/*  fade */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
