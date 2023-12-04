<template>
  <ContentList path="/articles" v-slot="{ list }">
    <NuxtLink v-for="article in list" :key="article._path" :to="article._path">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </NuxtLink>
  </ContentList>
</template>
