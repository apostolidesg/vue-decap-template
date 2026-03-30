<template>
  <section class="gallery section">
    <div class="container">

      <!-- Section Header -->
      <div v-if="title || subtitle" class="section-header">
        <p v-if="subtitle" class="section-header__eyebrow">{{ subtitle }}</p>
        <h2 v-if="title" class="section-header__title">{{ title }}</h2>
      </div>

      <!-- Gallery Grid / Masonry -->
      <div
        v-if="items && items.length"
        ref="containerRef"
        class="gallery__grid"
        :class="[`gallery__grid--${layout}`]"
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          class="gallery__item fade-in-stagger"
          type="button"
          :aria-label="`Open image ${index + 1}`"
          @click="openLightbox(index)"
        >
          <img
            :src="item.src"
            :alt="item.alt || ''"
            class="gallery__image"
            loading="lazy"
          />
          <div v-if="item.caption" class="gallery__caption">{{ item.caption }}</div>
        </button>
      </div>

      <!-- Empty state — only shows in dev when items array is empty -->
      <p v-else class="gallery__empty">No gallery items yet. Add images in the CMS.</p>

    </div>

    <!-- Lightbox — rendered at body level to escape stacking contexts -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="gallery__lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        @click.self="closeLightbox"
      >
        <button
          class="gallery__lightbox-close"
          type="button"
          aria-label="Close lightbox"
          @click="closeLightbox"
        >
          ×
        </button>

        <button
          class="gallery__lightbox-prev"
          type="button"
          aria-label="Previous image"
          @click="prevImage"
        >
          ‹
        </button>

        <button
          class="gallery__lightbox-next"
          type="button"
          aria-label="Next image"
          @click="nextImage"
        >
          ›
        </button>

        <div class="gallery__lightbox-content">
          <img
            :src="items[lightboxIndex].src"
            :alt="items[lightboxIndex].alt || ''"
            class="gallery__lightbox-image"
          />
          <p
            v-if="items[lightboxIndex].caption"
            class="gallery__lightbox-caption"
          >
            {{ items[lightboxIndex].caption }}
          </p>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStaggeredAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  // Array of { src: string, alt: string, caption: string }
  items: {
    type: Array,
    default: () => [],
  },
  // 'grid' | 'masonry'
  layout: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'masonry'].includes(value),
  },
})

// --- Staggered scroll animation ---
const { containerRef } = useStaggeredAnimation()

// --- Lightbox state ---
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index) {
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function prevImage() {
  lightboxIndex.value = (lightboxIndex.value - 1 + props.items.length) % props.items.length
}

function nextImage() {
  lightboxIndex.value = (lightboxIndex.value + 1) % props.items.length
}

function handleKeydown(event) {
  if (!isLightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.gallery {

  &__grid {
    // --- Grid layout ---
    &--grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);

      @media (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    // --- Masonry layout ---
    // CSS columns creates a natural masonry effect — images flow into columns
    &--masonry {
      columns: 2;
      column-gap: var(--space-4);

      @media (min-width: 640px) {
        columns: 3;
      }

      @media (min-width: 1024px) {
        columns: 4;
      }

      .gallery__item {
        break-inside: avoid;
        margin-bottom: var(--space-4);
      }
    }
  }

  &__item {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-md);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    display: block;
    width: 100%;
    text-align: left;

    &:hover .gallery__image {
      transform: scale(1.04);
    }

    &:hover .gallery__caption {
      opacity: 1;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 400ms ease;
    border-radius: var(--radius-md);
  }

  &__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-3) var(--space-4);
    background: rgba(0, 0, 0, 0.6);
    color: var(--color-text-inverse);
    font-size: var(--font-size-sm);
    opacity: 0;
    transition: opacity 300ms ease;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }

  &__empty {
    text-align: center;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    padding: var(--space-16) 0;
  }

  // --- Lightbox ---
  &__lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
  }

  &__lightbox-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-6);
    background: none;
    border: none;
    color: var(--color-text-inverse);
    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 200ms ease;
    padding: var(--space-2);

    &:hover {
      opacity: 1;
    }
  }

  &__lightbox-prev,
  &__lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--color-text-inverse);
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-md);
    transition: background 200ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  &__lightbox-prev {
    left: var(--space-4);
  }

  &__lightbox-next {
    right: var(--space-4);
  }

  &__lightbox-content {
    max-width: 90vw;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  &__lightbox-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: var(--radius-md);
  }

  &__lightbox-caption {
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-size-sm);
    text-align: center;
  }
}
</style>
