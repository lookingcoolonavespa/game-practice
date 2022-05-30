export interface XY {
  x: number;
  y: number;
}

export interface PlatformInterface extends XY {
  readonly width: number;
  readonly height: number;
  readonly image: HTMLImageElement;
}

export interface Size {
  width: number;
  height: number;
}
