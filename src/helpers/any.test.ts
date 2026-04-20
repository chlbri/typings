import { type } from '../type';

describe('Helper: any', () => {
  describe('#01 => with string type', () => {
    const result = type(({ any }) => ({
      value: any('string'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ value: 'string' }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { value: 'string' },
      }));
  });

  describe('#02 => with nested object', () => {
    const result = type(({ any, readonly }) => ({
      data: readonly(any({ name: 'string', age: 'number' })),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        data: { name: 'string', age: 'number' },
      }));

    test('#02 => validate() captures the value', () =>
      expect(result['~standard'].validate(false)).toEqual({
        value: { data: { name: 'string', age: 'number' } },
      }));
  });

  describe('#03 => with number type', () => {
    const result = type(({ any }) => ({
      count: any('number'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ count: 'number' }));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));
  });

  describe('#04 => without argument', () => {
    const result = type(({ any }) => ({
      unknown: any(),
    }));

    test('#01 => value.unknown is undefined', () =>
      expect(result.value.unknown).toBeUndefined());

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { unknown: undefined },
      }));
  });

  describe('#05 => with boolean type', () => {
    const result = type(({ any }) => ({
      flag: any('boolean'),
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ flag: 'boolean' }));
  });
});
