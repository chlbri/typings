import { type } from '../type';

describe('readonly', () => {
  describe('#01 => wrapping a flat object', () => {
    const result = type(({ readonly }) => readonly({ x: 'string' }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ x: 'string' }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() returns { value: { x: "string" } }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { x: 'string' },
      }));
  });

  describe('#02 => inside an object', () => {
    const result = type(({ readonly }) => ({
      r: readonly({ name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        r: { name: 'string', age: 'number' },
      }));

    test('#02 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { r: { name: 'string', age: 'number' } },
      }));
  });

  describe('#03 => wrapping a nested object', () => {
    const result = type(({ readonly }) =>
      readonly({ outer: { inner: 'number' } }),
    );

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ outer: { inner: 'number' } }));
  });

  describe('#04 => combined with array helper', () => {
    const result = type(({ readonly, array }) => ({
      items: readonly(array('string')),
    }));

    test('#01 => value.items matches', () =>
      expect(result.value).toEqual({ items: ['string'] }));
  });

  describe('#05 => combined with tuple helper', () => {
    const result = type(({ readonly, tuple }) => ({
      pair: readonly(tuple('string', 'number')),
    }));

    test('#01 => value.pair matches', () =>
      expect(result.value).toEqual({ pair: ['string', 'number'] }));
  });
});
