<template>
  <div>
    <h2>Articles</h2>
    <NuxtLink to="/articles">All articles</NuxtLink>

    <main class="article-body"><slot></slot></main>
  </div>
</template>

<style>
.article-body {
  width: 100%;
  max-width: 640px;
  margin: auto;
}
</style>
