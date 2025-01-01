import Game from '../game';
import Direction from '../board/direction';
import Tile, { cloneTile } from '../board/tile';
import Cell from '../board/cell';
import { getTileIndex } from '../board';

/**
 * Handle a movement for a given game. By convention, board is split into "rows"
 * depending on the movement direction: a horizontal movement groups by rows while
 * a vertical movement groups by column
 */
export default class Turn {
  /**
   * Tiles state after the turn
   */
  public tiles!: Tile[];
  /**
   * Number of moved tiles during this turn
   */
  public movedCount: number = 0;
  /**
   * Score change during this turn
   */
  public scoreChange: number = 0;
  /**
   * To increase tile ID sequence due to merged tile creation
   */
  public tileSeqChange: number = 0;
  /**
   * Empty cells after this turn
   */
  public emptyCells: Cell[] = [];

  /**
   *
   * @param game game state before the turn
   * @param direction movement direction for this turn
   */
  constructor(game: Game, public direction: Direction) {
    const size = game.size;
    this.tiles = Array(size * size);
    // last tile of each row
    let lastTile: Tile | undefined;
    // row current index
    let index: number;
    // deleted tiles are moved out of the board
    let deletedIndex = size * size;

    // loop until size*size to ignore deleted cells
    for (let i = 0; i < size; i++) {
      // reset progression
      index = direction.reverse ? size - 1 : 0;
      lastTile = undefined;

      for (let j = 0; j < size; j++) {
        const srcTile = getTileFromLoop(game, i, j, direction);

        // skip undefined tile
        if (srcTile !== undefined) {
          // need to clone to avoid "shallow" from game.tiles
          const tile = cloneTile(srcTile);
          // something to merge?
          if (lastTile !== undefined && lastTile.val === tile.val) {
            // merge tile into lastTile
            const mergedTileId = game.tileSeqId + this.tileSeqChange;
            const mergedTile = mergeTiles(lastTile, tile, mergedTileId);

            // update score & tile sequence
            this.scoreChange += mergedTile.val;
            this.tileSeqChange += 1;

            // a merged tile always moves
            this.movedCount++;

            // save merged tile
            this.tiles[getTileIndex(game.size, mergedTile)] = mergedTile;
            // save into deleted tiles
            this.tiles[deletedIndex] = lastTile;
            this.tiles[deletedIndex + 1] = tile;
            deletedIndex += 2;

            // clear lastTile to avoid merging with a next tile
            lastTile = undefined;
          }
          // Just move forward
          else {
            // move tile
            if (direction.horizontal) {
              this.movedCount += tile.x !== index ? 1 : 0;
              tile.x = index;
            } else {
              this.movedCount += tile.y !== index ? 1 : 0;
              tile.y = index;
            }
            index += direction.reverse ? -1 : 1;
            // save tile
            lastTile = tile;
            this.tiles[getTileIndex(size, tile)] = tile;
          }
        }
      }

      // save empty cells
      const emptyCellsCount = direction.reverse ? index + 1 : size - index;
      const rowEmpties = getEmptyRowCells(i, emptyCellsCount, size, direction);
      this.emptyCells = this.emptyCells.concat(rowEmpties);
    }
  }
}

/**
 * Fetch tiles for the double for-loop
 *
 * @param game game
 * @param i first loop index
 * @param j second loop index
 * @param direction movement direction
 * @returns tile index
 */
export const getTileFromLoop = (
  game: Game,
  i: number,
  j: number,
  direction: Direction
): Tile => {
  return game.tiles[getTileFromLoopIndex(game.size, i, j, direction)];
};

/**
 * From a double for-loop, returns the tile index, progressively by row or columns and
 * by order or reverse order depending on movement direction
 *
 * @param size board size
 * @param i first loop index
 * @param j second loop index
 * @param direction movement direction
 * @returns tile index
 */
export const getTileFromLoopIndex = (
  size: number,
  i: number,
  j: number,
  direction: Direction
): number => {
  return direction.horizontal
    ? direction.reverse
      ? i * size + (size - 1) - j
      : i * size + j
    : direction.reverse
    ? i + (size - 1) * size - j * size
    : i + j * size;
};

/**
 *
 * @param lastTile receiver tile
 * @param tile merged tile
 * @returns [lastTile, tile]
 */
export const mergeTiles = (lastTile: Tile, tile: Tile, id: number): Tile => {
  // move merged tile below lastTile
  tile.x = lastTile.x;
  tile.y = lastTile.y;

  // create merged tile
  const mergedVal = lastTile.val + tile.val;
  const mergedTile = new Tile(lastTile.x, lastTile.y, id, mergedVal);
  mergedTile.merged = true;
  return mergedTile;
};

/**
 * Generate an array of empty cells for each row based on movement direction
 *
 * @param row row number (`i` in double for loop)
 * @param emptyCount number of empty cells in the given row
 * @param size board size
 * @param direction movement direction
 * @returns empty cells array
 */
export const getEmptyRowCells = (
  row: number,
  emptyCount: number,
  size: number,
  direction: Direction
): Cell[] => {
  const emptyCells: Cell[] = [];
  let cell: Cell;

  for (let i = 0; i < emptyCount; i++) {
    cell = direction.horizontal
      ? direction.reverse
        ? new Cell(i, row)
        : new Cell(size - emptyCount + i, row)
      : direction.reverse
      ? new Cell(row, i)
      : new Cell(row, size - emptyCount + i);

    emptyCells.push(cell);
  }

  return emptyCells;
};
