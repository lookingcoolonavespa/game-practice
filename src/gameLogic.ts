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

  // c.fillStyle = 'black';
  // c.fillRect(0, 0, width, 160);

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
  /* handle sprites */
  frameCount++;

  if (frameCount === 3) {
    player.resetSpriteIdx();
    player.increaseSpriteIdx();
    enemies.forEach((e) => {
      e.resetSpriteIdx();
      e.increaseSpriteIdx();
    });
    player.bullets.forEach((b) => {
      b.resetSpriteIdx();
      b.increaseSpriteIdx();
    });
    frameCount = 0;
  }

  /* end handle sprites */

  const onPlatform = platforms.some((p) => checkOnPlatform(p, player));
  if (onPlatform) {
    player.setSameJump(false);
    player.setJumpNumber(0);
  } else player.updateVelocity('y', player.velocity.y + gravity);

  let platformVelocity = 0; // used to adjust enemy position as platforms move so enemies don;t fall off platforms as you move
  /* handle key press */
  const { up, left, right, space } = keyPress;

  if (up.pressed) {
    if (!player.jumpNumber) player.setJumpNumber(1); // so users can hold the up key to keep jumping
    if (!player.sameJump && player.jumpNumber <= 2) {
      player.updateVelocity('y', jumpHeight);
      player.updateAction('idle');
    }
  }
  if (left.pressed || right.pressed) {
    if (!player.jumpNumber) player.updateAction('run');
    player.updateVelocity('x', right.pressed ? speed : -speed);
    player.updateDirection(right.pressed ? 'right' : 'left');
    // boundary check
    if (
      (right.pressed && player.x + player.velocity.x >= boundaryRight) ||
      (left.pressed && player.x + player.velocity.x <= boundaryLeft)
    ) {
      platformVelocity = right.pressed ? -speed : speed;
      platforms.forEach((p) => p.updateVelocityX(platformVelocity));
      player.updateVelocity('x', 0);
    }
  } else {
    player.updateVelocity('x', 0);
    player.updateAction('idle');
    platformVelocity = 0;
    platforms.forEach((p) => p.updateVelocityX(0));
  }

  if (space.pressed && !player.sameShot) {
    player.updateAction('shoot');
    player.shootBullet();
  }
  /* end of key press */

  /* handle collision */
  while (
    platforms.some((p) =>
      checkCollideSide(p, player, {
        rectOne: p.velocity.x > 0,
        rectTwo: player.velocity.x > 0
      })
    )
  ) {
    player.onCollideWall('x');
    platforms.forEach((p) => p.updateVelocityX(0));
    platformVelocity = 0;
  }
  while (
    platforms.some(
      (p) => checkCollideTop(p, player) || checkCollideBottom(p, player)
    )
  ) {
    player.onCollideWall('y');
  }
  /* end of collision */

  /* handle enemy movement */
  enemies.forEach((enemy) => {
    const { velocity, direction, speed, timer } = enemy;

    const onPlatform = platforms.some((p) => checkOnPlatform(p, enemy));
    if (!onPlatform) {
      enemy.updateVelocity('y', velocity.y + gravity);
    } else if (!velocity.x && !timer) enemy.setIdleTimer();

    if (enemy.velocity.x) enemy.updateAction('run');
    else enemy.updateAction('idle');

    enemies.forEach((e) => {
      e.setPosition({ x: e.x + platformVelocity, y: e.y });
    });

    let collideSide: 'left' | 'right' | '' = '';
    /* handle collision */
    while (
      platforms.some(
        (p) =>
          (collideSide = checkCollideSide(p, enemy, {
            rectOne: false,
            rectTwo: true
          }))
      )
    ) {
      enemy.onCollideWall('x');
      enemy.updateDirection(collideSide as 'left' | 'right');
    }
    while (platforms.some((p) => checkCollideTop(p, enemy))) {
      enemy.onCollideWall('y');
    }
    while (
      platforms.some(
        (p) => (collideSide = checkFallOffPlatform(p, enemy, false))
      )
    ) {
      enemy.onCollideWall('x');
      enemy.updateDirection(
        (collideSide as 'left' | 'right') === 'right' ? 'left' : 'right'
      );
    }
  });

  /* end of enemy */

  platforms.forEach((p) => p.updateXPosition());
  player.updatePosition();
  player.updateBullets();
  player.bullets.forEach((b, i) => {
    const enemiesInRange = enemies.filter((e) => {
      return Math.abs(player.x - e.x) <= 600;
    });

    enemiesInRange.forEach((e, j) => {
      const collision = checkCollideSide(e, b, {
        rectOne: true,
        rectTwo: true
      });
      if (collision) b.stop();
    });
  });
  enemies.forEach((e) => e.updatePosition());
}
