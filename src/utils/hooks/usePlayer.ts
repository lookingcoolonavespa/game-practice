import { useState, useEffect, useRef } from 'react';

export default function usePlayer(
  platformPosition: { x: number; y: number },
  platformSize: { height: number; width: number }
) {
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

  const jumpNumberRef = useRef(0);

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

      if (direction === 'up') jumpNumberRef.current++;
      console.log(jumpNumberRef.current);

      // first arrowup keydown set jump = 1
      // second arrowup keydown set jump = 2
      // reset jump to 0 when jump is finished
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (!Object.keys(arrowDirections).includes(e.key)) return;

      const arrowKey = e.key as keyof typeof arrowDirections;

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
      // if (velocity.current.y === 0) jumpNumberRef.current = 0;
      // deal with y position
      if (
        // in air
        prev.y + height + velocity.current.y < canvas.height &&
        !checkCollision()
      ) {
        runKeyPress();
        velocity.current.y += gravity;

        return {
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        };
      } else if (
        // on platform
        checkCollision()
      ) {
        velocity.current.y = 0;
        runKeyPress();
        if (checkCollision()) jumpNumberRef.current = 0;

        return {
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        };
      } else {
        // on the ground
        velocity.current.y = 0;
        runKeyPress();
        if (!(prev.y + height + velocity.current.y < canvas.height))
          jumpNumberRef.current = 0;

        return {
          x: prev.x + velocity.current.x,
          y: canvas.height - height
        };
      }

      function checkCollision() {
        const collideY =
          prev.y + height <= platformPosition.y &&
          prev.y + height + velocity.current.y >= platformPosition.y;
        const collideX =
          platformPosition.x <= prev.x + width &&
          prev.x <= platformPosition.x + platformSize.width;
        if (collideX && collideY) return true;
      }

      function runKeyPress() {
        if (!canvas) return;
        if (keyPressRef.current.right) velocity.current.x = 10;
        if (keyPressRef.current.left) velocity.current.x = -10;
        if (!keyPressRef.current.left && !keyPressRef.current.right)
          velocity.current.x = 0;
        if (keyPressRef.current.up) {
          if (jumpNumberRef.current <= 2) {
            velocity.current.y = -30;
            keyPressRef.current.up = false;
          }
        }
      }
    });
  }

  return { position, width, height, draw, update };
}
