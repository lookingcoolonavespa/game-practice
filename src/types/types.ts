import { PlatformInterface } from './interfaces';
import playerSprites from '../utils/sprites/playerSprites';

export type PlatformFactory = (position: {
  x: number;
  y: number;
}) => PlatformInterface;

export type Action = keyof typeof playerSprites;
