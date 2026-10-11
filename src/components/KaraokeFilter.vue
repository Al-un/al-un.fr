<script setup lang="ts">
import { computed, ref } from "vue";

type Song = {
  title: string;
  author: string;
  reading?: string;
  tags?: string[];
};

const props = defineProps<{ songs: Song[] }>();
const query = ref("");

const filtered = computed(() => {
  const safeQuery = query.value.trim().toLowerCase();

  if (!safeQuery) {
    return props.songs;
  }

  return props.songs.filter((song) => {
    const haystacks = [
      song.title,
      song.author,
      song.reading ?? "",
      (song.tags ?? []).join(" "),
    ].join(" ").toLowerCase();

    return haystacks.includes(safeQuery);
  });
});
</script>

<template>
  <div class="karaoke-panel">
    <label class="search-wrap">
      <span class="sr-only">Search songs</span>
      <input v-model="query" class="search-input" type="search" placeholder="Search songs" />
    </label>

    <p class="results-meta">{{ filtered.length }} songs</p>

    <ul class="song-list">
      <li v-for="song in filtered" :key="`${song.title}-${song.author}`" class="song-item">
        <div class="song-heading">
          <span class="song-title">{{ song.title }}</span>
          <span class="song-author">{{ song.author }}</span>
        </div>
        <div v-if="song.tags && song.tags.length" class="song-tags">
          <span v-for="tag in song.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .karaoke-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-wrap {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--color-bg);
    padding-bottom: 0.25rem;
  }

  .search-input {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-card-bg);
    color: var(--color-text);
    padding: 0.75rem 1rem;
    font: inherit;
  }

  .results-meta {
    color: var(--color-muted);
    font-size: 0.9rem;
  }

  .song-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .song-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .song-heading {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .song-title {
    font-weight: 600;
    color: var(--color-heading);
  }

  .song-author {
    color: var(--color-muted);
    font-size: 0.9rem;
  }

  .song-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius);
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
    font-size: 0.75rem;
  }
</style>
