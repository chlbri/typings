import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { TransformT } from './transform.types';
import type { ObjectT, POS } from './typings.types';
import type { Optional } from './customs.types';
import type { Simplify } from './utilities.types';
import type { STANDARD_KEY } from '../constants';

export type * from '@standard-schema/spec';
export type StandardKey = keyof StandardSchemaV1;

export type StandardHelper<T1 = any, T2 = any> = {
  __type: T1;
  type: T2;
} & StandardSchemaV1<T2, T2>;

type _inferO<T extends ObjectT = ObjectT> = ObjectT extends T
  ? unknown
  : T extends Optional<infer U>
    ? TransformT<U> | undefined
    : TransformT<T>;

export type inferO<T extends POS> = Simplify<_inferO<T>>;

type _Sh<T1 = any, T2 = any> = StandardHelper<T1, T2>;
export type Sh<T extends ObjectT = ObjectT> = StandardHelper<T, inferO<T>>;
export type StandardOutput<T = any> = {
  [STANDARD_KEY]: {
    types?: {
      output: T;
    };
  };
};

export type inferSh<T extends ObjectT = ObjectT> = _Sh<T, inferO<T>>;

type _inferT<T extends StandardOutput = StandardOutput> = Exclude<
  T[typeof STANDARD_KEY]['types'],
  undefined
>['output'];

export type inferT<T extends StandardOutput = StandardOutput> = _inferT<T>;
