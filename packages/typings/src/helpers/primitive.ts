import { standardize2 } from '../standard';
import type { Custom, PrimitiveT } from '../types';
import { _const } from '../utils';
import { expandFn2 } from '../utils/expandFn';

/**
 * Creates primitive type schemas and exposes sub-helpers for all JavaScript
 * primitives.
 *
 * @template | Type {@linkcode PrimitiveT} `T` - Primitive schema type name.
 *
 * @param value - Optional primitive type string.
 *
 * @returns The standardized primitive schema.
 */
export const primitive = expandFn2(
  <const T extends PrimitiveT>(value?: T) => standardize2<T>(value),
  _const<PrimitiveT>(),
  {
    /**
     * Creates a boolean schema or a literal boolean schema.
     *
     * @template | Type {@linkcode Boolean} `T` - Boolean literal type.
     *
     * @param value - Optional boolean literal value.
     *
     * @returns The boolean primitive schema.
     */
    boolean: expandFn2(<const T extends boolean>(value?: T) => {
      type TT = boolean extends T ? 'boolean' : Custom<T>;
      return standardize2<TT>(value);
    }, 'boolean'),

    /**
     * Creates a string schema or a literal string schema.
     *
     * @template | Type {@linkcode String} `T` - String literal type.
     *
     * @param value - Optional string literal value.
     *
     * @returns The string primitive schema.
     */
    string: expandFn2(<const T extends string = string>(value?: T) => {
      type TT = string extends T ? 'string' : Custom<T>;
      return standardize2<TT>(value);
    }, 'string'),

    /**
     * Creates a number schema or a literal number schema.
     *
     * @template | Type {@linkcode Number} `T` - Number literal type.
     *
     * @param value - Optional number literal value.
     *
     * @returns The number primitive schema.
     */
    number: expandFn2(<const T extends number = number>(value?: T) => {
      type TT = number extends T ? 'number' : Custom<T>;
      return standardize2<TT>(value);
    }, 'number'),

    /**
     * Creates a bigint schema or a literal bigint schema.
     *
     * @template | Type {@linkcode BigInt} `T` - BigInt literal type.
     *
     * @param value - Optional bigint literal value.
     *
     * @returns The bigint primitive schema.
     */
    bigint: expandFn2(<const T extends bigint = bigint>(value?: T) => {
      type TT = bigint extends T ? 'bigint' : Custom<T>;
      return standardize2<TT>(value);
    }, 'bigint'),

    /**
     * Creates a symbol schema or a literal symbol schema.
     *
     * @template | Type {@linkcode Symbol} `T` - Symbol type.
     *
     * @param value - Optional symbol value.
     *
     * @returns The symbol primitive schema.
     */
    symbol: expandFn2(<const T extends symbol = symbol>(value?: T) => {
      type TT = symbol extends T ? 'symbol' : Custom<T>;
      return standardize2<TT>(value);
    }, 'symbol'),

    /** Predefined schema for the `never` type. */
    never: standardize2<Custom<never>>(),

    /** Predefined schema for the `undefined` type. */
    undefined: standardize2<Custom<undefined>>(),
  },
);
