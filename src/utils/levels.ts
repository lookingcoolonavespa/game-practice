import Level from './Factories/Level';
import { FloorPlatform } from './Factories/Platform';
import { GroundEnemy } from './Factories/Enemy';
import { getPlatformsToFillUpAxis } from './misc';
import { Platform4 } from './Factories/Platform';

export default {
  one: (canvasHeight: number) => {
    const wall = getPlatformsToFillUpAxis(
      Platform4,
      { x: -5, y: 0 },
      'y',
      canvasHeight
    );

    return Level(
      [
        FloorPlatform({ x: -10, y: canvasHeight - 168 }, 800),
        FloorPlatform({ x: 960, y: canvasHeight - 168 }, 800),
        ...wall
      ],
      [GroundEnemy({ x: 500, y: 200 })]
    );
  }
};
