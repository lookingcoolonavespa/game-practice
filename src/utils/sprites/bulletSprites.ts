import { createImage } from '../misc';

import idle01 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_01.png';
import idle02 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_02.png';
import idle03 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_03.png';
import idle04 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_04.png';
import idle05 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_05.png';
import idle06 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_06.png';
import idle07 from '../../assets/Gun01/Bullet/Idle/Bullet_Idle_07.png';

import poof01 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_01.png';
import poof02 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_02.png';
import poof03 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_03.png';
import poof04 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_04.png';
import poof05 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_05.png';
import poof06 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_06.png';
import poof07 from '../../assets/Gun01/Bullet/Poof/Bullet_Poof_07.png';

const idle = [
  createImage(idle01),
  createImage(idle02),
  createImage(idle03),
  createImage(idle04),
  createImage(idle05),
  createImage(idle06),
  createImage(idle07)
];

const poof = [
  createImage(poof01),
  createImage(poof02),
  createImage(poof03),
  createImage(poof04),
  createImage(poof05),
  createImage(poof06),
  createImage(poof07)
];

export default { idle, poof };
