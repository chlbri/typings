import type { Sh, StateValue } from '../types';
import { type } from '../type';

// SV basic usage
const svBasic = type(({ sv }) => ({
  state: sv.const,
}));
expectTypeOf(svBasic).toEqualTypeOf<
  Sh<{
    state: StateValue;
  }>
>();

// SV in nested object
const svNested = type(({ sv }) => ({
  machine: {
    currentState: sv.type,
  },
}));
expectTypeOf(svNested).toEqualTypeOf<
  Sh<{
    machine: { currentState: StateValue };
  }>
>();

// Multiple SV
const svMultiple = type(({ sv }) => ({
  state1: sv.type,
  state2: sv.type,
}));
expectTypeOf(svMultiple).toEqualTypeOf<
  Sh<{
    state1: StateValue;
    state2: StateValue;
  }>
>();

// SV with other types
const svWithOthers = type(({ sv, optional }) => ({
  state: sv(),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers).toEqualTypeOf<
  Sh<{
    state: StateValue;
    name: string;
    count?: number;
  }>
>();

const svWithOthers2 = type(({ sv, optional }) => ({
  state: sv(''),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers2).toEqualTypeOf<
  Sh<{
    state: '';
    name: string;
    count?: number;
  }>
>();

const svWithOthers3 = type(({ sv, optional }) => ({
  state: sv('state1'),
  name: 'string',
  count: optional('number'),
}));
expectTypeOf(svWithOthers3).toEqualTypeOf<
  Sh<{
    state: 'state1';
    name: string;
    count?: number;
  }>
>();

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
expectTypeOf(svWithOthers4).toEqualTypeOf<
  Sh<{
    state: {
      readonly parallel: {
        readonly state1: 'state11';
        readonly state2: 'state22';
      };
    };
    name: string;
    count?: number;
  }>
>();
