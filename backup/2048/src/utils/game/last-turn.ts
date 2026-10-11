import Tile from '../board/tile';

/**
 * Saving game last turn to roll back once only
 */
export default class LastTurn {
  /**
   *
   * @param tiles last turn tiles state
   * @param score last turn score
   * @param valid defines if this last turn can be used (default to true)
   */
  constructor(
    public tiles: Tile[],
    public score: number,
    public valid: boolean = true
  ) {}
}
