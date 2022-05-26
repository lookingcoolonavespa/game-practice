import { useState, useEffect, useRef } from 'react';

export default function Player() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const height = 50;
  const width = 50;

  const [position, setPosition] = useState({
    x: 100,
    y: 100
  });

  const gravity = 0.5;

  const velocity = useRef({
    x: 0,
    y: 0
  });

  useEffect(
    function draw() {
      if (!canvasRef.current) return;
      const c = canvasRef.current?.getContext('2d');
      if (!c) return;

      c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      c.fillStyle = 'red';
      c.fillRect(position.x, position.y, width, height);
    },
    [position]
  );

  const animate = () => {
    requestAnimationFrame(animate);
    setPosition((prev) => {
      if (!canvasRef.current) return prev;

      if (prev.y + height + velocity.current.y <= canvasRef.current.height) {
        velocity.current.y += gravity;
        return { ...prev, y: prev.y + velocity.current.y };
      } else {
        velocity.current.y = 0;
        return prev;
      }
    });
  };

  useEffect(function update() {
    requestAnimationFrame(animate);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
    ></canvas>
  );
}
