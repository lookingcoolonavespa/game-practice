import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';
import Entity from './Entity';
import Sprite from './Sprite';

export default function Player(): PlayerInterface {
  const entity = Entity({ height: 50, width: 45 }, { x: 100, y: 100 });

  let sameJump = false;
  let jumpNumber = 0;

  let shooting = false;

  const playerSprite = Sprite(playerSprites);
  const gunSprite = Sprite(gunSprites);

  return Object.create(entity, {
    sameJump: {
      get: () => sameJump,
      enumerable: true
    },
    jumpNumber: {
      get: () => jumpNumber,
      enumerable: true
    },
    currAction: {
      get: () => playerSprite.currAction
    },
    setSameJump: {
      value: (val: boolean) => {
        sameJump = val;
      },
      enumerable: true
    },
    setJumpNumber: {
      value: (num: number) => {
        jumpNumber = num;
      },
      enumerable: true
    },
    increaseSpriteIdx: {
      value: () => {
        playerSprite.increaseSpriteIdx();
        gunSprite.increaseSpriteIdx();
      }
    },
    resetSpriteIdx: {
      value: () => {
        playerSprite.resetSpriteIdx();
        gunSprite.resetSpriteIdx();
      }
    },
    updateAction: {
      value: (action: string) => {
        switch (action) {
          case 'idle': {
            if (shooting && !entity.velocity.y) {
              return playerSprite.updateAction('shoot');
            }
            playerSprite.updateAction(action);
            gunSprite.updateAction(action, true);
            break;
          }
          case 'run': {
            playerSprite.updateAction(action);
            if (!shooting) {
              gunSprite.updateAction(action, true);
            }
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
    },
    setShooting: {
      value: (state: boolean) => {
        shooting = state;
      }
    },
    draw: {
      value: (c: CanvasRenderingContext2D) => {
        const { x, y, height, width } = entity;

        c.drawImage(playerSprite.currSprite, x - 10, y, 59, height);

        c.drawImage(gunSprite.currSprite, x + width - 30, y - 13, 50, 94);
      },
      enumerable: true
    }
  });
}
