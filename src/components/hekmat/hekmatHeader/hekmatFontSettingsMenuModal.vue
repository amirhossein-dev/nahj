<template>
  <div :model-value="modelValue" @update:model-value="(val) => emit('update:modelValue', val)" persistent position="bottom">
    <div class="theme-surface rounded-t-xl p-4 w-full">
      <q-tab-panels v-model="activePage" animated transition-prev="slide-right" transition-next="slide-left">
        <q-tab-panel name="main" class="theme-surface">
          <div class="flex flex-col gap-4">
            <div class="flex pb-4 justify-center items-center">
              <div
                class="w-full bold-btn-container h-12 py-2 flex justify-center items-center bold-btn-right transition-all duration-200"
                @click="bold = false"
                :class="!bold ? 'bg-primary/10 text-primary border border-primary' : 'bg-transparent text-gray-500'"
              >
                <IconLetterA size="26" />
              </div>
              <div
                class="w-full bold-btn-container h-12 py-2 flex justify-center items-center bold-btn-left transition-all duration-200 rounded-lg cursor-pointer"
                :class="bold ? 'bg-primary/10 text-primary border border-primary' : 'bg-transparent text-gray-500'"
                @click="bold = true"
              >
                <icon-letter-a stroke-width="3" size="30" class="font-bold" />
              </div>
            </div>
            <div class="flex flex-col gap-2 justify-center">
              <div flat class="flex flex-row justify-between items-center" @click="activePage = 'fonts'">
                <IconChevronLeft />
                <div class="flex flex-col items-end">
                  <p class="m-0 text-sm dark:text-stone-400">{{ $t('font') }}</p>
                  <p class="m-0 text-base">{{ uiStore.currentFont }}</p>
                </div>
              </div>

              <q-toggle v-model="continuousScroll" label="اسکرول پیوسته" />
            </div>

            <div class="flex gap-2 justify-around mb-4">
              <div
                v-for="(theme, index) in themes"
                :key="index"
                @click="selectedTheme = index"
                class="w-10 h-14 rounded-xl flex items-center justify-center cursor-pointer border-2"
                :class="selectedTheme === index ? 'border-primary' : 'border-transparent'"
                :style="{ backgroundColor: theme.bg }"
              ></div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="fonts" class="theme-surface">
          <div class="flex items-center justify-between pb-7">
            <q-btn dense flat @click="activePage = 'main'"> <IconArrowLeft /> </q-btn>

            <div class="absolute left-0 right-0 text-center pointer-events-none">
              <span class="text-white text-lg font-medium">{{ $t('font') }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <div
              v-for="font in fonts"
              :key="font.cssName"
              class="flex justify-between items-center py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              @click="selectFont(font.cssName)"
            >
              <span :style="{ fontFamily: font.cssName }" class="text-lg">
                {{ font.name }}
              </span>
              <IconCheck v-if="selectedFont === font.cssName" class="text-primary" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { IconArrowLeft, IconLetterA, IconSettings, IconChevronLeft, IconCheck } from '@tabler/icons-vue'
import { ref } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const uiStore = useUIStore()
defineProps({
  modelValue: Boolean
})
const emits = defineEmits(['update:modelValue', 'go-settings'])

const activePage = ref('main')
const bold = ref(false)
const selectedFont = ref('Untitled Serif')
const continuousScroll = ref(false)
const selectedTheme = ref(0)

const fonts = [
  { name: 'دانش', cssName: 'A Danesh' },
  { name: 'تیتر', cssName: 'B Titr Bold' },
  { name: 'رویا', cssName: 'Far RoyaBd' },
  { name: 'نستعلیق', cssName: 'IranNastaliq' },
  { name: 'تنها', cssName: 'Tanha' },
  { name: 'وزیر', cssName: 'Vazir' }
]
const themes = [{ bg: '#ffffff' }, { bg: '#f5eaea' }, { bg: '#f0f0f0' }, { bg: '#fcf7ea' }, { bg: '#1f2d3d' }, { bg: '#0a1f44' }]

function selectFont(fontName) {
  uiStore.setFont(fontName)
  selectedFont.value = fontName
}
</script>
<style scoped>
.bold-btn-right {
  background-color: var(--color-bg);
  border-radius: 1rem 0 0 1rem;
}
.bold-btn-left {
  background-color: var(--color-bg);
  border-radius: 0 1rem 1rem 0;
}
.bold-btn-container {
  width: 48%;
}
</style>
