<template>
  <ContentList path="/articles" v-slot="{ list }">
    <div v-for="article in list" :key="article._path">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <NuxtLink :to="article._path">Link: {{ article._path }}</NuxtLink>
    </div></ContentList
  >
</template>

<script setup>
definePageMeta({
  layout: "home",
});
</script>
