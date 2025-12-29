import type { StateValue } from '../../types';
import { transform } from '../../transform';

// SV basic usage
const svBasic = transform(({ sv }) => ({
  state: sv,
}));
expectTypeOf(svBasic).toEqualTypeOf<{
  state: StateValue;
}>();

// SV in nested object
const svNested = transform(({ sv }) => ({
  machine: {
    currentState: sv,
  },
}));
expectTypeOf(svNested).toEqualTypeOf<{
  machine: { currentState: StateValue };
}>();

// Multiple SV
const svMultiple = transform(({ sv }) => ({
  state1: sv,
  state2: sv,
}));
expectTypeOf(svMultiple).toEqualTypeOf<{
  state1: StateValue;
  state2: StateValue;
}>();

// SV with other types
const svWithOthers = transform(({ sv }) => ({
  state: sv,
  name: 'string',
  count: 'number',
}));
expectTypeOf(svWithOthers).toEqualTypeOf<{
  state: StateValue;
  name: string;
  count: number;
}>();
