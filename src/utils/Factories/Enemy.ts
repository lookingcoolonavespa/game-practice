import {
  EnemyInterface,
  GroundEnemyInterface,
  Size,
  XY
} from '../../types/interfaces';

export default function Enemy(position: XY, size: Size): EnemyInterface {
  return {
    x: position.x,
    y: position.y,
    velocity: {
      x: 0,
      y: 0
    },
    direction: 'right',
    currAction: 'idle',
    get width() {
      return size.width;
    },
    get height() {
      return size.height;
    }
  };
}

export function GroundEnemy(position: XY): GroundEnemyInterface {
  return {
    ...Enemy(position, { height: 95, width: 95 }),
    type: 'ground'
  };
}
