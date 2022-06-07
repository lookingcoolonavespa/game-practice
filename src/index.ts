import { draw } from './gameLogic';

function update() {
  draw();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
