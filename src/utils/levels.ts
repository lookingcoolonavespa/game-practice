import Level from './Factories/Level';
import { FloorPlatform } from './Factories/Platform';
import { GroundEnemy } from './Factories/Enemy';

export default {
  one: (canvasHeight: number) =>
    Level(
      [
        FloorPlatform({ x: -10, y: canvasHeight - 168 }, 800),
        FloorPlatform({ x: 960, y: canvasHeight - 168 }, 800)
      ],
      [GroundEnemy({ x: 500, y: 200 })]
    )
};
