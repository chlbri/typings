import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('Helper: partial', () => {
  describe('#01 => partial object', () => {
    const result = type(({ partial }) => ({
      user: partial({ name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        user: { name: 'string', age: 'number' },
      }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result[STANDARD_KEY].validate('any')).toEqual({
        value: { user: { name: 'string', age: 'number' } },
      }));
  });

  describe('#02 => partial with single property', () => {
    const result = type(({ partial }) => ({
      config: partial({ enabled: 'boolean' }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        config: { enabled: 'boolean' },
      }));
  });

  describe('#03 => partial with multiple properties', () => {
    const result = type(({ partial }) => ({
      settings: partial({
        theme: 'string',
        fontSize: 'number',
        darkMode: 'boolean',
      }),
    }));

    test('#01 => value matches', () =>
      expect(result.type).toEqual({
        settings: {
          theme: 'string',
          fontSize: 'number',
          darkMode: 'boolean',
        },
      }));
  });

  describe('#04 => partial at root', () => {
    const result = type(({ partial }) =>
      partial({ id: 'string', name: 'string' }),
    );

    test('#01 => value matches', () =>
      expect(result.type).toEqual({ id: 'string', name: 'string' }));

    test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
      expect(result[STANDARD_KEY].version).toBe(1));
  });
});
