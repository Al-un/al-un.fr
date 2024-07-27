import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { BOARD_SIZES, GAME_STATUS, MOVE_TIME } from './constants'
import Game, { isGameOver } from './utils/game'
import { getTileIndex, printTiles, type BoardSize } from './utils/board'
import Tile from './utils/board/tile'
import { getDirection } from './utils/board/direction'
import Turn from './utils/play/turn'
import LastTurn from './utils/game/last-turn'
import Movement from './utils/play/movement'
import Seed, { generateSeed } from './utils/play/seed'

export const use2048Store = defineStore('2048', () => {
  // --------------------------------------------------------------------------
  const status = ref(GAME_STATUS.SELECT)
  const game = ref(new Game(3, []))
  const size = ref<BoardSize>(4)
  const isDebug = ref(false)

  // --------------------------------------------------------------------------
  const isCancelable = computed(() => game.value.lastTurn.valid)

  // --------------------------------------------------------------------------
  function decreaseSize() {
    const idx = BOARD_SIZES.findIndex((val) => val === size.value)
    const newSize = idx > 0 ? BOARD_SIZES[idx - 1] : BOARD_SIZES[BOARD_SIZES.length - 1]
    size.value = newSize

    if (isDebug.value) {
      console.log(`[2048] decreasing size to ${size.value}`)
    }
  }

  function increaseSize() {
    const idx = BOARD_SIZES.findIndex((val) => val === size.value)
    const newSize = idx < BOARD_SIZES.length - 1 ? BOARD_SIZES[idx + 1] : BOARD_SIZES[0]
    size.value = newSize

    if (isDebug.value) {
      console.log(`[2048] increasing size to ${size.value}`)
    }
  }

  function newGame() {
    if (status.value === GAME_STATUS.SELECT) {
      // Generate two pairs of random coordinates
      const randX1 = Math.floor(Math.random() * (size.value - 1))
      const randY1 = Math.floor(Math.random() * (size.value - 1))
      let randX2 = randX1
      let randY2 = randY1
      while (randX1 === randX2 && randY1 === randY2) {
        randX2 = Math.floor(Math.random() * (size.value - 1))
        randY2 = Math.floor(Math.random() * (size.value - 1))
      }

      // Generate two seeds
      const seed1 = new Tile(randX1, randY1, 0)
      const seed2 = new Tile(randX2, randY2, 1)

      // Off we go
      game.value = new Game(size.value, [seed1, seed2])
      status.value = GAME_STATUS.PLAYING

      // debug
      if (isDebug.value) {
        console.log('[2048] >> Game start!!')
        console.log('[2048] initialise with seeds:', game.value.seeds)
        console.log(printTiles(game.value.size, game.value.tiles))
      }
    }
  }

  function moveLeft() {
    switch (status.value) {
      case GAME_STATUS.SELECT:
        decreaseSize()
        break
      case GAME_STATUS.PLAYING:
        move('left')
        break
    }
  }

  function moveRight() {
    switch (status.value) {
      case GAME_STATUS.SELECT:
        increaseSize()
        break
      case GAME_STATUS.PLAYING:
        move('right')
        break
    }
  }

  function moveUp() {
    switch (status.value) {
      case GAME_STATUS.SELECT:
        // do nothing
        break
      case GAME_STATUS.PLAYING:
        move('up')
        break
    }
  }

  function moveDown() {
    switch (status.value) {
      case GAME_STATUS.SELECT:
        // do nothing
        break
      case GAME_STATUS.PLAYING:
        move('down')
        break
    }
  }

  function move(directionName: 'left' | 'up' | 'down' | 'right') {
    // invalid timing to initiate a move
    if (status.value !== GAME_STATUS.PLAYING) {
      return
    }

    if (isDebug.value) {
      console.log(`[2048] >> MOVING ${directionName}`)
    }

    status.value = GAME_STATUS.MOVING

    const direction = getDirection(directionName)
    const turn = new Turn(game.value, direction)

    // seed only if at least a tile has moved
    if (turn.movedCount > 0) {
      game.value.lastTurn = new LastTurn(game.value.tiles, game.value.score)

      // update board
      game.value.tiles = turn.tiles
      game.value.score += turn.scoreChange
      game.value.tileSeqId += turn.tileSeqChange

      // add move
      const movement = new Movement(turn.direction.name, game.value.moves.length + 1)
      game.value.moves.unshift(movement)

      status.value = GAME_STATUS.PLAYING

      setTimeout(() => {
        const seed = generateSeed(turn.emptyCells, game.value.tileSeqId)
        // https://stackoverflow.com/a/41855691/4906586
        game.value.tiles.splice(getTileIndex(game.value.size, seed), 1, seed)

        game.value.tileSeqId++
        game.value.moves[0].seed = new Seed(seed.x, seed.y, seed.val)

        if (isDebug.value) {
          console.log(`[2048] updateTiles: Score=${game.value.score}`)
          console.log('[2048] seed', game.value.moves[0].seed)
          console.log(printTiles(game.value.size, game.value.tiles))
        }

        if (isGameOver(game.value)) {
          if (isDebug.value) {
            console.log('[2048] >> Game over !!')
          }
          status.value = GAME_STATUS.GAMEOVER
        } else {
          status.value = GAME_STATUS.PLAYING
        }
      }, MOVE_TIME)
    } else {
      status.value = GAME_STATUS.PLAYING
    }
  }

  function cancelMove() {
    if (game.value.lastTurn.valid) {
      game.value.tiles = game.value.lastTurn.tiles
      game.value.score = game.value.lastTurn.score
      game.value.moves.shift()
      game.value.lastTurn.valid = false
    } else {
      console.error('Last move not valid. Cannot cancel move')
    }

    if (isDebug.value) {
      console.log('[2048] >> Cancelling move')
    }
  }

  function exitGame() {
    status.value = GAME_STATUS.SELECT
  }

  return {
    // state
    status,
    game,
    size,
    // computed
    isCancelable,
    // actions
    decreaseSize,
    increaseSize,
    newGame,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    cancelMove,
    exitGame
  }
})
