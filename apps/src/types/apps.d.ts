import type { RouteRecordRaw } from 'vue-router'

export interface AlApp {
  name: string
  routeRoot: string
  routes: RouteRecordRaw[]
}
