import { standardize } from './standard';
import type { inferSh, ObjectT } from './types';

import {
  any,
  array,
  custom,
  intersection,
  litterals,
  object,
  omit,
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
  sora,
} from './helpers';

type Helpers = {
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
  omit: typeof omit;
  sora: typeof sora;
};

export type Transform_F = <T extends ObjectT = ObjectT>(
  option?: ((helpers: Helpers) => T) | T,
) => inferSh<T>;

export type PreTransform = <U extends ObjectT>() => <T extends U = U>(
  option?: ((helpers: Helpers) => T) | T,
) => inferSh<T>;

const _transform = <T extends ObjectT>(obj: T): inferSh<T> => {
  const _obj = obj as any;
  return _obj;
};

export const type: Transform_F = option => {
  let out: any;

  if (!option) {
    out = option;
  } else if (typeof option === 'function') {
    const objectS = option({
      any,
      custom,
      intersection,
      litterals,
      optional,
      omit,
      partial,
      record,
      soa,
      sv,
      union,
      array,
      tuple,
      primitiveObject,
      primitive,
      readonly,
      object,
      sora,
    });

    out = _transform(objectS);
  } else out = _transform(option);

  return standardize(out);
};

export const pretype: PreTransform = () => type as any;
