import { transform } from '../../transform';

// Union of primitives
const unionPrimitives = transform(({ union }) => ({
  value: union('string', 'number'),
}));
expectTypeOf(unionPrimitives).toEqualTypeOf<{
  value: string | number;
}>();

// Union of three primitives
const unionThree = transform(({ union }) => ({
  value: union('string', 'number', 'boolean'),
}));
expectTypeOf(unionThree).toEqualTypeOf<{
  value: string | number | boolean;
}>();

// Union with null
const unionNullable = transform(({ union }) => ({
  nullable: union('string', 'null'),
}));
expectTypeOf(unionNullable).toEqualTypeOf<{
  nullable: string | null;
}>();

// Union of objects
const unionObjects = transform(({ union }) => ({
  item: union({ type: 'string' }, { value: 'number' }),
}));
expectTypeOf(unionObjects).toEqualTypeOf<{
  item: { type: string } | { value: number };
}>();

// Discriminated union
const discriminatedUnion = transform(({ union }) => ({
  event: union.discriminated(
    'type',
    { type: 'string', name: 'string' },
    { type: 'string', count: 'number' },
  ),
}));
expectTypeOf(discriminatedUnion).toEqualTypeOf<{
  event: { type: string; name: string } | { type: string; count: number };
}>();

// Complex discriminated union
const complexDiscriminated = transform(({ union }) => ({
  response: union.discriminated(
    'status',
    { status: 'string', data: 'string' },
    { status: 'string', error: 'string' },
  ),
}));
expectTypeOf(complexDiscriminated).toEqualTypeOf<{
  response:
    | { status: string; data: string }
    | { status: string; error: string };
}>();
