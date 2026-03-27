import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * usePageContent
 *
 * Composable that returns structured content objects for each page section.
 * Pages use this to get all their content in one place, then pass it down
 * to section components as props.
 *
 * Important: use t() for strings, tm() for arrays and nested objects.
 * t() always returns a string — it will break array/object content fields.
 */
export function usePageContent() {
  const { t, tm } = useI18n()

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
  // stats is an array — use tm() not t()
  const aboutContent = computed(() => ({
    title: t('about.title'),
    subtitle: t('about.subtitle'),
    body: t('about.body'),
    secondaryBody: t('about.secondaryBody'),
    imageAlt: t('about.imageAlt'),
    stats: tm('about.stats'),
  }))

  // --- Services Section Content ---
  // items is an array — use tm() not t()
  const servicesContent = computed(() => ({
    title: t('services.title'),
    subtitle: t('services.subtitle'),
    items: tm('services.items'),
  }))

  // --- Testimonials Section Content ---
  // items is an array — use tm() not t()
  const testimonialsContent = computed(() => ({
    title: t('testimonials.title'),
    items: tm('testimonials.items'),
  }))

  // --- FAQ Section Content ---
  // items is an array — use tm() not t()
  const faqContent = computed(() => ({
    title: t('faq.title'),
    items: tm('faq.items'),
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
