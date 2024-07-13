import Cell from '../board/cell';
import Tile from '../board/tile';

/**
 * Seed issued after a successful movement
 */
export default class Seed extends Cell {
  /**
   *
   * @param x seed x coordinate
   * @param y seed y coordinate
   * @param val seed value
   */
  constructor(public x: number, public y: number, public val: number) {
    super(x, y);
  }
}

/**
 *
 * @param emptyCoords list of empty {x, y} coordinates
 * @param seeded tile ID
 * @return seeded tile
 */
export const generateSeed = (emptyCoords: Cell[], id: number): Tile => {
  const randIdx = Math.floor(Math.random() * (emptyCoords.length - 1));
  const coordinates = emptyCoords[randIdx];

  const seed = new Tile(coordinates.x, coordinates.y, id);
  // console.log(`Seed ${seed.val} at (${seed.x}, ${seed.y}) from`, emptyCoords);

  return seed;
};
