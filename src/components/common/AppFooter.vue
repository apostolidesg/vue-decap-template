<template>
  <footer class="footer">
    <div class="container footer__inner">

      <!-- Brand block -->
      <div class="footer__brand">
        <span class="footer__site-name">{{ config.siteName }}</span>
        <p class="footer__tagline">{{ config.siteDescription }}</p>
      </div>

      <!-- Contact block -->
      <div class="footer__contact">
        <a v-if="config.contact.email" :href="`mailto:${config.contact.email}`">
          {{ config.contact.email }}
        </a>
        <a v-if="config.contact.phone" :href="`tel:${config.contact.phone}`">
          {{ config.contact.phone }}
        </a>
        <span v-if="config.contact.address">
          {{ config.contact.address }}
        </span>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <span>© {{ currentYear }} {{ config.siteName }}. {{ t('footer.rights') }}</span>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClientConfig } from '@/composables/useClientConfig'

// i18n
const { t } = useI18n()

// Config
const { config } = useClientConfig()

// Computed
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-12) 0 var(--space-8);

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__site-name {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  &__tagline {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);

    a, span {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__bottom {
    grid-column: 1 / -1;
    padding-top: var(--space-8);
    border-top: 1px solid var(--color-border);

    span {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
  }
}
</style>
