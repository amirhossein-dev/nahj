import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
