import type { AnyArray } from './arrays.types';
import type { EmptyObject, Equals, TrueObject } from './utilities.types';

export class OptionalHelperClass {
  readonly __NO_TYPE__ = '@bemedev/addons/NO_TYPE';
  private constructor() {}
}

// #region type Undefiny
type HasUndefined<T> = unknown extends T
  ? false
  : Equals<EmptyObject, T> extends true
    ? false
    : OptionalHelperClass extends T
      ? true
      : false;

type _UndefinyObject<T extends object> = {
  [K in keyof T as HasUndefined<T[K]> extends true ? never : K]: Undefiny<
    T[K]
  >;
} & {
  [K in keyof T as HasUndefined<T[K]> extends true ? K : never]?: Undefiny<
    T[K]
  >;
};

type ReduceTupleU<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [Undefiny<First>, ...ReduceTupleU<Rest>]
  : T[number] extends never
    ? []
    : T['length'] extends 0
      ? []
      : number extends T['length']
        ? T
        : Undefiny<T[number]>[];

type UndefinyObject<T extends object> = _UndefinyObject<T>;
export type Undefiny<
  T,
  U = Exclude<T, OptionalHelperClass>,
> = U extends AnyArray
  ? ReduceTupleU<U>
  : U extends TrueObject
    ? UndefinyObject<U>
    : U;
// #endregion
