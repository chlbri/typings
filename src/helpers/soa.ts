import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT, SoaCustom } from '../types';

export const soa = <const T extends ObjectT>(value?: T) => {
  type TT =
    ObjectT extends NotReadonly<T> ? 'any' : SoaCustom<NotReadonly<T>>;
  return standardize2<TT>(value);
};
