import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';
import Entity from './Entity';

export default function Player(): PlayerInterface {
  const entity = Entity(
    playerSprites,
    { height: 50, width: 45 },
    { x: 100, y: 100 }
  );

  let sameJump = false;
  let jumpNumber = 0;

  return Object.create(entity, {
    sameJump: {
      get: () => sameJump,
      enumerable: true
    },
    jumpNumber: {
      get: () => jumpNumber,
      enumerable: true
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
    draw: {
      value: (c: CanvasRenderingContext2D) => {
        const { currAction, spriteIdx, x, y, height, width } = entity;
        // draw player
        const sprite = playerSprites[currAction][spriteIdx];
        // c.fillRect(x, y, width, height);

        c.drawImage(sprite, x - 10, y, 59, height);

        // // draw gun
        // const gunSprite =
        //   currAction === 'shoot'
        //     ? gunSprites[currAction].sides[currIdx]
        //     : gunSprites[currAction][currIdx];

        // c.drawImage(gunSprite, x + width - 20, y - 13, 50, 94);

        // // draw bullets
        // bullets.forEach((b) =>
        //   c.drawImage(bulletSprites.idle[b.spriteIdx], b.x, b.y)
        // );
      },
      enumerable: true
    }
  });
}
