import { PlatformInterface, XY } from '../types/interfaces';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: XY;
}

export function checkCollideTop(platform: PlatformInterface, player: Player) {
  const collideY = // bottom of player is above platform but with velocity is inside
    player.y + player.height <= platform.y &&
    player.y + player.height + player.velocity.y >= platform.y;

  const insidePlatformDiameter =
    platform.x <= player.x + player.width &&
    player.x <= platform.x + platform.width;

  return insidePlatformDiameter && collideY;
}

interface PlatformAndVelocity extends PlatformInterface {
  velocityX: number;
}

export function checkCollideSide(
  platform: PlatformAndVelocity,
  player: Player
) {
  const collideY =
    // top of player is above bottom of platform and bottom is below top of platform
    player.y <= platform.y + platform.height &&
    player.y + player.height > platform.y;
  const collideLeft =
    // right of player is to left of platform's left side, but with velocity is inside platform
    player.velocity.x
      ? player.x + player.width <= platform.x &&
        player.x + player.width + player.velocity.x >= platform.x
      : platform.velocityX
      ? player.x + player.width <= platform.x &&
        player.x + player.width >= platform.x + platform.velocityX
      : false;
  const collideRight =
    // left of player is to right of platform's right side, but with velocity is inside platform
    player.velocity.x
      ? player.x >= platform.x + platform.width &&
        player.x + player.velocity.x <= platform.x + platform.width
      : platform.velocityX
      ? player.x >= platform.x + platform.width &&
        player.x <= platform.x + platform.width + platform.velocityX
      : false;
  return collideY && (collideLeft || collideRight);
}

export function checkCollideBottom(
  platform: PlatformInterface,
  player: Player
) {
  const collideY =
    // top of player is below platform but with velocity is inside platform
    player.y >= platform.y + platform.height &&
    player.y + player.velocity.y < platform.y + platform.height;
  const insidePlatformDiameter =
    platform.x <= player.x + player.width &&
    player.x <= platform.x + platform.width;
  return collideY && insidePlatformDiameter;
}
