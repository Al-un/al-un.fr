<template>
  <div class="articles-page">
    <section class="articles-list">
      <ContentList path="/articles" v-slot="{ list }">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          :to="article._path"
          class="al-card"
        >
          <header class="al-card__header">
            <h3>{{ article.title }}</h3>
          </header>
          <main class="al-card__body">
            <p>{{ article.description }}</p>
          </main>
          <footer class="al-card__footer">
            <span v-if="article.publicationDate">
              Published on {{ formatDate(article.publicationDate) }}
            </span>
          </footer>
        </NuxtLink>
      </ContentList>
    </section>
  </div>
</template>

<script setup lang="ts">
function formatDate(date: Date): string {
  return `${date} and ${typeof date}`;
  // return date.toLocaleDateString();
}
</script>

<style>
.articles-page {
  width: 100%;
  max-width: 960px;
  margin: auto;
}

.articles-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
