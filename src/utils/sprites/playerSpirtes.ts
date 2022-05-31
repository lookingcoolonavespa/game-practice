import { createImage } from '../misc';

import idle01Src from '../../assets/Player/Idle/Idle_01.png';
import idle02Src from '../../assets/Player/Idle/Idle_02.png';
import idle03Src from '../../assets/Player/Idle/Idle_03.png';
import idle04Src from '../../assets/Player/Idle/Idle_04.png';
import idle05Src from '../../assets/Player/Idle/Idle_05.png';
import idle06Src from '../../assets/Player/Idle/Idle_06.png';
import idle07Src from '../../assets/Player/Idle/Idle_07.png';
import idle08Src from '../../assets/Player/Idle/Idle_08.png';

import run01Src from '../../assets/Player/Run/Run_01.png';
import run02Src from '../../assets/Player/Run/Run_02.png';
import run03Src from '../../assets/Player/Run/Run_03.png';
import run04Src from '../../assets/Player/Run/Run_04.png';
import run05Src from '../../assets/Player/Run/Run_05.png';
import run06Src from '../../assets/Player/Run/Run_06.png';
import run07Src from '../../assets/Player/Run/Run_07.png';
import run08Src from '../../assets/Player/Run/Run_08.png';

import shoot01Src from '../../assets/Player/Shoot/Shoot_01.png';
import shoot02Src from '../../assets/Player/Shoot/Shoot_02.png';
import shoot03Src from '../../assets/Player/Shoot/Shoot_03.png';
import shoot04Src from '../../assets/Player/Shoot/Shoot_04.png';
import shoot05Src from '../../assets/Player/Shoot/Shoot_05.png';
import shoot06Src from '../../assets/Player/Shoot/Shoot_06.png';

const idle = [
  createImage(idle01Src),
  createImage(idle02Src),
  createImage(idle03Src),
  createImage(idle04Src),
  createImage(idle05Src),
  createImage(idle06Src),
  createImage(idle07Src),
  createImage(idle08Src)
];

const run = [
  createImage(run01Src),
  createImage(run02Src),
  createImage(run03Src),
  createImage(run04Src),
  createImage(run05Src),
  createImage(run06Src),
  createImage(run07Src),
  createImage(run08Src)
];

const shoot = [
  createImage(shoot01Src),
  createImage(shoot02Src),
  createImage(shoot03Src),
  createImage(shoot04Src),
  createImage(shoot05Src),
  createImage(shoot06Src)
];

export default {
  idle,
  run,
  shoot
};
