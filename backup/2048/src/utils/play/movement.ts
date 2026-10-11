import Seed from './seed';

/**
 * A movement is a move to move tiles. A movement may result in no tile movement
 */
export default class Movement {
  /**
   * Seed generated after the movement has moved at least one tile
   */
  public seed?: Seed;

  /**
   *
   * @param id movement ID
   * @param timestamp movement timestamp
   * @param direction movement direction name
   */
  constructor(
    public direction: 'left' | 'right' | 'up' | 'down',
    public id: number,
    public timestamp: number = Date.now()
  ) {}
}
