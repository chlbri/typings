import { type } from '../type';
import type { Sh } from '../types';

// Any with string
const anyString = type(({ any }) => ({
  value: any('string'),
}));
expectTypeOf(anyString['~standard'].types?.input).toEqualTypeOf<
  | {
      value: string;
    }
  | undefined
>();

// Any with number
const anyNumber = type(({ any }) => ({
  count: any('number'),
}));
expectTypeOf(anyNumber).toEqualTypeOf<Sh<{ count: number }>>();

// Any with object
const anyObject = type(({ any }) => ({
  data: any({ name: 'string', age: 'number' }),
}));
expectTypeOf(anyObject).toEqualTypeOf<
  Sh<{
    data: { name: string; age: number };
  }>
>();

// Any without argument (defaults to ObjectS)
const anyDefault = type(({ any }) => ({ any: any() }));
expectTypeOf(anyDefault.value.any).toEqualTypeOf<any>();
