import { SpriteSheetInterface, XY } from '../../types/interfaces';
import Sprite from './Sprite';

export default function Bullet(
  position: XY,
  spriteSheet: SpriteSheetInterface
) {
  const width = 32;
  const height = 32;

  const startX = position.x;
  let x = position.x;
  let y = position.y;

  let distanceTraveled = 0;

  const velocity = {
    x: 0,
    y: 0
  };

  let status: 'active' | 'gone' | 'disappearing' = 'active';

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
    get distanceTraveled() {
      return distanceTraveled;
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
      return Math.abs(distanceTraveled) >= 300;
    },
    stop() {
      velocity.x = 0;
      velocity.y = 0;
      disappear();
    },
    shiftXBy(amount: number) {
      x += amount;
    },
    setVelocity(axis: 'x' | 'y', direction: 'left' | 'right') {
      sprite.updateDirection(direction);
      velocity[axis] = direction === 'right' ? speed : -speed;
    },
    updateAction(action: keyof typeof spriteSheet) {
      sprite.updateAction(action);
    },
    updatePosition() {
      distanceTraveled += Math.abs(velocity.x);
      x += velocity.x;
    },
    increaseSpriteIdx() {
      sprite.increaseSpriteIdx();
    },
    resetSpriteIdx() {
      sprite.resetSpriteIdx();
    },
    draw(c: CanvasRenderingContext2D) {
      c.drawImage(sprite.currSprite, x - 2, y - 2);
      c.fillRect(x, y, width, height);
    }
  };
}
