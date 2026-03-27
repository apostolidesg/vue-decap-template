import { createI18n } from 'vue-i18n'
import { useClientConfig } from '@/composables/useClientConfig'

// The list of content sections that have their own JSON file
const contentSections = ['hero', 'about', 'services', 'testimonials', 'faq', 'contact']

/**
 * Loads all section JSON files for a given locale and merges them
 * into a single flat messages object.
 *
 * Each section file (e.g. hero.json) becomes a top-level key
 * in the messages object (e.g. messages.hero.title).
 *
 * @param {string} localeCode - The locale to load e.g. 'en' or 'el'
 * @returns {object} Merged messages object for the locale
 */
async function loadLocaleMessages(localeCode) {
  const mergedMessages = {}

  for (const sectionName of contentSections) {
    try {
      const sectionModule = await import(
        `../../content/${localeCode}/${sectionName}.json`
      )
      mergedMessages[sectionName] = sectionModule.default
    } catch (error) {
      console.warn(
        `No content file found for section "${sectionName}" in locale "${localeCode}"`
      )
      mergedMessages[sectionName] = {}
    }
  }

  return mergedMessages
}

/**
 * Sets up vue-i18n with all configured locales.
 * Loads and merges per-section JSON files for each locale.
 */
export async function setupI18n() {
  const { config } = useClientConfig()
  const messages = {}

  for (const localeCode of config.languages) {
    messages[localeCode] = await loadLocaleMessages(localeCode)
  }

  const i18n = createI18n({
    legacy: false,
    locale: config.defaultLocale,
    fallbackLocale: config.defaultLocale,
    messages,
  })

  return i18n
}
