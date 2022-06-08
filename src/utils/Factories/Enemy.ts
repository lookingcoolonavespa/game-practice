import {
  EnemyInterface,
  GroundEnemyInterface,
  Size,
  XY
} from '../../types/interfaces';
import Entity from './Entity';
import enemySprites from '../sprites/enemySprites';

export default function Enemy(position: XY, size: Size): EnemyInterface {
  const entity = Entity(enemySprites, size, position);

  let direction = 'right';

  return Object.create(entity, {
    direction: {
      get: () => direction,
      enumerable: true
    },
    updateDirection: {
      value: () => {
        direction = direction === 'right' ? 'left' : 'right';
      }
    }
  });
}

export function GroundEnemy(position: XY): GroundEnemyInterface {
  const enemy = Enemy(position, { height: 95, width: 95 });
  return Object.create(enemy, {
    type: { value: 'ground', enumerable: true },
    draw: {
      value: (c: CanvasRenderingContext2D) => {
        const { currAction, spriteIdx, x, y } = enemy;
        c.drawImage(enemySprites[currAction][spriteIdx], x, y, 128, 128);
      }
    }
  });
}
