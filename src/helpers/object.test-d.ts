import { type } from '../type';

describe('object — with a flat map', () => {
  const result = type(({ object }) => ({
    v: object({ name: 'string', age: 'number' }),
  }));

  expectTypeOf(result.type).toEqualTypeOf<{
    v: { name: string; age: number };
  }>();
  expectTypeOf(result.type.v).toEqualTypeOf<{
    name: string;
    age: number;
  }>();
});

describe('object — with a nested map', () => {
  const result = type(({ object }) => ({
    v: object({ user: { name: 'string', active: 'boolean' } }),
  }));

  expectTypeOf(result.type).toEqualTypeOf<{
    v: { user: { name: string; active: boolean } };
  }>();
});

describe('object — no argument infers unknown map', () => {
  const result = type(({ object }) => ({ v: object() }));

  expectTypeOf(result.type).toMatchTypeOf<object>();
});
