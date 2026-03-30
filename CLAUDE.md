# Claude Code Context

Read this before touching any code. Also read STANDARDS.md and PROJECT.md.

## What this project is
A reusable Vue 3 + Vite + Decap CMS website template for freelance client
work. One codebase, configured per client via client-config.js.

## Stack
Vue 3 (Composition API + script setup), Vite, Vue Router, vue-i18n v11,
Decap CMS, SCSS + CSS variables, Lucide Vue Next, Netlify

## Non-negotiable rules
- Always use Composition API with script setup — never Options API
- Never hardcode colors, fonts, or spacing — always use CSS variables
- Never hardcode text in templates — always use t() or tm() from usePageContent
- Never import client-config.js directly — always use useClientConfig composable
- Use t() for strings, tm() for arrays and objects from i18n
- All variable names must be descriptive — no single letters, no abbreviations
- Boolean variables start with is, has, can, should
- Functions start with a verb
- CSS classes follow BEM — .block__element--modifier
- Always mobile-first responsive — base styles for mobile, scale up with min-width
- Commit after every stable working step with conventional commit format

## Key files
- client-config.js — single source of truth for client setup
- src/composables/useClientConfig.js — access config here, never import directly
- src/composables/usePageContent.js — all i18n content for sections
- src/composables/useSectionRegistry.js — maps section names to components
- src/composables/useSectionProps.js — maps section names to props
- src/utils/icons.js — Lucide icon registry, add new icons here
- src/utils/image.js — resolveImagePath() for all image references
- src/assets/styles/base.scss — global styles and utilities only
- content/*.json — CMS content files, locale-keyed {en: {}, el: {}}
- public/admin/config.yml — Decap CMS configuration

## Current state
See PROJECT.md for full details. Short version:
- All 10 sections built and working: Hero, About, Services, Testimonials, FAQ, Contact, Gallery, Pricing, Location, CtaBanner
- 3 themes: default, warm, bold
- Decap CMS working end to end
- Netlify deployment working
- Multi-page routing complete — all pages config-driven via DynamicPage.vue
- Layout variants working: HeroSection (image-right, image-background, cinematic, video-background), GallerySection (grid, masonry), PricingSection (cards, menu), CtaBannerSection (default, image)
- Scroll animations: useScrollAnimation (single), useStaggeredAnimation (lists)
- Bold theme has a known stats card contrast issue (fix pending)
- Email addresses in content/*.json must use `{'@'}` instead of `@` (vue-i18n linked-message escape)

## What NOT to do
- Do not install new dependencies without confirming first
- Do not modify content/*.json files directly — these are CMS-managed
- Do not commit broken code to main
- Do not use Options API
- Do not use localStorage or sessionStorage
- Do not hardcode any client-specific data anywhere except client-config.js
