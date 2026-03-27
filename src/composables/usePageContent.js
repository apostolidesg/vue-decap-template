import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * usePageContent
 *
 * Composable that returns structured content objects for each page section.
 * Pages use this to get all their content in one place, then pass it down
 * to section components as props.
 *
 * This keeps templates clean, sections dumb, and all content logic centralised.
 * When a section needs new content fields, add them here — not in the template.
 */
export function usePageContent() {
  const { t } = useI18n()

  // --- Hero Section Content ---
  const heroContent = computed(() => ({
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    primaryCta: t('hero.primaryCta'),
    primaryCtaLink: '#contact',
    secondaryCta: t('hero.secondaryCta'),
    secondaryCtaLink: '#about',
    imageAlt: t('hero.imageAlt'),
  }))

  // --- About Section Content ---
  const aboutContent = computed(() => ({
    title: t('about.title'),
    body: t('about.body'),
  }))

  // --- Services Section Content ---
  const servicesContent = computed(() => ({
    title: t('services.title'),
    subtitle: t('services.subtitle'),
    items: t('services.items'),
  }))

  // --- Testimonials Section Content ---
  const testimonialsContent = computed(() => ({
    title: t('testimonials.title'),
    items: t('testimonials.items'),
  }))

  // --- FAQ Section Content ---
  const faqContent = computed(() => ({
    title: t('faq.title'),
    items: t('faq.items'),
  }))

  // --- Contact Section Content ---
  const contactContent = computed(() => ({
    title: t('contact.title'),
    subtitle: t('contact.subtitle'),
    namePlaceholder: t('contact.namePlaceholder'),
    emailPlaceholder: t('contact.emailPlaceholder'),
    messagePlaceholder: t('contact.messagePlaceholder'),
    sendButton: t('contact.sendButton'),
  }))

  return {
    heroContent,
    aboutContent,
    servicesContent,
    testimonialsContent,
    faqContent,
    contactContent,
  }
}
