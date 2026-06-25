import { standardize2 } from '../standard';
import type { ArrayCustom, NotReadonly, ObjectT } from '../types';
import { _const, expandFn2 } from '../utils';

export const array = expandFn2(<const T extends ObjectT>(value: T) => {
  return standardize2<ArrayCustom<NotReadonly<T>>>([value]);
}, _const<ArrayCustom>());
