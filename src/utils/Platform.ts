import platform1 from '../assets/Environments/Platforms/Platform01.png';
import platform2 from '../assets/Environments/Platforms/Platform02.png';
import platform3 from '../assets/Environments/Platforms/Platform03.png';
import platform4 from '../assets/Environments/Platforms/Platform04.png';
import platform5 from '../assets/Environments/Platforms/Platform05.png';

function Platform(
  position: { x: number; y: number },
  size: { height: number; width: number },
  imageSrc: 'string'
) {
  const image = new Image();
  image.src = imageSrc;

  const height = size.height;
  const width = size.width;

  function updatePosition(updated: { x: number; y: number }) {
    position = updated;
  }

  function draw(c: CanvasRenderingContext2D) {
    c.drawImage(image, position.x, position.y);
  }

  return {
    draw,
    get x() {
      return position.x;
    },
    get y() {
      return position.y;
    },
    updatePosition,
    get width() {
      return width;
    },
    get height() {
      return height;
    }
  };
}

export function Platform1(position: { x: number; y: number }) {
  return Platform(position, { height: 47, width: 99 }, platform1);
}
export function Platform2(position: { x: number; y: number }) {
  return Platform(position, { height: 36, width: 90 }, platform2);
}
export function Platform3(position: { x: number; y: number }) {
  return Platform(position, { height: 47, width: 137 }, platform3);
}
export function Platform4(position: { x: number; y: number }) {
  return Platform(position, { height: 172, width: 69 }, platform4);
}
export function Platform5(position: { x: number; y: number }) {
  return Platform(position, { height: 64, width: 64 }, platform5);
}
