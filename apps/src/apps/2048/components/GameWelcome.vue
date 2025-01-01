<template>
  <div class="game-select">
    <div class="page2048__row format-pictures">
      <img
        v-for="format in formats"
        v-show="format.size === gameStore.size"
        :key="format.size"
        :alt="format.text"
        :title="format.text"
        :src="format.img"
      />
    </div>

    <div class="page2048__row format-selector">
      <button @click="gameStore.decreaseSize">
        <font-awesome-icon :icon="faChevronLeft" />
      </button>
      <span
        v-for="f in formats"
        v-show="f.size === gameStore.size"
        :key="f.size"
        class="format"
      >
        {{ f.text }}
      </span>
      <button @click="gameStore.increaseSize">
        <font-awesome-icon :icon="faChevronRight" />
      </button>
    </div>

    <button class="newgame-btn" @click="gameStore.newGame">Start game</button>

    <div style="text-align: left" class="mobile--hide">
      <ul>
        <li>Use left/right arrow to select a board size</li>
        <li>Press "n" to start a new game</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { ref } from 'vue'

import { type BoardSize } from '../utils/board/index'

// ----------------------------------------------------------------------------

import { use2048Store } from '../store'
const gameStore = use2048Store()

// ----------------------------------------------------------------------------
type Format = { size: BoardSize; img: string; text: string }
const formats = ref<Format[]>([
  { size: 3, img: '/2048/img/img3x3.png', text: 'Tiny (3 x 3)' },
  { size: 4, img: '/2048/img/img4x4.png', text: 'Classic (4 x 4)' },
  { size: 5, img: '/2048/img/img5x5.png', text: 'Big (5 x 5)' },
  { size: 6, img: '/2048/img/img6x6.png', text: 'Bigger (6 x 6)' },
  { size: 8, img: '/2048/img/img8x8.png', text: 'Huge (8 x 8)' }
])
</script>

<style lang="scss" scoped>
@use "sass:color";
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.game-select {
  width: $game2048-board-sm-px;
  margin: auto;
  padding: 0px 1rem;
  margin: auto;
  text-align: center;

  @include gt-sm {
    width: $game2048-board-lg-px;
    padding: 0;
  }
}

.format-selector {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0px;

  .format {
    margin: 0px 1rem;
    color: color.adjust(#8f7b66, $lightness: -10%);
    font-size: 28px;
  }

  button {
    background: none;
    border: none;
    color: #8f7b66;
    font-size: 48px;
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: color.adjust(#8f7b66, $lightness: -10%);
    }
  }
}

.format-pictures {
  img {
    width: 100%;
    margin: auto;
  }
}

.newgame-btn {
  background-color: #f58460;
  color: $game2048-fg-default;
  border-radius: $game2048-board-border-radius;
  width: 100%;
  max-width: 300px;
  height: 60px;
  font-size: 30px;
  line-height: 60px;
  border: none;
  transition: background-color $game2048-transition-effect ease;

  &:hover {
    cursor: pointer;
    color: color.adjust(#f58460, $lightness: -10%)
  }
}
</style>
