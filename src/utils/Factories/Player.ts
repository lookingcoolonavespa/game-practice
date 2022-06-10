import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';
import Entity from './Entity';
import Sprite from './Sprite';
import { jumpHeight, speed, gravity } from '../constants';

export default function Player(): PlayerInterface {
  const entity = Entity({ height: 50, width: 45 }, { x: 100, y: 100 });

  let sameJump = false;
  let jumpNumber = 0;

  const playerSprite = Sprite(playerSprites);
  const gunSprite = Sprite(gunSprites);

  function updateAction(action: string) {
    switch (action) {
      case 'idle': {
        playerSprite.updateAction(action, playerSprite.currAction === 'shoot');
        gunSprite.updateAction(action, gunSprite.currAction === 'shoot');
        break;
      }
      case 'run': {
        playerSprite.updateAction(action);
        gunSprite.updateAction(action, true);
        break;
      }
      case 'shoot': {
        gunSprite.updateAction(action);
        if (playerSprite.currAction !== 'run') {
          playerSprite.updateAction(action);
        }
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
    updateBullets: entity.updateBullets,
    onCollideWall: entity.onCollideWall,
    jump() {
      if (!jumpNumber) setJumpNumber(1); // so users can hold the up key to keep jumping
      if (!sameJump && jumpNumber <= 2) {
        entity.updateVelocity('y', jumpHeight);
        updateAction('idle');
      }
    },
    fall() {
      entity.updateVelocity('y', entity.velocity.y + gravity);
    },
    rest() {
      entity.updateVelocity('x', 0);
      updateAction('idle');
    },
    run(dir: 'left' | 'right') {
      if (!jumpNumber) updateAction('run');
      entity.updateDirection(dir);
      entity.updateVelocity('x', dir === 'right' ? speed : -speed);
    },
    shoot() {
      if (!entity.sameShot) {
        updateAction('shoot');
        entity.shootBullet();
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
      playerSprite.increaseSpriteIdx();
      gunSprite.increaseSpriteIdx();
    },
    resetSpriteIdx: () => {
      playerSprite.resetSpriteIdx();
      gunSprite.resetSpriteIdx();
    },
    draw: (c: CanvasRenderingContext2D) => {
      const { x, y, height, width } = entity;

      c.drawImage(playerSprite.currSprite, x - 10, y, 59, height);

      c.drawImage(gunSprite.currSprite, x + width - 30, y - 13, 50, 94);
    }
  };
}
