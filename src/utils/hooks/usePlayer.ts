import { useState, useEffect, useRef } from 'react';

export default function usePlayer() {
  const height = 50;
  const width = 50;

  const keyPressRef = useRef({
    up: false,
    left: false,
    right: false
  });

  const [position, setPosition] = useState({
    x: 100,
    y: 100
  });

  const gravity = 0.5;

  const velocity = useRef({
    x: 0,
    y: 0
  });

  useEffect(function addArrowEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const arrowDirections: {
      ArrowLeft: 'left';
      ArrowRight: 'right';
      ArrowUp: 'up';
    } = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up'
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

    function handleKeyDown(e: KeyboardEvent) {
      if (!Object.keys(arrowDirections).includes(e.key)) return;

      const arrowKey = e.key as keyof typeof arrowDirections;

      const direction = arrowDirections[arrowKey];

      keyPressRef.current[direction] = true;
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (!Object.keys(arrowDirections).includes(e.key)) return;

      const arrowKey = e.key as keyof typeof arrowDirections;

      if (arrowKey === 'ArrowLeft' || arrowKey === 'ArrowRight')
        velocity.current.x = 0;

      const direction = arrowDirections[arrowKey];
      keyPressRef.current[direction] = false;
    }
  }, []);

  function draw(c: CanvasRenderingContext2D) {
    c.fillStyle = 'red';
    c.fillRect(position.x, position.y, width, height);
  }

  function update(canvas: HTMLCanvasElement | null) {
    setPosition((prev) => {
      if (!canvas) return prev;

      if (keyPressRef.current.right) velocity.current.x = 10;
      if (keyPressRef.current.left) velocity.current.x = -10;
      if (keyPressRef.current.up && prev.y + height === canvas.height) {
        velocity.current.y = -30;
      }
      // deal with y position
      if (prev.y + height + velocity.current.y <= canvas.height) {
        velocity.current.y += gravity;
        return {
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        };
      } else {
        velocity.current.y = 0;
        return {
          x: prev.x + velocity.current.x,
          y: canvas.height - height
        };
      }
    });
  }

  return { position, draw, update };
}
