# Vue Decap Template — Project Context

Read this file before touching any code.
Also read STANDARDS.md for coding conventions.

---

## What this is

A reusable Vue 3 + Vite + Decap CMS website template built for freelance
client work. The goal is to spin up professional client websites in 2-3 days
by configuring a single `client-config.js` file rather than rebuilding from
scratch each time.

Live demo: https://algiodev.netlify.app
GitHub: https://github.com/apostolidesg/vue-decap-template

---

## Business context

- Owner: George, freelance web developer based in Athens, Greece
- Also works with Globvy S.A. on digital marketing and development projects
- Target clients: small Greek businesses needing professional websites
- Pricing: €950 + VAT per Standard site (floor €650 + VAT = €500 net after 22% corporate tax)
- Goal: 2-3 day delivery per site, mass production model
- Monthly retainer planned: €25-35/month per site for hosting + support

---

## Tech stack

- Frontend: Vue 3 (Composition API, script setup), Vite, Vue Router
- CMS: Decap CMS (git-based, no backend)
- i18n: vue-i18n v11 with per-section JSON files
- Styling: SCSS with CSS variables (theme tokens)
- Icons: Lucide Vue Next (registry pattern in src/utils/icons.js)
- Hosting: Netlify free tier (auto-deploy from GitHub)
- Auth: Netlify Identity (invite-only for CMS access)
- Version control: GitHub

---

## Architecture decisions

### Config-driven everything
`client-config.js` at the project root controls:
- Site name, logo, description
- Theme selection (maps to src/themes/{theme}.js)
- Languages and default locale
- Sections array (which sections render and in what order)
- Nav links (with per-locale labels)
- Contact info
- SEO defaults
- Deploy platform

### Theme system
Each theme is a JS file in src/themes/ that exports CSS variable tokens.
Applied at runtime via src/utils/theme.js — no rebuild needed to switch themes.
Current themes: default (teal/professional), warm (terracotta/serif), bold (dark/gold)

### Content structure
Content lives in /content/*.json files at the project root.
Each file contains all locales: { "en": {...}, "el": {...} }
Decap CMS uses single_file i18n structure to read/write these files.
vue-i18n loads them via src/utils/i18n.js which merges all section files per locale.

Current content files:
- content/hero.json — title, subtitle, CTAs, imageSrc, imageAlt, videoSrc
- content/about.json
- content/services.json
- content/testimonials.json
- content/faq.json
- content/contact.json
- content/footer.json
- content/gallery.json — title, subtitle, items (src, alt, caption)
- content/pricing.json — title, subtitle, items (name, price, period, description, highlighted, cta, ctaLink, features[], category)
- content/location.json — title, subtitle, address, phone, email, mapEmbedUrl, hours[]
- content/cta-banner.json — title, subtitle, cta, ctaLink, imageSrc

**Important:** Email addresses in content JSON must escape `@` as `{'@'}` — vue-i18n treats bare `@` as a linked-message prefix and will throw a compile error.

### Composables
- useClientConfig — access to client-config.js (never import directly)
- usePageContent — all i18n content for page sections (uses t() for strings, tm() for arrays)
- useSectionProps — maps section names to their component props
- useSectionRegistry — maps section name strings to async Vue components
- useContactForm — form state, validation, Netlify Forms submission
- useScrollAnimation — IntersectionObserver fade-in for single elements (returns animationRef + CSS class fade-in)
- useStaggeredAnimation — IntersectionObserver staggered fade-in for lists (returns containerRef + CSS class fade-in-stagger)

### Page & section rendering
Every page is a nav entry in `client-config.js`. Each nav entry has a `sections`
array controlling which sections render and in what order. The router maps all
nav paths to a single `DynamicPage.vue` — no individual page files exist.

`DynamicPage.vue` finds the current nav entry by route path, resolves sections
via `useSectionRegistry` and `useSectionProps`, and renders a `PageBanner`
at the top of inner pages (shown by default, disabled with `banner: false`).

One-off pages outside the nav (e.g. privacy policy) are supported via
`customRoutes` in config — each entry points to a custom `.vue` file in `src/pages/`.

### Nav labels
Nav labels are locale-keyed objects in client-config.js:
{ label: { en: 'Home', el: 'Αρχική' }, path: '/' }
AppHeader renders navItem.label[currentLocale] with .en fallback.
Nav is NOT in the CMS — it's config, not content.

### Images
- CMS-uploaded images → public/uploads/ → referenced as /uploads/filename
- Static template images → src/assets/images/ → imported directly
- resolveImagePath() utility in src/utils/image.js handles path resolution

### Forms
Contact form submits to Netlify Forms (free, no backend).
Hidden static form in index.html for Netlify build-time detection.

---

## Current state

### Done ✅
- Full project scaffold and folder structure
- Config-driven router and theme system
- vue-i18n with EN/EL JSON content
- AppHeader (fixed, scrolled state, mobile hamburger, language switcher)
- AppFooter (brand, contact info, copyright)
- 10 section components: Hero, About, Services, Testimonials, FAQ, Contact, Gallery, Pricing, Location, CtaBanner
- Dynamic section rendering from config
- Responsive across all breakpoints (375px to 1440px)
- Decap CMS wired up and working end to end
- Netlify deployment with auto-deploy confirmed working
- Full CMS content edit loop verified (edit → GitHub commit → redeploy → live)
- Theme files: default, warm, bold
- Global section-header utility class with --left modifier
- Alternating section backgrounds (white/surface pattern)
- Lucide icon registry
- netlify.toml with SPA redirect rule
- STANDARDS.md with full coding conventions
- Config-driven multi-page routing — DynamicPage.vue, PageBanner.vue, sections in nav entries
- Scroll animation composables: useScrollAnimation (single), useStaggeredAnimation (lists)
- HeroSection layout variants: image-right, image-background, cinematic, video-background (MP4 autoplay with imageSrc fallback)
- GallerySection layout variants: grid, masonry (with lightbox modal)
- PricingSection layout variants: cards, menu
- CtaBannerSection layout variants: default (primary color bg), image (full-bleed with overlay)
- LocationSection: two-column info + Google Maps iframe embed (no API key), opening hours table

### In progress 🔄
- Bold theme stats card contrast issue (card blends into dark background)
- Warm theme not visually verified in browser yet

### Up next 📋
1. Fix bold theme stats card contrast
2. Verify warm theme visually in browser
3. Monthly maintenance retainer system planning
4. README for how to spin up a new client site from this template
5. Test with a mock client (clone, configure, deploy second site)

---

## Known issues

- Bold theme: --color-surface on AboutSection stats card not distinct enough
  from --color-background in dark themes. Fix: use border + slightly lighter
  surface color for the stats card.
- Every new theme must be visually verified against these components:
  language switcher, service card icons, contact detail icons,
  about stats card, testimonial avatars.
- vue-i18n `@` escape: any `@` in content JSON (emails, social handles) must be
  written as `{'@'}` — bare `@` triggers a linked-message compile error at runtime.

---

## Folder structure

vue-decap-template/
├── content/                  # CMS content (locale-keyed JSON per section)
├── public/
│   ├── admin/                # Decap CMS (index.html + config.yml)
│   └── uploads/              # CMS-uploaded media
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── styles/           # base.scss (global styles + utilities)
│   ├── components/
│   │   ├── common/           # AppHeader.vue, AppFooter.vue
│   │   └── sections/         # HeroSection, AboutSection, etc.
│   ├── composables/          # useClientConfig, usePageContent, etc.
│   ├── layouts/              # (planned — page layout wrappers)
│   ├── pages/                # DynamicPage.vue, NotFoundPage.vue
│   ├── router/               # Vue Router (config-driven)
│   ├── themes/               # default.js, warm.js, bold.js
│   └── utils/                # theme.js, i18n.js, image.js, icons.js
├── client-config.js          # Single source of truth for client setup
├── netlify.toml              # Netlify build config + SPA redirect
├── PROJECT.md                # This file — read before starting work
├── STANDARDS.md              # Coding conventions
└── vite.config.js

---

## How to start a new client site

1. Clone this repo into a new repo
2. Update client-config.js (name, theme, sections, nav, contact)
3. Update content/*.json files with client content
4. Run npm install && npm run dev to verify locally
5. Push to GitHub
6. Connect to Netlify (auto-detects netlify.toml)
7. Enable Netlify Identity + Git Gateway
8. Invite client as CMS user
9. Done

---

## Documentation policy

Three permanent markdown files — no more:

- `CLAUDE.md` — Claude Code auto-context. Read automatically every session.
- `PROJECT.md` — architecture, decisions, current state. Single source of truth.
- `STANDARDS.md` — coding conventions. Referenced during all code work.

Design specs (`docs/superpowers/specs/`) are **working documents only** — written
during brainstorming, used as input for the implementation plan, then deleted once
the feature is built and the key decisions are folded back into this file.
`docs/superpowers/` is gitignored — specs never accumulate in the repo.

---

## Opening message for new conversations

Paste this at the start of any new Claude conversation:

"I'm continuing work on my Vue Decap template project.
Please read PROJECT.md and STANDARDS.md from the repo before we start.
Repo: https://github.com/apostolidesg/vue-decap-template
We have Claude Code available in VS Code.
Here is what we need to work on today: [describe task]"
