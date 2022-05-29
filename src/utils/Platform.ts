import platform1 from '../assets/Environments/Platforms/Platform01.png';
import platform2 from '../assets/Environments/Platforms/Platform02.png';
import platform3 from '../assets/Environments/Platforms/Platform03.png';
import platform4 from '../assets/Environments/Platforms/Platform04.png';
import platform5 from '../assets/Environments/Platforms/Platform05.png';

function Platform(position: { x: number; y: number }, imageSrc: 'string') {
  const image = new Image();
  image.src = imageSrc;

  const height = image.height;
  const width = image.width;

  function updatePosition(updated: { x: number; y: number }) {
    position = updated;
  }

  function draw(c: CanvasRenderingContext2D) {
    c.drawImage(image, position.x, position.y);
  }

  return {
    draw,
    get position() {
      return position;
    },
    updatePosition,
    width,
    height
  };
}

export function Platform1(position: { x: number; y: number }) {
  return Platform(position, platform1);
}
export function Platform2(position: { x: number; y: number }) {
  return Platform(position, platform2);
}
export function Platform3(position: { x: number; y: number }) {
  return Platform(position, platform3);
}
export function Platform4(position: { x: number; y: number }) {
  return Platform(position, platform4);
}
export function Platform5(position: { x: number; y: number }) {
  return Platform(position, platform5);
}
