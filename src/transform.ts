import { CUSTOM, MAYBE, PARTIAL } from './constants';
import {
  any,
  array,
  custom,
  intersection,
  litterals,
  maybe,
  partial,
  record,
  soa,
  sv,
  tuple,
  union,
} from './helpers';
import type { Transform_F } from './transform.types';
import type { inferT, ObjectS, TransformTypes, Types } from './types';

const transformTypes = <T extends Types>(type: T): TransformTypes<T> => {
  const out: any = type === 'primitive' ? {} : undefined;
  return out;
};

const _transform = <T extends ObjectS>(obj: T): inferT<T> => {
  const _obj = obj as any;

  const checkArray = Array.isArray(obj);
  if (checkArray) {
    return obj.map(_transform as any) as any;
  }

  const checkObject = typeof obj === 'object';
  if (checkObject) {
    if (MAYBE in _obj) {
      return _transform(_obj[MAYBE]);
    }

    const isCustom = Object.keys(obj).every(key => key === CUSTOM);
    const out: any = {};
    if (isCustom) return out;

    const entries = Object.entries(obj).filter(([key]) => key !== PARTIAL);

    entries.forEach(([key, value]) => {
      out[key] = _transform(value);
    });

    return out;
  }

  return transformTypes(_obj) as any;
};

export const transform: Transform_F = option => {
  const objectS = option({
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
  });

  return _transform(objectS);
};
