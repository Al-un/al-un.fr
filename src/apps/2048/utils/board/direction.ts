import { MOVE_LEFT, MOVE_UP, MOVE_RIGHT, MOVE_DOWN } from '../../constants'

/**
 * Qualify a game direction. A direction has two parameters:
 * - horizontal: true for left/right, false for up/down
 * - reverse: true when move goes toward _max\_value_ (right, down), false when
 * move goes toward zero (left, up)
 */
export default class Direction {
  constructor(
    public name: 'left' | 'right' | 'up' | 'down',
    public horizontal: boolean,
    public reverse: boolean
  ) {}
}

export const getDirection = (name: 'left' | 'right' | 'up' | 'down'): Direction => {
  switch (name) {
    case 'left':
      return MOVE_LEFT
    case 'up':
      return MOVE_UP
    case 'right':
      return MOVE_RIGHT
    case 'down':
      return MOVE_DOWN
  }
}
