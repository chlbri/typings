import { STANDARD_KEY } from '../constants';
import { type } from '../type';

// Any with string
const anyString = type(({ any }) => ({
  value: any('string'),
}));
expectTypeOf(anyString[STANDARD_KEY].types?.input).toEqualTypeOf<
  | {
      value: string;
    }
  | undefined
>();

// Any with number
const anyNumber = type(({ any }) => ({
  count: any('number'),
}));
expectTypeOf(anyNumber.type).toEqualTypeOf<{ count: number }>();

// Any with object
const anyObject = type(({ any }) => ({
  data: any({ name: 'string', age: 'number' }),
}));
expectTypeOf(anyObject.type).toEqualTypeOf<{
  data: { name: string; age: number };
}>();

// Any without argument (defaults to ObjectS)
const anyDefault = type(({ any }) => ({ any: any() }));
expectTypeOf(anyDefault.type.any).toEqualTypeOf<any>();
