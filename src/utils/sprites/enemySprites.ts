import { createImage } from '../misc';

import idle01 from '../../assets/Enemy01/Idle/Enemy01_Idle_01.png';
import idle02 from '../../assets/Enemy01/Idle/Enemy01_Idle_02.png';
import idle03 from '../../assets/Enemy01/Idle/Enemy01_Idle_03.png';
import idle04 from '../../assets/Enemy01/Idle/Enemy01_Idle_04.png';
import idle05 from '../../assets/Enemy01/Idle/Enemy01_Idle_05.png';
import idle06 from '../../assets/Enemy01/Idle/Enemy01_Idle_06.png';
import idle07 from '../../assets/Enemy01/Idle/Enemy01_Idle_07.png';
import idle08 from '../../assets/Enemy01/Idle/Enemy01_Idle_08.png';

import run01 from '../../assets/Enemy01/Run/Enemy01_Run_01.png';
import run02 from '../../assets/Enemy01/Run/Enemy01_Run_02.png';
import run03 from '../../assets/Enemy01/Run/Enemy01_Run_03.png';
import run04 from '../../assets/Enemy01/Run/Enemy01_Run_04.png';
import run05 from '../../assets/Enemy01/Run/Enemy01_Run_05.png';
import run06 from '../../assets/Enemy01/Run/Enemy01_Run_06.png';
import run07 from '../../assets/Enemy01/Run/Enemy01_Run_07.png';
import run08 from '../../assets/Enemy01/Run/Enemy01_Run_08.png';

import shoot01 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_01.png';
import shoot02 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_02.png';
import shoot03 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_03.png';
import shoot04 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_04.png';
import shoot05 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_05.png';
import shoot06 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_06.png';
import shoot07 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_07.png';
import shoot08 from '../../assets/Enemy01/Shoot/Enemy01_Shoot_08.png';

const idle = [
  createImage(idle01),
  createImage(idle02),
  createImage(idle03),
  createImage(idle04),
  createImage(idle05),
  createImage(idle06),
  createImage(idle07),
  createImage(idle08)
];

const run = [
  createImage(run01),
  createImage(run02),
  createImage(run03),
  createImage(run04),
  createImage(run05),
  createImage(run06),
  createImage(run07),
  createImage(run08)
];

const shoot = [
  createImage(shoot01),
  createImage(shoot02),
  createImage(shoot03),
  createImage(shoot04),
  createImage(shoot05),
  createImage(shoot06),
  createImage(shoot07),
  createImage(shoot08)
];

export default {
  idle,
  run,
  shoot
};
