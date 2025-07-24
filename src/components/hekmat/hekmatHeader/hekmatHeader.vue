<template>
  <q-header id="hard" class="bg-transparent hekmat-header-color q-px-md q-py-sm">
    <div class="row items-center justify-between">
      <!-- Back Button -->
      <q-btn flat round @click="router.back()"><IconArrowLeft /></q-btn>

      <!-- Action Icons -->
      <div class="row items-center q-gutter-sm">
        <q-btn flat round dense @click="showSearchModal = true"><IconSearch /></q-btn>
        <q-btn flat round dense @click="showAudioModal = true"><IconVolume /></q-btn>
        <q-btn flat round dense @click="showFontSettingsMenu = !showFontSettingsMenu"><IconDotsCircleHorizontal /></q-btn>
        <div ref="fontMenuActivator">
          <q-menu
            v-if="fontMenuActivator"
            v-model="showFontSettingsMenu"
            transition-show="jump-down"
            transition-hide="jump-down"
            anchor="bottom right"
            self="top middle"
            :auto-close="true"
            :target="fontMenuActivator"
            class="theme-surface"
          >
            <q-list>
              <q-item clickable @click="openRelatedContent">
                <q-item-section class="flex items-center whitespace-nowrap" @click="notif">محتوای مرتبط</q-item-section>
              </q-item>
              <q-item clickable @click="openFontSettings">
                <q-item-section class="flex items-center whitespace-nowrap" @click="showFontDisplaySettingsModal = true">فونت و تنظیمات</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <BaseModal v-model="showSearchModal" :size="'full'" :maximized="true" :backdropFilter="null">
      <HekmatSearchModal @close="showSearchModal = false" />
    </BaseModal>
    <BaseModal v-model="showAudioModal" :size="'meduim'" position="bottom" :backdropFilter="backdropFilter">
      <HekmatAudioSettingsModal />
    </BaseModal>

    <BaseModal v-model="showFontDisplaySettingsModal" :size="'meduim'" position="bottom">
      <hekmatFontSettingsMenuModal />
    </BaseModal>

    <BaseModal v-model="showRelatedModal" size="medium">
      <HekmatVersionSelectorModal />
    </BaseModal>
  </q-header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/base/baseModal.vue'
import HekmatAudioSettingsModal from './HekmatAudioSettingsModal.vue'
import hekmatFontSettingsMenuModal from './hekmatFontSettingsMenuModal.vue'
import HekmatVersionSelectorModal from './HekmatVersionSelectorModal.vue'
import HekmatSearchModal from '../search/HekmatSearchModal.vue'
import { IconSearch, IconDotsCircleHorizontal, IconArrowLeft, IconVolume } from '@tabler/icons-vue'
import { useQuasar, QSpinnerGears } from 'quasar'
const router = useRouter()
const $q = useQuasar()

function notif() {
  $q.notify({
    message: 'به زودی',
    color: 'orange-6',
    position: 'top',
    timeout: 1500,
    spinner: QSpinnerGears
  })
}
defineProps({
  title: {
    type: String,
    default: 'حکمت ۲۱'
  }
})

const backdropFilter = 'saturate(150%) blur(4px)'
const showFontSettingsMenu = ref(false)

const showFontSettings = ref(false)
const showRelated = ref(false)
const fontMenuActivator = ref(null)

const openRelatedContent = () => {
  showRelated.value = true
  showFontSettingsMenu.value = false
}

const openFontSettings = () => {
  showFontSettings.value = true
  showFontSettingsMenu.value = false
}
const emit = defineEmits(['back', 'search', 'more'])
const showSearchModal = ref(false)
const showAudioModal = ref(false)
const showFontDisplaySettingsModal = ref(false)
const showRelatedModal = ref(false)

const emitBack = () => {
  emit('back')
}
</script>
<style scoped>
.drop-down-menu-bg {
  background-color: var(--color-surface) !important;
}
/* #hard {
  color: var(--color-bg);
} */
</style>
