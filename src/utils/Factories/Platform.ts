import platform1 from '../../assets/Environments/Platforms/Platform01.png';
import platform2 from '../../assets/Environments/Platforms/Platform02.png';
import platform3 from '../../assets/Environments/Platforms/Platform03.png';
import platform4 from '../../assets/Environments/Platforms/Platform04.png';
import platform5 from '../../assets/Environments/Platforms/Platform05.png';
import {
  FloorInterface,
  PlatformInterface,
  Size,
  XY
} from '../../types/interfaces';
import { createImage } from '../misc';

function Platform(
  position: XY,
  size: Size,
  imageSrc?: 'string'
): PlatformInterface {
  const image = new Image();
  if (imageSrc) image.src = imageSrc;

  let { x, y } = position;

  const height = size.height;
  const width = size.width;

  const velocity = {
    x: 0
  };

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
    get image() {
      return image;
    },
    updateXPosition: () => {
      x += velocity.x;
    },
    updateVelocityX: (num: number) => {
      velocity.x = num;
    },
    draw: function (c: CanvasRenderingContext2D) {
      if ('type' in this) {
        switch (this.type) {
          case 'floor': {
            c.fillStyle = 'black';
            c.fillRect(x + 59, y, width - 59 * 2 + 20, 172);

            c.drawImage(image, x, y);

            c.drawImage(image, x + width - 59, y);
            break;
          }
          case 'wall': {
            c.drawImage(image, x, y);

            c.fillRect(x - 398, y, 400, 172);
          }
        }
      } else c.drawImage(image, x, y);
    }
  };
}

export function Platform1(position: XY) {
  return Platform(position, { height: 47, width: 99 }, platform1);
}
export function Platform2(position: XY) {
  return Platform(position, { height: 36, width: 90 }, platform2);
}
export function Platform3(position: XY) {
  return Platform(position, { height: 47, width: 137 }, platform3);
}
export function Platform4(position: XY) {
  return Platform(position, { height: 172, width: 69 }, platform4);
}
export function Platform5(position: XY) {
  return Platform(position, { height: 64, width: 64 }, platform5);
}

export function FloorPlatform(position: XY, width: number): FloorInterface {
  const beginImg = new Image();
  beginImg.src = platform4;

  const endImg = new Image();
  endImg.src = platform4;

  const platform = Platform(position, { width, height: 172 }, platform4);

  return Object.create(platform, {
    type: { value: 'floor', enumerable: true }
  });
}

export function WallPlatform(position: XY) {
  const platform = Platform4(position);

  return Object.create(platform, {
    type: {
      value: 'wall',
      enumerable: true
    }
  });
}
