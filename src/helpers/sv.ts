import { standardize2 } from '../standard';
import type { Custom, StateValue } from '../types';
import { _const, expandFn2 } from '../utils';

export const sv = expandFn2(
  <const T extends StateValue = StateValue>(value?: T) => {
    type TT = StateValue extends T ? Custom<StateValue> : Custom<T>;
    return standardize2<TT>(value);
  },
  _const<Custom<StateValue>>(),
);
