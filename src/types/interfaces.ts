import enemySprites from '../utils/sprites/enemySprites';
import playerSprites from '../utils/sprites/playerSprites';
import { Action, KeyPressType } from './types';

export interface XY {
  readonly x: number;
  readonly y: number;
}

export interface Line {
  y: number;
  x: {
    start: number;
    end: number;
  };
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
  readonly status: 'active' | 'gone' | 'disappearing';
  readonly isMaxRange: () => boolean;
  readonly shiftXBy: (amount: number) => void;
  readonly stop: () => Promise<void> | void;
  readonly increaseSpriteIdx: () => void;
  readonly resetSpriteIdx: () => void;
  readonly setVelocity: (axis: 'x' | 'y', direction: 'left' | 'right') => void;
  readonly updatePosition: () => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
}

export interface ExplosionInterface {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly currSprite: HTMLImageElement;
  readonly status: 'gone' | 'disappearing';
  increaseSpriteIdx(): void;
  resetSpriteIdx(): void;
  draw(c: CanvasRenderingContext2D): void;
}

export interface BaseEntityInterface extends EntityWithVelocity {
  // readonly sameShot: boolean;
  readonly updatePosition: () => void;
  readonly setPosition: (position: XY) => void;
  // readonly setSameShot: (val: boolean) => void;
  readonly updateVelocity: (axis: 'x' | 'y', amount: number) => void;
  readonly onCollideWall: (axis: 'x' | 'y') => void;
  // readonly updateAction: (action: Action) => void;
  // readonly updateDirection: (newDirection: 'left' | 'right') => void;
  readonly increaseSpriteIdx: () => void;
  readonly resetSpriteIdx: (override?: boolean) => void;
  readonly draw: (c: CanvasRenderingContext2D) => void;
  readonly fall: () => void;
  readonly onHit: () => void;
}
export interface EnemyInterface extends BaseEntityInterface {
  readonly direction: 'left' | 'right';
  readonly updateDirection: (newDirection: 'left' | 'right') => void;
  readonly updateVelocity: (axis: 'x' | 'y', amount: number) => void;
}

export interface GroundEnemyInterface extends EnemyInterface {
  readonly speed: number;
  readonly type: 'ground';
  readonly timer: NodeJS.Timer | null;
  readonly status: 'alive' | 'dieing' | 'dead';
  readonly reload: () => void;
  readonly setIdleTimer: () => void;
  readonly updateAction: (action: keyof typeof enemySprites.right) => void;
  readonly handleDeath: () => void;
  readonly shoot: (player: PlayerInterface) => void;
  readonly updateBullets: () => void;
  readonly updateBulletSprites: () => void;
}

export interface PlayerInterface extends BaseEntityInterface {
  readonly sameJump: boolean;
  readonly jumpNumber: number;
  readonly currAction: string | number;
  readonly bullets: BulletInterface[];
  readonly updateBullets: (offsetX: number) => void;
  readonly jump: () => void;
  readonly rest: () => void;
  readonly run: (dir: 'left' | 'right') => void;
  readonly shoot: () => void;
  readonly resetJump: () => void;
  readonly setSameJump: (val: boolean) => void;
  readonly setJumpNumber: (num: number) => void;
}

export interface LevelInterface {
  readonly platforms: (PlatformInterface | FloorInterface)[];
  readonly enemies: GroundEnemyInterface[];
}

export interface GameStateInterface extends LevelInterface {
  readonly player: PlayerInterface;
  readonly active: boolean;
  readonly platforms: PlatformInterface[];
  readonly enemies: GroundEnemyInterface[];
  readonly setGameOver: () => void;
  readonly handleSprites: () => void;
  readonly handleKeyPress: (
    keyPress: KeyPressType,
    boundaryLeft: number,
    boundaryRight: number
  ) => void;
  readonly handleBulletCollision: () => void;
  readonly handlePlayerCollision: () => void;
  readonly handleEnemyMovement: () => void;
  readonly update: () => void;
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

export interface SpriteSheetInterface {
  left: SpriteCollectionInterface;
  right: SpriteCollectionInterface;
}
