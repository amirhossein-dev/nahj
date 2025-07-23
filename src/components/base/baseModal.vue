<template>
  <q-dialog :backdrop-filter="backdropFilter" v-model="internalModel" :persistent="persistent" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">
    <q-card dark class="bg-[--color-surface] text-[--color-text] rounded-0" :style="computedStyle">
      <slot />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  persistent: Boolean,
  backdropFilter: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: 'medium' // small | medium | large | full
  },
  maximized: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const internalModel = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    internalModel.value = val
  }
)

watch(internalModel, (val) => {
  emit('update:modelValue', val)
})

const close = () => {
  internalModel.value = false
}

const computedStyle = computed(() => {
  switch (props.size) {
    case 'small':
      return 'width: 100vw; max-width: 90vw;'
    case 'medium':
      return 'width: 500px; max-width: 95vw;'
    case 'large':
      return 'width: 700px; max-width: 98vw;'
    case 'full':
      return 'width: 100vw; height: 100vh;'
    default:
      return ''
  }
})
</script>
