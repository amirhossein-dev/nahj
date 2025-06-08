<!-- src/components/headerNav/BottomNav.vue -->
<template>
  <q-bottom-navigation v-model="currentTab" class="text-white bg-primary" glossy align="justify">
    <q-btn v-for="item in navItems" :key="item.name" flat dense @click="navigate(item.route)">
      <component :is="item.icon" size="24" />
      <div class="text-xs">{{ $t(item.label) }}</div>
    </q-btn>
  </q-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue'
import { IconHome, IconMail, IconBook, IconMessages, IconSettings } from '@tabler/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentTab = ref(null)

const navItems = [
  { name: 'home', label: 'nav.home', route: '/', icon: IconHome },
  { name: 'letters', label: 'nav.letters', route: '/letters', icon: IconMail },
  { name: 'wisdom', label: 'nav.wisdom', route: '/wisdom', icon: IconBook },
  { name: 'sermons', label: 'nav.sermons', route: '/sermons', icon: IconMessages },
  { name: 'settings', label: 'nav.settings', route: '/settings', icon: IconSettings }
]

function navigate(route) {
  router.push(route)
}
</script>
