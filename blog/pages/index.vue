<template>
  <!-- <ContentList path="/articles" v-slot="{ list }">
    <div v-for="article in list" :key="article._path">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <NuxtLink :to="article._path">Link: {{ article._path }}</NuxtLink>
    </div></ContentList
  > -->

  <section>
    <NuxtLink
      v-for="article in contentQuery.data.value"
      :key="article._id"
      style="margin-bottom: 16px; border: 1px solid red; display: block"
      :to="article._path"
    >
      <div>Title: {{ article.title }}</div>
      <div>Description: {{ article.description }}</div>
      <div>
        Date: {{ article.publicationDate }} /
        {{ article.publicationDate === undefined }}
      </div>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

interface ArticleContent extends ParsedContent {
  publicationDate: Date | undefined;
}

definePageMeta({
  layout: "home",
});

// Create a query looking into content/articles directory
const contentQuery = await useAsyncData("home", () =>
  queryContent<ArticleContent>("articles")
    .where({ draft: { $eq: false } })
    .sort({ publicationDate: 1 })
    .limit(5)
    .find()
);
</script>
