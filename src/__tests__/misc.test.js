import Player from '../utils/Factories/Player';
import { deepCopyArray, deepCopyObj, isObject } from '../utils/misc';

describe('isObject works', () => {
  test('works', () => {
    const og = Player();

    expect(isObject(og)).toBe(true);
  });

  test('returns false for arrays', () => {
    expect(isObject([1, 2])).toBe(false);
  });
});

describe('deepCopyArray works', () => {
  test('with inner array', () => {
    const innerArr = [1, 2];
    const arr = [innerArr];

    const copy = deepCopyArray(arr);

    expect(copy).not.toBe(arr);
    expect(copy[0]).not.toBe(innerArr);
    expect(copy[0]).toEqual(innerArr);
  });

  test('3d array', () => {
    const innerInnerArr = [1, 2];
    const innerArr = [innerInnerArr];
    const arr = [innerArr];
    const copy = deepCopyArray(arr);

    expect(copy).not.toBe(arr);
    expect(copy[0][0]).not.toBe(innerInnerArr);
    expect(copy[0][0]).toEqual(innerInnerArr);
  });

  test('with inner object', () => {
    const innerObj = { a: 1, b: 2 };
    const arr = [innerObj];

    const copy = deepCopyArray(arr);

    expect(copy).not.toBe(arr);
    expect(copy[0]).not.toBe(innerObj);
    expect(copy[0]).toEqual(innerObj);
  });
});

describe('deepCopyObject works', () => {
  test('with inner array', () => {
    const innerArr = [1, 2];
    const obj = {
      a: innerArr
    };

    const copy = deepCopyObj(obj);

    expect(copy).not.toBe(obj);
    expect(copy.a).not.toBe(innerArr);
    expect(copy.a).toEqual(innerArr);
  });

  test('with inner object', () => {
    const innerInnerArr = [1, 2];
    const innerObj = { a: innerInnerArr };
    const obj = {
      a: innerObj
    };

    const copy = deepCopyObj(obj);

    expect(copy).not.toBe(obj);
    expect(copy.a).not.toBe(innerObj);
    expect(copy.a).toEqual(innerObj);
    expect(copy.a.a).not.toBe(innerInnerArr);
    expect(copy.a.a).toEqual(innerInnerArr);
  });
});
