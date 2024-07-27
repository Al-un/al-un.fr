<template>
  <div class="page2048__row game-control">
    <button class="page2048__button" :disabled="!isCancelable" @click="cancelMove">
      <fa-icon icon="undo" class="icon"/>
      <span class="mobile--hide">Cancel</span>
    </button>
    <button class="page2048__button" @click="exitGame">
      <fa-icon icon="sign-out-alt" class="icon"/>
      <span class="mobile--hide">Exit</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import Game from '@/games/2048/game';

@Component({
  name: 'GameControl',

  computed: {
    ...mapGetters('2048', ['isCancelable'])
  },

  methods: {
    ...mapActions('2048', ['cancelMove', 'exitGame'])
  }
})
export default class GameControl extends Vue {}
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
