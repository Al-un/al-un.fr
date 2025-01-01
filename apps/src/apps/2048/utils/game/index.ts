import Tile from '../board/tile';
import LastTurn from './last-turn';
import Movement from '../play/movement';
import Board, { getTileIndex } from '../board';

/**
 * Represent a game at a given state: tiles, scores & last turn. As Vuex should
 * store pure Object (no method), Game methods are in `utils/` folder
 */
export default class Game extends Board {
  /**
   * Current score
   */
  public score: number = 0;
  /**
   * Tile ID sequence
   */
  public tileSeqId: number = 0;
  /**
   * All the game movement
   */
  public moves: Movement[] = [];
  /**
   * Last turn if available
   */
  public lastTurn: LastTurn;

  /**
   *
   * @param size board size
   * @param seeds seeds of this game
   */
  constructor(public size: number, public seeds: Tile[]) {
    super(size);

    // Report seeds
    seeds.forEach((seed: Tile) => {
      this.tiles[getTileIndex(size, seed)] = seed;
    });

    // update sequence
    this.tileSeqId = seeds.length + 1;

    // initialise lastTurn to make it reactive
    this.lastTurn = new LastTurn([], 0, false);
  }
}

/**
 * Check if current tiles represent a Game Over. To be Game Over, no moves can
 * be possible which requires two conditions:
 * - Board is full
 * - Each tile has no tile of same value among its direct neighbours
 *
 * Check Game.tiles for tiles index
 *
 * @param game tested game
 * @returns true if game is over
 */
export const isGameOver = (game: Game): boolean => {
  const size = game.size;
  const tiles = game.tiles;

  for (let i = 0; i < size * size; i++) {
    // no tile
    if (tiles[i] === undefined) {
      return false;
    }

    // current cell value
    const thisVal = tiles[i].val;

    // left neighbour
    const left = i % size > 0 ? tiles[i - 1].val === thisVal : false;
    // right neighbour
    const right =
      i % size < size - 1
        ? tiles[i + 1] !== undefined && tiles[i + 1].val === thisVal
        : false;
    // top neighbour
    const top = i >= size ? tiles[i - size].val === thisVal : false;
    // bottom neighbour
    const bottom =
      i < length - size
        ? tiles[i + size] !== undefined && tiles[i + size].val === thisVal
        : false;

    // console.log(
    //   `Neighbours at {${i}: ${thisVal}}: ${left}, ${right}, ${top}, ${bottom}`
    // );
    if (top || left || right || bottom) {
      return false;
    }
  }

  return true;
};
