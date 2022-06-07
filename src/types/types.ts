import { PlatformInterface, DeltaTimeoutInterface } from './interfaces';
import playerSprites from '../utils/sprites/playerSprites';

export type PlatformFactory = (position: {
  x: number;
  y: number;
}) => PlatformInterface;

export type Action = keyof typeof playerSprites;

export type KeyPressType = {
  up: {
    pressed: boolean;
    timer: null | DeltaTimeoutInterface;
  };
  left: {
    pressed: boolean;
  };
  right: {
    pressed: boolean;
  };
  space: {
    pressed: boolean;
  };
};
