<template>
  <div>
    <h1>Welcome!</h1>

    <p>Welcome to Al-un's blog</p>

    <ul>
      <li><NuxtLink to="/articles">Articles</NuxtLink></li>
      <li><NuxtLink to="/kb">Knowledge Base</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

// interface ArticleContent extends ParsedContent {
//   publicationDate: Date | undefined;
// }

// definePageMeta({
//   layout: "home",
// });

// // Create a query looking into content/articles directory
// const contentQuery = await useAsyncData("home", () =>
//   queryContent<ArticleContent>("articles")
//     .where({ draft: { $eq: false } })
//     .sort({ publicationDate: 1 })
//     .limit(5)
//     .find()
// );
</script>
