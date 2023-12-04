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
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </NuxtLink>
      </ContentList>
    </section>
  </div>
</template>

<style>
.articles-page {
  width: 100%;
  max-width: 1080px;
  margin: auto;
}

.articles-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
