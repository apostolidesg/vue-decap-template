<template>
  <header class="header" :class="{ 'header--scrolled': hasScrolled }">
    <div class="container header__inner">

      <!-- Logo: shows image if configured, falls back to site name -->
      <RouterLink to="/" class="header__logo">
        <img v-if="config.logo" :src="config.logo" :alt="config.siteName" />
        <span v-else>{{ config.siteName }}</span>
      </RouterLink>

      <!-- Desktop and mobile nav links -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMobileMenuOpen }">
        <RouterLink
          v-for="navItem in config.nav"
          :key="navItem.path"
          :to="navItem.path"
          class="header__nav-link"
          @click="closeMobileMenu"
        >
          {{ t(`nav.${navItem.label.toLowerCase()}`) }}
        </RouterLink>

        <!-- Language switcher: only shown when more than one language is configured -->
        <div v-if="hasMultipleLanguages" class="header__lang">
          <button
            v-for="languageCode in config.languages"
            :key="languageCode"
            class="header__lang-btn"
            :class="{ 'header__lang-btn--active': currentLocale === languageCode }"
            @click="switchLanguage(languageCode)"
          >
            {{ languageCode.toUpperCase() }}
          </button>
        </div>
      </nav>

      <!-- Hamburger button: visible on mobile only -->
      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--open': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useClientConfig } from '@/composables/useClientConfig'

// i18n
const { t, locale: currentLocale } = useI18n()

// Config
const { config } = useClientConfig()

// Reactive state
const isMobileMenuOpen = ref(false)
const hasScrolled = ref(false)

// Computed
const hasMultipleLanguages = computed(() => config.languages.length > 1)

// Methods
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function switchLanguage(languageCode) {
  currentLocale.value = languageCode
  closeMobileMenu()
}

function handleScroll() {
  hasScrolled.value = window.scrollY > 20
}

// Lifecycle
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);

  &--scrolled {
    border-bottom-color: var(--color-border);
    box-shadow: var(--shadow-sm);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  &__logo {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    text-decoration: none;

    img {
      height: 2.5rem;
      width: auto;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-8);

    @media (max-width: 768px) {
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-background);
      flex-direction: column;
      justify-content: center;
      gap: var(--space-8);
      transform: translateX(100%);
      transition: transform var(--transition-base);

      &--open {
        transform: translateX(0);
      }
    }
  }

  &__nav-link {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover,
    &.router-link-active {
      color: var(--color-primary);
    }

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }

  &__lang {
    display: flex;
    gap: var(--space-2);
    margin-left: var(--space-4);
    padding-left: var(--space-4);
    border-left: 1px solid var(--color-border);
  }

  &__lang-btn {
    background: none;
    border: none;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);

    &--active {
      color: var(--color-primary);
      background: var(--color-secondary);
    }

    &:hover:not(&--active) {
      color: var(--color-text-primary);
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: var(--space-2);
    cursor: pointer;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--color-text-primary);
      transition: all var(--transition-fast);
    }

    &--open {
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }
}
</style>
