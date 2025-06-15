<template>
  <q-footer
    v-if="uiStore.showFooter"
    class="bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 border-t border-gray-300 dark:border-gray-700 backdrop-blur-md text-white flex items-center w-full fixed bottom-0 left-0 right-0 z-50 py-2 px-0"
    elevated
  >
    <div class="flex flex-row justify-evenly items-center w-full q-pa-sm">
      <q-btn
        v-for="item in navItems"
        :key="item.name"
        flat
        dense
        unelevated
        class="flex flex-col items-center justify-center w-full text-gray-800 dark:text-gray-200"
        :active="currentTab === item.name"
        @click="navigate(item)"
        :aria-label="$t(item.label)"
      >
        <component :is="item.icon" size="24" class="q-mb-xs flex flex-col justify-center align-center" />
        <div class="text-xs">{{ $t(item.label) }}</div>
      </q-btn>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUIStore } from '@/stores/uiStore'
import { IconHome, IconMail, IconBook, IconMessages, IconSettings } from '@tabler/icons-vue'
const router = useRouter()
const route = useRoute()
const uiStore = useUIStore()

const currentTab = ref<string | null>(null)
const navItems = [
  { name: 'home', label: 'nav.home', route: '/', icon: IconHome },
  { name: 'letters', label: 'nav.letters', route: '/letters', icon: IconMail },
  { name: 'wisdom', label: 'nav.wisdom', route: '/wisdom', icon: IconBook },
  { name: 'sermons', label: 'nav.sermons', route: '/sermons', icon: IconMessages },
  { name: 'settings', label: 'nav.settings', route: '/settings', icon: IconSettings }
]

// syncing with the current path
watch(
  () => route.path,
  (newPath) => {
    const found = navItems.find((item) => item.route === newPath)
    currentTab.value = found ? found.name : null

    // controlling hsow/hide footer in given paths
    uiStore.showFooter = !['/login', '/fullscreen'].includes(newPath)
  },
  { immediate: true }
)
function navigate(item: (typeof navItems)[number]) {
  if (item.route !== route.path) {
    router.push(item.route)
  }
}
</script>
