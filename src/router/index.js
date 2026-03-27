import { createRouter, createWebHistory } from 'vue-router'
import clientConfig from '../../client-config.js'

// Static routes that always exist
const staticRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]

// Dynamic routes generated from client-config.js nav
const dynamicRoutes = clientConfig.nav
  .filter(item => item.path !== '/')
  .map(item => ({
    path: item.path,
    name: item.label.toLowerCase().replace(/\s+/g, '-'),
    component: () => import(`../pages/${item.label.replace(/\s+/g, '')}Page.vue`),
  }))

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...dynamicRoutes],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
