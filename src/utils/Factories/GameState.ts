import {
  GroundEnemyInterface,
  LevelInterface,
  PlatformInterface
} from '../../types/interfaces';
import Player from './Player';

export default function GameState(level: LevelInterface) {
  const player = Player();

  return {
    get player() {
      return player;
    },
    get platforms() {
      return level.platforms;
    },
    get enemies() {
      return level.enemies;
    }
  };
}
