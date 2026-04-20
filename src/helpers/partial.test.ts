import { type } from '../type';

describe('Helper: partial', () => {
  describe('#01 => partial object', () => {
    const result = type(({ partial }) => ({
      user: partial({ name: 'string', age: 'number' }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        user: { name: 'string', age: 'number' },
      }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { user: { name: 'string', age: 'number' } },
      }));
  });

  describe('#02 => partial with single property', () => {
    const result = type(({ partial }) => ({
      config: partial({ enabled: 'boolean' }),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
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
      expect(result.value).toEqual({
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
      expect(result.value).toEqual({ id: 'string', name: 'string' }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));
  });
});
