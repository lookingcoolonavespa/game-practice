import Player from '../utils/Factories/Player';
import { isObject } from '../utils/misc';

describe('isObject works', () => [
  test('works', () => {
    const og = Player();

    expect(isObject(og)).toBe(true);
  })
]);
