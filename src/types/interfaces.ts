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
  readonly velocity: XY;
}

export interface PlatformInterface extends Entity {
  readonly image: HTMLImageElement;
  updateXPosition: () => void;
  updateVelocityX: (num: number) => void;
  draw: (c: CanvasRenderingContext2D) => void;
}

export interface FloorInterface extends PlatformInterface {
  type: 'floor';
}

export interface Size {
  width: number;
  height: number;
}

export interface BulletInterface extends Entity {
  readonly spriteIdx: number;
  readonly velocityX: number;
  readonly startX: number;
}

export interface EnemyInterface extends Entity {
  readonly currAction: 'idle' | 'run';
  readonly velocity: XY;
  readonly direction: 'left' | 'right';
}

export interface GroundEnemyInterface extends EnemyInterface {
  type: 'ground';
}

export interface PlayerInterface extends EntityWithVelocity {
  bullets: BulletInterface[];
  readonly currAction: Action;
  readonly sameJump: boolean;
  readonly jumpNumber: number;
  updatePosition: () => void;
  updateVelocity: (axis: 'x' | 'y', amount: number) => void;
  updateAction: (action: Action) => void;
  setSameJump: (val: boolean) => void;
  setJumpNumber: (num: number) => void;
  increaseSpriteIdx: () => void;
  resetSpriteIdx: () => void;
  draw: (c: CanvasRenderingContext2D) => void;
}

export interface LevelInterface {
  readonly platforms: (PlatformInterface | FloorInterface)[];
  readonly enemies: GroundEnemyInterface[];
}

export interface GameStateInterface extends LevelInterface {
  player: PlayerInterface;
}
