import {
  any,
  array,
  custom,
  fn,
  intersection,
  litterals,
  object,
  omit,
  optional,
  partial,
  primitive,
  primitiveObject,
  readonly,
  record,
  soa,
  sora,
  sv,
  tuple,
  union,
  use,
} from './helpers';
import { standardize } from './standard';
import type { FnBasic, inferSh, ObjectT, SafePre } from './types';
import { expandFn } from './utils';

/** Collection of builder helpers passed into the schema definition callback. */
type Helpers = {
  any: typeof any;
  custom: typeof custom;
  fn: typeof fn;
  function: typeof fn;
  intersection: typeof intersection;
  litterals: typeof litterals;
  optional: typeof optional;
  partial: typeof partial;
  record: typeof record;
  soa: typeof soa;
  use: typeof use;
  sv: typeof sv;
  union: typeof union;
  array: typeof array;
  tuple: typeof tuple;
  primitiveObject: typeof primitiveObject;
  primitive: typeof primitive;
  readonly: typeof readonly;
  object: typeof object;
  omit: typeof omit;
  sora: typeof sora;
};

/**
 * Function type signature for transforming a schema definition into an inferable
 * standard schema.
 *
 * @template | Type {@linkcode ObjectT} `T` - Schema definition type.
 *
 * @param option - The schema definition object or a builder function that receives
 *   type {@linkcode Helpers}.
 *
 * @returns The transformed schema of type {@linkcode inferSh}.
 */
export type Transform_F = <T extends ObjectT = ObjectT>(
  option?: ((helpers: Helpers) => T) | T,
) => inferSh<T>;

/**
 * Function type signature for chained pre-transformations.
 *
 * @template | Type {@linkcode ObjectT} `U` - The parent schema context.
 * @template | Type {@linkcode SafePre} `T` - The child schema definition type.
 *
 * @param option - The schema definition object or a builder function that receives
 *   type {@linkcode Helpers}.
 *
 * @returns The transformed schema of type {@linkcode inferSh}.
 */
type _PreTransform_F<U extends ObjectT> = <T extends SafePre<U> = SafePre<U>>(
  option?: ((helpers: Helpers) => T) | T,
) => inferSh<T>;

/**
 * Function type signature for creating a pre-typed transformation pipeline.
 *
 * @template | Type {@linkcode ObjectT} `U` - Base schema definition type.
 *
 * @param _ - Optional base schema input of type {@linkcode inferSh}.
 *
 * @returns A callable transform function with attached `type` and `pretype`
 *   properties.
 *
 * @see -- type {@linkcode FnBasic}
 */
export type PreTransform_F = <U extends ObjectT>(
  _?: inferSh<U>,
) => FnBasic<_PreTransform_F<U>, { type: _PreTransform_F<U>; pretype: inferSh<U> }>;

const _transform = <T extends ObjectT>(obj: T): inferSh<T> => {
  const _obj = obj as any;
  return _obj;
};

/**
 * Creates and standardizes a schema from an object definition or a helper-callback
 * function.
 *
 * @example
 *   ```ts
 *   const userSchema = type(({ optional, primitive }) => ({
 *     id: primitive.string(),
 *     name: primitive.string(),
 *     age: optional(primitive.number()),
 *   }));
 *   ```;
 */
export const type: Transform_F = option => {
  let out: any;

  if (!option) {
    out = option;
  } else if (typeof option === 'function') {
    const objectS = option({
      any,
      custom,
      fn,
      function: fn,
      intersection,
      litterals,
      optional,
      omit,
      partial,
      record,
      soa,
      sv,
      union,
      array,
      tuple,
      primitiveObject,
      primitive,
      readonly,
      object,
      sora,
      use: use,
    });

    out = _transform(objectS);
  } else out = _transform(option);

  return standardize(out);
};

/**
 * Pre-processes schema definitions for chaining type transformations and reusable
 * schemas.
 */
export const pretype: PreTransform_F = pretype =>
  expandFn(type, {
    type,
    pretype: standardize(pretype?.__type ?? ('any' as const)),
  }) as any;
