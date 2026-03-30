import { computed } from 'vue'
import { usePageContent } from '@/composables/usePageContent'
import { resolveImagePath } from '@/utils/image'

/**
 * useSectionProps
 *
 * Maps each section name to the props it needs.
 * When HomePage renders sections dynamically, it uses this composable
 * to know what props to pass to each section component.
 *
 * Why a separate composable?
 * Keeping prop mapping out of HomePage keeps the page component thin.
 * When a section needs new props, you update this file — not the page.
 */
export function useSectionProps() {
  const {
    heroContent,
    aboutContent,
    servicesContent,
    testimonialsContent,
    faqContent,
    contactContent,
    galleryContent,
    pricingContent,
    locationContent,
    ctaBannerContent,
  } = usePageContent()

  // Placeholder hero image until client provides their own via CMS
  const resolvedHeroImage = computed(() =>
    resolveImagePath(
      '',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
    )
  )

  // Each key matches a section name in client-config.js sections array
  const sectionPropsMap = computed(() => ({
    hero: {
      title: heroContent.value.title,
      subtitle: heroContent.value.subtitle,
      primaryCta: heroContent.value.primaryCta,
      primaryCtaLink: heroContent.value.primaryCtaLink,
      secondaryCta: heroContent.value.secondaryCta,
      secondaryCtaLink: heroContent.value.secondaryCtaLink,
      imageSrc: resolvedHeroImage.value,
      imageAlt: heroContent.value.imageAlt,
      videoSrc: heroContent.value.videoSrc,
      // layout comes from client-config.js sections array, not hardcoded here
    },
    about: {
      title: aboutContent.value.title,
      subtitle: aboutContent.value.subtitle,
      body: aboutContent.value.body,
      secondaryBody: aboutContent.value.secondaryBody,
      imageAlt: aboutContent.value.imageAlt,
      stats: aboutContent.value.stats,
      imagePosition: 'left',
    },
    services: {
      title: servicesContent.value.title,
      subtitle: servicesContent.value.subtitle,
      description: servicesContent.value.description,
      items: servicesContent.value.items,
      columns: 3,
    },
    testimonials: {
      title: testimonialsContent.value.title,
      subtitle: testimonialsContent.value.subtitle,
      description: testimonialsContent.value.description,
      items: testimonialsContent.value.items,
    },
    faq: {
      title: faqContent.value.title,
      subtitle: faqContent.value.subtitle,
      description: faqContent.value.description,
      items: faqContent.value.items,
    },
    contact: {
      title: contactContent.value.title,
      subtitle: contactContent.value.subtitle,
      description: contactContent.value.description,
      namePlaceholder: contactContent.value.namePlaceholder,
      emailPlaceholder: contactContent.value.emailPlaceholder,
      messagePlaceholder: contactContent.value.messagePlaceholder,
      sendButton: contactContent.value.sendButton,
      successMessage: contactContent.value.successMessage,
      errorMessage: contactContent.value.errorMessage,
    },
    gallery: {
      title: galleryContent.value.title,
      subtitle: galleryContent.value.subtitle,
      items: galleryContent.value.items,
      // layout comes from client-config.js sections array
    },
    pricing: {
      title: pricingContent.value.title,
      subtitle: pricingContent.value.subtitle,
      items: pricingContent.value.items,
      // layout comes from client-config.js sections array
    },
    location: {
      title: locationContent.value.title,
      subtitle: locationContent.value.subtitle,
      address: locationContent.value.address,
      phone: locationContent.value.phone,
      email: locationContent.value.email,
      mapEmbedUrl: locationContent.value.mapEmbedUrl,
      hours: locationContent.value.hours,
    },
    'cta-banner': {
      title: ctaBannerContent.value.title,
      subtitle: ctaBannerContent.value.subtitle,
      cta: ctaBannerContent.value.cta,
      ctaLink: ctaBannerContent.value.ctaLink,
      imageSrc: ctaBannerContent.value.imageSrc,
      // layout comes from client-config.js sections array
    },
  }))

  /**
   * Returns the props object for a given section name.
   * Returns an empty object if no props are mapped for that section.
   *
   * @param {string} sectionName - The section key from client-config.js
   * @returns {object} Props to pass to the section component
   */
  function getSectionProps(sectionName) {
    return sectionPropsMap.value[sectionName] || {}
  }

  return {
    getSectionProps,
  }
}
