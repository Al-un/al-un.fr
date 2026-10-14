<template>
  <div class="page2048__row game-control">
    <button
      class="page2048__button"
      :disabled="!gameStore.isCancelable"
      @click="gameStore.cancelMove"
    >
      <font-awesome-icon :icon="faUndo" />
      <span class="mobile--hide">Cancel</span>
    </button>
    <button class="page2048__button" @click="gameStore.exitGame">
      <font-awesome-icon :icon="faSignOutAlt" />
      <span class="mobile--hide">Exit</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUndo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { use2048Store } from '../store'
const gameStore = use2048Store()
</script>

<style lang="scss" scoped>
.game-control {
  justify-content: flex-end;
  button {
    margin: 0px 1rem;
    padding: 8px;
    &:last-child {
      margin-right: 0px;
    }
  }

  .icon {
    margin-left: 4px;
    margin-right: 8px;
  }
}
</style>
