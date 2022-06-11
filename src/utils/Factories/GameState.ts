import {
  FloorInterface,
  GameStateInterface,
  GroundEnemyInterface,
  LevelInterface,
  PlatformInterface
} from '../../types/interfaces';
import Player from './Player';
import {
  checkCollideSide,
  checkOnPlatform,
  checkFallOffPlatform,
  checkCollideTop,
  checkCollideBottom,
  checkIfInsideDiameter
} from '../checkCollision';
import { gravity, speed } from '../constants';
import { KeyPressType } from '../../types/types';

export default function GameState(level: LevelInterface) {
  const player = Player();
  let { platforms, enemies } = level;

  let active = true;

  let platformVelocity = 0; // used to adjust enemy position as platforms move so enemies don;t fall off platforms as you move

  function setPlatformVelocity(val: number) {
    platformVelocity = val;
    level.platforms.forEach((p) => p.updateVelocityX(platformVelocity));
  }

  function updateEnemies() {
    enemies = enemies.filter((e) => {
      e.updatePosition();
      e.updateBullets(platformVelocity);
      e.handleDeath();
      return e.status !== 'dead';
    });
  }

  function getEntityInRange(entity: 'platforms' | 'enemies', range: number) {
    const entities = {
      platforms,
      enemies
    };

    let filtered = [];
    for (let i = 0; i < entities[entity].length; i++) {
      if (Math.abs(player.x - entities[entity][i].x) <= 600)
        filtered.push(entities[entity][i]);
    }

    return filtered;
  }

  return {
    get active() {
      return active;
    },
    get player() {
      return player;
    },
    get platforms() {
      return level.platforms;
    },
    get enemies() {
      return level.enemies;
    },
    setGameOver() {
      active = false;
    },
    handleSprites() {
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
    },
    handleKeyPress(
      keyPress: KeyPressType,
      boundaryLeft: number,
      boundaryRight: number
    ) {
      const { up, left, right, space } = keyPress;

      if (up.pressed) {
        player.jump();
      }
      if (left.pressed || right.pressed) {
        player.run(right.pressed ? 'right' : 'left');
        // boundary check
        if (
          (right.pressed && player.x + player.velocity.x >= boundaryRight) ||
          (left.pressed && player.x + player.velocity.x <= boundaryLeft)
        ) {
          setPlatformVelocity(right.pressed ? -speed : speed);
          player.updateVelocity('x', 0);
        } else {
          setPlatformVelocity(0);
        }
      } else {
        setPlatformVelocity(0);
        player.rest();
      }

      if (space.pressed) {
        player.shoot();
      }
    },
    handleBulletCollision() {
      player.bullets.forEach((b) => {
        if (b.status !== 'active') return;

        const enemiesInRange = getEntityInRange(
          'enemies',
          600
        ) as GroundEnemyInterface[];

        enemiesInRange.forEach((e) => {
          const collision =
            checkCollideSide(e, b, {
              rectOne: true,
              rectTwo: true
            }) || checkIfInsideDiameter(e, b);

          if (collision) {
            b.stop();
            e.updateAction('hit');
            e.onHit();
          }
        });

        const platformsInRange = getEntityInRange('platforms', 600) as
          | PlatformInterface[]
          | FloorInterface[];

        platformsInRange.forEach((p) => {
          const collision =
            checkCollideSide(p, b, {
              rectOne: Math.abs(p.velocity.x) > 0,
              rectTwo: Math.abs(b.velocity.x) > 0
            }) || checkIfInsideDiameter(p, b);

          if (collision) {
            b.stop();
          }
        });
      });
    },
    handlePlayerCollision() {
      while (
        platforms.some((p) =>
          checkCollideSide(p, player, {
            rectOne: Math.abs(p.velocity.x) > 0,
            rectTwo: Math.abs(player.velocity.x) > 0
          })
        )
      ) {
        player.onCollideWall('x');
        setPlatformVelocity(0);
      }
      while (
        platforms.some(
          (p) => checkCollideTop(p, player) || checkCollideBottom(p, player)
        )
      ) {
        player.onCollideWall('y');
      }
    },
    handleEnemyMovement() {
      enemies.forEach((enemy) => {
        const { velocity, direction, speed, timer } = enemy;

        const onPlatform = platforms.some((p) => checkOnPlatform(p, enemy));
        if (!onPlatform) {
          enemy.fall();
        } else enemy.shoot();

        // else if (!velocity.x && !timer) enemy.setIdleTimer();

        // if (enemy.velocity.x) enemy.updateAction('run');
        // else enemy.updateAction('idle');

        // shift enemies as platforms move so they keep their position
        enemy.setPosition({ x: enemy.x + platformVelocity, y: enemy.y });

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
            (p) =>
              (collideSide = checkFallOffPlatform(p, enemy, {
                rectOne: false,
                rectTwo: true
              }))
          )
        ) {
          enemy.onCollideWall('x');
          enemy.updateDirection(
            (collideSide as 'left' | 'right') === 'right' ? 'left' : 'right'
          );
        }
      });
    },

    update() {
      platforms.forEach((p) => p.updateXPosition());
      player.updatePosition();
      player.updateBullets(platformVelocity);
      updateEnemies();
    }
  };
}
