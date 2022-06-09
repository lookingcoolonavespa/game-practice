import { XY } from '../../types/interfaces';
import Sprite from './Sprite';

export default function Bullet(
  position: XY,
  spriteSheet: { [key: string]: HTMLImageElement[] }
) {
  const width = 68;
  const height = 66;

  const startX = position.x;
  let x = position.x;
  let y = position.y;

  const velocity = {
    x: 0,
    y: 0
  };

  const speed = 5;

  const sprite = Sprite(spriteSheet);

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
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get currSprite() {
      return sprite.currSprite;
    },
    isMaxRange() {
      return Math.abs(x - startX) >= 500;
    },
    setVelocity(axis: 'x' | 'y', direction: 'left' | 'right') {
      velocity[axis] = direction === 'right' ? speed : -speed;
    },
    updatePosition() {
      if (velocity.x) x += velocity.x;
      if (velocity.y) y += velocity.y;
    },
    increaseSpriteIdx() {
      sprite.increaseSpriteIdx();
    },
    resetSpriteIdx() {
      sprite.resetSpriteIdx();
    },
    draw(c: CanvasRenderingContext2D) {
      c.drawImage(sprite.currSprite, x, y);
    }
  };
}
