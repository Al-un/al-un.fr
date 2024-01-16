<template>
  <div class="articles-page">
    <section>
      <h1>Articles</h1>
    </section>

    <ul class="articles-list">
      <ContentList :query="query" v-slot="{ list }">
        <li v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path">
            {{ article.title }}
          </NuxtLink>

          <span
            v-if="article.publicationDate"
            class="article__publication-date"
          >
            {{ formatDate(article.publicationDate) }}
          </span>
        </li>
      </ContentList>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const query: QueryBuilderParams = {
  path: "/articles",
  where: [{ draft: { $ne: true } }],
  sort: [{ publicationDate: -1 }],
};

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
.articles-page {
  width: 100%;
  max-width: var(--page-width);
  margin: auto;
}

.articles-page section {
  margin-top: 16px;
}

.articles-list {
  /* display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); */
}

/* .article__header {
  font-weight: bold;
}

.article__body {
  color: var(--sub-text-color);
} */

.article__publication-date {
  color: var(--sub-text-color);
  font-size: 85%;
  font-style: italic;
}
</style>
