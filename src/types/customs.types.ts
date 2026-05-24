import type {
  CUSTOM,
  SOA,
  SORA,
  UNION,
  PARTIAL,
  OPTIONAL,
  ARRAY,
} from '../constants';
import type { AnyArray } from './arrays.types';
import type { __ObjectT, ObjectMapS, ObjectT } from './typings.types';

export type Custom<T = any> = {
  [CUSTOM]: T;
};

export type SoaCustom<T extends ObjectT = ObjectT> = {
  [SOA]: T;
};

export type SoRaCustom<T extends ObjectT = ObjectT> = {
  [SORA]: T;
};

export type UnionCustom<T extends ObjectT[] = ObjectT[]> = {
  [UNION]: T;
};

export interface PartialCustom<T extends ObjectT = ObjectT> {
  [PARTIAL]: T;
}

export type ArrayCustom<T extends ObjectT = any> = {
  [ARRAY]: T;
};

export type Optional<
  T extends __ObjectT | ArrayCustom | AnyArray<__ObjectT> = __ObjectT,
> = {
  [OPTIONAL]: T;
};

export type IntersectionCustom<T extends ObjectMapS[]> = T extends [
  infer First extends ObjectMapS,
  ...infer Rest extends ObjectMapS[],
]
  ? First & IntersectionCustom<Rest>
  : unknown;
