import {
  PlatformInterface,
  GroundEnemyInterface
} from '../../types/interfaces';

export default function Level(
  platforms: PlatformInterface[],
  enemies: GroundEnemyInterface[]
) {
  return {
    platforms,
    enemies
  };
}
