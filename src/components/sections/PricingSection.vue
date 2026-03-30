<template>
  <section class="pricing section section--surface">
    <div class="container">

      <!-- Section Header -->
      <div v-if="title || subtitle" class="section-header">
        <p v-if="subtitle" class="section-header__eyebrow">{{ subtitle }}</p>
        <h2 v-if="title" class="section-header__title">{{ title }}</h2>
      </div>

      <!-- Cards layout -->
      <div
        v-if="layout === 'cards'"
        ref="containerRef"
        class="pricing__cards"
      >
        <div
          v-for="(item, index) in items"
          :key="item.name"
          class="pricing__card fade-in-stagger"
          :class="{ 'pricing__card--highlighted': item.highlighted }"
        >
          <div class="pricing__card-header">
            <h3 class="pricing__card-name">{{ item.name }}</h3>
            <div class="pricing__card-price">
              <span class="pricing__card-amount">{{ item.price }}</span>
              <span v-if="item.period" class="pricing__card-period">{{ item.period }}</span>
            </div>
          </div>

          <p v-if="item.description" class="pricing__card-description">
            {{ item.description }}
          </p>

          <ul v-if="item.features && item.features.length" class="pricing__card-features">
            <li
              v-for="(feature, featureIndex) in item.features"
              :key="featureIndex"
              class="pricing__card-feature"
            >
              <span class="pricing__card-feature-check" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>

          <a
            v-if="item.cta"
            :href="item.ctaLink || '#'"
            class="pricing__card-cta"
          >
            {{ item.cta }}
          </a>
        </div>
      </div>

      <!-- Menu layout -->
      <div
        v-else-if="layout === 'menu'"
        ref="animationRef"
        class="pricing__menu fade-in"
      >
        <div
          v-for="group in groupedMenuItems"
          :key="group.category"
          class="pricing__menu-group"
        >
          <h3 v-if="group.category" class="pricing__menu-category">{{ group.category }}</h3>

          <div
            v-for="(item, itemIndex) in group.items"
            :key="`${item.name}-${item.price}`"
            class="pricing__menu-item"
          >
            <div class="pricing__menu-item-header">
              <span class="pricing__menu-item-name">{{ item.name }}</span>
              <span class="pricing__menu-item-dots" aria-hidden="true"></span>
              <span class="pricing__menu-item-price">{{ item.price }}</span>
            </div>
            <p v-if="item.description" class="pricing__menu-item-description">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <p v-else class="pricing__empty">
        No pricing items yet. Add plans in the CMS.
      </p>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollAnimation, useStaggeredAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  // For 'cards' layout, each item: { name, price, period, description, features[], cta, ctaLink, highlighted }
  // For 'menu' layout, each item: { category, name, price, description }
  items: {
    type: Array,
    default: () => [],
  },
  // 'cards' | 'menu'
  layout: {
    type: String,
    default: 'cards',
    validator: (value) => ['cards', 'menu'].includes(value),
  },
})

// Single fade-in for the menu layout
const { animationRef } = useScrollAnimation()
// Staggered animation for the cards layout
const { containerRef } = useStaggeredAnimation()

// Group menu items by category — only used when layout is 'menu'
const groupedMenuItems = computed(() => {
  if (props.layout !== 'menu') return []
  const groups = {}
  props.items.forEach((item) => {
    const category = item.category || ''
    if (!groups[category]) groups[category] = []
    groups[category].push(item)
  })
  return Object.entries(groups).map(([category, items]) => ({ category, items }))
})
</script>

<style lang="scss" scoped>
.pricing {

  // --- Cards Layout ---
  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
  }

  &__card {
    background: var(--color-background);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border, rgba(0, 0, 0, 0.08));
    transition: box-shadow 300ms ease, transform 300ms ease;

    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    // Highlighted card (featured plan)
    &--highlighted {
      background: var(--color-primary);
      border-color: var(--color-primary);

      .pricing__card-name,
      .pricing__card-amount,
      .pricing__card-period,
      .pricing__card-description,
      .pricing__card-feature {
        color: var(--color-text-inverse);
      }

      .pricing__card-feature-check {
        color: var(--color-text-inverse);
        opacity: 0.8;
      }

      .pricing__card-cta {
        background: var(--color-background);
        color: var(--color-primary);

        &:hover {
          background: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }

  &__card-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__card-name {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }

  &__card-price {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
  }

  &__card-amount {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  &__card-period {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__card-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }

  &__card-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    flex: 1;
  }

  &__card-feature {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
  }

  &__card-feature-check {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
    flex-shrink: 0;
    margin-top: 1px;
  }

  &__card-cta {
    display: block;
    text-align: center;
    padding: var(--space-3) var(--space-6);
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    transition: background 200ms ease, transform 200ms ease;
    margin-top: auto;

    &:hover {
      background: var(--color-primary-dark);
      transform: translateY(-1px);
    }
  }

  // --- Menu Layout ---
  &__menu {
    max-width: 680px;
    margin: 0 auto;
  }

  &__menu-group {
    margin-bottom: var(--space-12);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__menu-category {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-3);
    border-bottom: 2px solid var(--color-primary);
  }

  &__menu-item {
    margin-bottom: var(--space-5);
    padding-bottom: var(--space-5);
    border-bottom: 1px solid var(--color-border, rgba(0, 0, 0, 0.06));

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  &__menu-item-header {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    margin-bottom: var(--space-1);
  }

  &__menu-item-name {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  &__menu-item-dots {
    flex: 1;
    border-bottom: 1px dotted var(--color-text-secondary);
    opacity: 0.4;
    margin: 0 var(--space-2);
    position: relative;
    top: -3px;
  }

  &__menu-item-price {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    white-space: nowrap;
  }

  &__menu-item-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }

  &__empty {
    text-align: center;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    padding: var(--space-16) 0;
  }
}
</style>
