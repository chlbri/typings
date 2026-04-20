import { type } from '../type';
import { primitiveObject } from './primitiveObject';

describe('Helper: primitiveObject', () => {
  describe('#01 => direct call — no argument', () => {
    const result = primitiveObject();

    test('#01 => returns undefined', () => expect(result).toBeUndefined());
  });

  describe('#02 => direct call — string literal', () => {
    const result = primitiveObject('string');

    test('#01 => returns the string', () => expect(result).toBe('string'));
  });

  describe('#03 => direct call — number literal', () => {
    const result = primitiveObject('number');

    test('#01 => returns the string', () => expect(result).toBe('number'));
  });

  describe('#04 => direct call — map', () => {
    const result = primitiveObject({ name: 'string', age: 'number' });

    test('#01 => returns the map', () =>
      expect(result).toEqual({ name: 'string', age: 'number' }));
  });

  describe('#05 => direct call — nested map', () => {
    const result = primitiveObject({
      user: { name: 'string', active: 'boolean' },
    });

    test('#01 => returns the nested map', () =>
      expect(result).toEqual({
        user: { name: 'string', active: 'boolean' },
      }));
  });

  describe('#06 => .map() — no argument', () => {
    const result = primitiveObject.map();

    test('#01 => returns undefined', () => expect(result).toBeUndefined());
  });

  describe('#07 => via type() — map', () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ name: 'string', age: 'number' }),
    );

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ name: 'string', age: 'number' }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { name: 'string', age: 'number' },
      }));
  });

  describe('#08 => via type() — string literal', () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject('string'),
    );

    test('#01 => value is string', () =>
      expect(result.value).toBe('string'));
  });

  describe('#09 => via type() — number literal', () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject('number'),
    );

    test('#01 => value is number string', () =>
      expect(result.value).toBe('number'));
  });

  describe('#10 => via type() — nested map', () => {
    const result = type(({ primitiveObject }) =>
      primitiveObject({ user: { name: 'string', active: 'boolean' } }),
    );

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        user: { name: 'string', active: 'boolean' },
      }));
  });

  describe('#11 => via type() — combined with optional', () => {
    const result = type(({ primitiveObject, optional }) => ({
      schema: primitiveObject({ name: 'string', age: 'number' }),
      label: optional('string'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        schema: { name: 'string', age: 'number' },
        label: 'string',
      }));
  });
});
