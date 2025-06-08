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
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
import BottomNav from '@/components/BottomNav/BottomNav.vue'
</script>
