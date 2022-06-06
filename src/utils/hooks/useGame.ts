// import { useState, useEffect, useRef } from 'react';
// import {
//   BulletInterface,
//   GroundEnemyInterface,
//   FloorInterface,
//   PlatformInterface,
//   XY,
//   EntityWithVelocity
// } from '../../types/interfaces';
// import {
//   FloorPlatform,
//   Platform1,
//   Platform2,
//   Platform3,
//   Platform4,
//   Platform5
// } from '../Factories/Platform';
// import Bullet from '../Factories/Bullet';

// import {
//   checkCollideTop,
//   checkCollideSide,
//   checkCollideBottom,
//   checkFallOffPlatform,
//   checkOnPlatform
// } from '../checkCollision';
// import { getPlatformsToFillUpAxis } from '../misc';

// import playerSprites from '../sprites/playerSprites';
// import gunSprites from '../sprites/gunSprites';
// import bulletSprites from '../sprites/bulletSprites';
// import enemySprites from '../sprites/enemySprites';
// import Enemy, { GroundEnemy } from '../Factories/Enemy';

// interface GameState {
//   playerPosition: XY;
//   playerBullets: BulletInterface[];
//   platforms: (PlatformInterface | FloorInterface)[];
//   currAction: keyof typeof playerSprites;
//   enemies: GroundEnemyInterface[];
// }

// let currIdx = 0;
// let frameCount = 0;

// const initValues: GameState = {
//   playerPosition: {
//     x: 100,
//     y: 100
//   },
//   playerBullets: [],
//   platforms: [
//     // Platform1({ x: 300, y: 200 }), Platform4({ x: 800, y: 700 })
//   ],
//   enemies: [GroundEnemy({ x: 500, y: 200 })],
//   currAction: 'idle'
// };

// export default function useGame(canvas: HTMLCanvasElement | null) {
//   const [state, setState] = useState<GameState>(initValues);
//   const [newGame, setNewGame] = useState(false);

//   const playerSize = {
//     height: 50,
//     width: 45
//   };

//   const keyPressRef = useRef({
//     up: false,
//     left: false,
//     right: false,
//     down: false,
//     space: false
//   });

//   const gravity = 0.5;

//   const velocity = useRef({
//     x: 0,
//     y: 0
//   });

//   const jumpNumberRef = useRef(0);
//   const sameJumpRef = useRef(false);

//   const shotAvailableRef = useRef(true);
//   const shotFiredRef = useRef(0);

//   useEffect(
//     function addFloor() {
//       if (!canvas || newGame) return;

//       const floor = [
//         FloorPlatform({ x: -10, y: canvas.height - 168 }, 800),
//         FloorPlatform({ x: 960, y: canvas.height - 168 }, 800)
//       ];

//       setState((prev) => ({
//         ...prev,
//         platforms: [...prev.platforms, ...floor]
//       }));
//     },
//     [canvas, newGame]
//   );

//   useEffect(
//     function addLeftWall() {
//       if (!canvas || newGame) return;

//       const wall = getPlatformsToFillUpAxis(
//         Platform4,
//         { x: -5, y: 0 },
//         'y',
//         canvas.height
//       );
//       const wallBehindWall = wall.map((platform) => ({ ...platform, x: -70 }));

//       setState((prev) => ({
//         ...prev,
//         platforms: [...prev.platforms, ...wall, ...wallBehindWall]
//       }));
//     },
//     [canvas, newGame]
//   );

//   useEffect(function addControls() {
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     interface Controls {
//       ArrowLeft: string;
//       ArrowRight: string;
//       ArrowUp: string;
//       ArrowDown: string;
//       Space: string;
//     }

//     const controls: Controls = {
//       ArrowLeft: 'left',
//       ArrowRight: 'right',
//       ArrowUp: 'up',
//       ArrowDown: 'down',
//       Space: 'space'
//     };

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };

//     function handleKeyDown(e: KeyboardEvent) {
//       let key = e.key as keyof typeof controls;
//       if (e.key === ' ') key = 'Space';
//       if (!Object.keys(controls).includes(key)) return;

//       const keyNormalized = controls[key] as keyof typeof keyPressRef.current;

//       if (key.includes('Arrow')) {
//         if (keyNormalized === 'up') {
//           if (e.repeat) sameJumpRef.current = true;
//           else jumpNumberRef.current++;
//           console.log('in event handler', sameJumpRef.current);
//         }
//       }
//       return (keyPressRef.current[keyNormalized] = true);
//     }

//     function handleKeyUp(e: KeyboardEvent) {
//       let key = e.key as keyof typeof controls;
//       if (e.key === ' ') key = 'Space';
//       if (!Object.keys(controls).includes(key)) return;

//       const keyNormalized = controls[key] as keyof typeof keyPressRef.current;

//       keyPressRef.current[keyNormalized] = false;
//     }
//   }, []);

//   function update(canvas: HTMLCanvasElement | null) {
//     setState((prev) => {
//       if (!canvas) return prev;

//       let { playerPosition, platforms, currAction, playerBullets, enemies } =
//         prev;

//       function handleSprites() {
//         frameCount++;
//         if (frameCount === 12) {
//           if (currIdx === playerSprites[currAction].length - 1) currIdx = 0;
//           currIdx++;
//           playerBullets.forEach((b) => {
//             if (b.spriteIdx === bulletSprites.idle.length - 1) b.spriteIdx = 0;
//             b.spriteIdx++;
//           });
//           frameCount = 0;
//         }
//       }
//       handleSprites(); // change frames etc

//       if (Date.now() - shotFiredRef.current >= 500)
//         shotAvailableRef.current = true;

//       if (playerPosition.y > canvas.height) {
//         setNewGame(true);
//         return prev;
//       }

//       let platformXVelocity = 0;

//       const onPlatform = platforms.some((p) => {
//         const player = {
//           x: playerPosition.x,
//           y: playerPosition.y,
//           velocity: velocity.current,
//           width: playerSize.width,
//           height: playerSize.height
//         };
//         return checkCollideTop(p, player) || checkOnPlatform(p, player);
//       });

//       // deal with y playerPosition
//       if (
//         // on platform or on ground
//         onPlatform
//       ) {
//         velocity.current.y = 0;

//         sameJumpRef.current = false;
//       }

//       function runKeyPress() {
//         if (!canvas) return;
//         const speed = 2;
//         const jumpHeight = 20;

//         const boundaryRight = canvas.width / 2 - playerSize.width;
//         const boundaryLeft = 100;

//         const { up, down, left, right, space } = keyPressRef.current;

//         if (right) velocity.current.x = speed;
//         if (left) velocity.current.x = -speed;
//         if (!left && !right) velocity.current.x = 0;

//         if (
//           (right && playerPosition.x + velocity.current.x >= boundaryRight) ||
//           (left && playerPosition.x + velocity.current.x <= boundaryLeft)
//         ) {
//           platformXVelocity =
//             right && playerPosition.x + velocity.current.x >= boundaryRight
//               ? -speed
//               : speed;

//           velocity.current.x = 0;
//         }

//         if (up && jumpNumberRef.current <= 2) {
//           if (!sameJumpRef.current) velocity.current.y = -jumpHeight;
//           keyPressRef.current.up = false;
//         }

//         if (space && shotAvailableRef.current) {
//           shotAvailableRef.current = false;
//           shotFiredRef.current = Date.now();

//           playerBullets.push(
//             Bullet({
//               x: playerPosition.x + playerSize.width,
//               y: playerPosition.y + 18
//             })
//           );
//         }
//       }
//       runKeyPress();

//       function handleCollision(entity: EntityWithVelocity) {
//         const { velocity } = entity;

//         while (
//           platforms.some((p) =>
//             checkCollideSide(
//               { ...p, velocityX: platformXVelocity },
//               entity
//               // so player actually collides with platform instead of stopping with a gap in between the two
//             )
//           )
//         ) {
//           // if player isnt moving, then the platform is
//           if (velocity.x) {
//             if (velocity.x < 1) velocity.x = 0;
//             else velocity.x /= 2;
//           } else {
//             if (platformXVelocity < 1) platformXVelocity = 0;
//             else platformXVelocity /= 2;
//           }
//         }

//         while (platforms.some((p) => checkCollideBottom(p, entity))) {
//           if (velocity.y < 1) velocity.y = 0;
//           else velocity.y /= 2;
//         }

//         const onPlatform = platforms.some((p) =>
//           checkOnPlatform({ ...p, x: p.x + platformXVelocity }, entity)
//         );
//         return onPlatform;
//       }
//       const onPlatformAfterKeyPress = handleCollision({
//         x: playerPosition.x,
//         y: playerPosition.y,
//         velocity: velocity.current,
//         width: playerSize.width,
//         height: playerSize.height
//       }); // mutates velocity.current
//       if (
//         // in air
//         playerPosition.y + playerSize.height + velocity.current.y <
//           canvas.height &&
//         !onPlatformAfterKeyPress
//       ) {
//         velocity.current.y += gravity;
//       } else {
//         jumpNumberRef.current = 0; // dont want to reset jump number in air
//       }

//       if (velocity.current.x || platformXVelocity) currAction = 'run';
//       else currAction = 'idle';

//       function handleEnemyMovement() {
//         if (!canvas) return;

//         enemies = enemies.map((enemy) => {
//           const { x, y, width, height, velocity, direction } = enemy;

//           if (
//             // in air
//             y + height + velocity.y <
//             canvas.height
//           ) {
//             velocity.y += gravity;
//           }

//           const onPlatform = platforms.some((p) =>
//             checkCollideTop({ ...p, x: p.x + platformXVelocity }, enemy)
//           );
//           if (onPlatform) {
//             velocity.y = 0;
//             if (!velocity.x) velocity.x = direction === 'right' ? 1 : -1;
//           }

//           let newDirection = direction;
//           while (
//             platforms.some((p) => {
//               const platform = { ...p, velocityX: platformXVelocity };

//               // problem is platform is moving left so even though enemey velocity is 0, enemy is still colliding with platform

//               return (
//                 checkFallOffPlatform(platform, enemy) ||
//                 checkCollideSide(platform, enemy)
//               );
//             })
//           ) {
//             if (platformXVelocity) {
//               enemy.x += platformXVelocity;
//             } else {
//               if (velocity.x < 1) velocity.x = 0;
//               else velocity.x /= 2;
//             }

//             newDirection = direction === 'right' ? 'left' : 'right';
//           }
//           return {
//             ...enemy,
//             velocity,
//             currAction: velocity.x ? 'run' : 'idle',
//             direction: newDirection,
//             x: x + velocity.x + platformXVelocity,
//             y: y + velocity.y
//           };
//         });
//       }
//       handleEnemyMovement();

//       playerBullets = playerBullets
//         .filter((b) => {
//           return Math.abs(b.x - b.startX) < 700;
//         })
//         .map((b) => ({
//           ...b,
//           x: b.x + b.velocityX
//         }));

//       return {
//         ...prev,
//         enemies,
//         playerBullets,
//         currAction,
//         platforms: platforms.map((platform) => ({
//           ...platform,
//           x: platform.x + platformXVelocity
//         })),
//         playerPosition: {
//           x: playerPosition.x + velocity.current.x,
//           y: playerPosition.y + velocity.current.y
//         }
//       };
//     });
//   }

//   return {
//     newGame,
//     update,
//     playerPosition: state.playerPosition,
//     drawPlayer: (c: CanvasRenderingContext2D) => {
//       const { playerPosition, currAction, playerBullets } = state;

//       // draw player
//       c.drawImage(
//         playerSprites[currAction][currIdx],
//         playerPosition.x,
//         playerPosition.y,
//         59,
//         playerSize.height
//       );

//       // draw gun
//       const gunSprite =
//         currAction === 'shoot'
//           ? gunSprites[currAction].sides[currIdx]
//           : gunSprites[currAction][currIdx];

//       c.drawImage(
//         gunSprite,
//         playerPosition.x + playerSize.width - 20,
//         playerPosition.y - 13,
//         50,
//         94
//       );

//       // draw bullets
//       playerBullets.forEach((b) =>
//         c.drawImage(bulletSprites.idle[b.spriteIdx], b.x, b.y)
//       );
//     },
//     drawPlatforms: (c: CanvasRenderingContext2D) => {
//       state.platforms.forEach((p) => {
//         if ('type' in p) {
//           c.drawImage(p.image, p.x, p.y);

//           c.drawImage(p.image, p.x + p.width - 69, p.y);

//           c.fillStyle = 'black';
//           c.fillRect(p.x + 59, p.y, p.width - 69 * 2 + 20, 172);
//         } else c.drawImage(p.image, p.x, p.y);
//       });
//     },
//     drawEnemies: (c: CanvasRenderingContext2D) => {
//       state.enemies.forEach((enemy) => {
//         c.drawImage(
//           enemySprites[enemy.currAction][currIdx],
//           enemy.x,
//           enemy.y,
//           128,
//           128
//         );
//       });
//     },
//     startNewGame: () => {
//       setState(initValues);
//       setNewGame(false);
//     }
//   };
// }
