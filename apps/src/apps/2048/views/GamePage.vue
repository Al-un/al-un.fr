<template>
  <div id="page2048" ref="root" class="game-container">
    <game-welcome v-if="gameStore.status === 'select'" />
    <game-screen v-else />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Hammer from 'hammerjs'

import GameScreen from '../components/GameScreen.vue'
import GameWelcome from '../components/GameWelcome.vue'

// var hammer = require('hammerjs')
// declare var hammer: any

import { use2048Store } from '../store'
const gameStore = use2048Store()
/**
 * Swipe:
 * https://css-tricks.com/simple-swipe-with-vanilla-javascript/
 * https://codepen.io/thebabydino/pen/yvrmMN/?editors=0010
 */
// ----------------------------------------------------------------------------

function onkeydown(e: any): void {
  const key = e.key

  if (key === 'ArrowLeft') {
    gameStore.moveLeft()
  } else if (key === 'ArrowRight') {
    gameStore.moveRight()
  } else if (key === 'ArrowUp') {
    gameStore.moveUp()
  } else if (key === 'ArrowDown') {
    gameStore.moveDown()
  } else if (key === 'x') {
    gameStore.exitGame()
  } else if (key === 'n') {
    gameStore.newGame()
  } else if (key === 'c') {
    gameStore.cancelMove()
  }
}

// ----------------------------------------------------------------------------
const root = ref(null)

// ----------------------------------------------------------------------------

onMounted(() => {
  window.addEventListener('keydown', onkeydown)

  // const Hammer =
  //   typeof require === 'function' ? require('hammerjs') : window.Hammer;
  // const Hammer = hammer
  // const page = document.querySelector('#page2048')
  
  // const hammerManager = new Hammer.Manager(root)
  // const swipe = new Hammer.Swipe()
  // hammerManager.add(swipe)

  // hammerManager.on('swipeleft', (e: any) => gameStore.moveLeft())
  // hammerManager.on('swiperight', (e: any) => gameStore.moveRight())
  // hammerManager.on('swipeup', (e: any) => gameStore.moveUp())
  // hammerManager.on('swipedown', (e: any) => gameStore.moveDown())
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onkeydown)
})
</script>

<style lang="scss">
@use '../styles/main.scss' as *;

#page2048 {
  --text-color: rgb(86 92 100);
}
</style>
