/* eslint-disable no-undef */
import {
  checkCollideSide,
  checkFallOffPlatform,
  checkOnPlatform
} from '../utils/checkCollision';
import { Platform4 } from '../utils/Factories/Platform';

describe('checkCollideSide works', () => {
  test('from the left', () => {
    const platform = Platform4({ x: 300, y: 700 });
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: -10,
        x: 10
      },
      x: 245,
      y: 860
    };

    expect(checkCollideSide(platform, player)).toBe('left');
  });

  test('from the right', () => {
    const platform = Platform4({ x: 300, y: 700 });
    // right of platform is 369
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: -10,
        x: -10
      },
      x: 374,
      y: 860
    };

    expect(checkCollideSide(platform, player)).toBe('right');
  });

  test('when platform is moving left and player moving right', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocityX: -20 };
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: -10,
        x: 10
      },
      x: 245,
      y: 860
    };

    expect(checkCollideSide(platform, player)).toBe('left');
  });
});

describe('checkOnPlatform works', () => {
  test('works', () => {
    const platform = Platform4({ x: 300, y: 700 });
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: -10
      },
      x: 305,
      y: 650
    };

    expect(checkOnPlatform(platform, player)).toBe(true);
  });
});

describe('checkFallOffPlatform works', () => {
  test('fall off left', () => {
    const platform = Platform4({ x: 300, y: 700 });
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: -10
      },
      x: 305,
      y: 650
    };

    expect(checkFallOffPlatform(platform, player)).toBe('left');
  });

  test('fall off right', () => {
    const platform = Platform4({ x: 300, y: 700 });
    // right of platform is 369
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: 10
      },
      x: 315,
      y: 650
    };

    expect(checkFallOffPlatform(platform, player)).toBe('right');
  });

  test('when platform is moving left', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocityX: -10 };
    // right of platform is 369
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: 0
      },
      x: 315,
      y: 650
    };

    expect(checkFallOffPlatform(platform, player)).toBe('right');
  });

  test('when platform is moving right', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocityX: -10 };
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: -10
      },
      x: 305,
      y: 650
    };

    expect(checkFallOffPlatform(platform, player)).toBe('left');
  });
});
