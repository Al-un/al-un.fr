<template>
  <div class="page2048__row board__header">
    <div class="board__header__title">2048</div>
    <div class="page2048__box board__header__score">
      <p>SCORE</p>
      <p>{{ gameStore.game.value.score }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use2048Data } from '../composables/use2048data'
const gameStore = use2048Data()
</script>

<style lang="scss">
.board__header {
  align-items: center;
  justify-content: space-between;

  .board__header__title {
    font-size: 60px;
  }

  .board__header__score {
    p {
      margin: 4px 0px;
      &:first-child {
        font-size: 18px;
      }
      &:last-child {
        font-size: 24px;
      }
    }
  }
}
</style>
