import { transform } from '../../transform';

// Any with string
const anyString = transform(({ any }) => ({
  value: any('string'),
}));
expectTypeOf(anyString).toEqualTypeOf<{ value: string }>();

// Any with number
const anyNumber = transform(({ any }) => ({
  count: any('number'),
}));
expectTypeOf(anyNumber).toEqualTypeOf<{ count: number }>();

// Any with object
const anyObject = transform(({ any }) => ({
  data: any({ name: 'string', age: 'number' }),
}));
expectTypeOf(anyObject).toEqualTypeOf<{
  data: { name: string; age: number };
}>();

// Any without argument (defaults to ObjectS)
const anyDefault = transform(({ any }) => ({
  unknown: any(),
}));
expectTypeOf(anyDefault.unknown).toBeUnknown();
