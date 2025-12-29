import { transform } from '../../transform';

// String primitive
const stringResult = transform(() => ({ name: 'string' }));
expectTypeOf(stringResult).toEqualTypeOf<{ name: string }>();

// Number primitive
const numberResult = transform(() => ({ age: 'number' }));
expectTypeOf(numberResult).toEqualTypeOf<{ age: number }>();

// Boolean primitive
const booleanResult = transform(() => ({ active: 'boolean' }));
expectTypeOf(booleanResult).toEqualTypeOf<{ active: boolean }>();

// Null primitive
const nullResult = transform(() => ({ value: 'null' }));
expectTypeOf(nullResult).toEqualTypeOf<{ value: null }>();

// Undefined primitive
const undefinedResult = transform(() => ({ value: 'undefined' }));
expectTypeOf(undefinedResult).toEqualTypeOf<{ value: undefined }>();

// Symbol primitive
const symbolResult = transform(() => ({ sym: 'symbol' }));
expectTypeOf(symbolResult).toEqualTypeOf<{ sym: symbol }>();

// Date type
const dateResult = transform(() => ({ createdAt: 'date' }));
expectTypeOf(dateResult).toEqualTypeOf<{ createdAt: Date }>();

// Multiple primitives
const multipleResult = transform(() => ({
  name: 'string',
  age: 'number',
  active: 'boolean',
}));
expectTypeOf(multipleResult).toEqualTypeOf<{
  name: string;
  age: number;
  active: boolean;
}>();
