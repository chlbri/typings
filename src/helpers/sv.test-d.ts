import type { StateValue } from '../types';
import { type } from '../type';

// SV basic usage
const svBasic = type(({ sv }) => ({
  state: sv.const,
}));
expectTypeOf(svBasic.type).toEqualTypeOf<{
  state: StateValue;
}>();

// SV in nested object
const svNested = type(({ sv }) => ({
  machine: {
    currentState: sv.type,
  },
}));
expectTypeOf(svNested.type).toEqualTypeOf<{
  machine: { currentState: StateValue };
}>();

// Multiple SV
const svMultiple = type(({ sv }) => ({
  state1: sv.type,
  state2: sv.type,
}));
expectTypeOf(svMultiple.type).toEqualTypeOf<{
  state1: StateValue;
  state2: StateValue;
}>();

// SV with other types
const svWithOthers = type(({ sv, optional }) => ({
  state: sv(),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers.type).toEqualTypeOf<{
  state: StateValue;
  name: string;
  count?: number;
}>();

const svWithOthers2 = type(({ sv, optional }) => ({
  state: sv(''),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers2.type).toEqualTypeOf<{
  state: '';
  name: string;
  count?: number;
}>();

const svWithOthers3 = type(({ sv, optional }) => ({
  state: sv('state1'),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers3.type).toEqualTypeOf<{
  state: 'state1';
  name: string;
  count?: number;
}>();

const svWithOthers4 = type(({ sv, optional }) => ({
  state: sv({
    parallel: {
      state1: 'state11',
      state2: 'state22',
    },
  }),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers4.type).toEqualTypeOf<{
  state: {
    readonly parallel: {
      readonly state1: 'state11';
      readonly state2: 'state22';
    };
  };
  name: string;
  count?: number;
}>();
