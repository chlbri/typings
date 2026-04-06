import type { StateValue } from '../types';
import { type } from '../type';

// SV basic usage
const svBasic = type(({ sv }) => ({
  state: sv,
}));
expectTypeOf(svBasic).toEqualTypeOf<{
  state: StateValue;
}>();

// SV in nested object
const svNested = type(({ sv }) => ({
  machine: {
    currentState: sv,
  },
}));
expectTypeOf(svNested).toEqualTypeOf<{
  machine: { currentState: StateValue };
}>();

// Multiple SV
const svMultiple = type(({ sv }) => ({
  state1: sv,
  state2: sv,
}));
expectTypeOf(svMultiple).toEqualTypeOf<{
  state1: StateValue;
  state2: StateValue;
}>();

// SV with other types
const svWithOthers = type(({ sv, optional }) => ({
  state: sv,
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers).toEqualTypeOf<{
  state: StateValue;
  name: string;
  count?: number;
}>();
