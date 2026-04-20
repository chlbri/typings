import type { Keys, Sh } from '../types';
import { type } from '../type';

// Record with string value (generic keys)
const recordString = type(({ record }) => ({
  dict: record('string'),
}));
expectTypeOf(recordString).toEqualTypeOf<
  Sh<{
    dict: Record<Keys, string>;
  }>
>();

// Record with specific keys
const recordSpecific = type(({ record }) => ({
  config: record('boolean', 'enabled', 'visible', 'active'),
}));
expectTypeOf(recordSpecific).toEqualTypeOf<
  Sh<{
    config: Record<'enabled' | 'visible' | 'active', boolean>;
  }>
>();

// Record with object value
const recordObject = type(({ record }) => ({
  users: record({ name: 'string', age: 'number' }, 'user1', 'user2'),
}));
expectTypeOf(recordObject).toEqualTypeOf<
  Sh<{
    users: Record<'user1' | 'user2', { name: string; age: number }>;
  }>
>();

// Record with number value (generic keys)
const recordNumber = type(({ record }) => ({
  scores: record('number'),
}));
expectTypeOf(recordNumber).toEqualTypeOf<
  Sh<{
    scores: Record<Keys, number>;
  }>
>();

// Record with single key
const recordSingle = type(({ record }) => ({
  single: record('string', 'onlyKey'),
}));
expectTypeOf(recordSingle).toEqualTypeOf<
  Sh<{
    single: Record<'onlyKey', string>;
  }>
>();

// Record with complex object value
const recordComplex = type(({ record, array }) => ({
  entities: record(
    { id: 'string', tags: array('string'), active: 'boolean' },
    'first',
    'second',
  ),
}));
expectTypeOf(recordComplex).toEqualTypeOf<
  Sh<{
    entities: Record<
      'first' | 'second',
      { id: string; tags: string[]; active: boolean }
    >;
  }>
>();
