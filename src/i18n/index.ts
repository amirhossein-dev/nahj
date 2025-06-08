import { createI18n } from 'vue-i18n'
import fa from './translate/fa.json'
import en from './translate/en.json'

const messages = {
  fa,
  en
}

const i18n = createI18n({
  legacy: false, // Composition API
  locale: 'fa', // زبان پیش‌فرض
  fallbackLocale: 'en',
  globalInjection: true,
  messages
})

export default i18n
