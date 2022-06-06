import { BulletInterface, PlayerInterface } from '../../types/interfaces';
import { Action } from '../../types/types';

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
    }
  };
}
