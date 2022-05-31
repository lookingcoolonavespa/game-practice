import platform1 from '../assets/Environments/Platforms/Platform01.png';
import platform2 from '../assets/Environments/Platforms/Platform02.png';
import platform3 from '../assets/Environments/Platforms/Platform03.png';
import platform4 from '../assets/Environments/Platforms/Platform04.png';
import platform5 from '../assets/Environments/Platforms/Platform05.png';
import { FloorInterface, Size, XY } from '../types/interfaces';

function Platform(position: XY, size: Size, imageSrc?: 'string') {
  const image = new Image();
  if (imageSrc) image.src = imageSrc;

  const height = size.height;
  const width = size.width;

  return {
    x: position.x,
    y: position.y,
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get image() {
      return image;
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
    draw: function (this: FloorInterface, c: CanvasRenderingContext2D) {
      c.drawImage(beginImg, this.x, this.y);

      c.drawImage(endImg, this.x + width - 69, this.y);

      c.fillStyle = 'black';
      c.fillRect(this.x + 59, this.y, width - 69 * 2 + 20, 172);
    }
  };
}
