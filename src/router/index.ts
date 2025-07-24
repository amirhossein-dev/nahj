import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/hekmat/:id',
    name: 'HekmatDetail',
    component: () => import('@/pages/hekmat/[id].vue'),
    props: true
  },
  // مسیرهای bottomNav که هنوز پیاده نشده‌اند و به صفحه "Coming Soon" می‌روند
  {
    path: '/letters',
    name: 'Letters',
    component: () => import('@/views/comingSoon.vue')
  },
  {
    path: '/sermons',
    name: 'Sermons',
    component: () => import('@/views/comingSoon.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/comingSoon.vue')
  },
  // catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const audioPlayerStore = useAudioPlayerStore()
  audioPlayerStore.stop() // متد توقف
  next()
})

export default router
