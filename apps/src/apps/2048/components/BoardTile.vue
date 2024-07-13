<template>
  <div :class="tileClasses">
    <div class="board2048__tile--inner">{{ tile.val }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tile from '@/games/2048/board/tile';

@Component({
  name: 'BoardTile',

  props: {
    tile: {
      type: Object,
      default: () => new Tile(0, 0, -1)
    }
  }
})
export default class BoardTile extends Vue {
  /**
   * Tile represented in the inner tile
   */
  private tile!: Tile;

  /**
   * Flag to follow if the getter has been called before
   */
  private firstLoad: boolean = true;

  /**
   * Base CSS classes depending on tile type
   */
  private cssBaseClass = [
    'board2048__tile',
    this.tile.merged ? 'board2048__tile--merged' : 'board2048__tile--new'
  ];

  /**
   * CSS classes depending on tile value for colouring and font size
   */
  private cssValueClass =
    this.tile.val < 1024
      ? [`board2048__tile--${Math.min(this.tile.val, 128)}`]
      : [
          'board2048__tile--1024',
          `board2048__tile--${this.tile.val < 8192 ? '128' : 'max'}`
        ];

  /**
   * @returns CSS classes for this tile
   */
  get tileClasses(): string {
    // all tiles
    const classes: string[] = [...this.cssBaseClass, ...this.cssValueClass];

    classes.push(`board2048__tile--${this.tile.x}-${this.tile.y}`);
    return classes.join(' ');
  }

  // public mounted() {
  //   console.log('mouted ' + this.tile.id);
  // }
  public updated(): void {
    if (this.cssBaseClass.length > 1) {
      this.cssBaseClass = ['board2048__tile'];
    }
  }
  // public beforeUpdate() {
  //   console.log('beforeUpdate ' + this.tile.id);
  // }
}
</script>
