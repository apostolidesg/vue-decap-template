<template>
  <section class="services section section--surface" id="services">
    <div class="container">

      <!-- Section Header -->
      <div class="section-header">
        <span class="section-header__eyebrow">{{ subtitle }}</span>
        <h2 class="section-header__title">{{ title }}</h2>
        <p v-if="description" class="section-header__description">{{ description }}</p>
      </div>

      <!-- Services Grid -->
      <div class="services__grid" :class="gridColumnClass">
        <div
          v-for="serviceItem in items"
          :key="serviceItem.title"
          class="service-card"
        >
          <!-- Icon resolved dynamically from registry -->
          <div class="service-card__icon-wrapper">
            <component
              :is="resolveIcon(serviceItem.icon)"
              v-if="resolveIcon(serviceItem.icon)"
              class="service-card__icon"
              :size="32"
              :stroke-width="1.5"
            />
          </div>
          <h3 class="service-card__title">{{ serviceItem.title }}</h3>
          <p class="service-card__description">{{ serviceItem.description }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '@/utils/icons'

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
  description: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
  // Number of columns in the grid — 2, 3, or 4
  columns: {
    type: Number,
    default: 3,
    validator: (value) => [2, 3, 4].includes(value),
  },
})

// Derive column class from props — keeps template clean
const gridColumnClass = computed(() => `services__grid--cols-${props.columns}`)
</script>

<style lang="scss" scoped>
.services {
  &__grid {
    display: grid;
    gap: var(--space-8);

    &--cols-2 {
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    &--cols-3 {
      grid-template-columns: repeat(3, 1fr);
      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 640px) { grid-template-columns: 1fr; }
    }

    &--cols-4 {
      grid-template-columns: repeat(4, 1fr);
      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 640px) { grid-template-columns: 1fr; }
    }
  }
}

// --- Service Card ---
.service-card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
  }

  &__icon-wrapper {
    width: 3rem;
    height: 3rem;
    background: var(--color-secondary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    color: var(--color-primary);
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }

  &__description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }
}
</style>
