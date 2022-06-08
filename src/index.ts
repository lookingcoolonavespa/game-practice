import './styles/global.css';

import { draw, update } from './gameLogic';

function animate() {
  console.log('drawing');
  update();
  draw();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
