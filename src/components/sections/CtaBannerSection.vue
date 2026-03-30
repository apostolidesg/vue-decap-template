<template>
  <section
    class="cta-banner"
    :class="[`cta-banner--${layout}`]"
    :style="isImageLayout ? { backgroundImage: `url(${imageSrc})` } : {}"
  >
    <!-- Dark overlay for image layout -->
    <div v-if="isImageLayout" class="cta-banner__overlay" aria-hidden="true"></div>

    <div class="container">
      <div ref="animationRef" class="cta-banner__inner fade-in">
        <h2 v-if="title" class="cta-banner__title">{{ title }}</h2>
        <p v-if="subtitle" class="cta-banner__subtitle">{{ subtitle }}</p>
        <a
          v-if="cta"
          :href="ctaLink || '#'"
          class="cta-banner__btn"
        >
          {{ cta }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  cta: {
    type: String,
    default: '',
  },
  ctaLink: {
    type: String,
    default: '#contact',
  },
  // Used in 'image' layout only — background image URL
  imageSrc: {
    type: String,
    default: '',
  },
  // 'default' | 'image'
  layout: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'image'].includes(value),
  },
})

const { animationRef } = useScrollAnimation()

const isImageLayout = computed(() => props.layout === 'image')
</script>

<style lang="scss" scoped>
.cta-banner {
  padding: var(--section-padding) 0;
  position: relative;

  // --- Default layout: primary color background ---
  &--default {
    background: var(--color-primary);

    .cta-banner__title {
      color: var(--color-text-inverse);
    }

    .cta-banner__subtitle {
      color: var(--color-text-inverse);
      opacity: 0.85;
    }

    .cta-banner__btn {
      background: var(--color-background);
      color: var(--color-primary);

      &:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
      }
    }
  }

  // --- Image layout: background image with dark overlay ---
  &--image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 320px;
    display: flex;
    align-items: center;

    .cta-banner__title {
      color: var(--color-text-inverse);
    }

    .cta-banner__subtitle {
      color: var(--color-text-inverse);
      opacity: 0.85;
    }

    .cta-banner__btn {
      background: var(--color-primary);
      color: var(--color-text-inverse);

      &:hover {
        background: var(--color-primary-dark);
        transform: translateY(-2px);
      }
    }
  }

  // Dark overlay for image layout
  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 0;
  }

  &__inner {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
  }

  &__title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);

    @media (min-width: 768px) {
      font-size: var(--font-size-4xl);
    }
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-8);
    border-radius: var(--radius-full);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    transition: all var(--transition-base);
    cursor: pointer;
    box-shadow: var(--shadow-md);
  }
}
</style>
