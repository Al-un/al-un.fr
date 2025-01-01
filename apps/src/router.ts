import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

import { calcApp } from './apps/calculators'
import { game2048App } from './apps/2048'

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
    },
    {
      path: `/${game2048App.routeRoot}`,
      children: game2048App.routes
    }
  ]
})

export default router
