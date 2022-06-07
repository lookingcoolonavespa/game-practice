import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import { Action } from '../../types/types';
import playerSprites from '../sprites/playerSprites';
import bulletSprites from '../sprites/bulletSprites';
import gunSprites from '../sprites/gunSprites';

export default function Player(): PlayerInterface {
  let x = 100;
  let y = 100;
  const velocity = {
    x: 0,
    y: 0
  };
  const height = 50;
  const width = 45;
  const bullets: BulletInterface[] = [];
  let currAction: Action = 'idle';

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
    draw: (c: CanvasRenderingContext2D, currIdx: number) => {
      // draw player
      c.drawImage(playerSprites[currAction][currIdx], x, y, 59, height);
      console.log(playerSprites[currAction][currIdx]);

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
