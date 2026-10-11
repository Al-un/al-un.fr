<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";

const { current, themes, apply } = useTheme();

const formatTheme = (theme: string) => theme.charAt(0).toUpperCase() + theme.slice(1);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  apply(target.value as "system" | "light" | "dark" | "terminal");
};
</script>

<template>
  <label class="theme-switcher">
    <span class="sr-only">Theme</span>
    <select :value="current" @change="onChange">
      <option v-for="theme in themes" :key="theme" :value="theme">
        {{ formatTheme(theme) }}
      </option>
    </select>
  </label>
</template>

<style scoped>
  .theme-switcher {
    margin-left: auto;
  }

  select {
    appearance: none;
    background: var(--color-card-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
    cursor: pointer;
  }
</style>
