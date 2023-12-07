<template>
  <div class="test-page">
    <ContentList path="/" v-slot="{ list }">
      <pre v-for="article in list" :key="article._path">{{
        extractInfo(article)
      }}</pre>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

function extractInfo(article: ParsedContent): Omit<ParsedContent, "body"> {
  const { body, ...copy } = article;
  return copy;
}
</script>

<style>
.test-page {
  width: 100%;
  max-width: 960px;
  margin: auto;
}

.test-page pre + pre {
  margin-top: 16px;
}
</style>
