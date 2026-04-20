import { standardize2 } from '../standard';
import type { Custom, PrimitiveT } from '../types';
import { _const } from '../utils';
import { expandFn2 } from '../utils/expandFn';

export const primitive = expandFn2(
  <const T extends PrimitiveT>(value?: T) => standardize2<T>(value),
  _const<PrimitiveT>(),
  {
    boolean: expandFn2(<const T extends boolean>(value?: T) => {
      type TT = boolean extends T ? 'boolean' : Custom<T>;
      return standardize2<TT>(value);
    }, 'boolean'),

    string: expandFn2(<const T extends string = string>(value?: T) => {
      type TT = string extends T ? 'string' : Custom<T>;
      return standardize2<TT>(value);
    }, 'string'),

    number: expandFn2(<const T extends number = number>(value?: T) => {
      type TT = number extends T ? 'number' : Custom<T>;
      return standardize2<TT>(value);
    }, 'number'),

    bigint: expandFn2(<const T extends bigint = bigint>(value?: T) => {
      type TT = bigint extends T ? 'bigint' : Custom<T>;
      return standardize2<TT>(value);
    }, 'bigint'),

    symbol: expandFn2(<const T extends symbol = symbol>(value?: T) => {
      type TT = symbol extends T ? 'symbol' : Custom<T>;
      return standardize2<TT>(value);
    }, 'symbol'),

    never: standardize2<Custom<never>>(),
    undefined: standardize2<Custom<undefined>>(),
  },
);
