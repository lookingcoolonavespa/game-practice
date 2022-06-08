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
      value: (newDirection: 'left' | 'right') => {
        direction = newDirection;
      }
    }
  });
}

export function GroundEnemy(position: XY): GroundEnemyInterface {
  const enemy = Enemy(position, { height: 95, width: 95 });

  let timer: NodeJS.Timer | null;

  return Object.create(enemy, {
    type: { value: 'ground', enumerable: true },
    speed: { value: 2, enumerable: true },
    timer: { get: () => timer, enumerable: true },
    draw: {
      value: (c: CanvasRenderingContext2D) => {
        const { currAction, spriteIdx, x, y } = enemy;
        c.drawImage(enemySprites[currAction][spriteIdx], x, y, 128, 128);
      }
    },
    setIdleTimer: {
      value: function (this: GroundEnemyInterface) {
        const start = Date.now();
        console.log('start', Date.now());
        timer = setTimeout(
          function (this: GroundEnemyInterface) {
            console.log('fired', Date.now() - start);
            this.updateVelocity(
              'x',
              this.direction === 'right' ? this.speed : -this.speed
            );
            timer = null;
          }.bind(this),
          2000
        );
      }
    }
  });
}
