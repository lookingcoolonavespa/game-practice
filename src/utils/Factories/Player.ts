import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import { Action } from '../../types/types';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';

export default function Player(): PlayerInterface {
  const height = 50;
  const width = 45;

  let x = 100;
  let y = 100;

  const velocity = {
    x: 0,
    y: 0
  };

  let sameJump = false;
  let jumpNumber = 0;

  const bullets: BulletInterface[] = [];

  let currAction: Action = 'idle';
  let spriteIdx = 0;

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get velocity() {
      return velocity;
    },
    get height() {
      return height;
    },
    get width() {
      return width;
    },
    get sameJump() {
      return sameJump;
    },
    get jumpNumber() {
      return jumpNumber;
    },
    get bullets() {
      return bullets;
    },
    get currAction() {
      return currAction;
    },
    updatePosition() {
      x += velocity.x;
      y += velocity.y;
    },
    updateVelocity(axis: 'x' | 'y', amount: number) {
      velocity[axis] = amount;
    },
    updateAction(action: Action) {
      currAction = action;
    },
    increaseSpriteIdx() {
      spriteIdx++;
    },
    resetSpriteIdx() {
      if (spriteIdx === playerSprites[currAction].length - 1) spriteIdx = 0;
    },
    setSameJump(val: boolean) {
      sameJump = val;
    },
    setJumpNumber(num: number) {
      jumpNumber = num;
    },
    draw: (c: CanvasRenderingContext2D) => {
      // draw player
      const sprite = playerSprites[currAction][spriteIdx];
      c.drawImage(sprite, x, y, 59, height);

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
    }
  };
}
