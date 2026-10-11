<script setup lang="ts">
import { ref } from "vue";

type Chapter = {
  slug: string;
  title: string;
};

const props = defineProps<{
  bookSlug: string;
  chapters: Chapter[];
  currentSlug: string;
}>();

const open = ref(false);
</script>

<template>
  <aside class="chapter-nav">
    <button class="chapter-toggle" type="button" @click="open = !open">
      {{ open ? "▾" : "▸" }} Chapters
    </button>
    <nav v-show="open" class="chapter-list">
      <ul>
        <li v-for="chapter in props.chapters" :key="chapter.slug">
          <a
            :href="`/writing/${props.bookSlug}/${chapter.slug}`"
            :class="['chapter-link', { active: chapter.slug === props.currentSlug }]"
          >
            {{ chapter.title }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
  .chapter-nav {
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-card-bg);
    overflow: hidden;
  }

  .chapter-toggle {
    width: 100%;
    background: transparent;
    border: 0;
    color: var(--color-text);
    padding: 0.75rem 1rem;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .chapter-list {
    border-top: 1px solid var(--color-border);
    padding: 0.75rem;
  }

  .chapter-list ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .chapter-link {
    display: block;
    color: var(--color-muted);
    padding: 0.35rem 0.5rem;
    border-radius: var(--border-radius);
  }

  .chapter-link.active {
    background: var(--color-card-bg);
    color: var(--color-text);
    font-weight: 600;
  }
</style>
