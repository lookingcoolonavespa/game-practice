import { EntityWithVelocity, PlatformInterface, XY } from '../types/interfaces';

export function checkCollideTop(
  platform: PlatformInterface,
  entity: EntityWithVelocity
) {
  const collideY = // bottom of entity is above platform but with velocity is inside
    entity.y + entity.height <= platform.y &&
    entity.y + entity.height + entity.velocity.y >= platform.y;

  const insidePlatformDiameter =
    platform.x <= entity.x + entity.width &&
    entity.x <= platform.x + platform.width;

  return insidePlatformDiameter && collideY;
}

interface PlatformAndVelocity extends PlatformInterface {
  velocityX: number;
}

export function checkCollideSide(
  platform: PlatformAndVelocity,
  entity: EntityWithVelocity
) {
  const collideY =
    // top of entity is above bottom of platform and bottom is below top of platform
    entity.y <= platform.y + platform.height &&
    entity.y + entity.height > platform.y;
  const collideLeft =
    // right of entity is to left of platform's left side, but with velocity is inside platform
    entity.velocity.x
      ? entity.x + entity.width <= platform.x &&
        entity.x + entity.width + entity.velocity.x >= platform.x
      : platform.velocityX
      ? entity.x + entity.width <= platform.x &&
        entity.x + entity.width >= platform.x + platform.velocityX
      : false;
  const collideRight =
    // left of entity is to right of platform's right side, but with velocity is inside platform
    entity.velocity.x
      ? entity.x >= platform.x + platform.width &&
        entity.x + entity.velocity.x <= platform.x + platform.width
      : platform.velocityX
      ? entity.x >= platform.x + platform.width &&
        entity.x <= platform.x + platform.width + platform.velocityX
      : false;
  return collideY && (collideLeft || collideRight);
}

export function checkCollideBottom(
  platform: PlatformInterface,
  entity: EntityWithVelocity
) {
  const collideY =
    // top of entity is below platform but with velocity is inside platform
    entity.y >= platform.y + platform.height &&
    entity.y + entity.velocity.y < platform.y + platform.height;
  const insidePlatformDiameter =
    platform.x <= entity.x + entity.width &&
    entity.x <= platform.x + platform.width;
  return collideY && insidePlatformDiameter;
}

export function checkFallOffPlatform(
  platform: PlatformAndVelocity,
  entity: EntityWithVelocity
) {
  const fallLeft =
    // left of entity is to right of platform's left side, but with velocity is off platform
    entity.velocity.x
      ? entity.x >= platform.x && entity.x + entity.velocity.x <= platform.x
      : platform.velocityX
      ? entity.x >= platform.x && entity.x <= platform.x + platform.velocityX
      : false;
  const fallRight =
    // right of entity is to left of platform's right side, but with velocity is off platform
    entity.velocity.x
      ? entity.x + entity.width <= platform.x + platform.width &&
        entity.x + entity.width + entity.velocity.x >=
          platform.x + platform.width
      : platform.velocityX
      ? entity.x + entity.width <= platform.x + platform.width &&
        entity.x + entity.width >=
          platform.x + platform.width + platform.velocityX
      : false;

  const onPlatform = checkCollideTop(platform, entity);

  return onPlatform && (fallLeft || fallRight);
}
