import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT, PartialCustom } from '../types';

export const partial = <const T extends ObjectT>(value: T) => {
  return standardize2<NotReadonly<T> & PartialCustom>(value);
};
