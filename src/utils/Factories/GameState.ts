import {
  GameStateInterface,
  GroundEnemyInterface,
  LevelInterface,
  PlatformInterface
} from '../../types/interfaces';
import Player from './Player';

export default function GameState(level: LevelInterface): GameStateInterface {
  const player = Player();

  let active = true;

  return {
    get active() {
      return active;
    },
    get player() {
      return player;
    },
    get platforms() {
      return level.platforms;
    },
    get enemies() {
      return level.enemies;
    },
    setGameOver() {
      active = false;
    }
  };
}
