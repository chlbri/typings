import { standardize2 } from '../standard';
import type { Keys, NOmit, NotReadonly, ObjectMapS } from '../types';
import { _const, expandFn2 } from '../utils';

export const omit = expandFn2(
  <const T extends ObjectMapS, K extends Keys>(value: T, _: K) => {
    type TT = ObjectMapS extends T ? ObjectMapS : Omit<NotReadonly<T>, K>;
    return standardize2<TT>(value);
  },
  _const<ObjectMapS>(),
  {
    strict: <
      const T extends ObjectMapS,
      const K extends keyof T = keyof T,
    >(
      value: T,
      _: K,
    ) => {
      type TT = ObjectMapS extends T
        ? ObjectMapS
        : NOmit<NotReadonly<T>, K>;
      return standardize2<TT>(value);
    },
  },
);
