<template>
  <div>
    <h1>Welcome!</h1>

    <p>Welcome to Al-un's blog.</p>

    <h2><NuxtLink to="/articles">Articles</NuxtLink></h2>

    <p>
      Various articles that I wrote, mainly about software development but not
      exclusively.
    </p>

    <p>Latest articles:</p>

    <ul>
      <li
        v-for="article in latestArticles.data.value?.filter((a) => a !== null)"
        :key="article._path"
      >
        <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
      </li>
    </ul>

    <h2><NuxtLink to="/kb">Knowledge Base</NuxtLink></h2>

    <p>
      Various facts / points / topics that I learnt and want to easily find
      back.
    </p>

    <div>WORK-IN-PROGRESS</div>
  </div>
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
const latestArticles = await useAsyncData("home", () =>
  queryContent<ArticleContent>("articles")
    .where({ draft: { $eq: false } })
    .sort({ publicationDate: 1 })
    .limit(5)
    .find()
);
</script>
