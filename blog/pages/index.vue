<template>
  <div class="home-page">
    <h1>Articles</h1>

    <section>
      <ul>
        <li
          v-for="article in latestArticles.data.value?.filter(
            (a) => a !== null
          )"
          :key="article._path"
          class="latest-article"
        >
          <NuxtLink :to="article._path">
            {{ article.title }}
          </NuxtLink>
          <nobr
            v-if="article.publicationDate !== undefined"
            class="article-date"
          >
            {{ formatDate(article.publicationDate) }}
          </nobr>
        </li>
      </ul>
    </section>

    <!-- <h1>Knowledge Base</h1>

    <p>
      Various facts / points / topics that I learnt and want to easily find
      back.
    </p>

    <div>WORK-IN-PROGRESS</div> -->
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
const latestArticles = await useAsyncData("home", async () =>
  queryContent<ArticleContent>("articles")
    .where({ draft: { $ne: true } })
    .sort({ publicationDate: -1 })
    // .limit(5)
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
}
</script>

<style>
.home-page h1 {
  margin: 16px 0 24px 0;
}

.latest-article + .latest-article {
  margin-top: 8px;
}

.latest-article a {
  font-weight: 600;
}

.latest-article .article-date {
  color: var(--sub-text-color);
  margin-inline-start: 16px;
}
</style>
