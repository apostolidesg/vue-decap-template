<template>
  <div class="page page-home">
    <!--
      Sections render dynamically from client-config.js sections array.
      To add, remove, or reorder sections — edit client-config.js only.
      No changes needed here.
    -->
    <component
      :is="resolveSection(section.id)"
      v-for="section in config.sections"
      :key="section.id"
      v-bind="getSectionProps(section.id)"
      :layout="section.layout || 'default'"
    />
  </div>
</template>

<script setup>
import { useClientConfig } from '@/composables/useClientConfig'
import { useSectionRegistry } from '@/composables/useSectionRegistry'
import { useSectionProps } from '@/composables/useSectionProps'

// Config drives which sections render and in what order
const { config } = useClientConfig()

// Registry resolves section name strings to async Vue components
const { resolveSection } = useSectionRegistry()

// Props map provides the correct props for each section
const { getSectionProps } = useSectionProps()
</script>
