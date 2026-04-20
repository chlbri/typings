import { standardize, standardize2 } from './standard';

describe('standardize', () => {
  describe('#01 => with a string value', () => {
    const result = standardize('hello');

    test('#01 => value is "hello"', () =>
      expect(result.value).toBe('hello'));

    test('#02 => ~standard.version is 1', () =>
      expect(result['~standard'].version).toBe(1));

    test('#03 => ~standard.vendor is "@bemedev/typings"', () =>
      expect(result['~standard'].vendor).toBe('@bemedev/typings'));

    test('#04 => ~standard.types.input is "hello"', () =>
      expect(result['~standard'].types?.input).toBe('hello'));

    test('#05 => ~standard.types.output is "hello"', () =>
      expect(result['~standard'].types?.output).toBe('hello'));
    describe('#06 => validate', () => {
      test('#01 => validate() returns { value: "hello" }', () =>
        expect(result['~standard'].validate('any')).toEqual({
          value: 'hello',
        }));

      test('#02 => validate("ignored") still returns { value: "hello" }', () =>
        expect(result['~standard'].validate('ignored')).toEqual({
          value: 'hello',
        }));

      test('#03 => validate(42) still returns { value: "hello" }', () =>
        expect(result['~standard'].validate(42)).toEqual({
          value: 'hello',
        }));
    });
  });

  describe('#02 => with a number value', () => {
    const result = standardize(42);

    test('#01 => value is 42', () => expect(result.value).toBe(42));

    test('#02 => ~standard.types.input is 42', () =>
      expect(result['~standard'].types?.input).toBe(42));

    test('#03 => ~standard.types.output is 42', () =>
      expect(result['~standard'].types?.output).toBe(42));

    test('#04 => validate() returns { value: 42 }', () =>
      expect(result['~standard'].validate('any')).toEqual({ value: 42 }));

    test('#05 => validate("x") still returns { value: 42 }', () =>
      expect(result['~standard'].validate('x')).toEqual({ value: 42 }));
  });

  describe('#03 => with undefined', () => {
    const result = standardize(undefined);

    test('#01 => value is undefined', () =>
      expect(result.value).toBeUndefined());

    test('#02 => ~standard.types.input is undefined', () =>
      expect(result['~standard'].types?.input).toBeUndefined());

    test('#03 => validate() returns { value: undefined }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: undefined,
      }));
  });

  describe('#04 => with null', () => {
    const result = standardize(null);

    test('#01 => value is null', () => expect(result.value).toBeNull());

    test('#02 => ~standard.types.input is null', () =>
      expect(result['~standard'].types?.input).toBeNull());

    test('#03 => validate() returns { value: null }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: null,
      }));
  });

  describe('#05 => with a boolean', () => {
    const result = standardize(true);

    test('#01 => value is true', () => expect(result.value).toBe(true));

    test('#02 => validate() returns { value: true }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: true,
      }));
  });

  describe('#06 => with an object', () => {
    const result = standardize({ a: 1, b: 'x' });

    test('#01 => value matches', () =>
      expect(result.value).toEqual({ a: 1, b: 'x' }));

    test('#02 => ~standard.types.input matches', () =>
      expect(result['~standard'].types?.input).toEqual({ a: 1, b: 'x' }));

    test('#03 => validate() returns { value: ... }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { a: 1, b: 'x' },
      }));
  });

  describe('#07 => with an array', () => {
    const result = standardize([1, 2, 3]);

    test('#01 => value matches', () =>
      expect(result.value).toEqual([1, 2, 3]));

    test('#02 => validate() returns { value: [1,2,3] }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: [1, 2, 3],
      }));
  });
});

describe('standardize2', () => {
  test('#01 => with no argument returns undefined', () =>
    expect(standardize2()).toBeUndefined());

  test('#02 => with undefined returns undefined', () =>
    expect(standardize2(undefined)).toBeUndefined());

  test('#03 => with a string returns the string', () =>
    expect(standardize2('hello')).toBe('hello'));

  test('#04 => with a number returns the number', () =>
    expect(standardize2(42)).toBe(42));

  test('#05 => with null returns null', () =>
    expect(standardize2(null)).toBeNull());

  test('#06 => with a boolean returns the boolean', () =>
    expect(standardize2(true)).toBe(true));

  test('#07 => with an object returns the object', () =>
    expect(standardize2({ a: 1 })).toEqual({ a: 1 }));
});
