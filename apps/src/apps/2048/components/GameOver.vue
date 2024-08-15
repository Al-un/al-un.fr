<template>
  <div class="game2048__gameover">
    <h4>GameOver</h4>
    <p>Final score: {{ gameStore.game.score }} in {{ gameStore.game.moves.length }} moves</p>
  </div>
</template>

<script setup lang="ts">
import { use2048Store } from '../store'
const gameStore = use2048Store()
</script>

<style lang="scss">
.game2048__gameover {
  background: lightpink;
  border: 1px solid darkred;
  border-radius: $game2048-board-border-radius;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem 0px;
}
</style>
