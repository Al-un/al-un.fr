<template>
  <div :class="boardClasses">
    <board-cell v-for="(coord, index) in coords" :key="'cell-' + index" :coord="coord" />
    <board-tile v-for="tile in tiles" :key="tile.id" :tile="tile" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BoardCell from './BoardCell.vue'
import BoardTile from './BoardTile.vue'

import type { Coord } from './BoardCell.vue'
import Tile from '../utils/board/tile'

import { use2048Store } from '../store'
const gameStore = use2048Store()

// ----------------------------------------------------------------------------

const boardClasses = computed(() => {
  return `board2048 board2048--${gameStore.game.size}`
})

const coords = computed<Coord[]>(() => {
  const coordinates: Coord[] = []
  for (let i = 0; i < gameStore.game.size; i++) {
    for (let j = 0; j < gameStore.game.size; j++) {
      coordinates.push({ x: i, y: j })
    }
  }
  return coordinates
})

const tiles = computed<Tile[]>(() => {
  return gameStore.game.tiles.filter((tile) => tile !== undefined)
})
</script>
