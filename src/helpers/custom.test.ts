import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('Helper: custom', () => {
  describe('#01 => custom with no argument', () => {
    const result = type(({ custom }) => ({
      value: custom<number>(),
    }));

    test('#01 => value.value is undefined', () =>
      expect(result.type.value).toBeUndefined());

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));
  });

  describe('#02 => custom with string value', () => {
    const result = type(({ custom }) => ({
      value: custom('test'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ value: 'test' }));

    test('#02 => validate() captures the value', () =>
      expect(result[STANDARD_KEY].validate('any')).toEqual({
        value: { value: 'test' },
      }));
  });

  describe('#03 => custom as root', () => {
    const result = type(({ custom }) => custom<string>());

    test('#01 => value is undefined', () =>
      expect(result.type).toBeUndefined());

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));
  });

  describe('#04 => custom with RegExp type', () => {
    const result = type(({ custom }) => ({
      regex: custom<RegExp>(),
    }));

    test('#01 => value.regex is undefined', () =>
      expect(result.type.regex).toBeUndefined());
  });

  describe('#05 => custom with array type', () => {
    const result = type(({ custom }) => ({
      items: custom<string[]>(),
    }));

    test('#01 => value.items is undefined', () =>
      expect(result.type.items).toBeUndefined());
  });
});
