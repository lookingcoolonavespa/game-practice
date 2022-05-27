import { useState, useEffect, useRef } from 'react';

export default function Platform() {
  const height = 20;
  const width = 200;

  const [position, setPosition] = useState({
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
    setPosition,
    width,
    height
  };
}
