import { type } from '../type';
import { STANDARD_KEY } from '../constants';

describe('omit — with flat map', () => {
  const result = type(({ omit }) =>
    omit({ name: 'string', age: 'number', email: 'string' }, 'email'),
  );

  test('#01 => value includes all properties', () =>
    expect(result.type).toEqual({
      name: 'string',
      age: 'number',
      email: 'string',
    }));

  test(`#02 => ${STANDARD_KEY}.version is 1`, () =>
    expect(result[STANDARD_KEY].version).toBe(1));

  test('#03 => validate() captures the value', () =>
    expect(result[STANDARD_KEY].validate('any')).toEqual({
      value: { name: 'string', age: 'number', email: 'string' },
    }));
});

describe('omit — with nested map', () => {
  const result = type(({ omit }) =>
    omit(
      {
        user: { name: 'string', age: 'number', email: 'string' },
        active: 'boolean',
      },
      'active',
    ),
  );

  test('#01 => value includes all properties', () =>
    expect(result.type).toEqual({
      user: { name: 'string', age: 'number', email: 'string' },
      active: 'boolean',
    }));

  test('#02 => validate() captures the value', () =>
    expect(result[STANDARD_KEY].validate('any')).toEqual({
      value: {
        user: { name: 'string', age: 'number', email: 'string' },
        active: 'boolean',
      },
    }));
});
