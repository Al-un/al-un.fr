<script setup lang="ts">
import { ref } from "vue";

interface Chapter {
  slug: string;
  title: string;
}

const props = defineProps<{
  bookSlug: string;
  chapters: Chapter[];
  currentSlug: string;
}>();

const open = ref(false);
</script>

<template>
  <nav class="chapter-nav">
    <button class="toggle" @click="open = !open">
      {{ open ? "▾" : "▸" }} Chapters
    </button>
    <ul v-show="open" class="chapter-list">
      <li v-for="ch in chapters" :key="ch.slug" class="chapter-item">
        <a
          :href="`/writing/${bookSlug}/${ch.slug}`"
          :class="{ active: ch.slug === currentSlug }"
        >
          {{ ch.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.chapter-nav {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.75rem;
  margin-bottom: 1.5rem;
}

.toggle {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0;
}

.chapter-list {
  list-style: none;
  margin-top: 0.5rem;
}

.chapter-item a {
  display: block;
  padding: 0.25rem 0.5rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  border-radius: var(--border-radius);
}

.chapter-item a.active {
  color: var(--color-text);
  font-weight: 600;
  background: var(--color-card-bg);
}
</style>
