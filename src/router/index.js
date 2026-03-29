import { createRouter, createWebHistory } from 'vue-router'
// Direct import is intentional here — the router runs outside Vue component setup,
// so the useClientConfig composable cannot be called. This is the only file
// where a direct import of client-config.js is acceptable.
import clientConfig from '../../client-config.js'

// All nav entries render through DynamicPage — no individual page files needed
const navRoutes = clientConfig.nav.map(item => ({
  path: item.path,
  component: () => import('../pages/DynamicPage.vue'),
}))

// Escape hatch for one-off pages not in nav (e.g. /privacy → PrivacyPage.vue)
// Note: dynamic template literal imports are not statically analyzed by Vite.
// The component value must match an actual .vue filename under src/pages/.
const customRoutes = (clientConfig.customRoutes ?? []).map(item => ({
  path: item.path,
  component: () => import(`../pages/${item.component}.vue`),
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...navRoutes,
    ...customRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
