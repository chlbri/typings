import { STANDARD_KEY, vendor } from './constants';
import type { StandardSchemaV1 } from './types';

/**
 * Function type signature that standardizes a type value into a compliant Standard
 * Schema object.
 *
 * @template T - The schema definition type.
 *
 * @param value - The input value to standardize.
 *
 * @returns An object containing `__type`, `type`, and the interface
 *   {@linkcode StandardSchemaV1} properties.
 */
type Standardize_F = <T>(
  value: T,
) => { __type: T; type: T } & StandardSchemaV1<T, T>;

const _standardize = (__type: any) => {
  return {
    __type: __type,
    type: __type,
    [STANDARD_KEY]: {
      version: 1,
      vendor,
      types: { input: __type, output: __type },
      validate: () => ({ value: __type }),
    },
  } as const;
};

/**
 * Standardizes a schema value into an object implementing the interface
 * {@linkcode StandardSchemaV1} contract.
 */
export const standardize: Standardize_F = _standardize;

/**
 * Type-casts an input value to the target schema type `T`.
 *
 * @template T - The target type to cast to.
 *
 * @param value - Optional input value to cast.
 *
 * @returns The value cast to type `T`.
 */
export const standardize2 = <T>(value?: unknown) => value as T;
