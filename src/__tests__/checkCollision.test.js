/* eslint-disable no-undef */
import {
  checkCollideSide,
  checkFallOffPlatform,
  checkInLineOfSight,
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

    expect(
      checkCollideSide(platform, player, {
        rectOne: false,
        rectTwo: true
      })
    ).toBe('left');
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

    expect(
      checkCollideSide(platform, player, {
        rectOne: false,
        rectTwo: true
      })
    ).toBe('right');
  });

  test('when platform is moving left', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocity: { x: -20 } };
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: -10,
        x: 0
      },
      x: 245,
      y: 860
    };

    expect(
      checkCollideSide(platform, player, {
        rectOne: true,
        rectTwo: false
      })
    ).toBe('left');
  });

  test('when platform is moving right', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocity: { x: 20 } };
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: -10,
        x: 0
      },
      x: 375,
      y: 860
    };

    expect(
      checkCollideSide(platform, player, {
        rectOne: true,
        rectTwo: false
      })
    ).toBe('right');
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

    expect(
      checkOnPlatform(platform, player, {
        rectOne: true,
        rectTwo: false
      })
    ).toBe(true);
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

    expect(
      checkFallOffPlatform(platform, player, {
        rectOne: false,
        rectTwo: true
      })
    ).toBe('left');
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

    expect(
      checkFallOffPlatform(platform, player, {
        rectOne: false,
        rectTwo: true
      })
    ).toBe('right');
  });

  test('when platform is moving left', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocity: { x: -10 } };
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

    expect(
      checkFallOffPlatform(platform, player, {
        rectOne: true,
        rectTwo: false
      })
    ).toBe('right');
  });

  test('when platform is moving right', () => {
    const platform = { ...Platform4({ x: 300, y: 700 }), velocity: { x: 10 } };
    // bottom of platform is 872
    const player = {
      width: 50,
      height: 50,
      velocity: {
        y: 0,
        x: 0
      },
      x: 305,
      y: 650
    };

    expect(
      checkFallOffPlatform(platform, player, {
        rectOne: true,
        rectTwo: false
      })
    ).toBe('left');
  });
});

describe('checkInLineOfSight works', () => {
  test('from right', () => {
    const line = {
      y: 65,
      x: {
        start: 500,
        end: 200
      }
    };

    const rect = {
      x: 300,
      y: 50,
      height: 50,
      width: 50
    };

    const rectTwo = {
      x: 140,
      y: 50,
      height: 50,
      width: 50
    };

    const rectThree = {
      x: 155,
      y: 50,
      height: 50,
      width: 50
    };

    expect(checkInLineOfSight(line, rect)).toBe('right');
    expect(checkInLineOfSight(line, rectTwo)).toBe('');
    expect(checkInLineOfSight(line, rectThree)).toBe('right');
  });

  test('from left', () => {
    const line = {
      y: 65,
      x: {
        start: 200,
        end: 500
      }
    };

    const rect = {
      x: 300,
      y: 50,
      height: 50,
      width: 50
    };

    const rectTwo = {
      x: 501,
      y: 50,
      height: 50,
      width: 50
    };

    const rectThree = {
      x: 499,
      y: 50,
      height: 50,
      width: 50
    };

    expect(checkInLineOfSight(line, rect)).toBe('left');
    expect(checkInLineOfSight(line, rectTwo)).toBe('');
    expect(checkInLineOfSight(line, rectThree)).toBe('left');
  });

  test('doesnt work when y is too high or too low', () => {
    const line = {
      y: 65,
      x: {
        start: 200,
        end: 500
      }
    };

    const rect = {
      x: 300,
      y: 14,
      height: 50,
      width: 50
    };

    const rectTwo = {
      x: 66,
      y: 14,
      height: 50,
      width: 50
    };

    expect(checkInLineOfSight(line, rect)).toBe('');
    expect(checkInLineOfSight(line, rectTwo)).toBe('');
  });
});
