<template>
  <div class="home-page">
    <h1>Welcome!</h1>

    <p>Welcome to Al-un's blog.</p>

    <h2>
      <NuxtLink to="/articles">Articles</NuxtLink>
    </h2>

    <p>
      Various articles that I wrote, mainly about software development but not
      exclusively. Some latest articles:
    </p>

    <section>
      <NuxtLink v-for="article in latestArticles.data.value?.filter((a) => a !== null)" :key="article._path"
        :to="article._path" class="al-card latest-article">
        <header class="al-card__header">{{ article.title }}</header>
        <main class="al-card__body">{{ article.description }}</main>
        <footer v-if="article.publicationDate !== undefined" class="al-card__footer">
          {{ formatDate(article.publicationDate) }}
        </footer>
      </NuxtLink>
    </section>


    <NuxtLink to="/articles">See more articles in the Articles list page.</NuxtLink>

    <h2>
      <NuxtLink to="/kb">Knowledge Base</NuxtLink>
    </h2>

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
  publicationDate: string | undefined;
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


/** @todo: to make composable */
function formatDate(date: string): string {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return dateObj.toLocaleDateString("en-Gb", options);
  // return date.toLocaleDateString();
}
</script>

<style>
.home-page h2{
  margin: 24px auto;
}

.latest-article+.latest-article {
  margin-top: 16px;
}

.latest-article .al-card__header {
  font-weight: bold;
}

.latest-article .al-card__footer {
  color: var(--sub-text-color);
  text-align: right;
}
</style>