import { createImage } from '../misc';

import idle01Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_01.png';
import idle02Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_02.png';
import idle03Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_03.png';
import idle04Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_04.png';
import idle05Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_05.png';
import idle06Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_06.png';
import idle07Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_07.png';
import idle08Right from '../../assets/Enemy01/Right/Idle/Enemy01_Idle_08.png';

import hit01Right from '../../assets/Enemy01/Right/Hit/Enemy01_Hit_01.png';
import hit02Right from '../../assets/Enemy01/Right/Hit/Enemy01_Hit_02.png';
import hit03Right from '../../assets/Enemy01/Right/Hit/Enemy01_Hit_03.png';

import run01Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_01.png';
import run02Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_02.png';
import run03Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_03.png';
import run04Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_04.png';
import run05Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_05.png';
import run06Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_06.png';
import run07Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_07.png';
import run08Right from '../../assets/Enemy01/Right/Run/Enemy01_Run_08.png';

import shoot01Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_01.png';
import shoot02Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_02.png';
import shoot03Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_03.png';
import shoot04Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_04.png';
import shoot05Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_05.png';
import shoot06Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_06.png';
import shoot07Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_07.png';
import shoot08Right from '../../assets/Enemy01/Right/Shoot/Enemy01_Shoot_08.png';

import idle01Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_01.png';
import idle02Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_02.png';
import idle03Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_03.png';
import idle04Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_04.png';
import idle05Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_05.png';
import idle06Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_06.png';
import idle07Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_07.png';
import idle08Left from '../../assets/Enemy01/Left/Idle/Enemy01_Idle_08.png';

import hit01Left from '../../assets/Enemy01/Left/Hit/Enemy01_Hit_01.png';
import hit02Left from '../../assets/Enemy01/Left/Hit/Enemy01_Hit_02.png';
import hit03Left from '../../assets/Enemy01/Left/Hit/Enemy01_Hit_03.png';

import run01Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_01.png';
import run02Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_02.png';
import run03Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_03.png';
import run04Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_04.png';
import run05Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_05.png';
import run06Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_06.png';
import run07Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_07.png';
import run08Left from '../../assets/Enemy01/Left/Run/Enemy01_Run_08.png';

import shoot01Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_01.png';
import shoot02Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_02.png';
import shoot03Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_03.png';
import shoot04Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_04.png';
import shoot05Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_05.png';
import shoot06Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_06.png';
import shoot07Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_07.png';
import shoot08Left from '../../assets/Enemy01/Left/Shoot/Enemy01_Shoot_08.png';

const idleLeft = [
  createImage(idle01Left),
  createImage(idle02Left),
  createImage(idle03Left),
  createImage(idle04Left),
  createImage(idle05Left),
  createImage(idle06Left),
  createImage(idle07Left),
  createImage(idle08Left)
];

const runLeft = [
  createImage(run01Left),
  createImage(run02Left),
  createImage(run03Left),
  createImage(run04Left),
  createImage(run05Left),
  createImage(run06Left),
  createImage(run07Left),
  createImage(run08Left)
];

const shootLeft = [
  createImage(shoot01Left),
  createImage(shoot02Left),
  createImage(shoot03Left),
  createImage(shoot04Left),
  createImage(shoot05Left),
  createImage(shoot06Left),
  createImage(shoot07Left),
  createImage(shoot08Left)
];

const hitLeft = [
  createImage(hit01Left),
  createImage(hit02Left),
  createImage(hit03Left)
];

const idleRight = [
  createImage(idle01Right),
  createImage(idle02Right),
  createImage(idle03Right),
  createImage(idle04Right),
  createImage(idle05Right),
  createImage(idle06Right),
  createImage(idle07Right),
  createImage(idle08Right)
];

const hitRight = [
  createImage(hit01Right),
  createImage(hit02Right),
  createImage(hit03Right)
];

const runRight = [
  createImage(run01Right),
  createImage(run02Right),
  createImage(run03Right),
  createImage(run04Right),
  createImage(run05Right),
  createImage(run06Right),
  createImage(run07Right),
  createImage(run08Right)
];

const shootRight = [
  createImage(shoot01Right),
  createImage(shoot02Right),
  createImage(shoot03Right),
  createImage(shoot04Right),
  createImage(shoot05Right),
  createImage(shoot06Right),
  createImage(shoot07Right),
  createImage(shoot08Right)
];

export default {
  right: { idle: idleRight, run: runRight, shoot: shootRight, hit: hitRight },
  left: { idle: idleLeft, run: runLeft, shoot: shootLeft, hit: hitLeft }
};
