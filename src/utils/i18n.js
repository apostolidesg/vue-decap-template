import { createI18n } from 'vue-i18n'
import { useClientConfig } from '@/composables/useClientConfig'

// Dynamically import all message files for configured languages
async function loadMessages() {
  const { config } = useClientConfig()
  const messages = {}

  for (const localeCode of config.languages) {
    try {
      const module = await import(`../../content/${localeCode}/index.js`)
      messages[localeCode] = module.default
    } catch (error) {
      console.warn(`No content found for locale "${localeCode}"`)
      messages[localeCode] = {}
    }
  }

  return messages
}

export async function setupI18n() {
  const { config } = useClientConfig()
  const messages = await loadMessages()

  const i18n = createI18n({
    legacy: false,
    locale: config.defaultLocale,
    fallbackLocale: config.defaultLocale,
    messages,
  })

  return i18n
}
