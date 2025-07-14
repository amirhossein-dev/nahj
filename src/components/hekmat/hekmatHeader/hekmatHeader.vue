<template>
  <q-header class="bg-primary text-white q-px-md q-py-sm shadow-2">
    <div class="row items-center justify-between">
      <!-- Back Button -->
      <q-btn flat round @click="emitBack"><IconArrowLeft /></q-btn>

      <!-- Title -->
      <div class="text-h6 text-center col text-bold">
        {{ title }}
      </div>

      <!-- Action Icons -->
      <div class="row items-center q-gutter-sm">
        <q-btn flat round dense @click="showSearchModal = true"><IconSearch /></q-btn>
        <q-btn flat round dense @click="showAudioModal = true"><IconVolume /></q-btn>
        <q-btn flat round dense @click="showDisplayModal = true"><IconDotsCircleHorizontal /></q-btn>
        <!-- <q-btn flat round dense @click="showVersionModal = true"><IconLanguage /></q-btn>
        <q-btn flat round dense @click="$emit('more')"> <IconLibraryPlus /> </q-btn> -->
      </div>
    </div>

    <!-- Modals -->
    <BaseModal v-model="showSearchModal" :size="'full'" :maximized="true">
      <HekmatSearchModal @close="showSearchModal = false" />
    </BaseModal>
    <BaseModal v-model="showAudioModal" :size="'meduim'" position="bottom">
      <HekmatAudioSettingsModal />
    </BaseModal>

    <BaseModal v-model="showDisplayModal" size="medium">
      <HekmatDisplaySettingsModal />
    </BaseModal>

    <BaseModal v-model="showVersionModal" size="medium">
      <HekmatVersionSelectorModal />
    </BaseModal>
  </q-header>
</template>
<script setup>
import { ref } from 'vue'

import BaseModal from '@/components/base/baseModal.vue'
import HekmatAudioSettingsModal from './HekmatAudioSettingsModal.vue'
import HekmatDisplaySettingsModal from './HekmatDisplaySettingsModal.vue'
import HekmatVersionSelectorModal from './HekmatVersionSelectorModal.vue'
import HekmatSearchModal from '../search/HekmatSearchModal.vue'
import { IconSearch, IconDotsCircleHorizontal, IconLanguage, IconLibraryPlus, IconArrowLeft, IconVolume } from '@tabler/icons-vue'

defineProps({
  title: {
    type: String,
    default: 'حکمت ۲۱'
  }
})

const emit = defineEmits(['back', 'search', 'more'])
const showSearchModal = ref(false)
const showAudioModal = ref(false)
const showDisplayModal = ref(false)
const showVersionModal = ref(false)

const emitBack = () => {
  emit('back')
}
</script>
