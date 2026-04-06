import { type } from '../type';

// Tuple of two numbers
const tupleNumbers = type(({ tuple }) => ({
  coordinates: tuple('number', 'number'),
}));
expectTypeOf(tupleNumbers).toEqualTypeOf<{
  coordinates: [number, number];
}>();

// Tuple with mixed types
const tupleMixed = type(({ tuple }) => ({
  pair: tuple('string', 'number', 'boolean'),
}));
expectTypeOf(tupleMixed).toEqualTypeOf<{
  pair: [string, number, boolean];
}>();

// Tuple with objects
const tupleObjects = type(({ tuple }) => ({
  data: tuple({ name: 'string' }, { age: 'number' }),
}));
expectTypeOf(tupleObjects).toEqualTypeOf<{
  data: [{ name: string }, { age: number }];
}>();

// Tuple with three numbers (RGB)
const tupleRgb = type(({ tuple }) => ({
  rgb: tuple('number', 'number', 'number'),
}));
expectTypeOf(tupleRgb).toEqualTypeOf<{
  rgb: [number, number, number];
}>();

// Tuple with string and number
const tupleEntry = type(({ tuple }) => ({
  entry: tuple('string', 'number'),
}));
expectTypeOf(tupleEntry).toEqualTypeOf<{
  entry: [string, number];
}>();

// Tuple with complex objects
const tupleComplex = type(({ tuple }) => ({
  bounds: tuple({ min: 'number' }, { max: 'number' }),
}));
expectTypeOf(tupleComplex).toEqualTypeOf<{
  bounds: [{ min: number }, { max: number }];
}>();
