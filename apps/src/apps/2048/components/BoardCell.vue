<template>
  <div :class="cellClasses"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ----------------------------------------------------------------------------
type Props = { coord: Coord }

const { coord } = withDefaults(defineProps<Props>(), {
  coord: () => ({ x: 0, y: 0 })
})

// ----------------------------------------------------------------------------

const cellClasses = computed(() => {
  return `board2048__cell board2048__cell--${coord.x}-${coord.y}`
})
</script>

<script lang="ts">
export interface Coord {
  x: number
  y: number
}
</script>
