import { XY } from '../types/interfaces';
import { PlatformFactory } from '../types/types';

export function getPlatformsToFillUpAxis(
  Platform: PlatformFactory,
  startPos: XY,
  axis: 'x' | 'y',
  axisLength: number
) {
  const basePlatform = Platform({ x: 0, y: 0 });
  const platformLength =
    axis === 'x' ? basePlatform.width : basePlatform.height;

  const noOfPlatformsToFillUpCanvas = Math.ceil(axisLength / platformLength);

  return Array(noOfPlatformsToFillUpCanvas)
    .fill(null)
    .map((v, i) => {
      const position = { ...startPos };
      if (axis == 'y') position.y = startPos.y + basePlatform.height * i;
      else if (axis === 'x')
        position.x = startPos.x * (i + 1) + basePlatform.width * i;

      return Platform(position);
    });
}

export function createImage(src: string) {
  const image = new Image();
  image.src = src;
  return image;
}

export function isObject(obj: { [key: string]: any }) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function deepCopyArray(arr: any[]): any[] {
  return arr.map((v) => {
    if (isObject(v)) return deepCopyObj(v);

    if (Array.isArray(v)) return deepCopyArray(v);

    return v;
  });
}

export function deepCopyObj(obj: { [key: string]: any }) {
  const copy: { [key: string]: any } = {};

  for (const key in obj) {
    if (!(key in obj)) continue;

    const safeKey = key as keyof typeof obj;

    if (isObject(obj[safeKey])) {
      copy[safeKey] = deepCopyObj(obj[safeKey]);
      continue;
    }

    if (Array.isArray(obj[safeKey])) {
      copy[safeKey] = deepCopyArray(obj[safeKey]);
      continue;
    }

    copy[safeKey] = obj[safeKey];
  }

  return copy;
}
