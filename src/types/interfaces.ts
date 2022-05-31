export interface XY {
  x: number;
  y: number;
}

export interface PlatformInterface extends XY {
  readonly width: number;
  readonly height: number;
  readonly image: HTMLImageElement;
}

export interface FloorInterface extends PlatformInterface {
  draw: (c: CanvasRenderingContext2D) => void;
}

export interface Size {
  width: number;
  height: number;
}

export interface BulletInterface extends XY {
  spriteIdx: number;
  velocityX: number;
  readonly width: number;
  readonly height: number;
  readonly startX: number;
}
