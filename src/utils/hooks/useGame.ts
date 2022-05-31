import { useState, useEffect, useRef } from 'react';
import { FloorInterface, PlatformInterface, XY } from '../../types/interfaces';
import {
  FloorPlatform,
  Platform1,
  Platform2,
  Platform3,
  Platform4,
  Platform5
} from '../Platform';
import {
  checkCollideTop,
  checkCollideSide,
  checkCollideBottom
} from '../checkCollision';
import { getPlatformsToFillUpAxis } from '../misc';

import playerSprites from '../playerSpirtes';

let currIdx = 0;
let frameCount = 0;

const initValues = {
  playerPosition: {
    x: 100,
    y: 100
  },
  platforms: [
    // Platform1({ x: 300, y: 700 }), Platform4({ x: 800, y: 700 })
  ],
  currSprite: playerSprites.idle
};

export default function useGame(canvas: HTMLCanvasElement | null) {
  const [state, setState] = useState<{
    playerPosition: XY;
    platforms: (PlatformInterface | FloorInterface)[];
    currSprite: HTMLImageElement[];
  }>(initValues);
  const [newGame, setNewGame] = useState(false);

  const playerSize = {
    height: 50,
    width: 59
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
      if (!canvas || newGame) return;

      const floor = [
        FloorPlatform({ x: -10, y: canvas.height - 168 }, 800),
        FloorPlatform({ x: 960, y: canvas.height - 168 }, 800)
      ];

      setState((prev) => ({
        ...prev,
        platforms: [...prev.platforms, ...floor]
      }));
    },
    [canvas, newGame]
  );

  useEffect(
    function addLeftWall() {
      if (!canvas || newGame) return;

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
    [canvas, newGame]
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

  function update(canvas: HTMLCanvasElement | null) {
    setState(
      (
        prev
      ): {
        playerPosition: XY;
        platforms: PlatformInterface[];
        currSprite: HTMLImageElement[];
      } => {
        if (!canvas) return prev;

        let { playerPosition, platforms, currSprite } = prev;

        frameCount++;
        if (frameCount === 12) {
          if (currIdx === currSprite.length - 1) currIdx = 0;
          currIdx++;
          frameCount = 0;
        }

        if (playerPosition.y > canvas.height) {
          setNewGame(true);
          return prev;
        }

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
          onPlatform &&
          !keyPressRef.current.down
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

        onPlatform = platforms.some((p) =>
          checkCollideTop({ ...p, x: p.x + platformXVelocity }, player)
        );
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

        if (velocity.current.x || platformXVelocity)
          currSprite = playerSprites.run;
        else currSprite = playerSprites.idle;

        return {
          currSprite,
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
          const speed = 5;
          const jumpHeight = 20;

          const boundaryRight = canvas.width / 2 - playerSize.width;
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
      }
    );
  }

  return {
    newGame,
    update,
    playerPosition: state.playerPosition,
    drawPlayer: (c: CanvasRenderingContext2D) => {
      c.drawImage(
        state.currSprite[currIdx],
        state.playerPosition.x,
        state.playerPosition.y,
        59,
        playerSize.height
      );
    },
    drawPlatforms: (c: CanvasRenderingContext2D) => {
      state.platforms.forEach((p) => {
        if ('draw' in p) p.draw(c);
        else c.drawImage(p.image, p.x, p.y);
      });
    },
    startNewGame: () => {
      setState(initValues);
      setNewGame(false);
    }
  };
}
