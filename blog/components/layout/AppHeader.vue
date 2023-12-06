<template>
  <header>
    <NuxtLink to="/">Home</NuxtLink>

    <template v-if="props.section !== undefined">
      <span>&gt;</span>
      <NuxtLink :to="`/${props.section}`">{{ props.section }}</NuxtLink>
    </template>
  </header>
</template>

<script setup lang="ts">
interface Props {
  section?: "articles" | "kb";
}

const props = defineProps<Props>();
</script>

<style></style>
