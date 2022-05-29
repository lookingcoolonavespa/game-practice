/* eslint-disable no-undef */
import checkCollision from '../utils/checkCollision';
import { Platform4 } from '../utils/Platform';

describe('checkCollision works', () => {
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

    expect(checkCollision([platform], player)).toBe(true);
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

    expect(checkCollision([platform], player)).toBe(true);
  });
});
