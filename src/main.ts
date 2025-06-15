// import { createApp } from 'vue'
// import App from './app.vue'
// import router from './router'
// import { createPinia } from 'pinia'
// import i18n from './i18n'
// import '@/assets/styles/tailwind.css'
// import { useThemeStore } from '@/stores/themeStore'

// const app = createApp(App)
// const pinia = createPinia()
// const themeStore = useThemeStore()

// app.use(pinia)
// app.use(router)
// app.use(i18n)
// themeStore.initTheme()

// app.mount('#app')
import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import '@/assets/styles/tailwind.css'
import { useThemeStore } from '@/stores/themeStore'

// اول app و pinia را بساز
const app = createApp(App)
const pinia = createPinia()

// بعد pinia را وصل کن
app.use(pinia)

// حالا که pinia فعال شده، می‌تونی storeها را استفاده کنی
const themeStore = useThemeStore()
themeStore.initTheme()

// بقیه app setup
app.use(router)
app.use(i18n)
app.mount('#app')
