import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('Helper: soa (SingleOrArray)', () => {
  describe('#01 => soa with string', () => {
    const result = type(({ soa }) => ({
      value: soa('string'),
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

  describe('#02 => soa with object', () => {
    const result = type(({ soa }) => ({
      item: soa({ name: 'string' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ item: { name: 'string' } }));
  });

  describe('#03 => soa with number', () => {
    const result = type(({ soa }) => ({
      count: soa('number'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ count: 'number' }));
  });

  describe('#04 => soa with boolean', () => {
    const result = type(({ soa }) => ({
      flag: soa('boolean'),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ flag: 'boolean' }));
  });

  describe('#05 => soa with complex object', () => {
    const result = type(({ soa }) => ({
      user: soa({ id: 'string', name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        user: { id: 'string', name: 'string', age: 'number' },
      }));
  });

  describe('#06 => soa without argument', () => {
    const result = type(({ soa }) => ({
      data: soa(),
    }));

    test('#01 => value.data is undefined', () =>
      expect(result.type.data).toBeUndefined());
  });
});
