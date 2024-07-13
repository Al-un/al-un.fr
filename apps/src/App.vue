<template>
  <header>
    <router-link to="/">Home</router-link>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  line-height: 1.5;
  background: lightgrey;
}
</style>
