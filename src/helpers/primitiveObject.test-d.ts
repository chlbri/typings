import { type } from '../type';
import type {
  inferSh,
  NotReadonly,
  PrimitiveObjectMapS,
  PrimitiveObjectT,
  StandardHelper,
} from '../types';
import { primitiveObject } from './primitiveObject';

// No argument — defaults to PrimitiveObjectS
const noArg = primitiveObject();
expectTypeOf(noArg).branded.toEqualTypeOf<NotReadonly<PrimitiveObjectT>>();

const noMapArg = primitiveObject.map();
expectTypeOf(noMapArg).branded.toEqualTypeOf<PrimitiveObjectMapS>();

// Primitive type string literal
const withString = primitiveObject('string');
expectTypeOf(withString).toEqualTypeOf<'string'>();

// Primitive type number literal
const withNumber = primitiveObject('number');
expectTypeOf(withNumber).toEqualTypeOf<'number'>();

// PrimitiveObjectMapS
const withMap = primitiveObject({ name: 'string', age: 'number' });
expectTypeOf(withMap).toEqualTypeOf<{ name: 'string'; age: 'number' }>();

// Nested PrimitiveObjectMapS
const withNested = primitiveObject({
  user: { name: 'string', active: 'boolean' },
});
expectTypeOf(withNested).toEqualTypeOf<{
  user: {
    name: 'string';
    active: 'boolean';
  };
}>();

// .map() — defaults to PrimitiveObjectMapS
const mapResult = primitiveObject.map();
expectTypeOf(mapResult).toEqualTypeOf<PrimitiveObjectMapS>();

// inferT: flat map transformation
type FlatMapT = inferSh<{ name: 'string'; age: 'number' }>;
expectTypeOf<FlatMapT>().toEqualTypeOf<
  StandardHelper<{ name: string; age: number }>
>();

// inferT: nested map transformation
type NestedMapT = inferSh<{ user: { name: 'string'; active: 'boolean' } }>;
expectTypeOf<NestedMapT>().toEqualTypeOf<
  StandardHelper<{
    user: { name: string; active: boolean };
  }>
>();

// inferT: from primitiveObject schema variable
const schemaVar = primitiveObject({ id: 'string', score: 'number' });
type SchemaVarT = inferSh<typeof schemaVar>;
expectTypeOf<SchemaVarT>().toEqualTypeOf<
  StandardHelper<{ id: string; score: number }>
>();

// inferT: multi-field primitive schema variable
const multiFieldSchema = primitiveObject({
  name: 'string',
  age: 'number',
  active: 'boolean',
});
type MultiFieldT = inferSh<typeof multiFieldSchema>;
expectTypeOf<MultiFieldT>().toEqualTypeOf<
  StandardHelper<{
    name: string;
    age: number;
    active: boolean;
  }>
>();

// type() with primitiveObject: flat map
const typeWithFlatMap = type(({ primitiveObject }) =>
  primitiveObject({ name: 'string', age: 'number' }),
);
expectTypeOf(typeWithFlatMap).toEqualTypeOf<
  StandardHelper<{
    name: string;
    age: number;
  }>
>();

// type() with primitiveObject: primitive string
const typeWithPrimitiveString = type(({ primitiveObject }) =>
  primitiveObject('string'),
);
expectTypeOf(typeWithPrimitiveString).toEqualTypeOf<
  StandardHelper<string>
>();

// type() with primitiveObject: primitive number
const typeWithPrimitiveNumber = type(({ primitiveObject }) =>
  primitiveObject('number'),
);
expectTypeOf(typeWithPrimitiveNumber).toEqualTypeOf<
  StandardHelper<number>
>();

// type() with primitiveObject: nested map
const typeWithNested = type(({ primitiveObject }) =>
  primitiveObject({ user: { name: 'string', active: 'boolean' } }),
);
expectTypeOf(typeWithNested).toEqualTypeOf<
  StandardHelper<{
    user: {
      name: string;
      active: boolean;
    };
  }>
>();

// type() with primitiveObject: combined with other helpers
const typeWithCombined = type(({ primitiveObject, optional }) => ({
  schema: primitiveObject({ name: 'string', age: 'number' }),
  label: optional('string'),
}));
expectTypeOf(typeWithCombined).toEqualTypeOf<
  StandardHelper<{
    schema: { name: string; age: number };
    label?: string;
  }>
>();
