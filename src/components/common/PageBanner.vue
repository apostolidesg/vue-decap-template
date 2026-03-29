<template>
  <section class="page-banner">
    <div class="page-banner__inner">
      <p v-if="resolvedSubtitle" class="page-banner__subtitle">
        {{ resolvedSubtitle }}
      </p>
      <h1 class="page-banner__title">{{ resolvedTitle }}</h1>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const { locale } = useI18n()

const resolvedTitle = computed(() => {
  const title = props.config.title
  if (!title) return ''
  return typeof title === 'object' ? (title[locale.value] ?? title.en) : title
})

const resolvedSubtitle = computed(() => {
  const subtitle = props.config.subtitle
  if (!subtitle) return null
  return typeof subtitle === 'object' ? (subtitle[locale.value] ?? subtitle.en) : subtitle
})
</script>

<style lang="scss" scoped>
.page-banner {
  background-color: var(--color-primary);
  padding: var(--space-16) var(--container-padding);

  @media (min-width: 768px) {
    padding: var(--space-20) var(--container-padding);
  }

  &__inner {
    max-width: var(--container-max-width);
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-inverse);
    line-height: var(--line-height-tight);
    margin: 0;

    @media (min-width: 768px) {
      font-size: var(--font-size-4xl);
    }
  }

  &__subtitle {
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-inverse);
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 var(--space-3) 0;
  }
}
</style>
