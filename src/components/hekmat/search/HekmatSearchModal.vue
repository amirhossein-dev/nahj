<template>
  <div class="q-pa-md">
    <q-input
      filled
      dir="rtl"
      color="secondary"
      rounded
      standout
      dark
      v-model="query"
      label="عبارت مورد نظر را وارد کنید"
      debounce="300"
      @update:model-value="onSearch"
      class="q-mb-md color-[--color-text]"
    >
      <template #append>
        <IconX @click="closeModal" />
      </template>
    </q-input>

    <!-- نمایش نتایج -->
    <q-list bordered separator v-if="results.length">
      <q-item v-for="item in results" :key="item.id" clickable>
        <q-item-section>{{ item.text }}</q-item-section>
      </q-item>
    </q-list>

    <div v-else class="text-grey text-center q-mt-xl">نتیجه‌ای یافت نشد.</div>
  </div>
</template>

<script setup>
import { IconX } from '@tabler/icons-vue'
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const emit = defineEmits(['close'])

const onSearch = (val) => {
  // اینجا بعداً به منطق سرچ واقعی وصل می‌شود
  results.value = val
    ? [
        { id: 1, text: 'مثال حکمت ۱' },
        { id: 2, text: 'مثال حکمت ۲' }
      ]
    : []
}
const closeModal = () => {
  emit('close')
}
</script>
<style>
.q-input__control,
.q-field__control {
  background-color: var(--color-bg) !important;
  color: var(--color-bg) !important;
}
.q-field__native,
.q-field__input {
  color: var(--color-primary) !important;
}

/* placeholder رنگ */
.q-placeholder,
.q-field__label {
  color: var(--color-text) !important;
}
</style>
