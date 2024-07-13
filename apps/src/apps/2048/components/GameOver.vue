<template>
  <div class="game2048__gameover">
    <h4>GameOver</h4>
    <p>Final score: {{ game.score }} in {{ game.moves.length }} moves</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';

@Component({
  name: 'GameOver',

  computed: {
    ...mapState('2048', ['status', 'game'])
  }
})
export default class GameOver extends Vue {}
</script>

<style lang="scss">
.game2048__gameover {
  background: lightpink;
  border: 1px solid darkred;
  border-radius: $game2048-board-border-radius;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem 0px;
}
</style>
