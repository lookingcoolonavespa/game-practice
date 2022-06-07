import platform1 from '../../assets/Environments/Platforms/Platform01.png';
import platform2 from '../../assets/Environments/Platforms/Platform02.png';
import platform3 from '../../assets/Environments/Platforms/Platform03.png';
import platform4 from '../../assets/Environments/Platforms/Platform04.png';
import platform5 from '../../assets/Environments/Platforms/Platform05.png';
import { Size, XY } from '../../types/interfaces';
import { createImage } from '../misc';

function Platform(position: XY, size: Size, imageSrc?: 'string') {
  const image = new Image();
  if (imageSrc) image.src = imageSrc;

  let { x, y } = position;

  const height = size.height;
  const width = size.width;

  let velocityX = 0;

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get velocityX() {
      return velocityX;
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
      x += velocityX;
    },
    updateVelocityX: (num: number) => {
      velocityX = num;
    },
    draw: function (c: CanvasRenderingContext2D) {
      if ('type' in this) {
        c.drawImage(image, x, y);

        c.drawImage(image, x + width - 69, y);

        c.fillStyle = 'black';
        c.fillRect(x + 59, y, width - 69 * 2 + 20, 172);
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

export function FloorPlatform(position: XY, width: number) {
  const beginImg = new Image();
  beginImg.src = platform4;

  const endImg = new Image();
  endImg.src = platform4;

  return {
    ...Platform(position, { width, height: 172 }),
    type: 'floor',
    image: createImage(platform4)
    // draw: function (this: FloorInterface, c: CanvasRenderingContext2D) {
    //   c.drawImage(beginImg, this.x, this.y);

    //   c.drawImage(endImg, this.x + width - 69, this.y);

    //   c.fillStyle = 'black';
    //   c.fillRect(this.x + 59, this.y, width - 69 * 2 + 20, 172);
    // }
  };
}
