<template>
  <q-layout class="theme-surface hekmat-layout">
    <!-- هدر خاص حکمت -->
    <transition name="fade-slide-down">
      <hekmatHeader v-if="showHeader" />
    </transition>

    <!-- محتوای اصلی -->
    <main @scroll.passive="handleScroll" ref="mainContent" class="content-area">
      <slot />
    </main>

    <!-- فوتر اصلی کل اپ -->
    <transition name="fade-slide-up">
      <template v-if="showAppFooter">
        <slot name="app-footer">
          <BottomNav />
        </slot>
      </template>
    </transition>

    <!-- نوار ناوبری/پخش + انیمیشن ورود (روی همه چیز) -->
    <transition name="fade-slide-up">
      <hekmatFooterBar :is-scrolled="isScrolled" />
    </transition>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import hekmatHeader from '@/components/hekmat/hekmatHeader/hekmatHeader.vue'
import hekmatFooterBar from '@/components/hekmat/hekmatFooterBar.vue'

const mainContent = ref(null)
const showHeader = ref(true)
const showFooterBar = ref(true)
const showAppFooter = ref(true)

let lastScrollTop = 0
const isScrolled = ref(false)

const handleScroll = () => {
  const scrollTop = mainContent.value.scrollTop
  const isScrollingDown = scrollTop > lastScrollTop
  showAppFooter.value = !isScrollingDown

  showHeader.value = !isScrollingDown
  showFooterBar.value = !isScrollingDown
  isScrolled.value = isScrollingDown
  // isScrolled.value = scrollTop > 1 // 👈 حتی با یک اسکرول فعال شود

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
  padding-bottom: 11.25rem; /* فضای کافی برای هم app-footer و هم audio-player */
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
