import type { Sh } from '../types';
import { type } from '../type';

describe('object — with a flat map', () => {
  const result = type(({ object }) => ({
    v: object({ name: 'string', age: 'number' }),
  }));

  expectTypeOf(result).toEqualTypeOf<
    Sh<{ v: { name: string; age: number } }>
  >();
  expectTypeOf(result.value.v).toEqualTypeOf<{
    name: string;
    age: number;
  }>();
});

describe('object — with a nested map', () => {
  const result = type(({ object }) => ({
    v: object({ user: { name: 'string', active: 'boolean' } }),
  }));

  expectTypeOf(result).toEqualTypeOf<
    Sh<{ v: { user: { name: string; active: boolean } } }>
  >();
});

describe('object — no argument infers unknown map', () => {
  const result = type(({ object }) => ({ v: object() }));

  expectTypeOf(result).toMatchTypeOf<Sh<object>>();
});
