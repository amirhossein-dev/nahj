<template>
  <main class="p-6">
    <h2 class="text-2xl font-semibold mb-4">{{ $t('welcomeMessage') }}</h2>
    <p>{{ $t('currentLanguage') }}: {{ settings.language }}</p>
    <p>{{ $t('currentTheme') }}: {{ settings.theme }}</p>
    <p v-if="auth.isAuthenticated">{{ $t('loggedInAs') }}: {{ auth.userName }}</p>
    <p v-else>{{ $t('notLoggedIn') }}</p>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore, useAuthStore } from '@/store'

const settings = useSettingsStore()
const auth = useAuthStore()
</script>
