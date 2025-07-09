<template>
  <div class="hekmat-footer-bar row items-center justify-between q-pa-sm">
    <div class="col-8">
      <!-- اینجا می‌تونه مسیرهای قبلی / بعدی باشه -->
      <q-btn flat @click="goNext"><icon-chevron-left /></q-btn>
      <q-btn flat @click="goPrevious"><icon-chevron-right /></q-btn>
    </div>
    <div class="col-4 text-right">
      <!-- دکمه پخش صوت -->
      <q-btn icon="play_arrow" round color="primary" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-vue'

const route = useRoute()
const router = useRouter()
const currentId = parseInt(route.params.id || '1')

const goNext = () => {
  router.push({ name: 'HekmatDetail', params: { id: currentId + 1 } })
}
const goPrevious = () => {
  router.push({ name: 'HekmatDetail', params: { id: Math.max(1, currentId - 1) } })
}
</script>

<style scoped>
.hekmat-footer-bar {
  position: fixed;
  bottom: 60px; /* بالای فوتر اصلی */
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  border-top: 1px solid #ccc;
  z-index: 10;
}
</style>
