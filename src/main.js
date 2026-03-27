import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { applyTheme } from './utils/theme.js'
import { setupI18n } from './utils/i18n.js'
import './assets/styles/base.scss'

async function init() {
  applyTheme()

  const i18n = await setupI18n()
  const app = createApp(App)

  app.use(router)
  app.use(i18n)
  app.mount('#app')
}

init()
