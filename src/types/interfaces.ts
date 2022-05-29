export interface PlatformInterface {
  draw: (c: CanvasRenderingContext2D) => void;
  readonly x: number;
  readonly y: number;
  updatePosition: (updated: { x: number; y: number }) => void;
  width: number;
  height: number;
}

export interface XY {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
