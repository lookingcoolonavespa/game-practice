import { useState, useReducer, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface State {
  playerPosition: Position;
  platformPosition: Position;
}

export default function useGame() {
  const playerSize = {
    height: 50,
    width: 50
  };
  const platformSize = {
    height: 20,
    width: 200
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

  const [{ playerPosition, platformPosition }, dispatch] = useReducer(
    (state: State, canvas: HTMLCanvasElement | null): State => {
      if (!canvas) return state;

      let { playerPosition, platformPosition } = state;

      const collision = checkCollision();

      // deal with y playerPosition
      if (
        // in air
        playerPosition.y + playerSize.height + velocity.current.y <
          canvas.height &&
        !collision
      ) {
        runKeyPress();
        velocity.current.y += gravity;

        return {
          playerPosition: {
            x: playerPosition.x + velocity.current.x,
            y: playerPosition.y + velocity.current.y
          },
          platformPosition
        };
      } else if (
        // on platform
        collision
      ) {
        velocity.current.y = 0;
        sameJumpRef.current = false;

        runKeyPress();
        if (checkCollision()) {
          jumpNumberRef.current = 0; // need to make sure player is on platform after keyPress
        }
        return {
          playerPosition: {
            x: playerPosition.x + velocity.current.x,
            y: playerPosition.y + velocity.current.y
          },
          platformPosition
        };
      } else {
        // on the ground
        velocity.current.y = 0;
        sameJumpRef.current = false;

        runKeyPress();
        if (
          !(
            playerPosition.y + playerSize.height + velocity.current.y <
            canvas.height
          )
        ) {
          jumpNumberRef.current = 0;
        }

        return {
          playerPosition: {
            x: playerPosition.x + velocity.current.x,
            y: canvas.height - playerSize.height
          },
          platformPosition
        };
      }

      function checkCollision() {
        const collideY =
          playerPosition.y + playerSize.height <= platformPosition.y &&
          playerPosition.y + playerSize.height + velocity.current.y >=
            platformPosition.y;
        const collideX =
          platformPosition.x <= playerPosition.x + playerSize.width &&
          playerPosition.x <= platformPosition.x + platformSize.width;
        if (collideX && collideY) return true;
      }

      function runKeyPress() {
        if (!canvas) return;
        if (keyPressRef.current.right) {
          if (playerPosition.x + velocity.current.x >= 800) {
            velocity.current.x = 0;
            platformPosition = {
              ...platformPosition,
              x: platformPosition.x - 10
            };
          } else velocity.current.x = 10;
        }
        if (keyPressRef.current.left) {
          if (playerPosition.x + velocity.current.x <= 100) {
            velocity.current.x = 0;
            platformPosition = {
              ...platformPosition,
              x: platformPosition.x + 10
            };
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
          velocity.current.y = 5;
        }
      }
    },
    {
      playerPosition: {
        x: 100,
        y: 100
      },
      platformPosition: {
        x: 400,
        y: 700
      }
    }
  );

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

  function drawPlatform(c: CanvasRenderingContext2D) {
    c.fillStyle = 'black';
    c.fillRect(
      platformPosition.x,
      platformPosition.y,
      platformSize.width,
      platformSize.height
    );
  }

  function update(canvas: HTMLCanvasElement | null) {
    dispatch(canvas);
  }

  return { playerPosition, drawPlayer, drawPlatform, update };
}
