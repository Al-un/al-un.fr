<template>
  <div class="home-view">
    <p>This is the home page. Select one app below:</p>

    <ul class="apps-list">
      <li v-for="app in miniApps" :key="app.name">
        <router-link :to="`/${app.path}`">
          {{ app.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { calcApp } from '@/apps/calculators'

const miniApps = [{ name: calcApp.name, path: calcApp.routeRoot }]
</script>

<style scoped>
.home-view {
  padding: 16px;
}
</style>
