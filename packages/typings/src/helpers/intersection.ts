import { standardize2 } from '../standard';
import type { IntersectionCustom, NotReadonly, ObjectMapS } from '../types';

/**
 * Combines multiple object schema definitions into an intersection schema.
 *
 * @template | Type {@linkcode ObjectMapS} `T` - Tuple of object schemas to
 *   intersect.
 *
 * @param values - Variadic array of object schemas.
 *
 * @returns The intersected schema wrapped as type {@linkcode IntersectionCustom}.
 */
export const intersection = <
  const T extends [ObjectMapS, ObjectMapS, ...ObjectMapS[]],
>(
  ...values: T
) => {
  return standardize2<IntersectionCustom<NotReadonly<T>>>(values);
};
