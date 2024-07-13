<template>
  <div :class="cellClasses"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    coord: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
})
export default class BoardCell extends Vue {
  public coord: any;

  get cellClasses() {
    return `board2048__cell board2048__cell--${this.coord.x}-${this.coord.y}`;
  }
}
</script>
