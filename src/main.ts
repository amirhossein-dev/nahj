import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import i18n from './i18n'
import { createPinia } from 'pinia'
import '@/assets/styles/tailwind.css'
import { useThemeStore } from '@/stores/themeStore'
import { Quasar, Notify } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const themeStore = useThemeStore()
themeStore.initTheme()

app.use(router)
app.use(i18n)
app.use(Quasar, {
  plugins: { Notify }
})
app.mount('#app')
