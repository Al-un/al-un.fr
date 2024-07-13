import Tile from './tile';

/**
 * Represent a 2048 board
 */
export default class Board {
  /**
   * Current tiles state. Index is not random. Each non-deleted tile, with
   * (x, y) coordinates, has `index = x + y*size`. A 3x3 grid is then represented
   * by the indexes `0 1 2 | 3 4 5 | 6 7 8`.
   *
   * By convention, any cell whose index is above _size*size_ is considered as
   * deleted.
   */
  public tiles!: Tile[];

  /**
   *
   * @param size board size
   */
  constructor(public size: number) {
    this.tiles = Array(size * size);
  }
}

/**
 *
 * @param size board size
 * @param tile tile
 * @returns tile index based on its coordinates
 */
export const getTileIndex = (size: number, tile: Tile): number => {
  return tile.y * size + tile.x;
};

/**
 * Print all tiles
 * @param size
 * @param tiles
 */
export const printTiles = (size: number, tiles: Tile[]): string => {
  // first border
  const print: any[] = ['|'];

  for (let i = 0; i < size * size; i++) {
    // new line
    if (i > 0 && i % size === 0) {
      print.push('|\n|');
    }

    // fetch tile
    const tile = tiles[i];
    print.push(tile !== undefined ? tile.val : 0);
  }

  // last border
  print.push('|\n');

  return print.join(' ');
};
