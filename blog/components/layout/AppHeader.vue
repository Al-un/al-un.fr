<template>
  <header class="app-header">
    <nav>
      <NuxtLink to="/">Home</NuxtLink>

      <template v-if="props.section !== undefined">
        <span>&gt;</span>
        <NuxtLink :to="`/${props.section}`">{{ props.section }}</NuxtLink>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
interface Props {
  section?: "articles" | "kb";
}

const props = defineProps<Props>();
</script>

<style>
.app-header {
  background-color: var(--bg-content);
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 0 calc((100% - 960px)/2 + 8px);
}

.app-header nav {
  text-transform: capitalize;
  font-size: 20px;
}

.app-header nav * + * {
  margin-left: 4px;
}
</style>
