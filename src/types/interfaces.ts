import { Action, KeyPressType } from './types';

export interface XY {
  readonly x: number;
  readonly y: number;
}

interface Entity extends XY {
  readonly width: number;
  readonly height: number;
  readonly x: number;
  readonly y: number;
}

export interface EntityWithVelocityX extends Entity {
  readonly velocity: { readonly x: number };
}

export interface EntityWithVelocity extends Entity {
  readonly velocity: XY;
}

export interface PlatformInterface extends Entity {
  readonly velocity: { readonly x: number };
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
  readonly velocity: XY;
  readonly status: 'alive' | 'gone' | 'disappearing';
  readonly isMaxRange: () => boolean;
  readonly stop: () => Promise<void> | void;
  readonly increaseSpriteIdx: () => void;
  readonly resetSpriteIdx: () => void;
  readonly setVelocity: (axis: 'x' | 'y', direction: 'left' | 'right') => void;
  readonly updatePosition: () => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
}

export interface BaseEntityInterface extends EntityWithVelocity {
  readonly bullets: BulletInterface[];
  readonly sameShot: boolean;
  readonly updatePosition: () => void;
  readonly setPosition: (position: XY) => void;
  readonly setSameShot: (val: boolean) => void;
  readonly updateVelocity: (axis: 'x' | 'y', amount: number) => void;
  readonly onCollideWall: (axis: 'x' | 'y') => void;
  readonly updateAction: (action: Action) => void;
  readonly updateDirection: (newDirection: 'left' | 'right') => void;
  readonly increaseSpriteIdx: () => void;
  readonly resetSpriteIdx: (override?: boolean) => void;
  readonly shootBullet: () => void;
  readonly updateBullets: () => void;
}
export interface EnemyInterface extends BaseEntityInterface {
  readonly direction: 'left' | 'right';
  readonly updateDirection: (newDirection: 'left' | 'right') => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
  readonly speed: number;
}

export interface GroundEnemyInterface extends EnemyInterface {
  readonly type: 'ground';
  readonly timer: NodeJS.Timer | null;
  setIdleTimer: (this: GroundEnemyInterface) => void;
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
  readonly setTimer: (
    key: keyof KeyPressType,
    cb: () => void,
    delay: number
  ) => void;
  readonly removeTimer: () => void;
}

export interface SpriteCollectionInterface {
  [key: string]: HTMLImageElement[];
}
