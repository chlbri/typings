import type { AnyArray } from './arrays.types';
import type { EmptyObject, Equals, TrueObject } from './utilities.types';

/* v8 ignore start */
/**
 * Sentinel helper class representing optional property values during type
 * transformation.
 */
export class OptionalHelperClass {
  /** Internal brand marker string for optional types. */
  readonly __NO_TYPE__ = '@bemedev/addons/NO_TYPE';

  /** Private constructor to prevent instantiation. */
  private constructor() {}
}
/* v8 ignore stop */

// #region type Undefiny
type HasUndefined<T> = unknown extends T
  ? false
  : Equals<EmptyObject, T> extends true
    ? false
    : OptionalHelperClass extends T
      ? true
      : false;

type _UndefinyObject<T extends object> = {
  [K in keyof T as HasUndefined<T[K]> extends true ? never : K]: Undefiny<T[K]>;
} & {
  [K in keyof T as HasUndefined<T[K]> extends true ? K : never]?: Undefiny<T[K]>;
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

/**
 * Recursively converts object properties tagged with class
 * {@linkcode OptionalHelperClass} into optional properties (`?`).
 *
 * @template T - The input object or array type.
 * @template | Class {@linkcode OptionalHelperClass} `U` - Type with sentinel class
 *   {@linkcode OptionalHelperClass} excluded.
 *
 * @see -- class {@linkcode OptionalHelperClass}
 */
export type Undefiny<T, U = Exclude<T, OptionalHelperClass>> = U extends AnyArray
  ? ReduceTupleU<U>
  : U extends TrueObject
    ? UndefinyObject<U>
    : U;
// #endregion
