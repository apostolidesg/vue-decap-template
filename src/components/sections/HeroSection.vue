<template>
  <section
    class="hero"
    :class="[`hero--${layout}`]"
    :style="isBackgroundLayout ? { backgroundImage: `url(${imageSrc})` } : {}"
  >
    <div class="container hero__inner">

      <!-- Text Content -->
      <div class="hero__content">
        <h1 class="hero__title">{{ title }}</h1>
        <p class="hero__subtitle">{{ subtitle }}</p>

        <div class="hero__actions">
          <a
            v-if="primaryCta"
            :href="primaryCtaLink"
            class="hero__btn hero__btn--primary"
          >
            {{ primaryCta }}
          </a>
          <a
            v-if="secondaryCta"
            :href="secondaryCtaLink"
            class="hero__btn hero__btn--secondary"
          >
            {{ secondaryCta }}
          </a>
        </div>
      </div>

      <!-- Side Image (only shown in image-right layout) -->
      <div v-if="isImageRightLayout" class="hero__image-wrapper">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="hero__image"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

// Props — the page passes content down, this component only displays it
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  primaryCta: {
    type: String,
    default: '',
  },
  primaryCtaLink: {
    type: String,
    default: '#contact',
  },
  secondaryCta: {
    type: String,
    default: '',
  },
  secondaryCtaLink: {
    type: String,
    default: '#about',
  },
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  // Controls the visual layout of the hero
  // Options: 'image-right' | 'image-background' | 'cinematic'
  layout: {
    type: String,
    default: 'image-right',
    validator: (value) => ['image-right', 'image-background', 'cinematic'].includes(value),
  },
})

// Computed flags to keep the template readable
const isImageRightLayout = computed(() => props.layout === 'image-right')
const isBackgroundLayout = computed(() => props.layout === 'image-background')
</script>

<style lang="scss" scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;

  // --- Image Right Layout ---
  &--image-right {
    background: var(--color-surface);

    .hero__inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
      align-items: center;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }
  }

  // --- Background Image Layout ---
  &--image-background {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    // Dark overlay for text readability
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .hero__inner {
      position: relative;
      z-index: 1;
    }

    .hero__title,
    .hero__subtitle {
      color: var(--color-text-inverse);
    }
  }

  // --- Content ---
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__title {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    max-width: 540px;
  }

  // --- CTA Buttons ---
  &__actions {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
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

    &--primary {
      background: var(--color-primary);
      color: var(--color-text-inverse);

      &:hover {
        background: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
    }

    &--secondary {
      background: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);

      &:hover {
        background: var(--color-primary);
        color: var(--color-text-inverse);
        transform: translateY(-2px);
      }
    }
  }

  // --- Side Image ---
  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      order: -1;
    }
  }

  &__image {
    width: 100%;
    max-width: 520px;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    object-fit: cover;
  }

  // --- Cinematic Layout ---
  // Full-bleed, full-viewport hero with large display type and centered content
  &--cinematic {
    padding: 0;
    min-height: 100vh;
    background: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: center;

    .hero__inner {
      display: block;
    }

    .hero__content {
      text-align: center;
      max-width: none;
      padding: var(--space-16) var(--space-8);
    }

    .hero__title {
      font-size: var(--font-size-4xl);

      @media (min-width: 768px) {
        font-size: var(--font-size-5xl);
      }
    }

    .hero__subtitle {
      font-size: var(--font-size-xl);
      opacity: 0.8;
      max-width: none;
    }
  }
}
</style>
