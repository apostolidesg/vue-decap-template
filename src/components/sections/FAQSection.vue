<template>
  <section class="faq section" id="faq">
    <div class="container">

      <!-- Section Header -->
      <div class="faq__header">
        <span class="faq__subtitle">{{ subtitle }}</span>
        <h2 class="faq__title">{{ title }}</h2>
        <p v-if="description" class="faq__description">{{ description }}</p>
      </div>

      <!-- Accordion Items -->
      <div class="faq__list">
        <div
          v-for="(faqItem, itemIndex) in items"
          :key="faqItem.question"
          class="faq-item"
          :class="{ 'faq-item--open': openItemIndex === itemIndex }"
        >
          <!-- Question row — clicking toggles the answer -->
          <button
            class="faq-item__question"
            @click="toggleItem(itemIndex)"
            :aria-expanded="openItemIndex === itemIndex"
          >
            <span>{{ faqItem.question }}</span>
            <component
              :is="openItemIndex === itemIndex ? ChevronUp : ChevronDown"
              class="faq-item__chevron"
              :size="20"
              :stroke-width="2"
            />
          </button>

          <!-- Answer — only rendered when this item is open -->
          <div v-show="openItemIndex === itemIndex" class="faq-item__answer">
            <p>{{ faqItem.answer }}</p>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

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
})

// Tracks which FAQ item is currently open — null means all are closed
const openItemIndex = ref(null)

// Toggle an item open or closed
// Clicking the already-open item closes it — clicking a new one switches to it
function toggleItem(itemIndex) {
  openItemIndex.value = openItemIndex.value === itemIndex ? null : itemIndex
}
</script>

<style lang="scss" scoped>
.faq {
  background: var(--color-background);

  &__header {
    text-align: center;
    max-width: 640px;
    margin: 0 auto var(--space-16);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__subtitle {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__title {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    line-height: var(--line-height-tight);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  &__description {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }

  &__list {
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
}

// --- FAQ Item ---
.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);

  &--open {
    border-color: var(--color-primary);
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-6);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }

  &__chevron {
    flex-shrink: 0;
    color: var(--color-primary);
    transition: transform var(--transition-fast);
  }

  &__answer {
    padding: 0 var(--space-6) var(--space-6);

    p {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }
}
</style>
