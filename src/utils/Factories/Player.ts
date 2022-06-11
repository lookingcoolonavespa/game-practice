import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';
import Entity from './Entity';
import Sprite from './Sprite';
import Bullet from './Bullet';
import { JUMP_HEIGHT, SPEED, GRAVITY } from '../constants';

export default function Player(): PlayerInterface {
  const entity = Entity({ height: 50, width: 45 }, { x: 100, y: 100 });

  let sameJump = false;
  let jumpNumber = 0;

  let sameShot = false;

  const playerSprite = Sprite(playerSprites);
  const gunSprite = Sprite(gunSprites);

  let lifePoints = 3;

  let status: 'alive' | 'dieing' | 'dead' = 'alive';

  function updateAction(action: string) {
    if (playerSprite.currAction === 'dieing') return;
    if (action === 'dieing') return playerSprite.updateAction('dieing'); // so i dont have check against status in each switch case
    switch (action) {
      case 'idle': {
        playerSprite.updateAction(
          action,
          ['hit', 'shoot'].some((a) => playerSprite.currAction === a)
        );
        gunSprite.updateAction(
          action,
          ['hit', 'shoot'].some((a) => gunSprite.currAction === a)
        );
        break;
      }
      case 'run': {
        playerSprite.updateAction(action, playerSprite.currAction === 'hit');
        gunSprite.updateAction(action, true);
        break;
      }
      case 'shoot': {
        gunSprite.updateAction(action, playerSprite.currAction === 'hit');
        if (playerSprite.currAction !== 'run') {
          playerSprite.updateAction(action, playerSprite.currAction === 'hit');
        }
        break;
      }
      case 'hit': {
        playerSprite.updateAction('hit');
        gunSprite.updateAction('hit');
        break;
      }
    }
  }

  function setJumpNumber(val: number) {
    jumpNumber = val;
  }
  return {
    setJumpNumber,
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
    get sameJump() {
      return sameJump;
    },
    get jumpNumber() {
      return jumpNumber;
    },
    get currAction() {
      return playerSprite.currAction;
    },
    setPosition: entity.setPosition,
    updatePosition: entity.updatePosition,
    updateVelocity: entity.updateVelocity,
    onCollideWall: entity.onCollideWall,
    updateBullets: entity.updateBullets,
    jump() {
      if (!jumpNumber) setJumpNumber(1); // so users can hold the up key to keep jumping
      if (!sameJump && jumpNumber <= 2) {
        entity.updateVelocity('y', JUMP_HEIGHT);
        updateAction('idle');
      }
    },
    fall() {
      entity.updateVelocity('y', entity.velocity.y + GRAVITY);
    },
    rest() {
      entity.updateVelocity('x', 0);
      updateAction('idle');
    },
    run(dir: 'left' | 'right') {
      if (!jumpNumber) updateAction('run');
      entity.updateDirection(dir);
      playerSprite.updateDirection(dir);
      gunSprite.updateDirection(dir);
      entity.updateVelocity('x', dir === 'right' ? SPEED : -SPEED);
    },
    shoot() {
      if (sameShot) return;

      updateAction('shoot');

      const { direction, width, x, y, bullets } = entity;

      const offsetX = direction === 'right' ? width : -width;
      const newBullet = Bullet(
        {
          x: x + offsetX,
          y: y + 18
        },
        bulletSprites
      );

      newBullet.setVelocity('x', direction);
      bullets.push(newBullet);
      sameShot = true;
      setTimeout(() => {
        sameShot = false;
      }, 300);
    },
    onHit() {
      updateAction('hit');
      lifePoints--;
      if (!lifePoints) {
        updateAction('dieing');
        status = 'dieing';
      }
    },
    resetJump() {
      sameJump = false;
      jumpNumber = 0;
    },
    setSameJump(val: boolean) {
      sameJump = val;
    },
    increaseSpriteIdx() {
      if (status === 'dieing' && playerSprite.resolveAnimationEnd()) return;
      playerSprite.increaseSpriteIdx();
      gunSprite.increaseSpriteIdx();
    },
    resetSpriteIdx: () => {
      if (status === 'dieing' && playerSprite.resolveAnimationEnd()) return;
      playerSprite.resetSpriteIdx();
      gunSprite.resetSpriteIdx();
    },
    draw: (c: CanvasRenderingContext2D) => {
      const { x, y, height, width, bullets } = entity;

      const offsetX = {
        player: entity.direction === 'right' ? -10 : 0,
        gun: entity.direction === 'right' ? width - 30 : -17
      };

      c.drawImage(playerSprite.currSprite, x + offsetX.player, y, 59, height);
      if (status === 'alive') {
        c.drawImage(gunSprite.currSprite, x + offsetX.gun, y - 13, 50, 94);
      }
      bullets.forEach((b) => b.draw(c));
    }
  };
}
