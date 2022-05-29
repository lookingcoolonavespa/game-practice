import { PlatformInterface, XY } from '../types/interfaces';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: XY;
}

export default function checkCollision(
  platforms: PlatformInterface[],
  player: Player
) {
  for (const platform of platforms) {
    const side = checkCollideSide(platform, player);
    const top = checkCollideTop(platform, player);
    if (side || top) return true;
  }
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

export function checkCollideSide(platform: PlatformInterface, player: Player) {
  const collideY =
    // top of player is above bottom of platform and below top of platform
    player.y <= platform.y + platform.height && player.y >= platform.y;
  const collideLeft =
    // right of player is to left of platform's left side, but with velocity is inside platform
    player.x + player.width <= platform.x &&
    player.x + player.width + player.velocity.x >= platform.x;
  const collideRight =
    // left of player is to right of platform's right side, but with velocity is inside platform
    player.x >= platform.x + platform.width &&
    player.x + player.velocity.x <= platform.x + platform.width;
  return collideY && collideLeft
    ? 'left'
    : collideY && collideRight
    ? 'right'
    : null;
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

export function getDepthOfCollision(
  platform: PlatformInterface,
  player: Player,
  collision: 'left' | 'right'
) {
  // coming in from the left, looking for the difference between right side of player and left side of platfrom
  return collision === 'left'
    ? platform.x - player.x + player.width
    : platform.x + platform.width - player.x;
}
