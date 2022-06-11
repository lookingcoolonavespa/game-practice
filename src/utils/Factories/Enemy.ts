import {
  EnemyInterface,
  ExplosionInterface,
  GroundEnemyInterface,
  PlayerInterface,
  Size,
  XY
} from '../../types/interfaces';
import Entity from './Entity';
import enemySprites from '../sprites/enemySprites';
import Sprite from './Sprite';
import Bullet from './Bullet';
import bulletSprites from '../sprites/bulletSprites';
import { gravity } from '../constants';
import Explosion from './Explosion';
import { checkInLineOfSight } from '../checkCollision';

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

export function GroundEnemy(position: XY) {
  const entity = Enemy(position, { height: 48, width: 42 });

  let timer: NodeJS.Timer | null;

  const sprite = Sprite(enemySprites);

  const speed = 2;

  let lifePoints = 3;

  let status: 'alive' | 'dieing' | 'dead' = 'alive';

  let shooting = false;

  let sameShot = false;

  let bullets: ExplosionInterface[] = [];

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
    get status() {
      return status;
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
    get type(): 'ground' {
      return 'ground';
    },
    setPosition: entity.setPosition,
    updatePosition: entity.updatePosition,
    onCollideWall: entity.onCollideWall,
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
    shoot(player: PlayerInterface) {
      if (!shooting) {
        sprite.updateAction('aim');
        shooting = true;
      }

      if (sprite.currAction === 'reload' && sprite.resolveAnimationEnd())
        sameShot = false;
      sprite.updateAction('shoot', true);

      if (sameShot) return;

      function hitScan() {
        const { x, y, direction, width } = entity;
        const startX = direction === 'right' ? x + width + 13 : x - 15;
        const endOffset = direction === 'right' ? 100 : -100;

        return checkInLineOfSight(
          {
            y: y + 17,
            x: {
              start: startX,
              end: startX + endOffset
            }
          },
          player
        );
      }
      const collision = hitScan();
      if (collision) {
        if (collision === 'right') {
          const explosion = Explosion({
            y: entity.y + 17,
            x: player.x + player.width
          });
          bullets.push(explosion);
        }
      }
      sameShot = true;
    },
    reload() {
      if (sprite.currAction !== 'shoot') return;

      sprite.updateAction('reload', true);
    },
    updateBullets() {
      bullets = bullets.filter((b) => b.status !== 'gone');
    },
    updateBulletSprites() {
      bullets.forEach((b) => {
        b.resetSpriteIdx();
        b.increaseSpriteIdx();
      });
    },
    updateAction(action: keyof typeof enemySprites.right) {
      if (sprite.currAction === 'dead') return;
      sprite.updateAction(action, sprite.currAction === 'hit');
    },
    onHit() {
      entity.updateVelocity('x', 0);
      lifePoints--;

      // handle death
      if (!lifePoints) {
        sprite.updateAction('dead');
        status = 'dieing';
        if (timer) {
          clearTimeout(timer); // so enemey doesnt move when theyre dead
          timer = null;
        }
      }
    },
    handleDeath() {
      if (status === 'dieing' && sprite.resolveAnimationEnd()) {
        status = 'dead';
      }
    },
    setIdleTimer() {
      if (sprite.currAction === 'dead') {
        return;
      }
      timer = setTimeout(function () {
        entity.updateVelocity(
          'x',
          entity.direction === 'right' ? speed : -speed
        );
        timer = null;
      }, 2000);
    },
    draw(c: CanvasRenderingContext2D) {
      if (status === 'dead') return;
      const { x, y } = entity;
      c.drawImage(sprite.currSprite, x - 40, y - 47, 128, 128);
      bullets.forEach((b) => b.draw(c));
    }
  };
}
