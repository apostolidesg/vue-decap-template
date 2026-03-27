<template>
  <section class="about section section--white" id="about">
    <div class="container about__inner">

      <!-- Image Column -->
      <div class="about__image-wrapper">
        <img
          :src="resolvedImage"
          :alt="imageAlt"
          class="about__image"
        />

        <!-- Stats overlay card -->
        <div v-if="hasStats" class="about__stats">
          <div
            v-for="statItem in stats"
            :key="statItem.label"
            class="about__stat"
          >
            <span class="about__stat-number">{{ statItem.number }}</span>
            <span class="about__stat-label">{{ statItem.label }}</span>
          </div>
        </div>
      </div>

      <!-- Content Column -->
      <div class="about__content">
        <div class="section-header" style="text-align: left; margin: 0 0 var(--space-8);">
          <span class="section-header__eyebrow">{{ subtitle }}</span>
          <h2 class="section-header__title">{{ title }}</h2>
        </div>
        <p class="about__body">{{ body }}</p>
        <p v-if="secondaryBody" class="about__body about__body--secondary">
          {{ secondaryBody }}
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resolveImagePath } from '@/utils/image'

// Props — all content passed down from the page
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    required: true,
  },
  secondaryBody: {
    type: String,
    default: '',
  },
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  stats: {
    type: Array,
    default: () => [],
  },
  // Controls which side the image appears on
  // Options: 'left' | 'right'
  imagePosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

// Only render the stats card if stats were provided
const hasStats = computed(() => props.stats && props.stats.length > 0)

// Resolve image with a professional placeholder fallback
const resolvedImage = computed(() =>
  resolveImagePath(
    props.imageSrc,
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop'
  )
)
</script>

<style lang="scss" scoped>
.about {
  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }
  }

  // --- Image Column ---
  &__image-wrapper {
    position: relative;

    @media (max-width: 768px) {
      order: -1;
    }
  }

  &__image {
    width: 100%;
    height: 520px;
    object-fit: cover;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);

    @media (max-width: 768px) {
      height: 300px;
    }
  }

  // Stats card sits in the bottom-right corner of the image
  &__stats {
    position: absolute;
    bottom: calc(-1 * var(--space-8));
    right: calc(-1 * var(--space-8));
    background: var(--color-background);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: var(--space-6);
    display: flex;
    gap: var(--space-6);

    @media (max-width: 768px) {
      position: static;
      margin-top: var(--space-4);
      justify-content: space-around;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  &__stat-number {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  &__stat-label {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    text-align: center;
    white-space: nowrap;
  }

  // --- Content Column ---
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__body {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);

    &--secondary {
      padding-top: var(--space-2);
    }
  }
}
</style>
