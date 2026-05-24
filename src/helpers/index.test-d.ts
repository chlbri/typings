import { type } from '../type';

const _unknown = type();
expectTypeOf(_unknown.type).toEqualTypeOf<unknown>();

const _any1 = type(({ custom }) => custom());
expectTypeOf(_any1.type).toEqualTypeOf<any>();

const _any2 = type(({ any }) => any());
expectTypeOf(_any2.type).toEqualTypeOf<any>();

// Plain object
const _obj = type({ name: 'string', age: 'number' });
expectTypeOf(_obj.type).toEqualTypeOf<{
  name: string;
  age: number;
}>();

// String primitive
const _str = type('string' as const);
expectTypeOf(_str.type).toEqualTypeOf<string>();

// Number primitive
const _num = type('number' as const);
expectTypeOf(_num.type).toEqualTypeOf<number>();

// Boolean primitive
const _bool = type('boolean' as const);
expectTypeOf(_bool.type).toEqualTypeOf<boolean>();

// Via function — flat object with primitive helpers
const _funcObj = type(({ primitive }) => ({
  name: primitive.string(),
  age: primitive.number(),
}));
expectTypeOf(_funcObj.type).toEqualTypeOf<{
  name: string;
  age: number;
}>();

// Via function — optional field
const _funcOpt = type(({ optional }) => ({
  nick: optional('string'),
}));
expectTypeOf(_funcOpt.type).toEqualTypeOf<{ nick?: string }>();

// Via function — array field
const _funcArr = type(({ array }) => ({
  tags: array('string'),
}));
expectTypeOf(_funcArr.type).toEqualTypeOf<{ tags: string[] }>();

// Via function — union field
const _funcUnion = type(({ union }) => ({
  value: union('string', 'number'),
}));
expectTypeOf(_funcUnion.type).toEqualTypeOf<{
  value: string | number;
}>();

// Via function — partial object
const _funcPartial = type(({ partial }) => ({
  user: partial({ name: 'string', active: 'boolean' }),
}));
expectTypeOf(_funcPartial.type).toEqualTypeOf<{
  user: Partial<{ name: string; active: boolean }>;
}>();
