<template>
  <div class="page page-home">
    <HeroSection
      :title="t('hero.title')"
      :subtitle="t('hero.subtitle')"
      :primary-cta="t('hero.primaryCta')"
      :secondary-cta="t('hero.secondaryCta')"
      :image-src="resolvedHeroImage"
      :image-alt="t('hero.imageAlt')"
      layout="image-right"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from '@/components/sections/HeroSection.vue'
import { resolveImagePath } from '@/utils/image'

// i18n — the page is responsible for passing translated content to sections
const { t } = useI18n()

// Placeholder image until client provides their own via CMS
const resolvedHeroImage = computed(() =>
  resolveImagePath('', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop')
)
</script>
