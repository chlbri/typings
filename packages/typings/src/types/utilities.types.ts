import type { Primitive } from './types.types';

/** Union of valid object property keys: string, number, or symbol. */
export type Keys = keyof any;

/**
 * Generic record type mapping any property key to `unknown`.
 *
 * @see -- type {@linkcode Keys}
 */
export type Ru = Record<Keys, unknown>;

/**
 * Compares two types for exact bidirectional assignability.
 *
 * @template T - First type to compare.
 * @template U - Second type to compare.
 */
export type Equals<T, U> = T extends U ? (U extends T ? true : false) : false;

/**
 * Represents a non-iterable plain JavaScript object.
 *
 * @see -- type {@linkcode Ru}
 */
export type TrueObject = Ru & {
  [Symbol.iterator]?: never;
  //@ts-expect-error - 'SymbolConstructor' does not exist on type 'object'
  [SymbolConstructor]?: never;
};

/**
 * Generic callable function signature.
 *
 * @template | Type {@linkcode Array} `Args` - Function parameter types tuple.
 * @template R - Function return type.
 */
export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

/**
 * Omit utility that enforces key existence.
 *
 * @template T - Base object type.
 * @template `K` - Key names from `T` to omit.
 */
export type NOmit<T, K extends keyof T> = Omit<T, K>;

// #region StateValue
/** Represents an XState-compatible state value: a string or nested state value map. */
export type StateValue = string | StateValueMap;
interface StateValueMap {
  [key: string]: StateValue;
}
// #endregion

/**
 * Merges a function call signature with additional object properties.
 *
 * @template | Type {@linkcode Fn} `Main` - The callable function type.
 * @template | Interface {@linkcode Object} `Tr` - Properties to merge onto the
 *   function.
 */
export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

/** Represents a strictly empty object with no properties. */
export type EmptyObject = Record<string, never>;

type ReduceArraySimple<T extends any[]> = T extends [
  infer First,
  ...infer Rest extends any[],
]
  ? [Simplify<First>, ...ReduceArraySimple<Rest>]
  : number extends T['length']
    ? Simplify<T[number]>[]
    : T;

/**
 * Flattens and simplifies complex intersected or computed types for clearer display
 * and diagnostics.
 *
 * @template T - The type to flatten.
 */
export type Simplify<T> = unknown extends T
  ? T
  : T extends Primitive
    ? T
    : T extends any[]
      ? ReduceArraySimple<T>
      : T extends TrueObject
        ? { [K in keyof T]: Simplify<T[K]> }
        : T & {};
