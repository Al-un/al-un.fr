<template>
  <div class="board">
    <board-header />
    <game-control />
    <board />
    <game-over v-if="gameStore.status === 'gameover'" />

    <div style="text-align: left" class="mobile--hide">
      <ul>
        <li>Use arrows to move tiles</li>
        <li>Press "c" to cancel last move</li>
        <li>Press "x" to come back to main menu</li>
      </ul>
    </div>

    <div style="display: none; height: 200px; overflow-y: scroll">
      <div
        v-for="move in gameStore.game.moves"
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
import Board from './Board.vue'
import BoardHeader from './BoardHeader.vue'
import GameControl from './GameControl.vue'
import GameOver from './GameOver.vue'

import { use2048Store } from '../store'
import Movement from '../utils/play/movement'

const gameStore = use2048Store()

const printTime = function (move: Movement): string {
  const date = new Date(move.timestamp)
  return date.toLocaleTimeString('en-GB', { hour12: false }) + '.' + date.getMilliseconds()
}
</script>

<style lang="scss">
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
