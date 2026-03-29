<template>
  <!-- DynamicPage: renders any page defined in client-config.js nav
       by resolving its sections and optional banner from the matching nav entry. -->
  <div class="page">
    <PageBanner v-if="shouldShowBanner" :config="bannerConfig" />
    <component
      :is="resolveSection(section.id)"
      v-for="section in currentPageSections"
      :key="section.id"
      v-bind="getSectionProps(section.id)"
      :layout="section.layout || 'default'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientConfig } from '@/composables/useClientConfig'
import { useSectionRegistry } from '@/composables/useSectionRegistry'
import { useSectionProps } from '@/composables/useSectionProps'
import PageBanner from '@/components/common/PageBanner.vue'

const route = useRoute()
const { config } = useClientConfig()
const { resolveSection } = useSectionRegistry()
const { getSectionProps } = useSectionProps()

const currentPage = computed(() =>
  (config.nav ?? []).find(item => item.path === route.path)
)

const currentPageSections = computed(() =>
  currentPage.value?.sections ?? []
)

const shouldShowBanner = computed(() => {
  const banner = currentPage.value?.banner
  return route.path !== '/' && banner !== false
})

const bannerConfig = computed(() => {
  const banner = currentPage.value?.banner
  if (banner && typeof banner === 'object') return banner
  return { title: currentPage.value?.label }
})
</script>
