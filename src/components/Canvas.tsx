import { useState, useEffect, useRef } from 'react';
import useGame from '../utils/hooks/useGame';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { drawPlayer, drawPlatforms, update, playerPosition } = useGame(
    canvasRef.current
  );

  useEffect(
    function draw() {
      if (!canvasRef.current) return;
      const c = canvasRef.current?.getContext('2d');
      if (!c) return;

      c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      c.fillStyle = 'black';
      c.fillRect(0, 0, canvasRef.current.width, 160);

      drawPlatforms(c);
      drawPlayer(c);
    },
    [playerPosition]
  );

  const animate = () => {
    requestAnimationFrame(animate);

    update(canvasRef.current);
  };

  useEffect(function runAnime() {
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
