import playerSprites from './utils/sprites/playerSprites';
import gunSprites from './utils/sprites/gunSprites';
import bulletSprites from './utils/sprites/bulletSprites';
import { GroundEnemy } from './utils/Factories/Enemy';
import { GameStateInterface } from './types/interfaces';
import GameState from './utils/Factories/GameState';
import levels from './utils/levels';
import { checkCollideTop, checkOnPlatform } from './utils/checkCollision';
import { gravity, speed } from './utils/constants';
import DeltaTimer from './utils/Factories/DeltaTimer';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

const levelOne = levels.one(canvas.height);
const { player, platforms, enemies }: GameStateInterface = GameState(levelOne);

const keyPress = {
  up: false,
  left: false,
  right: false
};
(function handleKeyPress() {
  const interval = 10;

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  interface Controls {
    ArrowLeft: string;
    ArrowRight: string;
    ArrowUp: string;
    ArrowDown: string;
    Space: string;
  }

  const controls: Controls = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
    Space: 'space'
  };

  function handleKeyDown(e: KeyboardEvent) {
    let key = e.key as keyof typeof controls;
    if (e.key === ' ') key = 'Space';
    if (!Object.keys(controls).includes(key)) return;

    const keyNormalized = controls[key] as keyof typeof keyPress;

    if (key.includes('Arrow') && keyNormalized === 'up') {
      if (e.repeat) player.setSameJump(true);
      else player.setJumpNumber(player.jumpNumber + 1);
    }

    const keyVal = keyPress[keyNormalized];

    if (keyVal) {
      if (!keyVal.start) key.start = key.timer.start();
      key.pressed = true;
    } else {
      const timer = DeltaTimer((time) => {
        if (key.pressed) {
          const event = new CustomEvent('keyRepeat', {
            time: time - key.start
          });
          window.dispatchEvent(event);
        } else {
          key.start = 0;
          timer.stop();
        }
      }, interval);

      keyPress[keyNormalized] = {
        pressed: true,
        timer: timer,
        start: timer.start()
      };
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    let key = e.key as keyof typeof controls;
    if (e.key === ' ') key = 'Space';
    if (!Object.keys(controls).includes(key)) return;

    const keyNormalized = controls[key] as keyof typeof keyPress;

    keyPress[keyNormalized] = false;
  }

  return keyPress;
})();

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

  /* end handle sprites */

  const onPlatform = platforms.some((p) => checkOnPlatform(p, player));
  if (!onPlatform) {
    player.updateVelocity('y', player.velocity.y + gravity);
  } else {
    player.setJumpNumber(0);
    player.setSameJump(false);
  }

  if (platforms.some((p) => checkCollideTop(p, player)))
    player.updateVelocity('y', 0);

  /* handle key press */
  const { up, left, right } = keyPress;

  if (up) {
    if (!player.sameJump && player.jumpNumber <= 2)
      player.updateVelocity('y', -30);
  }
  if (right) player.updateVelocity('x', speed);
  if (left) player.updateVelocity('x', -speed);
  if (left || right) player.updateAction('run');
  if (!right && !left) {
    player.updateVelocity('x', 0);
    player.updateAction('idle');
  }
  /* end of key press */

  player.updatePosition();
}
