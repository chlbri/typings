import type { TransformT } from './transform.types';
import type { ObjectT } from './typings.types';
import type { Fn, TrueObject } from './utilities.types';

export type AnyArray<T = unknown> = ReadonlyArray<T> | T[];

type ReduceTuple<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [NotReadonly<First>, ...ReduceTuple<Rest>]
  : T extends AnyArray<infer A>
    ? NotReadonly<A>[]
    : [];

export type ReduceTuple2<T extends AnyArray<ObjectT>> = T extends [
  infer First,
  ...infer Rest extends AnyArray<ObjectT>,
]
  ? [TransformT<First>, ...ReduceTuple2<Rest>]
  : [];

export type NotReadonly<T> = T extends AnyArray
  ? ReduceTuple<T>
  : T extends object
    ? {
        -readonly [P in keyof T]: T[P] extends Fn
          ? T[P]
          : T[P] extends TrueObject
            ? NotReadonly<T[P]>
            : T[P];
      }
    : T;

export type SingleOrArray<T> = T | T[] | ReadonlyArray<T>;
export type SoA<T> = SingleOrArray<T>;

// #region SoRa
type RecursiveArrayOf<T> =
  | Array<_SingleOrRecursiveArrayOf<T>>
  | ReadonlyArray<_SingleOrRecursiveArrayOf<T>>;

type _SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;
export type SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;

export type SoRa<T> = SingleOrRecursiveArrayOf<T>;
// #endregion
