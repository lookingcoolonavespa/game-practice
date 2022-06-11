import { BulletInterface, Size, XY } from '../../types/interfaces';
import bulletSprites from '../sprites/bulletSprites';
import Bullet from './Bullet';

export default function Entity(size: Size, position: XY) {
  const height = size.height;
  const width = size.width;

  let x = position.x;
  let y = position.y;

  const velocity = {
    x: 0,
    y: 0
  };

  let direction: 'right' | 'left' = 'right';

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
    get direction() {
      return direction;
    },
    updatePosition() {
      x += velocity.x;
      y += velocity.y;
    },
    setPosition(position: XY) {
      x = position.x;
      y = position.y;
    },
    updateVelocity(axis: 'x' | 'y', amount: number) {
      velocity[axis] = amount;
    },
    updateDirection(newDirection: 'left' | 'right') {
      direction = newDirection;
    },
    onCollideWall(axis: 'x' | 'y') {
      if (velocity[axis] < 1) return (velocity[axis] = 0);
      velocity[axis] /= 2;
    }
  };
}
