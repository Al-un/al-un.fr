import type { AlApp } from '@/types'

import HomeView from './views/HomeView.vue'

export const game2048App: AlApp = {
  name: '2048',
  routeRoot: '2048',
  routes: [{ path: '', component: HomeView }]
}
