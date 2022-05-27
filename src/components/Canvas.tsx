import { useState, useEffect, useRef } from 'react';
import Platform from '../utils/Platform';
import usePlayer from '../utils/hooks/usePlayer';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    draw: drawPlatform,
    position: platformPosition,
    width: platformWidth,
    height: platformHeight
  } = Platform();

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

  // useEffect(() => {
  //   checkCollision();
  // });

  // function checkCollision() {
  //   const collideX =
  //     playerPosition.x + playerWidth >= platformPosition.x &&
  //     playerPosition.x <= platformPosition.x + platformWidth;
  //   const collideY =
  //     playerPosition.y <= platformPosition.y + platformHeight &&
  //     playerPosition.y + playerHeight >= platformPosition.y;

  //   if (collideX && collideY) {
  //     killPlayerVelocity('y');
  //   }
  // }

  return (
    <canvas
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
    ></canvas>
  );
}
