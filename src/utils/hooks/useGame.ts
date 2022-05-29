import { useState, useEffect, useRef } from 'react';
import Platform from '../Platform';

interface Position {
  x: number;
  y: number;
}

const platforms = [Platform({ x: 200, y: 700 }), Platform({ x: 800, y: 700 })];

export default function useGame() {
  const playerSize = {
    height: 50,
    width: 50
  };

  const keyPressRef = useRef({
    up: false,
    left: false,
    right: false,
    down: false
  });

  const gravity = 0.5;

  const velocity = useRef({
    x: 0,
    y: 0
  });

  const jumpNumberRef = useRef(0);
  const sameJumpRef = useRef(false);

  const [playerPosition, setPlayerPosition] = useState({
    x: 100,
    y: 100
  });

  useEffect(function addArrowEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const arrowDirections: {
      ArrowLeft: 'left';
      ArrowRight: 'right';
      ArrowUp: 'up';
      ArrowDown: 'down';
    } = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down'
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

    function handleKeyDown(e: KeyboardEvent) {
      if (!Object.keys(arrowDirections).includes(e.key)) return;

      const arrowKey = e.key as keyof typeof arrowDirections;

      const direction = arrowDirections[arrowKey];

      if (direction === 'up') {
        if (e.repeat) sameJumpRef.current = true;
        else jumpNumberRef.current++;
      }
      keyPressRef.current[direction] = true;
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (!Object.keys(arrowDirections).includes(e.key)) return;

      const arrowKey = e.key as keyof typeof arrowDirections;

      const direction = arrowDirections[arrowKey];
      keyPressRef.current[direction] = false;
    }
  }, []);

  function drawPlayer(c: CanvasRenderingContext2D) {
    c.fillStyle = 'red';
    c.fillRect(
      playerPosition.x,
      playerPosition.y,
      playerSize.width,
      playerSize.height
    );
  }

  function update(canvas: HTMLCanvasElement | null) {
    setPlayerPosition((prev): Position => {
      if (!canvas) return prev;

      const collision = checkCollision();

      // deal with y playerPosition
      if (
        // on platform
        collision &&
        !keyPressRef.current.down
      ) {
        velocity.current.y = 0;
        sameJumpRef.current = false;

        runKeyPress();
        if (checkCollision()) {
          jumpNumberRef.current = 0; // need to make sure player is on platform after keyPress
        }
        return {
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        };
      } else if (
        // in air
        prev.y + playerSize.height + velocity.current.y <
        canvas.height
      ) {
        runKeyPress();
        velocity.current.y += gravity;

        return {
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        };
      } else {
        // on the ground
        velocity.current.y = 0;
        sameJumpRef.current = false;

        runKeyPress();
        if (
          !(prev.y + playerSize.height + velocity.current.y < canvas.height)
        ) {
          jumpNumberRef.current = 0;
        }

        return {
          x: prev.x + velocity.current.x,
          y: canvas.height - playerSize.height
        };
      }

      function checkCollision() {
        for (const platform of platforms) {
          const collideY =
            prev.y + playerSize.height <= platform.position.y &&
            prev.y + playerSize.height + velocity.current.y >=
              platform.position.y;
          const collideX =
            platform.position.x <= prev.x + playerSize.width &&
            prev.x <= platform.position.x + platform.width;
          if (collideX && collideY) return true;
        }
      }

      function runKeyPress() {
        if (!canvas) return;
        if (keyPressRef.current.right) {
          if (prev.x + velocity.current.x >= 800) {
            velocity.current.x = 0;
            platforms.forEach((platform) => {
              platform.updatePosition({
                ...platform.position,
                x: platform.position.x - 10
              });
            });
          } else velocity.current.x = 10;
        }

        if (keyPressRef.current.left) {
          if (prev.x + velocity.current.x <= 100) {
            velocity.current.x = 0;
            platforms.forEach((platform) => {
              platform.updatePosition({
                ...platform.position,
                x: platform.position.x + 10
              });
            });
          } else velocity.current.x = -10;
        }

        if (!keyPressRef.current.left && !keyPressRef.current.right)
          velocity.current.x = 0;

        if (keyPressRef.current.up) {
          if (jumpNumberRef.current <= 2) {
            if (!sameJumpRef.current) velocity.current.y = -30;
            keyPressRef.current.up = false;
          }
        }

        if (keyPressRef.current.down) {
          // velocity.current.y = 5;
        }
      }
    });
  }

  return {
    playerPosition,
    drawPlayer,
    update,
    drawPlatforms: (c: CanvasRenderingContext2D) => {
      platforms.forEach((p) => p.draw(c));
    }
  };
}
