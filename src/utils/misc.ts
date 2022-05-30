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
    .fill(Platform(startPos))
    .map((platform, i) => {
      if (i === 0) return platform;

      return axis === 'y'
        ? { ...platform, y: platform.y + platform.height * i }
        : { ...platform, x: platform.x * (i + 1) + platform.width * i };
    });
}
