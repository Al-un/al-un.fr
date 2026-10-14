<script setup lang="ts">
import { ref, computed } from "vue";

interface Song {
  title: string;
  author: string;
  reading?: string;
  tags: string[];
}

const props = defineProps<{ songs: Song[] }>();

const query = ref("");

const filtered = computed(() => {
  const q = query.value.toLowerCase();
  if (!q) return props.songs;
  return props.songs.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      (s.reading && s.reading.includes(q)) ||
      s.tags.some((t) => t.toLowerCase().includes(q)),
  );
});
</script>

<template>
  <div class="karaoke-filter">
    <input
      v-model="query"
      type="text"
      class="search-input"
      placeholder="Search songs..."
    />
    <p class="result-count">{{ filtered.length }} song(s)</p>
    <ul class="song-list">
      <li v-for="song in filtered" :key="song.title" class="song-item">
        <span class="song-title">{{ song.title }}</span>
        <span class="song-author">{{ song.author }}</span>
        <span v-if="song.tags.length" class="song-tags">
          <span v-for="tag in song.tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-input {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-bg);
  color: var(--color-text);
  z-index: 10;
}

.result-count {
  color: var(--color-muted);
  font-size: 0.85rem;
  margin: 0.5rem 0;
}

.song-list {
  list-style: none;
}

.song-item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.song-title {
  font-weight: 600;
}

.song-author {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.song-tags {
  display: flex;
  gap: 0.25rem;
}

.tag {
  font-size: 0.75rem;
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  padding: 0.1rem 0.4rem;
  border-radius: var(--border-radius);
}
</style>
