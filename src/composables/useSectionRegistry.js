import { defineAsyncComponent } from 'vue'

/**
 * useSectionRegistry
 *
 * Maps section name strings (as used in client-config.js) to their
 * corresponding Vue components, loaded asynchronously.
 *
 * Why async components?
 * Each section is only loaded when it is actually needed.
 * A client with no testimonials section never downloads that component.
 * This keeps the initial bundle small regardless of how many sections exist.
 *
 * To add a new section to the template:
 * 1. Build the component in src/components/sections/
 * 2. Add it to the registry below with a matching key
 * 3. Add the key to the sections array in client-config.js
 */
export function useSectionRegistry() {
  const sectionRegistry = {
    hero: defineAsyncComponent(() =>
      import('@/components/sections/HeroSection.vue')
    ),
    about: defineAsyncComponent(() =>
      import('@/components/sections/AboutSection.vue')
    ),
    services: defineAsyncComponent(() =>
      import('@/components/sections/ServicesSection.vue')
    ),
    testimonials: defineAsyncComponent(() =>
      import('@/components/sections/TestimonialsSection.vue')
    ),
    faq: defineAsyncComponent(() =>
      import('@/components/sections/FAQSection.vue')
    ),
    contact: defineAsyncComponent(() =>
      import('@/components/sections/ContactSection.vue')
    ),
    gallery: defineAsyncComponent(() =>
      import('@/components/sections/GallerySection.vue')
    ),
  }

  /**
   * Resolves a section name string to its async Vue component.
   * Returns null and warns if the section is not registered.
   *
   * @param {string} sectionName - The section key from client-config.js
   * @returns {object|null} The async Vue component or null
   */
  function resolveSection(sectionName) {
    const resolvedSection = sectionRegistry[sectionName]
    if (!resolvedSection) {
      console.warn(
        `Section "${sectionName}" is not registered. ` +
        `Add it to src/composables/useSectionRegistry.js`
      )
      return null
    }
    return resolvedSection
  }

  return {
    sectionRegistry,
    resolveSection,
  }
}
