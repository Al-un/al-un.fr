<template>
  <header class="app-header">
    <nav>
      <NuxtLink to="/">Home</NuxtLink>

      <template v-if="props.section !== undefined">
        <span>&gt;</span>
        <NuxtLink :to="`/${props.section}`">{{ props.section }}</NuxtLink>
      </template>
    </nav>

    <div class="flex-spacer"></div>

    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
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
  padding: 0 max(calc((100% - 960px) / 2 + 8px), 16px);
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--divider);
}

.app-header nav {
  text-transform: capitalize;
  font-size: 20px;
}

.app-header a{
  text-decoration: none;
}

.app-header nav * + * {
  margin-left: 8px;
}

.app-header select:hover{
  cursor: pointer;
}
</style>
