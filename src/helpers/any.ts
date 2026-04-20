import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT } from '../types';
import { expandFn2 } from '../utils';

export const any = expandFn2(
  <const T extends ObjectT = ObjectT>(value?: T) => {
    type TT = ObjectT extends NotReadonly<T> ? 'any' : NotReadonly<T>;
    return standardize2<TT>(value);
  },
  'any',
);
