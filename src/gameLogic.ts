import playerSprites from './utils/sprites/playerSprites';
import gunSprites from './utils/sprites/gunSprites';
import bulletSprites from './utils/sprites/bulletSprites';
import { GroundEnemy } from './utils/Factories/Enemy';
import { GameState } from './types/interfaces';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const spritesState = {
  frameCount: 0,
  currIdx: 0
};

const gameState: GameState = {
  player: {
    x: 100,
    y: 100,
    velocity: {
      x: 0,
      y: 0
    },
    height: 50,
    width: 45,
    bullets: [],
    currAction: 'idle'
  },
  platforms: [
    // Platform1({ x: 300, y: 200 }), Platform4({ x: 800, y: 700 })
  ],
  enemies: [GroundEnemy({ x: 500, y: 200 })]
};

function addFloor() {
  const floor = [
    FloorPlatform({ x: -10, y: canvas.height - 168 }, 800),
    FloorPlatform({ x: 960, y: canvas.height - 168 }, 800)
  ];

  setState((prev) => ({
    ...prev,
    platforms: [...prev.platforms, ...floor]
  }));
}

const drawPlayer = (c: CanvasRenderingContext2D) => {
  const {
    player: { x, y, width, height, currAction, bullets }
  } = gameState;
  const { currIdx } = spritesState;

  // draw player
  c.drawImage(playerSprites[currAction][currIdx], x, y, 59, height);

  // draw gun
  const gunSprite =
    currAction === 'shoot'
      ? gunSprites[currAction].sides[currIdx]
      : gunSprites[currAction][currIdx];

  c.drawImage(gunSprite, x + width - 20, y - 13, 50, 94);

  // draw bullets
  bullets.forEach((b) =>
    c.drawImage(bulletSprites.idle[b.spriteIdx], b.x, b.y)
  );
};

function draw() {
  const c = canvas.getContext('2d');
  if (!c) return;
  const { width, height } = canvas;

  c.clearRect(0, 0, width, height);

  c.fillStyle = '#B33B44';
  c.fillRect(0, 0, width, height);

  c.fillStyle = 'black';
  c.fillRect(0, 0, width, 160);

  //   drawPlatforms(c);
  drawPlayer(c);
  //   drawEnemies(c);
}
