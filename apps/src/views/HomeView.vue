<template>
  <div>
    <p>This is the home page. Select one app below:</p>

    <router-link v-for="app in miniApps" :key="app.name" :to="`/${app.path}`">
      {{ app.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { calcApp } from '@/apps/calculators'

const miniApps = [{ name: calcApp.name, path: calcApp.routeRoot }]
</script>
