import { type } from '../type';
import type { Sh } from '../types';

const _unknown = type();
expectTypeOf(_unknown).toEqualTypeOf<Sh<unknown>>();

const _any1 = type(({ custom }) => custom());
expectTypeOf(_any1).toEqualTypeOf<Sh<any>>();

const _any2 = type(({ any }) => any());
expectTypeOf(_any2).toEqualTypeOf<Sh<any>>();

// Plain object
const _obj = type({ name: 'string', age: 'number' });
expectTypeOf(_obj).toEqualTypeOf<Sh<{ name: string; age: number }>>();

// String primitive
const _str = type('string' as const);
expectTypeOf(_str).toEqualTypeOf<Sh<string>>();

// Number primitive
const _num = type('number' as const);
expectTypeOf(_num).toEqualTypeOf<Sh<number>>();

// Boolean primitive
const _bool = type('boolean' as const);
expectTypeOf(_bool).toEqualTypeOf<Sh<boolean>>();

// Via function — flat object with primitive helpers
const _funcObj = type(({ primitive }) => ({
  name: primitive.string(),
  age: primitive.number(),
}));
expectTypeOf(_funcObj).toEqualTypeOf<Sh<{ name: string; age: number }>>();

// Via function — optional field
const _funcOpt = type(({ optional }) => ({
  nick: optional('string'),
}));
expectTypeOf(_funcOpt).toEqualTypeOf<Sh<{ nick?: string }>>();

// Via function — array field
const _funcArr = type(({ array }) => ({
  tags: array('string'),
}));
expectTypeOf(_funcArr).toEqualTypeOf<Sh<{ tags: string[] }>>();

// Via function — union field
const _funcUnion = type(({ union }) => ({
  value: union('string', 'number'),
}));
expectTypeOf(_funcUnion).toEqualTypeOf<Sh<{ value: string | number }>>();

// Via function — partial object
const _funcPartial = type(({ partial }) => ({
  user: partial({ name: 'string', active: 'boolean' }),
}));
expectTypeOf(_funcPartial).toEqualTypeOf<
  Sh<{ user: Partial<{ name: string; active: boolean }> }>
>();
