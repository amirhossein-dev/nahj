<template>
  <div class="theme-surface hekmat-layout">
    <!-- هدر خاص حکمت -->
    <transition name="fade-slide-down">
      <hekmatHeader v-if="showHeader" />
    </transition>

    <!-- محتوای اصلی -->
    <main @scroll.passive="handleScroll" ref="mainContent" class="content-area">
      <slot />
    </main>

    <!-- نوار ناوبری/پخش + انیمیشن ورود -->
    <transition name="fade-slide-up">
      <hekmatFooterBar v-if="showFooterBar" />
    </transition>

    <!-- فوتر اصلی کل اپ (نسبت به layout عمومی اپلیکیشن) -->
    <slot name="app-footer" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hekmatHeader from '@/components/hekmat/hekmatHeader.vue'
import hekmatFooterBar from '@/components/hekmat/hekmatFooterBar.vue'

const mainContent = ref(null)
const showHeader = ref(true)
const showFooterBar = ref(true)

let lastScrollTop = 0

const handleScroll = () => {
  const scrollTop = mainContent.value.scrollTop
  const isScrollingDown = scrollTop > lastScrollTop

  showHeader.value = !isScrollingDown
  showFooterBar.value = !isScrollingDown

  lastScrollTop = scrollTop
}
</script>

<style scoped>
.hekmat-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 100px; /* برای اینکه فوتر دومی دیده بشه */
}

/* انیمیشن‌ها */
.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
