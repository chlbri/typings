import { type } from './type';

describe('type — no option', () => {
  const result = type();

  test('#01 => value is undefined', () =>
    expect(result.value).toBeUndefined());

  test('#02 => ~standard.version is 1', () =>
    expect(result['~standard'].version).toBe(1));

  test('#03 => ~standard.vendor is "@bemedev/typings"', () =>
    expect(result['~standard'].vendor).toBe('@bemedev/typings'));
  describe('#04 => validate', () => {
    test('#01 => validate() returns { value: undefined }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: undefined,
      }));

    test('#02 => validate(arg) still returns { value: undefined }', () =>
      expect(result['~standard'].validate('ignored')).toEqual({
        value: undefined,
      }));
  });
});

describe('type — direct primitive string option', () => {
  const result = type('string');

  test('#01 => value is "string"', () =>
    expect(result.value).toBe('string'));
  describe('#02 => validate', () => {
    test('#01 => validate() returns { value: "string" }', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: 'string',
      }));

    test('#02 => validate(arg) still returns { value: "string" }', () =>
      expect(result['~standard'].validate(42)).toEqual({
        value: 'string',
      }));
  });
});

describe('type — direct object option', () => {
  const result = type({ name: 'string', age: 'number' });

  test('#01 => value matches the input object', () =>
    expect(result.value).toEqual({ name: 'string', age: 'number' }));

  test('#02 => validate() captures the value', () =>
    expect(result['~standard'].validate('any')).toEqual({
      value: { name: 'string', age: 'number' },
    }));
});

describe('type — empty object option', () => {
  const result = type({});

  test('#01 => value is {}', () => expect(result.value).toEqual({}));

  test('#02 => validate() returns { value: {} }', () =>
    expect(result['~standard'].validate('any')).toEqual({ value: {} }));
});

describe('type — function option', () => {
  describe('#01 => returning a plain object via helpers', () => {
    const result = type(({ any }) => ({ v: any('string') }));

    test('#01 => value.v is "string"', () =>
      expect(result.value).toEqual({ v: 'string' }));

    test('#02 => validate() captures the value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { v: 'string' },
      }));
  });

  test('#02 => returning undefined via any()', () => {
    const result = type(({ any }) => ({ v: any() }));
    expect(result.value).toEqual({ v: undefined });
  });

  describe('#03 => returning a nested object', () => {
    const result = type(() => ({
      user: { name: 'string', age: 'number' },
    }));

    test('#01 => value matches', () =>
      expect(result.value).toEqual({
        user: { name: 'string', age: 'number' },
      }));

    test('#02 => validate() captures the nested value', () =>
      expect(result['~standard'].validate('any')).toEqual({
        value: { user: { name: 'string', age: 'number' } },
      }));
  });
});

describe('type — ~standard.types', () => {
  describe('#01 => with string value', () => {
    const result = type('number');

    test('#01 => types.input is "number"', () =>
      expect(result['~standard'].types?.input).toBe('number'));

    test('#02 => types.output is "number"', () =>
      expect(result['~standard'].types?.output).toBe('number'));
  });

  describe('#02 => with object value', () => {
    const result = type({ x: 'boolean' });

    test('#01 => types.input matches', () =>
      expect(result['~standard'].types?.input).toEqual({ x: 'boolean' }));

    test('#02 => types.output matches', () =>
      expect(result['~standard'].types?.output).toEqual({
        x: 'boolean',
      }));
  });
});

describe('type — validate always returns captured value', () => {
  const result = type({ key: 'string' });

  test('#01 => validate() without arg', () =>
    expect(result['~standard'].validate('any')).toEqual({
      value: { key: 'string' },
    }));

  test('#02 => validate(null)', () =>
    expect(result['~standard'].validate(null)).toEqual({
      value: { key: 'string' },
    }));

  test('#03 => validate({ key: "other" })', () =>
    expect(result['~standard'].validate({ key: 'other' })).toEqual({
      value: { key: 'string' },
    }));

  test('#04 => validate(undefined)', () =>
    expect(result['~standard'].validate(undefined)).toEqual({
      value: { key: 'string' },
    }));
});
