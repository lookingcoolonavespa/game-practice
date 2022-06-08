import { KeyPressType } from './types/types';
import { GameStateInterface, KeyPressInterface } from './types/interfaces';
import GameState from './utils/Factories/GameState';
import levels from './utils/levels';
import {
  checkCollideTop,
  checkOnPlatform,
  checkCollideSide
} from './utils/checkCollision';
import {
  gravity,
  speed,
  boundaryLeft,
  getBoundaryRight
} from './utils/constants';
import KeyPress from './utils/Factories/KeyPress';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let boundaryRight = getBoundaryRight(canvas.width);
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  boundaryRight = getBoundaryRight(canvas.width);
});

const levelOne = levels.one(canvas.height);
let { player, platforms, enemies }: GameStateInterface = GameState(levelOne);

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
      player.setSameJump(false); // so users can double jump
      player.setJumpNumber(player.jumpNumber + 1);
      keyPress.setTimer(() => {
        player.setSameJump(true);
      }, 20);
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

export function draw() {
  const c = canvas.getContext('2d');
  if (!c) return;
  const { width, height } = canvas;

  c.clearRect(0, 0, width, height);

  c.fillStyle = '#B33B44';
  c.fillRect(0, 0, width, height);

  // c.fillStyle = 'black';
  // c.fillRect(0, 0, width, 160);

  //   drawPlatforms(c);
  platforms.forEach((p) => p.draw(c));
  player.draw(c);
  //   drawEnemies(c);
}

let frameCount = 0;

export function update() {
  /* handle sprites */
  frameCount++;

  if (frameCount === 3) {
    player.resetSpriteIdx();
    player.increaseSpriteIdx();
    // playerBullets.forEach((b) => {
    //   if (b.spriteIdx === bulletSprites.idle.length - 1) b.spriteIdx = 0;
    //   b.spriteIdx++;
    // });
    frameCount = 0;
  }

  const onPlatform = platforms.some((p) => checkOnPlatform(p, player));
  if (!onPlatform) {
    player.updateVelocity('y', player.velocity.y + gravity);
  } else {
    player.setSameJump(false);
  }

  /* end handle sprites */

  /* handle key press */
  const { up, left, right } = keyPress;
  if (up.pressed) {
    if (!player.sameJump && player.jumpNumber <= 2) {
      player.updateVelocity('y', -20);
    }
  }
  if (right.pressed) player.updateVelocity('x', speed);
  if (left.pressed) player.updateVelocity('x', -speed);
  if (left.pressed || right.pressed) player.updateAction('run');
  if (!right.pressed && !left.pressed) {
    player.updateVelocity('x', 0);
    player.updateAction('idle');
  }
  // boundary check
  if (
    (right.pressed && player.x + player.velocity.x >= boundaryRight) ||
    (left.pressed && player.x + player.velocity.x <= boundaryLeft)
  ) {
    platforms.forEach((p) => p.updateVelocityX(right.pressed ? -speed : speed));
    player.updateVelocity('x', 0);
  } else platforms.forEach((p) => p.updateVelocityX(0));

  /* end of key press */

  while (platforms.some((p) => checkCollideSide(p, player))) {
    player.updateVelocity('x', 0);
    platforms.forEach((p) => p.updateVelocityX(0));
  }
  if (platforms.some((p) => checkCollideTop(p, player)))
    player.updateVelocity('y', 0);

  platforms.forEach((p, i) => {
    p.updateXPosition();
  });
  const onPlatformAfterKeyPress = platforms.some((p) => {
    return checkOnPlatform(p, player);
  });
  if (onPlatformAfterKeyPress) {
    player.setJumpNumber(0);
  } else player.updateVelocity('y', player.velocity.y + gravity);

  player.updatePosition();
}
