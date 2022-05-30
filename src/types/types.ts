import { PlatformInterface } from './interfaces';

export type PlatformFactory = (position: {
  x: number;
  y: number;
}) => PlatformInterface;
