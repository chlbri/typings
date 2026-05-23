import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('Helper: sora (SingleOrArray)', () => {
  describe('#01 => sora with string', () => {
    const result = type(({ sora }) => ({
      value: sora('string'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ value: 'string' }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result[STANDARD_KEY].validate('any')).toEqual({
        value: { value: 'string' },
      }));
  });

  describe('#02 => sora with object', () => {
    const result = type(({ sora }) => ({
      item: sora({ name: 'string' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ item: { name: 'string' } }));
  });

  describe('#03 => sora with number', () => {
    const result = type(({ sora }) => ({
      count: sora('number'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ count: 'number' }));
  });

  describe('#04 => sora with boolean', () => {
    const result = type(({ sora }) => ({
      flag: sora('boolean'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ flag: 'boolean' }));
  });

  describe('#05 => sora with complex object', () => {
    const result = type(({ sora }) => ({
      user: sora({ id: 'string', name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        user: { id: 'string', name: 'string', age: 'number' },
      }));
  });

  describe('#06 => sora without argument', () => {
    const result = type(({ sora }) => ({
      data: sora(),
    }));

    test('#01 => value.data is undefined', () =>
      expect(result.type.data).toBeUndefined());
  });
});
