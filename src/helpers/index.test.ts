import { PRIMITIVES } from '../constants';
import { type } from '../type';

describe('Transform: type() function', () => {
  describe('#01 => no argument', () => {
    const result = type();

    test('#01 => value is undefined', () =>
      expect(result.value).toBeUndefined());

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() returns { value: undefined }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: undefined,
      }));
  });

  describe('#02 => primitive string literals', () => {
    it.each(PRIMITIVES.map(k => [k] as const))(
      '#0%# => type("%s") returns schema with value',
      input => {
        const result = type(input as any);
        expect(result.value).toBe(input);
        expect(result['~standard'].version).toBe(1);
      },
    );
  });

  describe('#03 => plain object', () => {
    const result = type({});

    test('#01 => value is empty object', () =>
      expect(result.value).toEqual({}));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));
  });

  describe('#04 => object with properties', () => {
    const result = type({ name: 'string', age: 'number' });

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ name: 'string', age: 'number' }));

    test('#02 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { name: 'string', age: 'number' },
      }));
  });

  describe('#05 => recursive object', () => {
    const result = type({
      user: { name: 'string', active: 'boolean' },
    });

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        user: { name: 'string', active: 'boolean' },
      }));
  });
});
