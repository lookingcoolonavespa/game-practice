import {
  EntityWithVelocity,
  EntityWithVelocityX,
  PlatformInterface
} from '../types/interfaces';

// update turnStart when client receives update for chess app

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

export function checkOnPlatform(
  platform: EntityWithVelocityX,
  entity: EntityWithVelocity
) {
  const collideY =
    entity.y + entity.height + entity.velocity.y <= platform.y &&
    entity.y + entity.height + entity.velocity.y > platform.y - 2; // bottom of entity is above platform but with velocity is inside

  const insidePlatformDiameter =
    platform.x <= entity.x + entity.width &&
    entity.x <= platform.x + platform.width;

  return insidePlatformDiameter && collideY;
}

export function checkCollideSide(
  platform: EntityWithVelocityX,
  entity: EntityWithVelocityX,
  includePlatformVelocity: boolean // player needs this option bc when boundary is pushed player velocity is 0
) {
  const collideY =
    // top of entity is above bottom of platform and bottom is below top of platform
    entity.y <= platform.y + platform.height &&
    entity.y + entity.height > platform.y;

  let collideLeft, collideRight;

  if (includePlatformVelocity) {
    collideLeft =
      // right of entity is to left of platform's left side, but with velocity is inside platform
      entity.velocity.x
        ? entity.x + entity.width <= platform.x &&
          entity.x + entity.width + entity.velocity.x >= platform.x
        : platform.velocity.x
        ? entity.x + entity.width <= platform.x &&
          entity.x + entity.width >= platform.x + platform.velocity.x
        : false;
    collideRight =
      // left of entity is to right of platform's right side, but with velocity is inside platform
      entity.velocity.x
        ? entity.x >= platform.x + platform.width &&
          entity.x + entity.velocity.x <= platform.x + platform.width
        : platform.velocity.x
        ? entity.x >= platform.x + platform.width &&
          entity.x <= platform.x + platform.width + platform.velocity.x
        : false;
  } else {
    collideLeft =
      // right of entity is to left of platform's left side, but with velocity is inside platform
      entity.x + entity.width <= platform.x &&
      entity.x + entity.width + entity.velocity.x >= platform.x;

    collideRight =
      // left of entity is to right of platform's right side, but with velocity is inside platform
      entity.x >= platform.x + platform.width &&
      entity.x + entity.velocity.x <= platform.x + platform.width;
  }

  if (!collideY) return '';

  return collideLeft ? 'left' : collideRight ? 'right' : '';
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
  platform: EntityWithVelocityX,
  entity: EntityWithVelocity,
  includePlatformVelocity: boolean // player needs this option bc when boundary is pushed player velocity is 0
) {
  let fallLeft, fallRight;
  if (includePlatformVelocity) {
    fallLeft =
      // left of entity is to right of platform's left side, but with velocity is off platform
      entity.velocity.x
        ? entity.x >= platform.x && entity.x + entity.velocity.x <= platform.x
        : platform.velocity.x
        ? entity.x >= platform.x && entity.x <= platform.x + platform.velocity.x
        : false;
    fallRight =
      // right of entity is to left of platform's right side, but with velocity is off platform
      entity.velocity.x
        ? entity.x + entity.width <= platform.x + platform.width &&
          entity.x + entity.width + entity.velocity.x >=
            platform.x + platform.width
        : platform.velocity.x
        ? entity.x + entity.width <= platform.x + platform.width &&
          entity.x + entity.width >=
            platform.x + platform.width + platform.velocity.x
        : false;
  } else {
    fallLeft =
      // left of entity is to right of platform's left side, but with velocity is off platform
      entity.x >= platform.x && entity.x + entity.velocity.x <= platform.x;

    fallRight =
      // right of entity is to left of platform's right side, but with velocity is off platform
      entity.x + entity.width <= platform.x + platform.width &&
      entity.x + entity.width + entity.velocity.x >=
        platform.x + platform.width;
  }

  const onPlatform = checkOnPlatform(platform, entity);

  if (!onPlatform) return '';

  return fallLeft ? 'left' : fallRight ? 'right' : '';
}
