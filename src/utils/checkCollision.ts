import {
  EntityWithVelocity,
  EntityWithVelocityX,
  Line,
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

export function checkIfInsideDiameter(
  rectOne: EntityWithVelocityX,
  rectTwo: EntityWithVelocityX
) {
  const insideY =
    rectTwo.y <= rectOne.y + rectOne.height &&
    rectTwo.y + rectTwo.height > rectOne.y;

  const insideX =
    rectOne.x <= rectTwo.x + rectTwo.width &&
    rectTwo.x <= rectOne.x + rectOne.width;

  return insideX && insideY;
}

export function checkCollideSide(
  rectOne: EntityWithVelocityX,
  rectTwo: EntityWithVelocityX,
  moveStatus: {
    rectOne: boolean;
    rectTwo: boolean;
  }
) {
  const collideY =
    // top of rectTwo is above bottom of rectOne and bottom is below top of rectOne
    rectTwo.y <= rectOne.y + rectOne.height &&
    rectTwo.y + rectTwo.height > rectOne.y;

  let collideLeft, collideRight;
  switch (true) {
    case moveStatus.rectOne && !moveStatus.rectTwo: {
      collideLeft =
        rectTwo.x + rectTwo.width <= rectOne.x &&
        rectTwo.x + rectTwo.width >= rectOne.x + rectOne.velocity.x;

      collideRight =
        rectTwo.x >= rectOne.x + rectOne.width &&
        rectTwo.x <= rectOne.x + rectOne.width + rectOne.velocity.x;

      break;
    }

    case !moveStatus.rectOne && moveStatus.rectTwo: {
      collideLeft =
        // right of rectTwo is to left of rectOne's left side, but with velocity is inside rectOne
        rectTwo.x + rectTwo.width <= rectOne.x &&
        rectTwo.x + rectTwo.width + rectTwo.velocity.x >= rectOne.x;

      collideRight =
        // left of rectTwo is to right of rectOne's right side, but with velocity is inside rectOne
        rectTwo.x >= rectOne.x + rectOne.width &&
        rectTwo.x + rectTwo.velocity.x <= rectOne.x + rectOne.width;
      break;
    }

    case moveStatus.rectOne && moveStatus.rectTwo: {
      collideLeft =
        rectTwo.x + rectTwo.width <= rectOne.x &&
        rectTwo.x + rectTwo.width + rectTwo.velocity.x >=
          rectOne.x + rectOne.velocity.x;

      collideRight =
        rectTwo.x >= rectOne.x + rectOne.width &&
        rectTwo.x + rectTwo.velocity.x <=
          rectOne.x + rectOne.width + rectOne.velocity.x;

      break;
    }
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
  rectOne: EntityWithVelocityX,
  rectTwo: EntityWithVelocity,
  moveStatus: {
    rectOne: boolean;
    rectTwo: boolean;
  }
) {
  let fallLeft, fallRight;

  switch (true) {
    case !moveStatus.rectOne && moveStatus.rectTwo: {
      fallLeft =
        // left of rectTwo is to right of rectOne's left side, but with velocity is off rectOne
        rectTwo.x >= rectOne.x && rectTwo.x + rectTwo.velocity.x <= rectOne.x;

      fallRight =
        // right of rectTwo is to left of rectOne's right side, but with velocity is off rectOne
        rectTwo.x + rectTwo.width <= rectOne.x + rectOne.width &&
        rectTwo.x + rectTwo.width + rectTwo.velocity.x >=
          rectOne.x + rectOne.width;
      break;
    }

    case moveStatus.rectOne && !moveStatus.rectTwo: {
      fallLeft =
        rectTwo.x >= rectOne.x && rectTwo.x <= rectOne.x + rectOne.velocity.x;

      fallRight =
        rectTwo.x + rectTwo.width <= rectOne.x + rectOne.width &&
        rectTwo.x + rectTwo.width >=
          rectOne.x + rectOne.width + rectOne.velocity.x;
      break;
    }
  }

  const onPlatform = checkOnPlatform(rectOne, rectTwo);

  if (!onPlatform) return '';

  return fallLeft ? 'left' : fallRight ? 'right' : '';
}

export function checkInLineOfSight(line: Line, rect: EntityWithVelocity) {
  const collideY = rect.y <= line.y && rect.y + rect.height >= line.y;

  const collideRight =
    line.x.end <= rect.x + rect.width && line.x.start >= rect.x + rect.width;

  const collideLeft = line.x.end >= rect.x && line.x.start <= rect.x;

  if (!collideY) return '';

  return collideLeft ? 'left' : collideRight ? 'right' : '';
}
