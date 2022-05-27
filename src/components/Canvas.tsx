import { useState, useEffect, useRef } from 'react';
import usePlatform from '../utils/hooks/usePlatform';
import usePlayer from '../utils/hooks/usePlayer';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    draw: drawPlatform,
    position: platformPosition,
    width: platformWidth,
    height: platformHeight
  } = usePlatform();

  const {
    position: playerPosition,
    draw: drawPlayer,
    update: updatePlayer
  } = usePlayer(platformPosition, {
    height: platformHeight,
    width: platformWidth
  });

  useEffect(
    function draw() {
      if (!canvasRef.current) return;
      const c = canvasRef.current?.getContext('2d');
      if (!c) return;

      c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      drawPlatform(c);
      drawPlayer(c);
    },
    [playerPosition]
  );

  const animate = () => {
    requestAnimationFrame(animate);

    updatePlayer(canvasRef.current);
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
