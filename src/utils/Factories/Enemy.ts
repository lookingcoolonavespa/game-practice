import {
  EnemyInterface,
  GroundEnemyInterface,
  Size,
  XY
} from '../../types/interfaces';
import Entity from './Entity';
import enemySprites from '../sprites/enemySprites';
import Sprite from './Sprite';
import { gravity } from '../constants';

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
  const entity = Enemy(position, { height: 48, width: 42 });

  let timer: NodeJS.Timer | null;

  const sprite = Sprite(enemySprites);

  const speed = 2;

  return {
    get direction() {
      return entity.direction;
    },
    get speed() {
      return speed;
    },
    get timer() {
      return timer;
    },
    get x() {
      return entity.x;
    },
    get y() {
      return entity.y;
    },
    get velocity() {
      return entity.velocity;
    },
    get height() {
      return entity.height;
    },
    get width() {
      return entity.width;
    },
    get bullets() {
      return entity.bullets;
    },
    get type(): 'ground' {
      return 'ground';
    },
    setPosition: entity.setPosition,
    updatePosition: entity.updatePosition,
    onCollideWall: entity.onCollideWall,
    updateBullets: entity.updateBullets,
    updateVelocity: entity.updateVelocity,
    increaseSpriteIdx: sprite.increaseSpriteIdx,
    resetSpriteIdx: sprite.resetSpriteIdx,
    updateDirection(dir: 'left' | 'right') {
      sprite.updateDirection(dir);
      entity.updateDirection(dir);
    },
    fall() {
      entity.updateVelocity('y', entity.velocity.y + gravity);
    },
    updateAction(action: keyof typeof enemySprites.right) {
      sprite.updateAction(action);
    },
    setIdleTimer() {
      timer = setTimeout(function () {
        entity.updateVelocity(
          'x',
          entity.direction === 'right' ? speed : -speed
        );
        timer = null;
      }, 2000);
    },
    draw(c: CanvasRenderingContext2D) {
      const { x, y } = entity;
      c.drawImage(sprite.currSprite, x - 40, y - 47, 128, 128);
    }
  };
}
