import { type } from '../type';

describe('object — no argument', () => {
  const result = type(({ object }) => ({ v: object() }));

  test('#01 => value.v is undefined', () =>
    expect(result.value).toEqual({ v: undefined }));

  test('#02 => ~standard.version is 1', () =>
    expect(result['~standard'].version).toBe(1));

  test('#03 => validate() captures the value', () =>
    expect(result['~standard'].validate('any')).toEqual({
      value: { v: undefined },
    }));
});

describe('object — with a flat map', () => {
  const result = type(({ object }) => ({
    v: object({ name: 'string', age: 'number' }),
  }));

  test('#01 => value matches', () =>
    expect(result.value).toEqual({
      v: { name: 'string', age: 'number' },
    }));

  test('#02 => validate() captures the value', () =>
    expect(result['~standard'].validate('any')).toEqual({
      value: { v: { name: 'string', age: 'number' } },
    }));
});

describe('object — with a nested map', () => {
  const result = type(({ object }) => ({
    v: object({ user: { name: 'string', active: 'boolean' } }),
  }));

  test('#01 => value matches', () =>
    expect(result.value).toEqual({
      v: { user: { name: 'string', active: 'boolean' } },
    }));

  test('#02 => validate() captures the value', () =>
    expect(result['~standard'].validate('any')).toEqual({
      value: { v: { user: { name: 'string', active: 'boolean' } } },
    }));
});

describe('object — standalone', () => {
  const result = type(({ object }) => object({ status: 'string' }));

  test('#01 => value matches', () =>
    expect(result.value).toEqual({ status: 'string' }));

  test('#02 => ~standard.version is 1', () =>
    expect(result['~standard'].version).toBe(1));
});
