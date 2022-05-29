import { useState, useEffect, useRef } from 'react';
import { XY } from '../../types/interfaces';
import {
  Platform1,
  Platform2,
  Platform3,
  Platform4,
  Platform5
} from '../Platform';
import checkCollision, {
  checkCollideTop,
  checkCollideSide,
  checkCollideBottom
} from '../checkCollision';

const platforms = [
  Platform1({ x: 200, y: 700 }),
  Platform4({ x: 800, y: 700 })
];

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
  console.log(playerPosition.y);
  function update(canvas: HTMLCanvasElement | null) {
    setPlayerPosition((prev): XY => {
      if (!canvas) return prev;

      const collision = platforms.some((p) =>
        checkCollideTop(p, {
          x: prev.x,
          y: prev.y,
          velocity: velocity.current,
          width: playerSize.width,
          height: playerSize.height
        })
      );

      // need to deal with collision top, collision side, in the air, on the ground

      // deal with y playerPosition
      if (
        // on platform
        collision &&
        !keyPressRef.current.down
      ) {
        // this block needs to be first otherwise player wouldnt fall to the ground, they would teleport
        velocity.current.y = 0;

        sameJumpRef.current = false;

        runKeyPress();
        if (
          platforms.some((p) =>
            checkCollideTop(p, {
              x: prev.x,
              y: prev.y,
              velocity: velocity.current,
              width: playerSize.width,
              height: playerSize.height
            })
          )
        ) {
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
        const player = {
          x: prev.x,
          y: prev.y,
          velocity: velocity.current,
          width: playerSize.width,
          height: playerSize.height
        };
        if (platforms.some((p) => checkCollideSide(p, player)))
          velocity.current.x = 0;
        if (platforms.some((p) => checkCollideBottom(p, player)))
          velocity.current.y = 0;

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

      function runKeyPress() {
        if (!canvas) return;

        const boundaryRight = 800;
        const boundaryLeft = 100;

        if (keyPressRef.current.right) velocity.current.x = 10;
        if (keyPressRef.current.left) velocity.current.x = -10;
        if (!keyPressRef.current.left && !keyPressRef.current.right)
          velocity.current.x = 0;

        if (
          (keyPressRef.current.right &&
            prev.x + velocity.current.x >= boundaryRight) ||
          (keyPressRef.current.left &&
            prev.x + velocity.current.x <= boundaryLeft)
        ) {
          const platformXVelocity =
            keyPressRef.current.right &&
            prev.x + velocity.current.x >= boundaryRight
              ? -10
              : 10;

          velocity.current.x = 0;

          platforms.forEach((platform) => {
            platform.updatePosition({
              y: platform.y,
              x: platform.x + platformXVelocity
            });
          });
        }

        if (keyPressRef.current.up && jumpNumberRef.current <= 2) {
          if (!sameJumpRef.current) velocity.current.y = -30;
          keyPressRef.current.up = false;
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
