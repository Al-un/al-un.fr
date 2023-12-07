<template>
  <div class="articles-page">
    <section>
      <h1>Articles</h1>
      <p>
        Please find here the different articles I wrote. They obviously cover
        the Software Engineering topics but can also touch other subjects.
      </p>
    </section>
    <section class="articles-list">
      <ContentList :query="query" v-slot="{ list }">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          :to="article._path"
          class="al-card"
        >
          <header class="al-card__header">
            <h3 class="article__header">{{ article.title }}</h3>
          </header>

          <main class="al-card__body article__body">
            {{ article.description }}
          </main>

          <footer class="al-card__footer">
            <span
              v-if="article.publicationDate"
              class="article__publication-date"
            >
              Published on {{ formatDate(article.publicationDate) }}
            </span>
          </footer>
        </NuxtLink>
      </ContentList>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const query: QueryBuilderParams = {
  path: "/articles",
  sort: [{ publicationDate: -1 }],
};

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
  max-width: 960px;
  margin: auto;
}

.articles-page section {
  margin-top: 16px;
}

.articles-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.article__header {
  font-weight: bold;
}

.article__body {
  color: var(--sub-text-color);
}

.article__publication-date {
  color: var(--sub-text-color);
  font-size: 85%;
  font-style: italic;
}
</style>
