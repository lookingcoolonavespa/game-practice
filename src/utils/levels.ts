import Level from './Factories/Level';
import {
  FloorPlatform,
  WallPlatform,
  Platform1,
  Platform4
} from './Factories/Platform';
import { GroundEnemy } from './Factories/Enemy';
import { getPlatformsToFillUpAxis } from './misc';

export default {
  one: (canvasHeight: number) => {
    const wall = getPlatformsToFillUpAxis(
      WallPlatform,
      { x: -5, y: 0 },
      'y',
      canvasHeight
    );

    return Level(
      [
        FloorPlatform({ x: -10, y: canvasHeight - 168 }, 800),
        FloorPlatform({ x: 960, y: canvasHeight - 168 }, 800),
        ...wall
        // Platform1({ x: 300, y: 600 }),
        // Platform4({ x: 850, y: 600 })
      ],
      [GroundEnemy({ x: 694.5, y: 200 })]
    );
  }
};
