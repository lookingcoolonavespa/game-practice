import { XY } from '../../types/interfaces';
import Sprite from './Sprite';

export default function Bullet(
  position: XY,
  spriteSheet: { [key: string]: HTMLImageElement[] }
) {
  const width = 32;
  const height = 32;

  const startX = position.x;
  let x = position.x;
  let y = position.y;

  const velocity = {
    x: 0,
    y: 0
  };

  let status: 'alive' | 'gone' | 'disappearing' = 'alive';

  const speed = 5;

  const sprite = Sprite(spriteSheet);

  function disappear() {
    sprite.updateAction('poof');
    status = 'disappearing';
    if (sprite.resolveAnimationEnd()) {
      status = 'gone';
    }
  }

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
    get status() {
      return status;
    },
    isMaxRange() {
      return Math.abs(x - startX) >= 300;
    },
    async stop() {
      velocity.x = 0;
      velocity.y = 0;
      disappear();
    },
    setVelocity(axis: 'x' | 'y', direction: 'left' | 'right') {
      velocity[axis] = direction === 'right' ? speed : -speed;
    },
    updateAction(action: keyof typeof spriteSheet) {
      sprite.updateAction(action);
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
      c.drawImage(sprite.currSprite, x - 2, y - 2);
    }
  };
}
