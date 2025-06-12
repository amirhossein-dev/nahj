import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import '@/assets/styles/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
