import { useState, useEffect, useRef } from 'react';
import { PlatformInterface, XY } from '../../types/interfaces';
import {
  Platform1,
  Platform2,
  Platform3,
  Platform4,
  Platform5
} from '../Platform';
import {
  checkCollideTop,
  checkCollideSide,
  checkCollideBottom,
  getDepthOfCollision
} from '../checkCollision';
import { getPlatformsToFillUpAxis } from '../misc';

export default function useGame(canvas: HTMLCanvasElement | null) {
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

  useEffect(
    function addFloor() {
      if (!canvas) return;

      const floor = Array(3)
        .fill(Platform4({ x: -5, y: canvas.height - 168 }))
        .map((platform, i) => {
          if (i === 0) return platform;

          return { ...platform, x: platform.x * (i + 1) + platform.width * i };
        });
      const floorAboveFloor = floor.map((platform) => ({
        ...platform,
        y: canvas.height - 82
      }));

      setState((prev) => ({
        ...prev,
        platforms: [...prev.platforms, ...floor, ...floorAboveFloor]
      }));
    },
    [canvas]
  );

  useEffect(
    function addLeftWall() {
      if (!canvas) return;

      const wall = getPlatformsToFillUpAxis(
        Platform4,
        { x: -5, y: 0 },
        'y',
        canvas.height
      );
      const wallBehindWall = wall.map((platform) => ({ ...platform, x: -70 }));

      setState((prev) => ({
        ...prev,
        platforms: [...prev.platforms, ...wall, ...wallBehindWall]
      }));
    },
    [canvas]
  );

  const [state, setState] = useState({
    playerPosition: {
      x: 100,
      y: 100
    },
    platforms: [Platform1({ x: 200, y: 700 }), Platform4({ x: 800, y: 700 })]
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

  function update(canvas: HTMLCanvasElement | null) {
    setState((prev): { playerPosition: XY; platforms: PlatformInterface[] } => {
      if (!canvas) return prev;

      const { playerPosition, platforms } = prev;
      let platformXVelocity = 0;

      let onPlatform = platforms.some((p) =>
        checkCollideTop(p, {
          x: playerPosition.x,
          y: playerPosition.y,
          velocity: velocity.current,
          width: playerSize.width,
          height: playerSize.height
        })
      );

      // deal with y playerPosition
      if (
        // on platform or on ground
        (onPlatform && !keyPressRef.current.down) ||
        playerPosition.y + playerSize.height + velocity.current.y >=
          canvas.height
      ) {
        velocity.current.y = 0;

        sameJumpRef.current = false;
      }

      runKeyPress();

      // check for collision
      const player = {
        x: playerPosition.x,
        y: playerPosition.y,
        velocity: velocity.current,
        width: playerSize.width,
        height: playerSize.height
      };
      while (
        platforms.some((p) =>
          checkCollideSide(
            { ...p, velocityX: platformXVelocity },
            player
            // so player actually collides with platform instead of stopping with a gap in between the two
          )
        )
      ) {
        // if player isnt moving, then the platform is
        if (velocity.current.x) {
          if (velocity.current.x < 1) velocity.current.x = 0;
          else velocity.current.x /= 2;
        } else {
          if (platformXVelocity < 1) platformXVelocity = 0;
          else platformXVelocity /= 2;
        }
      }

      while (platforms.some((p) => checkCollideBottom(p, player))) {
        velocity.current.y /= 2;
      }

      onPlatform = platforms.some((p) => checkCollideTop(p, player));
      if (
        // in air
        playerPosition.y + playerSize.height + velocity.current.y <
          canvas.height &&
        !onPlatform
      ) {
        velocity.current.y += gravity;
      } else {
        jumpNumberRef.current = 0; // dont want to reset jump number in air
      }

      return {
        platforms: platforms.map((platform) => ({
          ...platform,
          x: platform.x + platformXVelocity
        })),
        playerPosition: {
          x: playerPosition.x + velocity.current.x,
          y: playerPosition.y + velocity.current.y
        }
      };

      function runKeyPress() {
        if (!canvas) return;
        const speed = 10;
        const jumpHeight = 20;

        const boundaryRight = 800;
        const boundaryLeft = 100;

        if (keyPressRef.current.right) velocity.current.x = speed;
        if (keyPressRef.current.left) velocity.current.x = -speed;
        if (!keyPressRef.current.left && !keyPressRef.current.right)
          velocity.current.x = 0;

        if (
          (keyPressRef.current.right &&
            playerPosition.x + velocity.current.x >= boundaryRight) ||
          (keyPressRef.current.left &&
            playerPosition.x + velocity.current.x <= boundaryLeft)
        ) {
          platformXVelocity =
            keyPressRef.current.right &&
            playerPosition.x + velocity.current.x >= boundaryRight
              ? -speed
              : speed;

          velocity.current.x = 0;
        }

        if (keyPressRef.current.up && jumpNumberRef.current <= 2) {
          if (!sameJumpRef.current) velocity.current.y = -jumpHeight;
          keyPressRef.current.up = false;
        }
      }
    });
  }

  return {
    playerPosition: state.playerPosition,
    update,
    drawPlayer: (c: CanvasRenderingContext2D) => {
      c.fillStyle = 'red';
      c.fillRect(
        state.playerPosition.x,
        state.playerPosition.y,
        playerSize.width,
        playerSize.height
      );
    },
    drawPlatforms: (c: CanvasRenderingContext2D) => {
      state.platforms.forEach((p) => c.drawImage(p.image, p.x, p.y));
    }
  };
}
