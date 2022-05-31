import playerIdle01Src from '../assets/Player/Idle/Idle_01.png';
import playerIdle02Src from '../assets/Player/Idle/Idle_02.png';
import playerIdle03Src from '../assets/Player/Idle/Idle_03.png';
import playerIdle04Src from '../assets/Player/Idle/Idle_04.png';
import playerIdle05Src from '../assets/Player/Idle/Idle_05.png';
import playerIdle06Src from '../assets/Player/Idle/Idle_06.png';
import playerIdle07Src from '../assets/Player/Idle/Idle_07.png';
import playerIdle08Src from '../assets/Player/Idle/Idle_08.png';

import playerRun01Src from '../assets/Player/Run/Run_01.png';
import playerRun02Src from '../assets/Player/Run/Run_02.png';
import playerRun03Src from '../assets/Player/Run/Run_03.png';
import playerRun04Src from '../assets/Player/Run/Run_04.png';
import playerRun05Src from '../assets/Player/Run/Run_05.png';
import playerRun06Src from '../assets/Player/Run/Run_06.png';
import playerRun07Src from '../assets/Player/Run/Run_07.png';
import playerRun08Src from '../assets/Player/Run/Run_08.png';

const idle = [
  createImage(playerIdle01Src),
  createImage(playerIdle02Src),
  createImage(playerIdle03Src),
  createImage(playerIdle04Src),
  createImage(playerIdle05Src),
  createImage(playerIdle06Src),
  createImage(playerIdle07Src),
  createImage(playerIdle08Src)
];

const run = [
  createImage(playerRun01Src),
  createImage(playerRun02Src),
  createImage(playerRun03Src),
  createImage(playerRun04Src),
  createImage(playerRun05Src),
  createImage(playerRun06Src),
  createImage(playerRun07Src),
  createImage(playerRun08Src)
];

export default {
  idle,
  run
};

function createImage(src: string) {
  const image = new Image();
  image.src = src;
  return image;
}
