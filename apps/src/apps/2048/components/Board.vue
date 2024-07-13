<template>
  <div :class="boardClasses">
    <board-cell v-for="(coord, index) in coords" :key="'cell-'+index" :coord="coord"/>
    <board-tile v-for="tile in tiles" :key="tile.id" :tile="tile"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import BoardCell from './BoardCell.vue';
import BoardTile from './BoardTile.vue';
import Tile from '@/games/2048/board/tile';
import { Game2048State } from '@/store/2048/types';
import Game from '@/games/2048/game';

@Component({
  components: {
    BoardTile,
    BoardCell
  },
  computed: {
    ...mapState('2048', ['game'])
  }
})
export default class Board extends Vue {
  public game!: Game;

  get boardClasses(): string {
    return `board2048 board2048--${this.game.size}`;
  }

  get coords(): any[] {
    const coordinates = [];
    for (let i = 0; i < this.game.size; i++) {
      for (let j = 0; j < this.game.size; j++) {
        coordinates.push({ x: i, y: j });
      }
    }
    return coordinates;
  }

  get tiles(): Tile[] {
    return this.game.tiles.filter(tile => tile !== undefined);
  }
}
</script>
