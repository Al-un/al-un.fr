import { GAME_STATUS } from '../constants'
import { GetterTree, Module, MutationTree, ActionContext, ActionTree } from 'vuex'
import Game from '../utils/game'
import Tile from '../utils/board/tile'
import Turn from '../utils/play/turn'

/**
 * 2048 module
 */
export interface Game2048Module extends Module<Game2048State, RootState> {
  namespaced: true
  state: Game2048State
  getters: Game2048Getter
  mutations: Game2048Mutations
  actions: Game2048Actions
}

/**
 * 2048 State
 */
export interface Game2048State {
  /**
   * Currently active game
   */
  game: Game
  /**
   * Current game status
   */
  status: GAME_STATUS
  /**
   * Board size selection
   */
  size: 3 | 4 | 5 | 6 | 8
}

/**
 * 2048 Getter
 */
export interface Game2048Getter extends GetterTree<Game2048State, RootState> {
  isCancelable: (state: Game2048State) => boolean
}

/**
 * 2048 mutations
 */
export interface Game2048Mutations extends MutationTree<Game2048State> {
  /**
   * Initialise game
   */
  initialiseGame: (state: Game2048State, seeds: Tile[]) => any

  /**
   * Updates tiles of the current game
   */
  updateTiles: (state: Game2048State, turn: Turn) => any

  /**
   * Seed current game
   */
  seed: (state: Game2048State, turn: Turn) => any

  /**
   * Cancel last move
   */
  cancelMove: (state: Game2048State) => any

  /**
   * Update size
   */
  updateBoardSize: (state: Game2048State, size: 3 | 4 | 5 | 6 | 8) => any

  /**
   * Update status
   */
  changeGameStatus: (state: Game2048State, gameStatus: GAME_STATUS) => any
}

/**
 * 2048 action context linking `Game2048State` and `RootState`
 */
export interface Game2048ActionContext extends ActionContext<Game2048State, RootState> {}

/**
 * 2048 actions
 */
export interface Game2048Actions extends ActionTree<Game2048State, RootState> {
  /**
   * Decrease size
   */
  decreaseSize: (ctx: Game2048ActionContext) => any

  /**
   * Increase size
   */
  increaseSize: (ctx: Game2048ActionContext) => any

  /**
   * Create a new game at current size
   */
  newGame: (ctx: Game2048ActionContext) => any

  /**
   * ArrowLeft or swipe left
   */
  moveLeft: (ctx: Game2048ActionContext) => any

  /**
   * ArrowRight or swipe right
   */
  moveRight: (ctx: Game2048ActionContext) => any

  /**
   * ArrowUp or swipe up
   */
  moveUp: (ctx: Game2048ActionContext) => any

  /**
   * ArrowDown or swipe down
   */
  moveDown: (ctx: Game2048ActionContext) => any

  /**
   * proceed to move
   */
  move: (ctx: Game2048ActionContext, directionName: 'left' | 'up' | 'down' | 'right') => any

  /**
   * Cancel last turn if possible
   */
  cancelMove: (ctx: Game2048ActionContext) => any

  /**
   * Exit current game
   */
  exitGame: (ctx: Game2048ActionContext) => any
}
