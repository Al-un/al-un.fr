import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

import { calcApp } from './apps/calculators'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: `/${calcApp.routeRoot}`,
      children: calcApp.routes
    }
  ]
})

export default router
