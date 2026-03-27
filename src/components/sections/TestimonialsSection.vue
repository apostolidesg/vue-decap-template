<template>
  <section class="testimonials section" id="testimonials">
    <div class="container">

      <!-- Section Header -->
      <div class="testimonials__header">
        <span class="testimonials__subtitle">{{ subtitle }}</span>
        <h2 class="testimonials__title">{{ title }}</h2>
        <p v-if="description" class="testimonials__description">{{ description }}</p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials__grid">
        <div
          v-for="testimonialItem in items"
          :key="testimonialItem.author"
          class="testimonial-card"
        >
          <!-- Star Rating -->
          <div class="testimonial-card__rating">
            <Star
              v-for="starIndex in testimonialItem.rating"
              :key="starIndex"
              class="testimonial-card__star"
              :size="16"
              :stroke-width="1.5"
            />
          </div>

          <!-- Quote -->
          <blockquote class="testimonial-card__quote">
            "{{ testimonialItem.quote }}"
          </blockquote>

          <!-- Author -->
          <div class="testimonial-card__author">
            <div class="testimonial-card__author-avatar">
              {{ getAuthorInitials(testimonialItem.author) }}
            </div>
            <div class="testimonial-card__author-info">
              <span class="testimonial-card__author-name">
                {{ testimonialItem.author }}
              </span>
              <span class="testimonial-card__author-role">
                {{ testimonialItem.role }}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next'

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

// Generates initials from a full name for the avatar placeholder
// e.g. "Maria Papadopoulou" → "MP"
function getAuthorInitials(fullName) {
  if (!fullName) return '?'
  return fullName
    .split(' ')
    .map(namePart => namePart.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>

<style lang="scss" scoped>
.testimonials {
  background: var(--color-surface);

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

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
}

// --- Testimonial Card ---
.testimonial-card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &__rating {
    display: flex;
    gap: var(--space-1);
  }

  &__star {
    color: var(--color-accent);
    fill: var(--color-accent);
  }

  &__quote {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    line-height: var(--line-height-relaxed);
    font-style: italic;
    flex: 1;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__author-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    background: var(--color-secondary);
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__author-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__author-name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }

  &__author-role {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}
</style>
