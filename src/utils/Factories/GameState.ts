import {
  GroundEnemyInterface,
  PlatformInterface
} from '../../types/interfaces';
import Player from './Player';

export default function GameState(
  platforms: PlatformInterface[],
  enemies: GroundEnemyInterface[]
) {
  const player = Player();

  return {
    get player() {
      return player;
    }
  };
}
