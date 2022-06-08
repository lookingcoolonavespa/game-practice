import { Action, KeyPressType } from './types';

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
  readonly x: number;
  readonly y: number;
  readonly velocityX: number;
  readonly width: number;
  readonly height: number;
  readonly image: HTMLImageElement;
  readonly updateXPosition: () => void;
  readonly updateVelocityX: (num: number) => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
  readonly type?: 'floor' | 'wall';
}

export interface FloorInterface extends PlatformInterface {
  readonly type: 'floor';
}

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface BulletInterface extends Entity {
  readonly spriteIdx: number;
  readonly velocityX: number;
  readonly startX: number;
}

export interface BaseEntityInterface extends EntityWithVelocity {
  readonly bullets: BulletInterface[];
  readonly currAction: Action;
  readonly spriteIdx: number;
  readonly updatePosition: () => void;
  readonly setPosition: (position: XY) => void;
  readonly updateVelocity: (axis: 'x' | 'y', amount: number) => void;
  readonly onCollideWall: (axis: 'x' | 'y') => void;
  readonly updateAction: (action: Action) => void;
  readonly increaseSpriteIdx: () => void;
  readonly resetSpriteIdx: () => void;
}
export interface EnemyInterface extends BaseEntityInterface {
  readonly direction: 'left' | 'right';
  readonly draw: (c: CanvasRenderingContext2D) => void;
}

export interface GroundEnemyInterface extends EnemyInterface {
  readonly type: 'ground';
}

export interface PlayerInterface extends BaseEntityInterface {
  readonly sameJump: boolean;
  readonly jumpNumber: number;
  readonly setSameJump: (val: boolean) => void;
  readonly setJumpNumber: (num: number) => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
}

export interface LevelInterface {
  readonly platforms: (PlatformInterface | FloorInterface)[];
  readonly enemies: GroundEnemyInterface[];
}

export interface GameStateInterface extends LevelInterface {
  readonly player: PlayerInterface;
  readonly active: boolean;
  readonly setGameOver: () => void;
}

export interface DeltaTimeoutInterface {
  readonly start: () => void;
  readonly stop: () => void;
}

export interface KeyPressInterface {
  readonly up: {
    readonly pressed: boolean;
    readonly timer: null | DeltaTimeoutInterface;
  };
  readonly left: {
    readonly pressed: boolean;
  };
  readonly right: {
    readonly pressed: boolean;
  };
  readonly space: {
    readonly pressed: boolean;
  };
  readonly setPressed: (key: keyof KeyPressType) => void;
  readonly setReleased: (key: keyof KeyPressType) => void;
  readonly setTimer: (cb: () => void, delay: number) => void;
  readonly removeTimer: () => void;
}

export interface SpriteCollectionInterface {
  [key: string]: HTMLImageElement[];
}
