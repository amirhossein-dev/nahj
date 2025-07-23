<template>
  <hekmatLayout>
    <hekmatContent :hekmat="hekmat" />
    <hekmatAudioPlayer :hekmatId="hekmatId" />
  </hekmatLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import hekmatLayout from '@/layouts/hekmatLayout.vue'
import hekmatContent from '@/components/hekmat/hekmatContent.vue'
import hekmatAudioPlayer from '@/components/hekmat/hekmatAudioPlayer.vue'
import { hekmatList } from '@/data/hekmatData'

const route = useRoute()
const hekmatId = route.params.id
const hekmat = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  const found = hekmatList.find((h) => h.id === id)
  if (found) {
    hekmat.value = found
  } else {
    hekmat.value = {
      id,
      title: 'حکمت پیدا نشد',
      content: 'متن این حکمت در دسترس نیست.',
      audio: ''
    }
  }
})
</script>
