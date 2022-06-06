import { Action } from './types';
export interface XY {
  readonly x: number;
  readonly y: number;
}

interface Entity extends XY {
  readonly width: number;
  readonly height: number;
}

export interface EntityWithVelocity extends Entity {
  velocity: XY;
}

export interface PlatformInterface extends Entity {
  readonly image: HTMLImageElement;
}

export interface FloorInterface extends PlatformInterface {
  type: 'floor';
}

export interface Size {
  width: number;
  height: number;
}

export interface BulletInterface extends Entity {
  spriteIdx: number;
  velocityX: number;
  readonly startX: number;
}

export interface EnemyInterface extends Entity {
  currAction: 'idle' | 'run';
  velocity: XY;
  direction: 'left' | 'right';
}

export interface GroundEnemyInterface extends EnemyInterface {
  type: 'ground';
}

export interface PlayerInterface extends EntityWithVelocity {
  bullets: BulletInterface[];
  readonly currAction: Action;
  updatePosition: () => void;
  updateVelocity: (axis: 'x' | 'y', amount: number) => void;
  updateAction: (action: Action) => void;
}

export interface GameState {
  player: PlayerInterface;
  platforms: (PlatformInterface | FloorInterface)[];
  enemies: GroundEnemyInterface[];
}
