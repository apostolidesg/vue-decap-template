# Multi-Page Routing — Design Spec

**Date:** 2026-03-29
**Status:** Approved
**Topic:** Config-driven multi-page routing with unified DynamicPage architecture

---

## Overview

Replace the current per-page Vue file model with a single `DynamicPage.vue` component that renders any page from `client-config.js`. Every page — including the homepage — is defined as a nav entry with its own `sections` array. The router generates routes from nav config. One-off pages (privacy policy, campaign landing pages) are supported via an escape hatch in config.

---

## Decisions Made

| Question | Decision |
|---|---|
| Page model | Config-driven — every page defined in nav with sections array |
| Config structure | Sections inside nav entries (not a separate `pages` key) |
| Page component | Single `DynamicPage.vue` — no individual page files |
| One-off pages | Escape hatch via `customRoutes` in config — points to custom `.vue` files |
| Inner page banner | Shown by default on all non-home pages, opt-out with `banner: false` |
| Banner content | Auto-derives title from nav label; overridable with `{ title, subtitle }` object |
| Config documentation | Every non-obvious key has a comment showing valid options |

---

## Config Structure

The top-level `sections` key is removed. Sections move into nav entries.

```js
export default {
  // ...other config...

  // --- Navigation & Pages ---
  // Each nav entry defines a page. sections controls what renders on that page.
  // banner: true (auto-title) | false (no banner) | { title, subtitle } (custom)
  // customRoutes: [] | [{ path, component }] for one-off pages with their own .vue file
  nav: [
    {
      label: { en: 'Home', el: 'Αρχική' },
      path: '/',
      banner: false,
      sections: [
        // layout: 'default' | 'image-right' | 'cinematic'
        { id: 'hero', component: 'HeroSection', layout: 'image-right' },
        { id: 'about', component: 'AboutSection', layout: 'default' },
        { id: 'services', component: 'ServicesSection', layout: 'default' },
        { id: 'testimonials', component: 'TestimonialsSection', layout: 'default' },
        { id: 'faq', component: 'FAQSection', layout: 'default' },
        { id: 'contact', component: 'ContactSection', layout: 'default' },
      ],
    },
    {
      label: { en: 'About', el: 'Σχετικά' },
      path: '/about',
      banner: true,
      sections: [
        { id: 'about', component: 'AboutSection', layout: 'default' },
        { id: 'contact', component: 'ContactSection', layout: 'default' },
      ],
    },
    {
      label: { en: 'Services', el: 'Υπηρεσίες' },
      path: '/services',
      banner: true,
      sections: [
        { id: 'services', component: 'ServicesSection', layout: 'default' },
        { id: 'testimonials', component: 'TestimonialsSection', layout: 'default' },
      ],
    },
    {
      label: { en: 'Contact', el: 'Επικοινωνία' },
      path: '/contact',
      banner: true,
      sections: [
        { id: 'contact', component: 'ContactSection', layout: 'default' },
      ],
    },
  ],

  // --- One-off pages (not in nav) ---
  // customRoutes: [] (none) | [{ path: '/privacy', component: 'PrivacyPage' }]
  customRoutes: [],
}
```

---

## Architecture

### Router (`src/router/index.js`)

Generates routes from `config.nav` — all pointing to `DynamicPage.vue`. Custom routes point to individual `.vue` files.

```js
const navRoutes = clientConfig.nav.map(item => ({
  path: item.path,
  component: () => import('../pages/DynamicPage.vue'),
}))

const customRoutes = clientConfig.customRoutes.map(item => ({
  path: item.path,
  component: () => import(`../pages/${item.component}.vue`),
}))

const routes = [
  ...navRoutes,
  ...customRoutes,
  { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFoundPage.vue') },
]
```

### DynamicPage (`src/pages/DynamicPage.vue`)

Finds the current nav entry by route path, resolves its sections, renders them. Shows `PageBanner` on all non-home pages unless `banner: false`.

- Uses `useRoute()` to get current path
- Finds matching nav entry from `config.nav`
- Maps sections through `useSectionRegistry` and `useSectionProps`
- Passes `layout` prop through to each section component
- `shouldShowBanner` — false if `route.path === '/'` or `banner === false`
- `bannerConfig` — passes custom banner object if provided, otherwise derives title from nav label

### PageBanner (`src/components/common/PageBanner.vue`)

Slim section at the top of inner pages. Accepts a `config` prop with `title` and optional `subtitle` (both locale-keyed objects or plain strings). Resolves locale using `useI18n`. Styled with CSS variables only.

---

## File Changes

### Added
- `src/pages/DynamicPage.vue`
- `src/components/common/PageBanner.vue`

### Deleted
- `src/pages/HomePage.vue`
- `src/pages/AboutPage.vue`
- `src/pages/ServicesPage.vue`
- `src/pages/ContactPage.vue`

### Updated
- `client-config.js` — sections into nav, `banner` per entry, `customRoutes` added
- `src/router/index.js` — simplified to nav-driven + custom routes
- `PROJECT.md` — architecture section updated
- `CLAUDE.md` — current state updated

### Untouched
- All section components (`HeroSection`, `AboutSection`, etc.)
- `useSectionRegistry`, `useSectionProps`, `usePageContent`
- All `content/*.json` files
- Themes
- Decap CMS config

---

## Standards & Principles

- Config is the single source of truth — every page, every section, every banner
- `client-config.js` is self-documenting — valid options shown as comments on every non-obvious key
- No hardcoded colours, fonts, or text anywhere in new components
- BEM naming: `.page-banner`, `.page-banner__title`, `.page-banner__subtitle`
- Mobile-first responsive on `PageBanner`
- `DynamicPage.vue` stays thin — all resolution logic delegates to existing composables

---

## Out of Scope

- Layout variants per section (separate feature)
- CMS-editable page structure (sections defined in CMS rather than config)
- Blog / post routing
- Modal/popup pages
