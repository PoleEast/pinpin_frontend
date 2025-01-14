import type { App } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import vuetify from './vuetify'
import FontAwesomeIcon from './fontawesome'
import './axios'

export function registerPlugins(app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(vuetify).use(router).use(createPinia)
}
