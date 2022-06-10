import { createImage } from '../misc';

import idle01SrcRight from '../../assets/Player/Right/Idle/Idle_01.png';
import idle02SrcRight from '../../assets/Player/Right/Idle/Idle_02.png';
import idle03SrcRight from '../../assets/Player/Right/Idle/Idle_03.png';
import idle04SrcRight from '../../assets/Player/Right/Idle/Idle_04.png';
import idle05SrcRight from '../../assets/Player/Right/Idle/Idle_05.png';
import idle06SrcRight from '../../assets/Player/Right/Idle/Idle_06.png';
import idle07SrcRight from '../../assets/Player/Right/Idle/Idle_07.png';
import idle08SrcRight from '../../assets/Player/Right/Idle/Idle_08.png';

import run01SrcRight from '../../assets/Player/Right/Run/Run_01.png';
import run02SrcRight from '../../assets/Player/Right/Run/Run_02.png';
import run03SrcRight from '../../assets/Player/Right/Run/Run_03.png';
import run04SrcRight from '../../assets/Player/Right/Run/Run_04.png';
import run05SrcRight from '../../assets/Player/Right/Run/Run_05.png';
import run06SrcRight from '../../assets/Player/Right/Run/Run_06.png';
import run07SrcRight from '../../assets/Player/Right/Run/Run_07.png';
import run08SrcRight from '../../assets/Player/Right/Run/Run_08.png';

import shoot01SrcRight from '../../assets/Player/Right/Shoot/Shoot_01.png';
import shoot02SrcRight from '../../assets/Player/Right/Shoot/Shoot_02.png';
import shoot03SrcRight from '../../assets/Player/Right/Shoot/Shoot_03.png';
import shoot04SrcRight from '../../assets/Player/Right/Shoot/Shoot_04.png';
import shoot05SrcRight from '../../assets/Player/Right/Shoot/Shoot_05.png';
import shoot06SrcRight from '../../assets/Player/Right/Shoot/Shoot_06.png';

import idle01SrcLeft from '../../assets/Player/Left/Idle/Idle_01.png';
import idle02SrcLeft from '../../assets/Player/Left/Idle/Idle_02.png';
import idle03SrcLeft from '../../assets/Player/Left/Idle/Idle_03.png';
import idle04SrcLeft from '../../assets/Player/Left/Idle/Idle_04.png';
import idle05SrcLeft from '../../assets/Player/Left/Idle/Idle_05.png';
import idle06SrcLeft from '../../assets/Player/Left/Idle/Idle_06.png';
import idle07SrcLeft from '../../assets/Player/Left/Idle/Idle_07.png';
import idle08SrcLeft from '../../assets/Player/Left/Idle/Idle_08.png';

import run01SrcLeft from '../../assets/Player/Left/Run/Run_01.png';
import run02SrcLeft from '../../assets/Player/Left/Run/Run_02.png';
import run03SrcLeft from '../../assets/Player/Left/Run/Run_03.png';
import run04SrcLeft from '../../assets/Player/Left/Run/Run_04.png';
import run05SrcLeft from '../../assets/Player/Left/Run/Run_05.png';
import run06SrcLeft from '../../assets/Player/Left/Run/Run_06.png';
import run07SrcLeft from '../../assets/Player/Left/Run/Run_07.png';
import run08SrcLeft from '../../assets/Player/Left/Run/Run_08.png';

import shoot01SrcLeft from '../../assets/Player/Left/Shoot/Shoot_01.png';
import shoot02SrcLeft from '../../assets/Player/Left/Shoot/Shoot_02.png';
import shoot03SrcLeft from '../../assets/Player/Left/Shoot/Shoot_03.png';
import shoot04SrcLeft from '../../assets/Player/Left/Shoot/Shoot_04.png';
import shoot05SrcLeft from '../../assets/Player/Left/Shoot/Shoot_05.png';
import shoot06SrcLeft from '../../assets/Player/Left/Shoot/Shoot_06.png';

const idleRight = [
  createImage(idle01SrcRight),
  createImage(idle02SrcRight),
  createImage(idle03SrcRight),
  createImage(idle04SrcRight),
  createImage(idle05SrcRight),
  createImage(idle06SrcRight),
  createImage(idle07SrcRight),
  createImage(idle08SrcRight)
];

const runRight = [
  createImage(run01SrcRight),
  createImage(run02SrcRight),
  createImage(run03SrcRight),
  createImage(run04SrcRight),
  createImage(run05SrcRight),
  createImage(run06SrcRight),
  createImage(run07SrcRight),
  createImage(run08SrcRight)
];

const shootRight = [
  createImage(shoot01SrcRight),
  createImage(shoot02SrcRight),
  createImage(shoot03SrcRight),
  createImage(shoot04SrcRight),
  createImage(shoot05SrcRight),
  createImage(shoot06SrcRight)
];

const idleLeft = [
  createImage(idle01SrcLeft),
  createImage(idle02SrcLeft),
  createImage(idle03SrcLeft),
  createImage(idle04SrcLeft),
  createImage(idle05SrcLeft),
  createImage(idle06SrcLeft),
  createImage(idle07SrcLeft),
  createImage(idle08SrcLeft)
];

const runLeft = [
  createImage(run01SrcLeft),
  createImage(run02SrcLeft),
  createImage(run03SrcLeft),
  createImage(run04SrcLeft),
  createImage(run05SrcLeft),
  createImage(run06SrcLeft),
  createImage(run07SrcLeft),
  createImage(run08SrcLeft)
];

const shootLeft = [
  createImage(shoot01SrcLeft),
  createImage(shoot02SrcLeft),
  createImage(shoot03SrcLeft),
  createImage(shoot04SrcLeft),
  createImage(shoot05SrcLeft),
  createImage(shoot06SrcLeft)
];

export default {
  right: {
    idleRight,
    runRight,
    shootRight
  },
  left: {
    idleLeft,
    runLeft,
    shootLeft
  }
};
