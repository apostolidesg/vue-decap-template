import { createI18n } from 'vue-i18n'
import { useClientConfig } from '@/composables/useClientConfig'

// Sections that have their own content JSON file in /content/
const contentSections = ['hero', 'about', 'services', 'testimonials', 'faq', 'contact', 'footer']

/**
 * Loads all section JSON files and builds a messages object per locale.
 *
 * Each file (e.g. content/hero.json) contains all locales:
 * { "en": { "title": "..." }, "el": { "title": "..." } }
 *
 * We read the correct locale key from each file and merge all
 * sections into one flat messages object per locale.
 *
 * @param {string[]} locales - Array of locale codes from client config
 * @returns {object} Messages object keyed by locale code
 */
async function loadAllMessages(locales) {
  const messages = {}

  // Initialise an empty object for each locale
  for (const localeCode of locales) {
    messages[localeCode] = {}
  }

  // Load each section file and extract the correct locale slice
  for (const sectionName of contentSections) {
    try {
      const sectionModule = await import(`../../content/${sectionName}.json`)
      const sectionData = sectionModule.default

      for (const localeCode of locales) {
        if (sectionData[localeCode]) {
          messages[localeCode][sectionName] = sectionData[localeCode]
        } else {
          console.warn(
            `No "${localeCode}" key found in content/${sectionName}.json`
          )
          messages[localeCode][sectionName] = {}
        }
      }
    } catch (error) {
      console.warn(`Could not load content/${sectionName}.json`)
      for (const localeCode of locales) {
        messages[localeCode][sectionName] = {}
      }
    }
  }

  return messages
}

/**
 * Creates and returns the vue-i18n instance with all locale messages loaded.
 */
export async function setupI18n() {
  const { config } = useClientConfig()
  const messages = await loadAllMessages(config.languages)

  const i18n = createI18n({
    legacy: false,
    locale: config.defaultLocale,
    fallbackLocale: config.defaultLocale,
    messages,
  })

  return i18n
}
