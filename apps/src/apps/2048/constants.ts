import Direction from './utils/board/direction';

/**
 * Moving left configuration
 */
export const MOVE_LEFT = new Direction('left', true, false);
/**
 * Moving right configuration
 */
export const MOVE_RIGHT = new Direction('right', true, true);
/**
 * Moving up configuration
 */
export const MOVE_UP = new Direction('up', false, false);
/**
 * Moving down configuration
 */
export const MOVE_DOWN = new Direction('down', false, true);

/**
 * Available board sizes. Must be aligned with SCSS files
 */
export const BOARD_SIZES = [3, 4, 5, 6, 8];

/**
 * Game progression status. Must be aligned with relevant components
 */
export enum GAME_STATUS {
  GAMEOVER = 'gameover',
  MOVING = 'moving',
  PLAYING = 'playing',
  SELECT = 'select'
}

/**
 * Transition of moving tiles times in milliseoncds. To be aligned with SCSS varibles
 */
export const MOVE_TIME = 150;
