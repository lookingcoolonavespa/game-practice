import { XY } from '../../types/interfaces';
import Sprite from './Sprite';
import explosionSprites from '../sprites/explosionSprites';

export default function Explosion(position: XY) {
  const width = 32;
  const height = 32;

  let x = position.x;
  let y = position.y;

  let status: 'gone' | 'disappearing' = 'disappearing';

  const sprite = Sprite(explosionSprites, 'explosion');

  function disappear() {
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
    increaseSpriteIdx() {
      sprite.increaseSpriteIdx();
    },
    resetSpriteIdx() {
      sprite.resetSpriteIdx();
    },
    draw(c: CanvasRenderingContext2D) {
      c.drawImage(sprite.currSprite, x - 2, y - 2);
      disappear();
    }
  };
}
