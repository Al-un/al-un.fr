import Cell from './cell';

/**
 * A tile is a cell with a value.
 */
export default class Tile extends Cell {
  /**
   * If true, tile has merged another tile during the last turn
   */
  public merged: boolean;
  /**
   * Tile current value
   */
  public val: number;

  /**
   * Initialise a Tile. Value is 4 (12% chance) or 2.
   * @param x X coordinate (column from left to right)
   * @param y Y coordinate (row from top to bottom)
   * @param id Tile ID starting from 0
   */
  constructor(
    public x: number,
    public y: number,
    public id: number,
    val?: number
  ) {
    super(x, y);
    this.merged = false;

    // 12% of spawning 4 if value is not provided
    this.val = val !== undefined ? val : Math.random() < 0.88 ? 2 : 4;
  }
}

/**
 * Convenience method to display tile coordinate. Method is not attached to
 * Tile class because it is better to store plain object in Vuex (like in Redux)
 *
 * @param {Tile} tile input tile
 * @returns tile coordinates
 */
export const printTile = (tile: Tile): string => `(${tile.x}, ${tile.y})`;

export const cloneTile = (srcTile: Tile): Tile => {
  return new Tile(srcTile.x, srcTile.y, srcTile.id, srcTile.val);
};
