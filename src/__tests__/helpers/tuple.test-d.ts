import { transform } from '../../transform';

// Tuple of two numbers
const tupleNumbers = transform(({ tuple }) => ({
  coordinates: tuple('number', 'number'),
}));
expectTypeOf(tupleNumbers).toEqualTypeOf<{
  coordinates: [number, number];
}>();

// Tuple with mixed types
const tupleMixed = transform(({ tuple }) => ({
  pair: tuple('string', 'number', 'boolean'),
}));
expectTypeOf(tupleMixed).toEqualTypeOf<{
  pair: [string, number, boolean];
}>();

// Tuple with objects
const tupleObjects = transform(({ tuple }) => ({
  data: tuple({ name: 'string' }, { age: 'number' }),
}));
expectTypeOf(tupleObjects).toEqualTypeOf<{
  data: [{ name: string }, { age: number }];
}>();

// Tuple with three numbers (RGB)
const tupleRgb = transform(({ tuple }) => ({
  rgb: tuple('number', 'number', 'number'),
}));
expectTypeOf(tupleRgb).toEqualTypeOf<{
  rgb: [number, number, number];
}>();

// Tuple with string and number
const tupleEntry = transform(({ tuple }) => ({
  entry: tuple('string', 'number'),
}));
expectTypeOf(tupleEntry).toEqualTypeOf<{
  entry: [string, number];
}>();

// Tuple with complex objects
const tupleComplex = transform(({ tuple }) => ({
  bounds: tuple({ min: 'number' }, { max: 'number' }),
}));
expectTypeOf(tupleComplex).toEqualTypeOf<{
  bounds: [{ min: number }, { max: number }];
}>();
