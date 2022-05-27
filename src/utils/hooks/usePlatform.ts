import { useState, useEffect, useRef } from 'react';

export default function usePlatform() {
  const height = 200;
  const width = 200;

  const [position] = useState({
    x: 400,
    y: 700
  });

  function draw(c: CanvasRenderingContext2D) {
    c.fillStyle = 'black';
    c.fillRect(position.x, position.y, width, height);
  }

  return {
    draw,
    position,
    width,
    height
  };
}
