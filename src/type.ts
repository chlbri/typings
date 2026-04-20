import type { Transform_F } from './type.types';
import type { inferSh, ObjectT } from './types';
import { standardize } from './standard';

import {
  any,
  array,
  custom,
  intersection,
  litterals,
  object,
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
} from './helpers';

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
    });

    out = _transform(objectS);
  } else out = _transform(option);

  return standardize(out);
};
