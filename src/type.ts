import { CUSTOM, OPTIONAL, PARTIAL } from "./constants";
import {
  any,
  array,
  custom,
  intersection,
  litterals,
  optional,
  partial,
  primitiveObject,
  record,
  soa,
  sv,
  tuple,
  union,
} from "./helpers";
import type { Transform_F } from "./type.types";
import type { inferT, ObjectT, TransformTypes, Types } from "./types";

const transformTypes = <T extends Types>(_: T): TransformTypes<T> => {
  return undefined as any;
};

const _transform = <T extends ObjectT>(obj: T): inferT<T> => {
  const _obj = obj as any;

  const checkArray = Array.isArray(obj);
  if (checkArray) {
    return obj.map(_transform as any) as any;
  }

  const checkObject = typeof obj === "object";
  if (checkObject) {
    if (OPTIONAL in _obj) {
      return _transform(_obj[OPTIONAL]) as any;
    }

    const isCustom = Object.keys(obj).every((key) => key === CUSTOM);
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

export const type: Transform_F = (option) => {
  if (!option) return undefined as any;

  if (typeof option === "function") {
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
    });
    return _transform(objectS);
  }

  return _transform(option);
};
