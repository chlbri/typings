import { type } from '../type';

// String primitive
const stringResult = type(() => ({ name: 'string' }));
expectTypeOf(stringResult).toEqualTypeOf<{ name: string }>();

// Number primitive
const numberResult = type(() => ({ age: 'number' }));
expectTypeOf(numberResult).toEqualTypeOf<{ age: number }>();

// Boolean primitive
const booleanResult = type(() => ({ active: 'boolean' }));
expectTypeOf(booleanResult).toEqualTypeOf<{ active: boolean }>();

// Null primitive
const nullResult = type(() => ({ value: 'null' }));
expectTypeOf(nullResult).toEqualTypeOf<{ value: null }>();

// Undefined primitive
const undefinedResult = type(() => ({ value: 'undefined' }));
expectTypeOf(undefinedResult).toEqualTypeOf<{ value: undefined }>();

// Symbol primitive
const symbolResult = type(() => ({ sym: 'symbol' }));
expectTypeOf(symbolResult).toEqualTypeOf<{ sym: symbol }>();

// Date type
const dateResult = type(() => ({ createdAt: 'date' }));
expectTypeOf(dateResult).toEqualTypeOf<{ createdAt: Date }>();

// Multiple primitives
const multipleResult = type(() => ({
  name: 'string',
  age: 'number',
  active: 'boolean',
}));
expectTypeOf(multipleResult).toEqualTypeOf<{
  name: string;
  age: number;
  active: boolean;
}>();
