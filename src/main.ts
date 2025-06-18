import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import '@/assets/styles/tailwind.css'
import { useThemeStore } from '@/stores/themeStore'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const themeStore = useThemeStore()
themeStore.initTheme()

app.use(router)
app.use(i18n)
app.use(Quasar)
app.mount('#app')
