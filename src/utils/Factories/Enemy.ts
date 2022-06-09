import {
  EnemyInterface,
  GroundEnemyInterface,
  Size,
  XY
} from '../../types/interfaces';
import Entity from './Entity';
import enemySprites from '../sprites/enemySprites';
import Sprite from './Sprite';

export default function Enemy(position: XY, size: Size): EnemyInterface {
  const entity = Entity(size, position);

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
  const enemy = Enemy(position, { height: 48, width: 42 });

  let timer: NodeJS.Timer | null;

  const sprite = Sprite(enemySprites);

  return Object.create(enemy, {
    type: { value: 'ground', enumerable: true },
    speed: { value: 2, enumerable: true },
    timer: { get: () => timer, enumerable: true },
    draw: {
      value: (c: CanvasRenderingContext2D) => {
        const { x, y } = enemy;
        c.drawImage(sprite.currSprite, x - 40, y - 47, 128, 128);
      }
    },
    setIdleTimer: {
      value: function (this: GroundEnemyInterface) {
        timer = setTimeout(
          function (this: GroundEnemyInterface) {
            this.updateVelocity(
              'x',
              this.direction === 'right' ? this.speed : -this.speed
            );
            timer = null;
          }.bind(this),
          2000
        );
      }
    },
    updateAction: {
      value: (action: keyof typeof enemySprites) => {
        sprite.updateAction(action);
      }
    },
    increaseSpriteIdx: {
      value: () => {
        sprite.increaseSpriteIdx();
      }
    },
    resetSpriteIdx: {
      value: () => {
        sprite.resetSpriteIdx();
      }
    }
  });
}
