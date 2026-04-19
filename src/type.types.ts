import type { inferT, ObjectT } from "./types";

import type {
  any,
  array,
  custom,
  intersection,
  litterals,
  optional,
  partial,
  primitive,
  primitiveObject,
  readonly,
  record,
  soa,
  sv,
  tuple,
  union,
} from "./helpers";

export type Helpers = {
  any: typeof any;
  custom: typeof custom;
  intersection: typeof intersection;
  litterals: typeof litterals;
  optional: typeof optional;
  partial: typeof partial;
  record: typeof record;
  soa: typeof soa;
  sv: typeof sv;
  union: typeof union;
  array: typeof array;
  tuple: typeof tuple;
  primitiveObject: typeof primitiveObject;
  primitive: typeof primitive;
  readonly: typeof readonly;
};

export type Transform_F = <T extends ObjectT = ObjectT>(
  option?: ((helpers: Helpers) => T) | T,
) => inferT<T>;
