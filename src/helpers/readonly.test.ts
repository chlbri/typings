import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('readonly', () => {
  describe('#01 => wrapping a flat object', () => {
    const result = type(({ readonly }) => readonly({ x: 'string' }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ x: 'string' }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));

    test('#03 => validate() returns { value: { x: "string" } }', () =>
      expect(result[STANDARD_KEY].validate('any')).toEqual({
        value: { x: 'string' },
      }));
  });

  describe('#02 => inside an object', () => {
    const result = type(({ readonly }) => ({
      r: readonly({ name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        r: { name: 'string', age: 'number' },
      }));

    test('#02 => validate() captures the value', () =>
      expect(result[STANDARD_KEY].validate('any')).toEqual({
        value: { r: { name: 'string', age: 'number' } },
      }));
  });

  describe('#03 => wrapping a nested object', () => {
    const result = type(({ readonly }) =>
      readonly({ outer: { inner: 'number' } }),
    );

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ outer: { inner: 'number' } }));
  });

  describe('#04 => combined with array helper', () => {
    const result = type(({ readonly, array }) => ({
      items: readonly(array('string')),
    }));

    test('#01 => value.items matches', () =>
      expect(result.type).toEqual({ items: ['string'] }));
  });

  describe('#05 => combined with tuple helper', () => {
    const result = type(({ readonly, tuple }) => ({
      pair: readonly(tuple('string', 'number')),
    }));

    test('#01 => value.pair matches', () =>
      expect(result.type).toEqual({ pair: ['string', 'number'] }));
  });
});
