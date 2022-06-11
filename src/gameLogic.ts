import { KeyPressType } from './types/types';
import { GameStateInterface, KeyPressInterface } from './types/interfaces';
import GameState from './utils/Factories/GameState';
import levels from './utils/levels';
import {
  checkCollideTop,
  checkOnPlatform,
  checkCollideSide,
  checkCollideBottom,
  checkFallOffPlatform
} from './utils/checkCollision';
import {
  gravity,
  speed,
  jumpHeight,
  boundaryLeft,
  getBoundaryRight
} from './utils/constants';
import KeyPress from './utils/Factories/KeyPress';
import Modal from './components/Modal';

/* canvas stuff */
const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let boundaryRight = getBoundaryRight(canvas.width);
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  boundaryRight = getBoundaryRight(canvas.width);
});
/* end of canvas stuff */

/* game state stuff */
let gameState: GameStateInterface = GameState(levels.one(canvas.height));
/* end of game state */

/* key press stuff */
const keyPress = KeyPress();
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

const controls = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  Space: 'space'
} as const;

function handleKeyDown(e: KeyboardEvent) {
  let key = e.key as keyof typeof controls;
  if (e.key === ' ') key = 'Space';
  if (!Object.keys(controls).includes(key)) return;

  const keyNormalized = controls[key] as typeof controls[keyof typeof controls];

  keyPress.setPressed(keyNormalized);

  if (keyNormalized === 'up') {
    if (!keyPress.up.timer) {
      gameState.player.setSameJump(false); // so users can double jump
      gameState.player.setJumpNumber(gameState.player.jumpNumber + 1);
      keyPress.setTimer(
        'up',
        () => {
          gameState.player.setSameJump(true);
        },
        20
      );
    }
  }
}

function handleKeyUp(e: KeyboardEvent) {
  let key = e.key as keyof typeof controls;
  if (e.key === ' ') key = 'Space';
  if (!Object.keys(controls).includes(key)) return;

  const keyNormalized = controls[key] as typeof controls[keyof typeof controls];

  keyPress.setReleased(keyNormalized);

  if (keyNormalized === 'up' && keyPress.up.timer) {
    keyPress.removeTimer();
  }
}
/* key press stuff end */

export function draw() {
  const c = canvas.getContext('2d');
  if (!c) return;
  const { width, height } = canvas;

  c.clearRect(0, 0, width, height);

  c.fillStyle = '#B33B44';
  c.fillRect(0, 0, width, height);

  /* handle sprites */
  frameCount++;
  if (frameCount === 3) {
    gameState.handleSprites();
    frameCount = 0;
  }
  /* end handle sprites */

  const { player, platforms, enemies } = gameState;
  //   drawPlatforms(c);
  platforms.forEach((p) => p.draw(c));
  player.draw(c);
  player.bullets.forEach((b) => b.draw(c));
  enemies.forEach((e) => e.draw(c));
}

let frameCount = 0;

export function update() {
  /* check game over */
  if (!gameState.active && !Modal.active) {
    Modal.startNewGame(() => {
      gameState = GameState(levels.one(canvas.height));
    });
    return;
  }

  const { player, platforms, enemies } = gameState;

  if (player.y >= canvas.height) {
    gameState.setGameOver();
  }

  const onPlatform = platforms.some((p) => checkOnPlatform(p, player));
  if (onPlatform) {
    player.resetJump();
  } else player.fall();

  gameState.handleKeyPress(keyPress, boundaryLeft, boundaryRight);
  gameState.handlePlayerCollision();
  gameState.handleEnemyMovement();
  gameState.handleBulletCollision();
  gameState.update(); // handle all movement + bullet collision
}
