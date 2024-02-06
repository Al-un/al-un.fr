<template>
  <div class="test-page">
    <ContentList path="/" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <pre>{{ extractInfo(article) }}</pre>

        <details>
          <summary>Body details</summary>
          <pre>{{ article.body }}</pre>
        </details>
      </div>
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
  max-width: var(--page-width);
  margin: auto;
}

.test-page pre + pre {
  margin-top: 16px;
}

.test-page details {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

.test-page summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

.test-page details[open] {
  padding: 0.5em;
}
</style>
