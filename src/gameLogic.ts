import playerSprites from './utils/sprites/playerSprites';
import gunSprites from './utils/sprites/gunSprites';
import bulletSprites from './utils/sprites/bulletSprites';
import { GroundEnemy } from './utils/Factories/Enemy';
import { GameStateInterface } from './types/interfaces';
import GameState from './utils/Factories/GameState';
import levels from './utils/levels';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const spritesState = {
  frameCount: 0,
  currIdx: 0
};

const levelOne = levels.one(canvas.height);
const gameState: GameStateInterface = GameState(levelOne);
console.log(gameState.platforms);

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
  gameState.platforms.forEach((p) => p.draw(c));
  gameState.player.draw(c, spritesState.currIdx);
  //   drawEnemies(c);
}
