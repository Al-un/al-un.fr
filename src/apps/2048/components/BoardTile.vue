<template>
  <div :class="tileClasses">
    <div class="board2048__tile--inner">{{ tile.val }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'

import Tile from '../utils/board/tile'

// ----------------------------------------------------------------------------

const { tile } = defineProps({
  tile: {
    type: Tile,
    default: () => new Tile(0, 0, -1)
  }
})

// /** Flag to follow if the getter has been called before */
// const firstLoad = ref(true)

/** Base CSS classes depending on tile type */
const cssBaseClass = ref([
  'board2048__tile',
  tile.merged ? 'board2048__tile--merged' : 'board2048__tile--new'
])

// ----------------------------------------------------------------------------

/** CSS classes for this tile */
const tileClasses = computed(() => {
  // CSS classes depending on tile value for colouring and font size
  const cssValueClass =
    tile.val < 1024
      ? [`board2048__tile--${Math.min(tile.val, 128)}`]
      : ['board2048__tile--1024', `board2048__tile--${tile.val < 8192 ? '128' : 'max'}`]

  // all tiles
  const classes: string[] = [...cssBaseClass.value, ...cssValueClass]

  classes.push(`board2048__tile--${tile.x}-${tile.y}`)
  return classes.join(' ')
})

// ----------------------------------------------------------------------------

onUpdated(() => {
  if (cssBaseClass.value.length > 1) {
    cssBaseClass.value = ['board2048__tile']
  }
})
</script>
