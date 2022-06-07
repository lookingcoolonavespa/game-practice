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
