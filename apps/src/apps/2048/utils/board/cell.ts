/**
 * A single (x, y) Cell of the game board. A cell is generated once at the
 * beginning of the game and should not be regenerated
 * - `x` is column axis (0 = left, _max\_value_ = right)
 * - `y` is row axis (0 = top, _max\_value_ = bottom)
 */
export default class Cell {
  /**
   *
   * @param x X coordinate (column from left to right)
   * @param y  Y coordinate (row from top to bottom)
   */
  constructor(public x: number, public y: number) {}
}
