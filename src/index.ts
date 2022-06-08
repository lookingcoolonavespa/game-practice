import './styles/global.css';

import { draw, update } from './gameLogic';

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
