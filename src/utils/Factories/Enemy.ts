import {
  ExplosionInterface,
  PlayerInterface,
  XY
} from '../../types/interfaces';
import Entity from './Entity';
import enemySprites from '../sprites/enemySprites';
import Sprite from './Sprite';
import { GRAVITY, ENEMY_MAX_GUN_RANGE } from '../constants';
import Explosion from './Explosion';
import { checkInLineOfSight } from '../checkCollision';

export function GroundEnemy(position: XY) {
  const entity = Entity({ height: 48, width: 42 }, position);

  let timer: NodeJS.Timer | null;

  const sprite = Sprite(enemySprites);

  const speed = 2;

  let lifePoints = 3;

  let status: 'alive' | 'dieing' | 'dead' = 'alive';

  let collision = false;

  let shooting = false;
  let sameShot = false;

  let bullets: ExplosionInterface[] = [];

  function updateBulletSprites() {
    bullets.forEach((b) => {
      b.resetSpriteIdx();
      b.increaseSpriteIdx();
    });
  }

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
    updateVelocity: entity.updateVelocity,
    onCollideWall(axis: 'x' | 'y') {
      collision = true;
      entity.onCollideWall(axis);
    },
    updateDirection(dir: 'left' | 'right', wait?: boolean) {
      if (!wait) {
        sprite.updateDirection(dir);
        entity.updateDirection(dir);
      } else {
        if (sprite.resolveAnimationEnd()) {
          sprite.updateDirection(dir);
          entity.updateDirection(dir);
        }
      }
    },
    fall() {
      entity.updateVelocity('y', entity.velocity.y + GRAVITY);
    },
    stop() {
      entity.updateVelocity('x', 0);
    },
    shoot(player: PlayerInterface) {
      if (sprite.currAction === 'reload' && sprite.resolveAnimationEnd()) {
        sameShot = false;
      }

      if (!shooting) {
        sprite.updateAction('aim', true);
        shooting = true;
      }

      sprite.updateAction('shoot', true);

      if (sameShot) return; //needs to be after updateAction otherwise animation wont finish

      setTimeout(() => {
        //timeout so bullets dont magically teleport
        const { x, y, direction, width } = entity;
        const startX = direction === 'right' ? x + width + 13 : x - 15;
        const endOffset =
          direction === 'right' ? ENEMY_MAX_GUN_RANGE : -ENEMY_MAX_GUN_RANGE;
        const end = startX + endOffset;

        const collision = checkInLineOfSight(
          {
            y: y + 17,
            x: {
              end,
              start: startX
            }
          },
          player
        );
        /* end hit scan */

        let xPos;
        switch (collision) {
          case 'left':
            xPos = player.x;
            break;
          case 'right':
            xPos = player.x + player.width;
            break;
          default:
            xPos = end;
        }
        const explosion = Explosion({
          y: entity.y + 17,
          x: xPos as number
        });
        bullets.push(explosion);

        if (collision) player.onHit();
      }, 200);

      sameShot = true;
    },
    reload() {
      if (sprite.currAction !== 'shoot' && sprite.currAction !== 'aim') return;

      sprite.updateAction('reload', true);
    },
    run() {
      if (!collision) {
        entity.updateVelocity(
          'x',
          entity.direction === 'right' ? speed : -speed
        );
        this.updateAction('run');
      }
    },
    updateBullets() {
      bullets = bullets.filter((b) => b.status !== 'gone');
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
    handleSprites() {
      const { resetSpriteIdx, increaseSpriteIdx } = sprite;
      resetSpriteIdx();
      increaseSpriteIdx();
      updateBulletSprites();
    },
    draw(c: CanvasRenderingContext2D) {
      if (status === 'dead') return;
      const { x, y } = entity;
      c.drawImage(sprite.currSprite, x - 40, y - 47, 128, 128);
      bullets.forEach((b) => b.draw(c));
    }
  };
}
