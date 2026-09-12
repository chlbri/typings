import type { TransformT } from './transform.types';
import type { ObjectT } from './typings.types';
import type { Fn, TrueObject } from './utilities.types';

/**
 * Type representing either a mutable or readonly array of elements of type `T`.
 *
 * @template T - Element type, defaults to `unknown`.
 */
export type AnyArray<T = unknown> = ReadonlyArray<T> | T[];

type ReduceTuple<T extends AnyArray> = T extends [
  infer First,
  ...infer Rest extends AnyArray,
]
  ? [NotReadonly<First>, ...ReduceTuple<Rest>]
  : T extends AnyArray<infer A>
    ? NotReadonly<A>[]
    : [];

/**
 * Recursively maps a tuple of schema definitions into a tuple of their inferred
 * types.
 *
 * @template | Type {@linkcode AnyArray} `T` - Tuple of schema definitions.
 *
 * @see -- type {@linkcode TransformT}
 */
export type ReduceTuple2<T extends AnyArray<ObjectT>> = T extends [
  infer First,
  ...infer Rest extends AnyArray<ObjectT>,
]
  ? [TransformT<First>, ...ReduceTuple2<Rest>]
  : [];

/**
 * Deeply strips `readonly` modifiers from arrays, tuples, and object properties.
 *
 * @template T - The type to strip `readonly` modifiers from.
 */
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

/**
 * Type representing a single value or an array of values of type `T`.
 *
 * @template T - The element type.
 */
export type SingleOrArray<T> = T | T[] | ReadonlyArray<T>;

/**
 * Alias for type {@linkcode SingleOrArray}.
 *
 * @template T - The element type.
 */
export type SoA<T> = SingleOrArray<T>;

// #region SoRa
type RecursiveArrayOf<T> =
  | Array<_SingleOrRecursiveArrayOf<T>>
  | ReadonlyArray<_SingleOrRecursiveArrayOf<T>>;

type _SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;

/**
 * Type representing a single value or an arbitrarily nested recursive array of
 * values of type `T`.
 *
 * @template T - The element type.
 */
export type SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;

/**
 * Alias for type {@linkcode SingleOrRecursiveArrayOf}.
 *
 * @template T - The element type.
 */
export type SoRa<T> = SingleOrRecursiveArrayOf<T>;
// #endregion
