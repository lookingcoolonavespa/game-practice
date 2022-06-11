import './styles/global.css';

import { draw, update } from './gameLogic';

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

setTimeout(() => requestAnimationFrame(animate), 1000);
