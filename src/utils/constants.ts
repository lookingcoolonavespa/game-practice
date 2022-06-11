import Player from './Factories/Player';

export const GRAVITY = 1;
export const SPEED = 10;
export const JUMP_HEIGHT = -12;
export const getBoundaryRight = (canvasWidth: number) =>
  canvasWidth / 2 - Player().width;
export const BOUNDARY_LEFT = 200;
export const MAX_GUN_RANGE = 300;
export const ENEMY_MAX_GUN_RANGE = 300;
