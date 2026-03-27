import { createI18n } from 'vue-i18n'
import clientConfig from '../../client-config.js'

// Dynamically import all message files for configured languages
async function loadMessages() {
  const messages = {}

  for (const locale of clientConfig.languages) {
    try {
      const module = await import(`../../content/${locale}/index.js`)
      messages[locale] = module.default
    } catch (error) {
      console.warn(`No content found for locale "${locale}"`)
      messages[locale] = {}
    }
  }

  return messages
}

export async function setupI18n() {
  const messages = await loadMessages()

  const i18n = createI18n({
    legacy: false,
    locale: clientConfig.defaultLocale,
    fallbackLocale: clientConfig.defaultLocale,
    messages,
  })

  return i18n
}
