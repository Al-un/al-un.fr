import type { AlApp } from '@/types/apps'

import HomeView from './views/Home.vue'

export const calcApp: AlApp = {
  name: 'Calculator',
  routeRoot: 'calculator',
  routes: [{ path: '', component: HomeView }]
}
