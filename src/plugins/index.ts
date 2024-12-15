import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import type { App } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'

const vuetify = createVuetify({ theme: { defaultTheme: 'light' } })

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(createPinia)
}
