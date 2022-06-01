import { XY } from '../../types/interfaces';

export default function Bullet(position: XY) {
  const width = 68;
  const height = 66;

  return {
    spriteIdx: 0,
    x: position.x,
    y: position.y,
    velocityX: 5,
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get startX() {
      return position.x;
    }
  };
}
