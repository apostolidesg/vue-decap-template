# Project Standards

This document defines the coding standards for this project.
Every component, utility, and file must follow these rules.
When in doubt, refer here first.

---

## Table of Contents

1. [Vue Components](#1-vue-components)
2. [Naming Conventions](#2-naming-conventions)
3. [Script Setup Structure](#3-script-setup-structure)
4. [Styling Rules](#4-styling-rules)
5. [Content Rules](#5-content-rules)
6. [Config Rules](#6-config-rules)
7. [Comments](#7-comments)
8. [Git Commits](#8-git-commits)
9. [File & Folder Structure](#9-file--folder-structure)

---

## 1. Vue Components

### Always use Composition API with `<script setup>`

```vue
<!-- CORRECT -->
<script setup>
import { ref, computed, onMounted } from 'vue'
</script>

<!-- WRONG -->
<script>
export default {
  data() { return {} }
}
</script>
```

### Section order inside every `.vue` file

Always in this order — template, script, style:

```vue
<template>...</template>
<script setup>...</script>
<style lang="scss" scoped>...</style>
```

---

## 2. Naming Conventions

### Variables — always descriptive, never abbreviated

```js
// CORRECT
const isMenuOpen = ref(false)
const currentLanguage = ref('en')
const hasMultipleLanguages = computed(() => languages.length > 1)

// WRONG
const open = ref(false)
const lang = ref('en')
const multi = computed(() => languages.length > 1)
```

### Booleans — always start with `is`, `has`, `can`, `should`

```js
// CORRECT
const isLoading = ref(false)
const hasError = ref(false)
const canSubmit = computed(() => form.name && form.email)

// WRONG
const loading = ref(false)
const error = ref(false)
const submit = computed(() => form.name && form.email)
```

### Functions — always start with a verb

```js
// CORRECT
function openMenu() {}
function fetchServices() {}
function handleScroll() {}
function switchLanguage(languageCode) {}

// WRONG
function menu() {}
function services() {}
function scroll() {}
function language(code) {}
```

### Components — always PascalCase

```
AppHeader.vue
HeroSection.vue
ServiceCard.vue
```

### CSS classes — always BEM

```css
.hero {}
.hero__title {}
.hero__subtitle {}
.hero__cta-button {}
.hero--dark {}
```

---

## 3. Script Setup Structure

Always organise `<script setup>` in this order:

```js
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import clientConfig from '../../../client-config.js'

// 2. i18n
const { t, locale: currentLocale } = useI18n()

// 3. Config
const config = clientConfig

// 4. Props (if any)
const props = defineProps({ ... })

// 5. Reactive state (refs)
const isMenuOpen = ref(false)
const currentPage = ref(1)

// 6. Computed properties
const hasMultipleLanguages = computed(() => config.languages.length > 1)

// 7. Methods / Functions
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// 8. Lifecycle hooks
onMounted(() => {
  fetchData()
})
```

---

## 4. Styling Rules

### Never hardcode colors, fonts, or spacing

```scss
// CORRECT
color: var(--color-primary);
font-size: var(--font-size-lg);
padding: var(--space-8);

// WRONG
color: #2C5F5D;
font-size: 18px;
padding: 32px;
```

### Always use scoped styles in components

```vue
<style lang="scss" scoped>
```

### Always use SCSS nesting with BEM

```scss
.card {
  &__title { ... }
  &__body { ... }
  &--featured { ... }
}
```

### Breakpoints — always mobile-first

```scss
// CORRECT — base is mobile, scale up
.hero__title {
  font-size: var(--font-size-2xl);

  @media (min-width: 768px) {
    font-size: var(--font-size-4xl);
  }
}

// WRONG — base is desktop, scale down
.hero__title {
  font-size: var(--font-size-4xl);

  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
}
```

---

## 5. Content Rules

### Never hardcode text in components

```vue
<!-- CORRECT -->
<h1>{{ t('hero.title') }}</h1>

<!-- WRONG -->
<h1>Welcome to our website</h1>
```

### All content lives in `/content/{locale}/index.js`

```
content/
  en/index.js
  el/index.js
```

### Use `t()` for strings, `tm()` for arrays and objects

`t()` always returns a string — passing it a key that holds an array or object will return `"[object Object]"` or the key name instead of the actual data.

```js
// CORRECT
title: t('hero.title'),        // string → use t()
items: tm('services.items'),   // array  → use tm()
stats: tm('about.stats'),      // array of objects → use tm()

// WRONG — t() breaks on non-string values
items: t('services.items'),    // returns "[object Object]" or key name
stats: t('about.stats'),       // same problem
```

---

## 6. Config Rules

### Everything client-specific lives in `client-config.js`

- Site name, logo, description
- Theme selection
- Languages
- Nav links
- Sections and their order
- Contact info
- SEO defaults

### Components read from config — never hardcode client data

```js
// CORRECT
import clientConfig from '../../../client-config.js'
const config = clientConfig

// WRONG
const siteName = 'Dr. Smith Psychology'
```

---

## 7. Comments

### Always comment the *why*, not the *what*

```js
// CORRECT — explains why
// Language switcher only renders when more than one language is configured
const hasMultipleLanguages = computed(() => config.languages.length > 1)

// WRONG — explains what (the code already says this)
// Check if languages length is greater than 1
const hasMultipleLanguages = computed(() => config.languages.length > 1)
```

---

## 8. Git Commits

Always use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add HeroSection component
fix: mobile menu not closing on route change
chore: update dependencies
refactor: extract form validation into composable
docs: update STANDARDS.md with git rules
```

> Push after every stable, working step — never leave broken code on `main`.

---

## 9. File & Folder Structure

```
src/
  assets/
    fonts/        # Self-hosted fonts only
    images/       # Static images
    styles/       # Global SCSS (base.scss, variables)
  components/
    common/       # Shared layout components (AppHeader, AppFooter)
    sections/     # Page sections (HeroSection, AboutSection)
  layouts/        # Page layout wrappers
  pages/          # Route-level page components
  router/         # Vue Router config
  themes/         # Theme token files (default.js, medical.js)
  utils/          # Helper functions (theme.js, i18n.js)
  locales/        # i18n locale configs (if needed beyond content/)
content/
  en/             # English content
  el/             # Greek content
public/
  admin/          # Decap CMS files
client-config.js  # Single source of truth for client setup
STANDARDS.md      # This file
```
