export interface XY {
  x: number;
  y: number;
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
  currAction: 'idle';
  velocity: XY;
  direction: 'left' | 'right';
}

export interface GroundEnemyInterface extends EnemyInterface {
  type: 'ground';
}
