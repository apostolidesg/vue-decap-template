<template>
  <div class="page page-home">
    <HeroSection
      :title="heroContent.title"
      :subtitle="heroContent.subtitle"
      :primary-cta="heroContent.primaryCta"
      :primary-cta-link="heroContent.primaryCtaLink"
      :secondary-cta="heroContent.secondaryCta"
      :secondary-cta-link="heroContent.secondaryCtaLink"
      :image-src="resolvedHeroImage"
      :image-alt="heroContent.imageAlt"
      layout="image-right"
    />
    <AboutSection
      :title="aboutContent.title"
      :subtitle="aboutContent.subtitle"
      :body="aboutContent.body"
      :secondary-body="aboutContent.secondaryBody"
      :image-alt="aboutContent.imageAlt"
      :stats="aboutContent.stats"
      image-position="left"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import { usePageContent } from '@/composables/usePageContent'
import { resolveImagePath } from '@/utils/image'

// All page content comes from one composable
const { heroContent, aboutContent } = usePageContent()

// Placeholder hero image until client provides their own via CMS
const resolvedHeroImage = computed(() =>
  resolveImagePath(
    '',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
  )
)
</script>
