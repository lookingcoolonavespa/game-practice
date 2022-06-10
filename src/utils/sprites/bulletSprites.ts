import { createImage } from '../misc';

import idle01Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_01.png';
import idle02Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_02.png';
import idle03Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_03.png';
import idle04Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_04.png';
import idle05Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_05.png';
import idle06Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_06.png';
import idle07Right from '../../assets/Gun01/Bullet/Right/Idle/Bullet_Idle_07.png';

import poof01Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_01.png';
import poof02Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_02.png';
import poof03Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_03.png';
import poof04Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_04.png';
import poof05Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_05.png';
import poof06Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_06.png';
import poof07Right from '../../assets/Gun01/Bullet/Right/Poof/Bullet_Poof_07.png';

import idle01Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_01.png';
import idle02Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_02.png';
import idle03Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_03.png';
import idle04Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_04.png';
import idle05Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_05.png';
import idle06Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_06.png';
import idle07Left from '../../assets/Gun01/Bullet/Left/Idle/Bullet_Idle_07.png';

import poof01Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_01.png';
import poof02Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_02.png';
import poof03Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_03.png';
import poof04Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_04.png';
import poof05Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_05.png';
import poof06Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_06.png';
import poof07Left from '../../assets/Gun01/Bullet/Left/Poof/Bullet_Poof_07.png';

const idleLeft = [
  createImage(idle01Left),
  createImage(idle02Left),
  createImage(idle03Left),
  createImage(idle04Left),
  createImage(idle05Left),
  createImage(idle06Left),
  createImage(idle07Left)
];

const poofLeft = [
  createImage(poof01Left),
  createImage(poof02Left),
  createImage(poof03Left),
  createImage(poof04Left),
  createImage(poof05Left),
  createImage(poof06Left),
  createImage(poof07Left)
];

const idleRight = [
  createImage(idle01Right),
  createImage(idle02Right),
  createImage(idle03Right),
  createImage(idle04Right),
  createImage(idle05Right),
  createImage(idle06Right),
  createImage(idle07Right)
];

const poofRight = [
  createImage(poof01Right),
  createImage(poof02Right),
  createImage(poof03Right),
  createImage(poof04Right),
  createImage(poof05Right),
  createImage(poof06Right),
  createImage(poof07Right)
];

export default {
  right: { idle: idleRight, poof: poofRight },
  left: { idle: idleLeft, poof: poofLeft }
};
