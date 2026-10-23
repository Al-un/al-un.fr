<template>
  <div class="board">
    <board-header />
    <game-control />
    <game-board />
    <game-over v-if="gameStore.status.value === 'gameover'" />

    <div style="text-align: left" class="mobile--hide">
      <ul>
        <li>Use arrows to move tiles</li>
        <li>Press "c" to cancel last move</li>
        <li>Press "x" to come back to main menu</li>
      </ul>
    </div>

    <div style="display: none; height: 200px; overflow-y: scroll">
      <div
        v-for="move in gameStore.game.value.moves"
        :key="move.id"
        style="
          display: flex;
          flex-direction: row nowrap;
          height: 30px;
          border-bottom: 1px solid teal;
          align-items: center;
        "
      >
        <div style="width: 100px; text-align: center">{{ move.id }}</div>
        <div style="width: 250px; text-align: center">{{ printTime(move) }}</div>
        <div style="flex: 1">{{ move.direction }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameBoard from './GameBoard.vue'
import BoardHeader from './BoardHeader.vue'
import GameControl from './GameControl.vue'
import GameOver from './GameOver.vue'

import Movement from '../utils/play/movement'

// ----------------------------------------------------------------------------
import { use2048Data } from '../composables/use2048data'
const gameStore = use2048Data()

// ----------------------------------------------------------------------------

const printTime = function (move: Movement): string {
  const date = new Date(move.timestamp)
  return date.toLocaleTimeString('en-GB', { hour12: false }) + '.' + date.getMilliseconds()
}
</script>

<style lang="scss">
@use "../styles/variables" as *;
@use "../styles/mixins" as *;

.board {
  width: $game2048-board-sm-px;
  margin: auto;
  padding: 0px 1rem;

  @include gt-sm {
    width: $game2048-board-lg-px;
    padding: 0;
  }
}
</style>
