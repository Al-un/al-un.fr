<template>
  <div class="board">
    <board-header/>
    <game-control/>
    <board/>
    <game-over v-if="status === 'gameover'"/>

    <div style="text-align: left;" class="mobile--hide">
      <ul>
        <li>Use arrows to move tiles</li>
        <li>Press "c" to cancel last move</li>
        <li>Press "x" to come back to main menu</li>
      </ul>
    </div>

    <div style="display: none; height: 200px; overflow-y: scroll;">
      <div
        v-for="move in game.moves"
        :key="move.id"
        style="display: flex; flex-direction: row nowrap; height: 30px;border-bottom: 1px solid teal; align-items: center;"
      >
        <div style="width: 100px; text-align: center;">{{ move.id }}</div>
        <div style="width: 250px; text-align: center;">{{ move.timestamp | time }}</div>
        <div style="flex: 1;">{{ move.direction }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Board from './Board.vue';
import BoardHeader from './BoardHeader.vue';
import GameControl from './GameControl.vue';
import GameOver from './GameOver.vue';

@Component({
  name: 'Game',

  components: {
    Board,
    BoardHeader,
    GameControl,
    GameOver
  },

  filters: {
    time(value: number) {
      const date = new Date(value);
      return (
        date.toLocaleTimeString('en-GB', { hour12: false }) +
        '.' +
        date.getMilliseconds()
      );
    }
  },

  computed: {
    ...mapState('2048', ['status', 'game'])
  }
})
export default class Game extends Vue {}
</script>


<style lang="scss">
.board {
  width: $game2048-board-sm-px;
  margin: auto;
  padding: 0px 1rem;

  @include gt-sm {
    width: $game2048-board-lg-px;
    padding: 0;
  }
}
</style>
