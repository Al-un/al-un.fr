<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";

const { current, themes, apply } = useTheme();
</script>

<template>
  <select
    class="theme-switcher"
    :value="current"
    @change="apply(($event.target as HTMLSelectElement).value as any)"
  >
    <option v-for="t in themes" :key="t" :value="t">
      {{ t.charAt(0).toUpperCase() + t.slice(1) }}
    </option>
  </select>
</template>

<style scoped>
.theme-switcher {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
}
</style>
