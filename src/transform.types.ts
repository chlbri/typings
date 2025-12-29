import type {
  any,
  custom,
  intersection,
  litterals,
  maybe,
  partial,
  record,
  soa,
  sv,
  union,
  array,
  tuple,
} from './helpers';
import type { ObjectS, TransformS } from './types';

export type Helpers = {
  any: typeof any;
  custom: typeof custom;
  intersection: typeof intersection;
  litterals: typeof litterals;
  maybe: typeof maybe;
  partial: typeof partial;
  record: typeof record;
  soa: typeof soa;
  sv: typeof sv;
  union: typeof union;
  array: typeof array;
  tuple: typeof tuple;
};

export type Transform_F = <T extends ObjectS = ObjectS>(
  option: (helpers: Helpers) => T,
) => TransformS<T>;
