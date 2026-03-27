import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { applyTheme } from './utils/theme.js'
import './assets/styles/base.scss'

applyTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
