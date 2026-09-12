import { standardize2 } from '../standard';
import type { NotReadonly, ObjectT } from '../types';
import { expandFn2 } from '../utils';
import { array } from './array';

/**
 * Creates a fixed-length tuple schema from a list of schema element definitions.
 *
 * @template | Type {@linkcode ObjectT} `T` - Tuple element schema types.
 *
 * @param values - Variadic array of schema definitions for each tuple index.
 *
 * @returns Standardized tuple schema typed as type {@linkcode NotReadonly}.
 */
export const tuple = expandFn2(
  <const T extends [ObjectT, ...ObjectT[]]>(...values: T) => {
    return standardize2<NotReadonly<T>>(values);
  },
  array.type,
);
