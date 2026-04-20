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
  object,
} from "./helpers";
import type { ObjectT, inferSh } from "./types";

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
  object: typeof object;
};

export type Transform_F = <T extends ObjectT = ObjectT>(
  option?: ((helpers: Helpers) => T) | T,
) => inferSh<T>;
