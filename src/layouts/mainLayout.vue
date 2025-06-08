<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderBar />

    <q-page-container>
      <router-view />
    </q-page-container>

    <BottomNav />
  </q-layout>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import BottomNav from '@/components/BottomNav.vue'
</script>
