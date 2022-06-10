import { createImage } from '../misc';

import idle01Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_01.png';
import idle02Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_02.png';
import idle03Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_03.png';
import idle04Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_04.png';
import idle05Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_05.png';
import idle06Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_06.png';
import idle07Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_07.png';
import idle08Left from '../../assets/Gun01/Gun01/Left/Idle/Idle_Gun01_08.png';

import run01Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_01.png';
import run02Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_02.png';
import run03Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_03.png';
import run04Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_04.png';
import run05Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_05.png';
import run06Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_06.png';
import run07Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_07.png';
import run08Left from '../../assets/Gun01/Gun01/Left/Run/Run_Gun01_08.png';

import shootSides01Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_01.png';
import shootSides02Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_02.png';
import shootSides03Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_03.png';
import shootSides04Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_04.png';
import shootSides05Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_05.png';
import shootSides06Left from '../../assets/Gun01/Gun01/Left/ShootSides/ShootSides_Gun01_06.png';

import idle01Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_01.png';
import idle02Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_02.png';
import idle03Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_03.png';
import idle04Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_04.png';
import idle05Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_05.png';
import idle06Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_06.png';
import idle07Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_07.png';
import idle08Right from '../../assets/Gun01/Gun01/Right/Idle/Idle_Gun01_08.png';

import run01Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_01.png';
import run02Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_02.png';
import run03Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_03.png';
import run04Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_04.png';
import run05Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_05.png';
import run06Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_06.png';
import run07Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_07.png';
import run08Right from '../../assets/Gun01/Gun01/Right/Run/Run_Gun01_08.png';

import shootSides01Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_01.png';
import shootSides02Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_02.png';
import shootSides03Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_03.png';
import shootSides04Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_04.png';
import shootSides05Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_05.png';
import shootSides06Right from '../../assets/Gun01/Gun01/Right/ShootSides/ShootSides_Gun01_06.png';

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
  createImage(shootSides01Right),
  createImage(shootSides02Right),
  createImage(shootSides03Right),
  createImage(shootSides04Right),
  createImage(shootSides05Right),
  createImage(shootSides06Right)
];

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
  createImage(shootSides01Left),
  createImage(shootSides02Left),
  createImage(shootSides03Left),
  createImage(shootSides04Left),
  createImage(shootSides05Left),
  createImage(shootSides06Left)
];

export default {
  left: { idleLeft, runLeft, shootLeft },
  right: { idleRight, runRight, shootRight }
};
