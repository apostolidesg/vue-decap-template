import { createRouter, createWebHistory } from 'vue-router'
import clientConfig from '../../client-config.js'

// All nav entries render through DynamicPage — no individual page files needed
const navRoutes = clientConfig.nav.map(item => ({
  path: item.path,
  component: () => import('../pages/DynamicPage.vue'),
}))

// Escape hatch for one-off pages not in nav (e.g. /privacy → PrivacyPage.vue)
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
