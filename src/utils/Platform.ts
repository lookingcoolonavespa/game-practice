import platform1 from '../assets/Environments/Platforms/Platform01.png';

export default function Platform(position: { x: number; y: number }) {
  const image = new Image();
  image.src = platform1;

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
