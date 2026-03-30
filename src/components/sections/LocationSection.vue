<template>
  <section class="location section">
    <div class="container">

      <!-- Section Header -->
      <div v-if="title || subtitle" class="section-header">
        <p v-if="subtitle" class="section-header__eyebrow">{{ subtitle }}</p>
        <h2 v-if="title" class="section-header__title">{{ title }}</h2>
      </div>

      <!-- Two-column grid: info left, map right -->
      <div ref="animationRef" class="location__grid fade-in">

        <!-- Info column -->
        <div class="location__info">

          <!-- Address -->
          <div v-if="address" class="location__detail">
            <component :is="mapPinIcon" class="location__icon" aria-hidden="true" />
            <span>{{ address }}</span>
          </div>

          <!-- Phone -->
          <div v-if="phone" class="location__detail">
            <component :is="phoneIcon" class="location__icon" aria-hidden="true" />
            <a :href="`tel:${phone}`" class="location__link">{{ phone }}</a>
          </div>

          <!-- Email -->
          <div v-if="email" class="location__detail">
            <component :is="mailIcon" class="location__icon" aria-hidden="true" />
            <a :href="`mailto:${email}`" class="location__link">{{ email }}</a>
          </div>

          <!-- Opening Hours -->
          <table v-if="hours && hours.length" class="location__hours">
            <caption class="location__hours-caption">Opening Hours</caption>
            <tbody>
              <tr
                v-for="(row, index) in hours"
                :key="index"
                class="location__hours-row"
                :class="{ 'location__hours-row--closed': isClosed(row.hours) }"
              >
                <td class="location__hours-days">{{ row.days }}</td>
                <td class="location__hours-time">{{ row.hours }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Map column -->
        <div v-if="mapEmbedUrl" class="location__map">
          <iframe
            :src="mapEmbedUrl"
            class="location__map-iframe"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Location map"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Map placeholder when no URL is set -->
        <div v-else class="location__map-placeholder">
          <p>Add a Google Maps embed URL in the CMS to display a map here.</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { resolveIcon } from '@/utils/icons'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  // Google Maps embed URL — client pastes this from Google Maps "Embed a map" feature
  mapEmbedUrl: {
    type: String,
    default: '',
  },
  // Array of { days: string, hours: string } — e.g. { days: 'Mon–Fri', hours: '09:00–18:00' }
  hours: {
    type: Array,
    default: () => [],
  },
})

const { animationRef } = useScrollAnimation()

// Resolve icons from the shared registry — never import lucide-vue-next directly in components
const mapPinIcon = resolveIcon('MapPin')
const phoneIcon = resolveIcon('Phone')
const mailIcon = resolveIcon('Mail')

// Closed rows are displayed in muted color
function isClosed(hoursString) {
  const closedKeywords = ['closed', 'κλειστό', 'κλειστα']
  return closedKeywords.some((keyword) =>
    hoursString?.toLowerCase().includes(keyword)
  )
}
</script>

<style lang="scss" scoped>
.location {

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__detail {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
  }

  &__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--color-primary);
    margin-top: 2px;
  }

  &__link {
    color: var(--color-text-primary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }

  // --- Opening Hours Table ---
  &__hours {
    width: 100%;
    border-collapse: collapse;

    // Visually hide caption but keep it for screen readers
    caption {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  }

  &__hours-row {
    border-bottom: 1px solid var(--color-border, rgba(0, 0, 0, 0.06));

    &:last-child {
      border-bottom: none;
    }

    // Closed rows are visually muted
    &--closed {
      .location__hours-days,
      .location__hours-time {
        color: var(--color-text-secondary);
        opacity: 0.5;
      }
    }
  }

  &__hours-days {
    padding: var(--space-2) var(--space-3) var(--space-2) 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    width: 55%;
  }

  &__hours-time {
    padding: var(--space-2) 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-align: right;
  }

  // --- Map ---
  &__map {
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    height: 420px;
  }

  &__map-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  &__map-placeholder {
    border-radius: var(--radius-xl);
    background: var(--color-surface);
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);

    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-align: center;
    }
  }
}
</style>
