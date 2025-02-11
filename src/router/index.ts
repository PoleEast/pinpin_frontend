import { createRouter, createWebHistory } from 'vue-router'

import homePage from '@/views/homePage.vue'
import schdulePage from '@/views/schdulePage.vue'
import searchPage from '@/views/searchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/schdule',
      name: 'schdule',
      component: schdulePage,
    },
    {
      path: '/search',
      name: 'search',
      component: searchPage,
    },
  ],
})

export default router
