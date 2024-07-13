import type { AlApp } from '@/types'

import HomeView from './views/HomeView.vue'

export const calcApp: AlApp = {
  name: 'Calculator',
  routeRoot: 'calculator',
  routes: [{ path: '', component: HomeView }]
}
