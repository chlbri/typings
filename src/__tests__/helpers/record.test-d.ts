import type { Keys } from '../../types';
import { transform } from '../../transform';

// Record with string value (generic keys)
const recordString = transform(({ record }) => ({
  dict: record('string'),
}));
expectTypeOf(recordString).toEqualTypeOf<{
  dict: Record<Keys, string>;
}>();

// Record with specific keys
const recordSpecific = transform(({ record }) => ({
  config: record('boolean', 'enabled', 'visible', 'active'),
}));
expectTypeOf(recordSpecific).toEqualTypeOf<{
  config: Record<'enabled' | 'visible' | 'active', boolean>;
}>();

// Record with object value
const recordObject = transform(({ record }) => ({
  users: record({ name: 'string', age: 'number' }, 'user1', 'user2'),
}));
expectTypeOf(recordObject).toEqualTypeOf<{
  users: Record<'user1' | 'user2', { name: string; age: number }>;
}>();

// Record with number value (generic keys)
const recordNumber = transform(({ record }) => ({
  scores: record('number'),
}));
expectTypeOf(recordNumber).toEqualTypeOf<{
  scores: Record<Keys, number>;
}>();

// Record with single key
const recordSingle = transform(({ record }) => ({
  single: record('string', 'onlyKey'),
}));
expectTypeOf(recordSingle).toEqualTypeOf<{
  single: Record<'onlyKey', string>;
}>();

// Record with complex object value
const recordComplex = transform(({ record, array }) => ({
  entities: record(
    { id: 'string', tags: array('string'), active: 'boolean' },
    'first',
    'second',
  ),
}));
expectTypeOf(recordComplex).toEqualTypeOf<{
  entities: Record<
    'first' | 'second',
    { id: string; tags: string[]; active: boolean }
  >;
}>();
