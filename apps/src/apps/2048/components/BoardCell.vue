<template>
  <div :class="cellClasses"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// ----------------------------------------------------------------------------
type Coord = {x: number, y: number}
const coord = ref<Coord>({x:0, y:0})

// ----------------------------------------------------------------------------

const cellClasses = computed(() => {
  return `board2048__cell board2048__cell--${coord.value.x}-${coord.value.y}`
})
</script>
