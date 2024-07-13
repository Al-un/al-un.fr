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
  border-bottom: 1px solid var(--divider);

  a {
    display: inline-block;
    padding: 16px;
  }

  a:hover {
    background-color: var(--bg-content);
  }
}
</style>
